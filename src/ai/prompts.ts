/* Prompt architecture for the live AI Doctor and AI Coach (brief §35–38).
   Context is assembled from separate, controlled layers — never one giant prompt,
   and never the whole LMS database: only the product facts relevant to the
   current exchange are retrieved (cost control, brief §34). Shared by the
   browser (preview) and the server endpoint (which builds the real request). */

import { personaById, productById, scenarioById, specialtyById } from './content';
import type { ApprovedFact, SessionConfig, Turn } from './types';

export interface PromptPayload { system: string; messages: { role: 'user' | 'assistant'; content: string }[] }

const SYSTEM_RULES_DOCTOR = `You are a fictional physician taking part in a pharmaceutical sales TRAINING SIMULATION with a Medical Representative (MR). You are not a real person and do not replicate any real doctor.
Rules:
- Stay in the doctor role until the scenario ends. Reply as the doctor only: 1–3 short spoken sentences, no stage directions, no lists.
- Respond naturally to what the MR actually said. Do not help the MR formulate answers.
- Ask clinical/product questions based ONLY on the approved content supplied. Never invent clinical evidence, figures or safety data.
- Challenge unsupported claims ("Is that an approved claim?"). If the MR says something inaccurate, ask for clarification rather than confirming it.
- Do not provide patient-specific medical advice. Do not encourage off-label use, inducements or manipulation.
- If asked about something outside the approved content, say it is outside what you know from the label and see whether the MR offers to confirm with their medical team.
- Stay professional at all times: you may be impatient, skeptical or concerned, but never abusive, humiliating, discriminatory or insulting.
- If the MR mentions an identifiable real patient, remind them not to share patient details.`;

const SYSTEM_RULES_COACH = `You are now an MR TRAINING COACH reviewing a completed practice conversation. You are no longer the doctor.
- Evaluate only against the rubric provided, using the approved product information as the single source of truth.
- Separate communication quality from scientific accuracy. Identify unsupported or non-compliant statements clearly.
- Give practical coaching and explain principles; do not teach unapproved promotional claims or scripts to memorise.
- Output ONLY minified JSON matching the schema given. No prose outside JSON.`;

/** Retrieve only the approved facts relevant to the latest exchange (plus the indication). */
export function retrieveFacts(cfg: SessionConfig, turns: Turn[], limit = 4): ApprovedFact[] {
  const product = productById(cfg.productId);
  const recent = turns.slice(-3).map(t => t.text.toLowerCase()).join(' ');
  const scored = product.facts.map(f => ({ f, s: f.keywords.filter(k => recent.includes(k)).length + (f.id === 'ind' ? 0.5 : 0) + (recent.includes(f.topic.toLowerCase()) ? 1 : 0) }));
  return scored.sort((a, b) => b.s - a.s).slice(0, limit).map(x => x.f);
}

/** Keep the last turns verbatim and compress everything earlier into one line. */
function compress(turns: Turn[], keep = 8): { summary: string; recent: Turn[] } {
  const convo = turns.filter(t => t.who !== 'system');
  if (convo.length <= keep) return { summary: '', recent: convo };
  const older = convo.slice(0, -keep);
  const mrPoints = older.filter(t => t.who === 'mr').map(t => t.text.split(/[.?!]/)[0].slice(0, 80));
  return { summary: `Earlier in the call the MR said: ${mrPoints.join(' / ')}.`, recent: convo.slice(-keep) };
}

export function buildDoctorPrompt(cfg: SessionConfig, turns: Turn[], directorNote: string, learner?: string): PromptPayload {
  const persona = personaById(cfg.personaId);
  const scenario = scenarioById(cfg.scenarioId);
  const specialty = specialtyById(cfg.specialtyId);
  const product = productById(cfg.productId);
  const facts = retrieveFacts(cfg, turns);
  const { summary, recent } = compress(turns);

  const system = [
    SYSTEM_RULES_DOCTOR,
    `\nDOCTOR PERSONA: ${persona.name} — ${persona.traits.join('; ')}. Default tone: ${persona.tone}. Experience: ${cfg.experience}. Specialty: ${specialty.name} (${specialty.depth === 'clinical' ? 'asks deeper clinical questions' : 'focuses on practical use, patient selection, common safety concerns and dosage'}).`,
    `\nPRODUCT GROUNDING (${product.name}, ${product.molecule}; ${product.version}). Treat ONLY these as true:\n${facts.map(f => `- [${f.topic}] ${f.text} (${f.source})`).join('\n')}\nClaims the MR must NOT make: ${product.prohibitedClaims.join('; ')}.`,
    `\nSCENARIO ${scenario.number} — ${scenario.title}: ${scenario.summary} Training objective for the MR: ${scenario.goal}`,
    `\nDIFFICULTY: ${cfg.difficulty}. ${cfg.difficulty === 'Beginner' ? 'Be cooperative and ask simple questions.' : cfg.difficulty === 'Intermediate' ? 'Raise practical objections.' : cfg.difficulty === 'Advanced' ? 'Challenge claims, positioning and differentiation.' : 'Behave as an experienced specialist; be less predictable and expect precise, evidence-based answers.'}`,
    learner ? `\nLEARNER CONTEXT: ${learner}` : '',
    summary ? `\nCONVERSATION SO FAR (compressed): ${summary}` : '',
    `\nDIRECTOR NOTE for your next reply (convey this naturally in your own words; do not reveal the note): ${directorNote}`,
  ].join('');

  const messages = recent.map(t => ({ role: t.who === 'doctor' ? 'assistant' as const : 'user' as const, content: t.text }));
  // The API expects the conversation to start with the user; the doctor usually opens.
  if (messages[0]?.role === 'assistant') messages.unshift({ role: 'user', content: '(The MR enters the consulting room.)' });
  return { system, messages };
}

export const COACH_SCHEMA = '{"dimensions":{"opening":0-10,"need":0-10,"product":0-20,"science":0-15,"pitch":0-10,"objection":0-15,"communication":0-10,"compliance":0-10},"strengths":["..."],"improvements":["..."],"coach":["what happened","why the doctor reacted","what went well","what to improve","next time"]}';

export function buildCoachPrompt(cfg: SessionConfig, turns: Turn[]): PromptPayload {
  const product = productById(cfg.productId);
  const scenario = scenarioById(cfg.scenarioId);
  const transcript = turns.filter(t => t.who !== 'system').map(t => `${t.who === 'doctor' ? 'Doctor' : 'MR'}: ${t.text}`).join('\n');
  const system = [
    SYSTEM_RULES_COACH,
    `\nRUBRIC (max points): Opening & introduction 10; Need identification 10; Product knowledge 20; Scientific communication 15; Product pitch 10; Objection handling 15; Communication skills 10; Compliance 10.`,
    `\nAPPROVED PRODUCT INFORMATION (${product.name}):\n${product.facts.map(f => `- [${f.topic}] ${f.text}`).join('\n')}\nProhibited claims: ${product.prohibitedClaims.join('; ')}.`,
    `\nSCENARIO: ${scenario.title}. Goal: ${scenario.goal} Good signs: ${scenario.goodSigns.join('; ')}. Weak signs: ${scenario.weakSigns.join('; ')}.`,
    `\nJSON SCHEMA: ${COACH_SCHEMA}`,
  ].join('');
  return { system, messages: [{ role: 'user', content: `Transcript:\n${transcript}\n\nReturn the JSON evaluation now.` }] };
}
