import { SCENARIOS, personaById, scenarioById } from './content';
import { SEEDED_HISTORY, getAiStore } from './store';
import type { DimensionId, ScenarioId, SessionConfig, SessionRecord } from './types';

const KEY = 'elmiron.ai.pending';

export const DEFAULT_SESSION: SessionConfig = {
  productId: 'elmiron', specialtyId: 'urology', personaId: 'skeptical', scenarioId: 'competitor-preference',
  difficulty: 'Advanced', experience: 'Established consultant', mode: 'practice', channel: 'text', seconds: 300,
};

/** Config handed from the setup screen to the live session (survives a reload). */
export function setPendingConfig(c: SessionConfig) { try { sessionStorage.setItem(KEY, JSON.stringify(c)); } catch { /* ignore */ } }
export function getPendingConfig(): SessionConfig {
  try { const v = sessionStorage.getItem(KEY); if (v) return { ...DEFAULT_SESSION, ...JSON.parse(v) }; } catch { /* ignore */ }
  return DEFAULT_SESSION;
}

/** Preset for a scenario (used by quick links, role-play lessons and "next scenario"). */
export function presetFor(scenarioId: ScenarioId, patch: Partial<SessionConfig> = {}): SessionConfig {
  const sc = scenarioById(scenarioId);
  return { ...DEFAULT_SESSION, scenarioId, personaId: sc.defaultPersona, seconds: sc.seconds, difficulty: 'Intermediate', ...patch };
}

export const attemptsFor = (scenarioId: ScenarioId, mode: 'practice' | 'assessment') =>
  getAiStore().sessions.filter(s => s.config.scenarioId === scenarioId && s.config.mode === mode).length;

export const ASSESSMENT_ATTEMPTS = 3;

export function fmtTime(sec: number) { const s = Math.max(0, Math.round(sec)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }
export function fmtLimit(sec: number) { return sec < 60 ? `${sec} seconds` : `${Math.round(sec / 60)} minute${sec >= 120 ? 's' : ''}`; }

export function describe(c: SessionConfig) {
  return { persona: personaById(c.personaId).name.replace(/ doctor$/i, ''), scenario: scenarioById(c.scenarioId).title };
}

/** Trend points: seeded history followed by live sessions (oldest first). */
export function trend(sessions: SessionRecord[]) {
  const live = [...sessions].reverse();
  return [
    ...SEEDED_HISTORY.map(h => ({ label: `#${h.attempt}`, total: h.total, date: h.date, scenario: h.scenario, mode: h.mode, critical: h.critical, dims: h.dims, id: '' })),
    ...live.map((s, i) => ({
      label: `#${SEEDED_HISTORY.length + i + 1}`, total: s.feedback.total, date: new Date(s.startedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      scenario: scenarioById(s.config.scenarioId).title, mode: s.config.mode, critical: s.feedback.critical.length > 0,
      dims: Object.fromEntries(s.feedback.dimensions.map(d => [d.id, Math.round((d.score / d.max) * 100)])) as Partial<Record<DimensionId, number>>, id: s.id,
    })),
  ];
}

/** Elmiron Product Certified rule check (brief §30), configurable by the admin. */
export function certificationStatus(sessions: SessionRecord[], knowledgeScore: number, productCourseDone: boolean) {
  const rule = getAiStore().config.certification;
  const practice = SEEDED_HISTORY.filter(h => h.mode === 'practice').length + sessions.filter(s => s.config.mode === 'practice').length;
  const passedAssessment = SEEDED_HISTORY.some(h => h.mode === 'assessment' && h.total >= 75 && !h.critical) || sessions.some(s => s.config.mode === 'assessment' && s.feedback.result === 'Good performance');
  const critical = sessions.some(s => s.feedback.critical.length > 0);
  const items = [
    { label: 'Complete the product course', ok: productCourseDone },
    { label: `Score ≥${rule.minKnowledgeScore}% on the knowledge test`, ok: knowledgeScore >= rule.minKnowledgeScore, detail: `${knowledgeScore}%` },
    { label: `Complete at least ${rule.minPracticeSessions} AI Doctor practice sessions`, ok: practice >= rule.minPracticeSessions, detail: `${practice} done` },
    ...(rule.requireAssessmentPass ? [{ label: 'Pass one AI Doctor formal assessment', ok: passedAssessment }] : []),
    ...(rule.noCritical ? [{ label: 'No critical compliance failure', ok: !critical }] : []),
  ];
  return { items, met: items.filter(i => i.ok).length, total: items.length, certified: items.every(i => i.ok) };
}

export const SCENARIO_GROUPS: { id: 'quick' | 'core' | 'objection' | 'scientific' | 'compliance'; name: string }[] = [
  { id: 'quick', name: 'Quick' }, { id: 'core', name: 'Core calls' }, { id: 'objection', name: 'Objections' },
  { id: 'scientific', name: 'Scientific' }, { id: 'compliance', name: 'Compliance' },
];
export const scenariosIn = (g: string) => SCENARIOS.filter(s => s.group === g);
