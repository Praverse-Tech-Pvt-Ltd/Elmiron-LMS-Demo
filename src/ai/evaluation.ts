/* Role-play evaluation: one place that decides what a role-play attempt means for the learner.

   A role-play counts as PASSED when the AI Coach rates it "Good performance": a rubric total of 75 or
   more with no critical compliance error (the same rule the coach's result already uses). Strengths and
   scope of improvement across many sessions are drawn from the rubric dimensions, so every statement
   traces back to scores, never to an opinion. */

import { RUBRIC } from './types';
import type { DimensionId, RolePlayOrigin, SessionRecord } from './types';

export const ROLEPLAY_PASS_MARK = 75;

export const passed = (s: SessionRecord): boolean =>
  s.feedback.critical.length === 0 && s.feedback.total >= ROLEPLAY_PASS_MARK;

/** Every evaluated attempt of one lesson or case role-play, newest first. */
export const attemptsOf = (sessions: SessionRecord[], kind: RolePlayOrigin['kind'], id: string): SessionRecord[] =>
  sessions
    .filter(s => s.config.origin?.kind === kind && s.config.origin.id === id)
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt));

export interface RolePlayStatus {
  attempts: number;
  latest: SessionRecord | null;
  best: SessionRecord | null;
  passed: boolean;
}

export const statusOf = (sessions: SessionRecord[], kind: RolePlayOrigin['kind'], id: string): RolePlayStatus => {
  const list = attemptsOf(sessions, kind, id);
  const best = list.reduce<SessionRecord | null>((b, s) => (b === null || s.feedback.total > b.feedback.total ? s : b), null);
  return { attempts: list.length, latest: list[0] ?? null, best, passed: list.some(passed) };
};

export interface DimensionAverage {
  id: DimensionId;
  name: string;
  pct: number;
  sessions: number;
}

/** Average percentage per rubric dimension across sessions, strongest first. */
export const dimensionAverages = (sessions: SessionRecord[]): DimensionAverage[] => {
  if (sessions.length === 0) return [];
  return RUBRIC.map(r => {
    const scores = sessions
      .map(s => s.feedback.dimensions.find(d => d.id === r.id))
      .filter((d): d is NonNullable<typeof d> => d !== undefined && d.max > 0);
    const pct = scores.length === 0 ? 0 : Math.round((scores.reduce((a, d) => a + d.score / d.max, 0) / scores.length) * 100);
    return { id: r.id, name: r.name, pct, sessions: scores.length };
  })
    .filter(d => d.sessions > 0)
    .sort((a, b) => b.pct - a.pct);
};

/** The most repeated coaching lines, so a pattern across role-plays is named once with its count. */
export const recurring = (lines: string[], limit = 4): { text: string; count: number }[] => {
  const counts = new Map<string, number>();
  for (const line of lines) counts.set(line, (counts.get(line) ?? 0) + 1);
  return [...counts.entries()]
    .map(([text, count]) => ({ text, count }))
    .sort((a, b) => b.count - a.count || a.text.localeCompare(b.text))
    .slice(0, limit);
};

export interface Overview {
  sessions: number;
  passed: number;
  average: number;
  strengths: DimensionAverage[];
  scope: DimensionAverage[];
  strengthLines: { text: string; count: number }[];
  scopeLines: { text: string; count: number }[];
  criticalSessions: number;
}

/** Split dimension averages (strongest first) into strengths (70% and above) and scope of improvement
    (below 70%, weakest first), up to three each, always naming at least one of each. */
export const splitAreas = (dims: DimensionAverage[]): { strengths: DimensionAverage[]; scope: DimensionAverage[] } => {
  if (dims.length === 0) return { strengths: [], scope: [] };
  const strengths = dims.filter(d => d.pct >= 70).slice(0, 3);
  const scope = [...dims].reverse().filter(d => d.pct < 70).slice(0, 3);
  return {
    strengths: strengths.length > 0 ? strengths : dims.slice(0, 1),
    scope: scope.length > 0 ? scope : dims.slice(-1),
  };
};

/** Dimension averages from per-attempt percentages (seeded history and live sessions alike). */
export const averagesFromPercents = (points: { dims: Partial<Record<DimensionId, number>> }[]): DimensionAverage[] =>
  RUBRIC.map(r => {
    const vals = points.map(p => p.dims[r.id]).filter((v): v is number => typeof v === 'number');
    return { id: r.id, name: r.name, pct: vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0, sessions: vals.length };
  })
    .filter(d => d.sessions > 0)
    .sort((a, b) => b.pct - a.pct);

/** Strengths and scope of improvement across every evaluated role-play. */
export const overview = (sessions: SessionRecord[]): Overview => {
  const { strengths, scope } = splitAreas(dimensionAverages(sessions));
  return {
    sessions: sessions.length,
    passed: sessions.filter(passed).length,
    average: sessions.length === 0 ? 0 : Math.round(sessions.reduce((a, s) => a + s.feedback.total, 0) / sessions.length),
    strengths,
    scope,
    strengthLines: recurring(sessions.flatMap(s => s.feedback.strengths)),
    scopeLines: recurring(sessions.flatMap(s => s.feedback.improvements)),
    criticalSessions: sessions.filter(s => s.feedback.critical.length > 0).length,
  };
};
