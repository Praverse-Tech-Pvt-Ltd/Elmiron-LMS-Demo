/* Live AI endpoint for the AI Doctor (optional).
   Deploys as a serverless function (Vercel: /api/ai) and runs in `npm run dev`
   through the Vite middleware in vite.config.ts.

   The browser never sends a prompt. It sends the session config and transcript;
   this function rebuilds the prompt from the approved content on the server,
   so the API key cannot be used as a general-purpose model proxy.

   Enable by setting ANTHROPIC_API_KEY (and optionally AI_DOCTOR_MODEL). */

import { buildCoachPrompt, buildDoctorPrompt } from '../src/ai/prompts';
import { redact } from '../src/ai/engine';
import { SCENARIOS, PERSONAS, PRODUCTS, SPECIALTIES } from '../src/ai/content';
import type { SessionConfig, Turn } from '../src/ai/types';

declare const process: { env: Record<string, string | undefined> };

const MODELS = ['claude-sonnet-5', 'claude-haiku-4-5-20251001', 'claude-opus-5-5'];
const MAX_TURNS = 40;
const MAX_CHARS = 1500;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

export async function GET(): Promise<Response> {
  return json({ available: Boolean(process.env.ANTHROPIC_API_KEY), model: process.env.AI_DOCTOR_MODEL || MODELS[0] });
}

interface Body {
  kind: 'doctor' | 'coach';
  config: SessionConfig;
  turns: Turn[];
  directorNote?: string;
  learner?: string;
  model?: string;
  maxTokens?: number;
}

function valid(b: Body): string | null {
  if (b.kind !== 'doctor' && b.kind !== 'coach') return 'kind';
  const c = b.config;
  if (!c || !PRODUCTS.some(p => p.id === c.productId) || !SCENARIOS.some(s => s.id === c.scenarioId) || !PERSONAS.some(p => p.id === c.personaId) || !SPECIALTIES.some(s => s.id === c.specialtyId)) return 'config';
  if (!Array.isArray(b.turns) || b.turns.length > MAX_TURNS) return 'turns';
  if (b.turns.some(t => typeof t.text !== 'string' || t.text.length > MAX_CHARS || !['doctor', 'mr', 'system'].includes(t.who))) return 'turn';
  return null;
}

export async function POST(request: Request): Promise<Response> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return json({ error: 'AI service not configured' }, 503);

  let body: Body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }
  const bad = valid(body);
  if (bad) return json({ error: `Invalid request (${bad})` }, 400);

  // Redact again server-side: patient identifiers must never reach the model.
  const turns = body.turns.map(t => ({ ...t, text: redact(t.text).text }));
  const model = MODELS.includes(body.model || '') ? body.model! : (process.env.AI_DOCTOR_MODEL || MODELS[0]);
  const maxTokens = Math.min(body.kind === 'coach' ? 1400 : 600, Math.max(64, body.maxTokens || (body.kind === 'coach' ? 1200 : 320)));
  const prompt = body.kind === 'doctor'
    ? buildDoctorPrompt(body.config, turns, (body.directorNote || 'Respond naturally in persona.').slice(0, 400), body.learner?.slice(0, 300))
    : buildCoachPrompt(body.config, turns);

  const started = Date.now();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 25_000);
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model, max_tokens: maxTokens, system: prompt.system, messages: prompt.messages }),
    });
    if (!r.ok) return json({ error: `AI service error ${r.status}` }, 502);
    const data = await r.json() as { content: { type: string; text?: string }[]; usage?: { input_tokens: number; output_tokens: number } };
    const text = data.content.filter(c => c.type === 'text').map(c => c.text).join('').trim();
    return json({ text, model, ms: Date.now() - started, usage: { inputTokens: data.usage?.input_tokens ?? 0, outputTokens: data.usage?.output_tokens ?? 0 } });
  } catch (e) {
    return json({ error: (e as Error).name === 'AbortError' ? 'AI service timeout' : 'AI service unreachable' }, 504);
  } finally {
    clearTimeout(timer);
  }
}
