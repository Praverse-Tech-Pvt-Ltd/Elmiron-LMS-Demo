/* Browser side of the optional live AI. Every call has a fallback: if the
   endpoint is missing, slow or failing, the built-in engine carries on and
   the session is never lost (network interruption / timeout, brief §47). */

import { getAiStore, logUsage } from './store';
import type { DimensionId, SessionConfig, Turn } from './types';

let availability: Promise<boolean> | null = null;

export function liveAvailable(): Promise<boolean> {
  if (getAiStore().config.engine === 'built-in') return Promise.resolve(false);
  availability ??= fetch('/api/ai', { method: 'GET' })
    .then(r => (r.ok ? r.json() : { available: false }))
    .then((d: { available?: boolean }) => Boolean(d.available))
    .catch(() => false);
  return availability;
}
export const resetAvailability = () => { availability = null; };

async function call(kind: 'doctor' | 'coach', body: Record<string, unknown>, timeoutMs: number): Promise<string | null> {
  const { config } = getAiStore();
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  const started = performance.now();
  try {
    const r = await fetch('/api/ai', {
      method: 'POST', signal: ctrl.signal, headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ kind, model: config.model, maxTokens: kind === 'coach' ? 1200 : config.maxOutputTokens, ...body }),
    });
    const d = await r.json() as { text?: string; model?: string; usage?: { inputTokens: number; outputTokens: number } };
    logUsage({ at: new Date().toISOString(), kind, inputTokens: d.usage?.inputTokens ?? 0, outputTokens: d.usage?.outputTokens ?? 0, ms: Math.round(performance.now() - started), ok: r.ok, model: d.model || config.model });
    return r.ok && d.text ? d.text : null;
  } catch {
    logUsage({ at: new Date().toISOString(), kind, inputTokens: 0, outputTokens: 0, ms: Math.round(performance.now() - started), ok: false, model: config.model });
    return null;
  } finally {
    clearTimeout(t);
  }
}

/** The doctor's next line from the model, steered by the engine's director note. */
export function liveDoctor(cfg: SessionConfig, turns: Turn[], directorNote: string, learner?: string) {
  return call('doctor', { config: cfg, turns, directorNote, learner }, 20_000);
}

export interface CoachJson {
  dimensions: Partial<Record<DimensionId, number>>;
  strengths: string[];
  improvements: string[];
  coach: string[];
}

export async function liveCoach(cfg: SessionConfig, turns: Turn[]): Promise<CoachJson | null> {
  const text = await call('coach', { config: cfg, turns }, 30_000);
  if (!text) return null;
  try {
    const j = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1)) as CoachJson;
    return j && typeof j.dimensions === 'object' ? j : null;
  } catch { return null; }
}
