import { describe, expect, it } from 'vitest';
import { attemptsOf, averagesFromPercents, overview, passed, recurring, splitAreas, statusOf } from '../evaluation';
import { RUBRIC, type CriticalId, type SessionRecord } from '../types';

const rec = (id: string, total: number, opts: { at?: string; critical?: CriticalId[]; origin?: SessionRecord['config']['origin']; low?: string; strengths?: string[]; improvements?: string[] } = {}): SessionRecord => ({
  id,
  user: 'MR',
  config: { productId: 'elmiron', specialtyId: 'urology', personaId: 'busy', scenarioId: 'first-meeting', difficulty: 'Beginner', experience: 'Junior doctor', mode: 'practice', channel: 'text', seconds: 180, origin: opts.origin },
  startedAt: opts.at ?? '2026-11-01T10:00:00.000Z',
  durationSec: 120,
  attempt: 1,
  turns: [],
  engine: 'built-in',
  feedback: {
    total,
    result: opts.critical?.length ? 'Requires retraining' : total >= 75 ? 'Good performance' : 'Needs improvement',
    dimensions: RUBRIC.map(r => ({ id: r.id, score: r.id === opts.low ? 0 : r.weight, max: r.weight, notes: [] })),
    critical: opts.critical ?? [],
    strengths: opts.strengths ?? [],
    improvements: opts.improvements ?? [],
    betterResponses: [], coach: [], recommended: [], nextScenario: 'follow-up',
  },
});

const lesson = { kind: 'lesson' as const, id: 'l1', courseId: 'c1', title: 'Lesson 1' };

describe('role-play evaluation', () => {
  it('passes at 75 or more only without a critical error', () => {
    expect(passed(rec('a', 75))).toBe(true);
    expect(passed(rec('b', 74))).toBe(false);
    expect(passed(rec('c', 90, { critical: ['offlabel'] }))).toBe(false);
  });

  it('tracks attempts per lesson, newest first, with best score and pass state', () => {
    const list = [
      rec('old', 60, { origin: lesson, at: '2026-11-01T10:00:00.000Z' }),
      rec('new', 80, { origin: lesson, at: '2026-11-02T10:00:00.000Z' }),
      rec('other', 95, { origin: { ...lesson, id: 'l2' } }),
      rec('free', 99),
    ];
    expect(attemptsOf(list, 'lesson', 'l1').map(s => s.id)).toEqual(['new', 'old']);
    const st = statusOf(list, 'lesson', 'l1');
    expect(st).toMatchObject({ attempts: 2, passed: true });
    expect(st.latest?.id).toBe('new');
    expect(st.best?.feedback.total).toBe(80);
    expect(statusOf(list, 'case', 'l1').attempts).toBe(0);
  });

  it('names the weakest dimension as scope of improvement and counts recurring coaching lines', () => {
    const ov = overview([
      rec('a', 70, { low: 'need', strengths: ['Clear opening'], improvements: ['Ask about patients'] }),
      rec('b', 72, { low: 'need', strengths: ['Clear opening'], improvements: ['Ask about patients', 'Cite sources'] }),
    ]);
    expect(ov.scope[0].id).toBe('need');
    expect(ov.scope[0].pct).toBe(0);
    expect(ov.strengths.every(d => d.pct >= 70)).toBe(true);
    expect(ov.scopeLines[0]).toEqual({ text: 'Ask about patients', count: 2 });
    expect(ov.strengthLines[0]).toEqual({ text: 'Clear opening', count: 2 });
    expect(ov.passed).toBe(0);
  });

  it('always names one strength and one scope area even when all scores are on one side', () => {
    const allHigh = averagesFromPercents([{ dims: { opening: 90, need: 80, product: 95 } }]);
    const { strengths, scope } = splitAreas(allHigh);
    expect(strengths.length).toBeGreaterThan(0);
    expect(scope).toHaveLength(1);
    expect(scope[0].id).toBe('need');
    expect(splitAreas([])).toEqual({ strengths: [], scope: [] });
  });

  it('ranks recurring lines by count', () => {
    expect(recurring(['b', 'a', 'b'], 1)).toEqual([{ text: 'b', count: 2 }]);
  });
});
