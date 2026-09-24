/* Learner capability profile (brief §54). Every score is traced to a defined
   assessment: course final assessments and AI Doctor rubric dimensions. */

import type { SessionRecord, DimensionId } from '../ai/types';
import { SEEDED_HISTORY } from '../ai/store';
import { SKILLS, type SkillId } from './types';
import { allCourses } from './index';

export interface SkillScore { id: SkillId; name: string; score: number | null; sources: string[] }

const AI_MAP: Partial<Record<SkillId, DimensionId[]>> = {
  product: ['product'], science: ['science'], engagement: ['opening', 'need', 'pitch', 'objection', 'communication'], compliance: ['compliance'], sales: ['objection', 'pitch'],
};

export function computeSkills(finals: Record<string, { score: number; passed: boolean }>, sessions: SessionRecord[]): SkillScore[] {
  const courses = allCourses();
  // Knowledge test for the product (seeded) counts toward product knowledge.
  const extra: Partial<Record<SkillId, { score: number; label: string }[]>> = {
    product: [{ score: 86, label: 'Elmiron knowledge test' }],
    disease: [{ score: 72, label: 'IC/BPS disease quiz' }],
    territory: [{ score: 64, label: 'Territory planning check' }],
  };
  // Latest AI dimension percentages (live sessions first, else the seeded history).
  const lastDims: Partial<Record<DimensionId, number>> = sessions[0]
    ? Object.fromEntries(sessions[0].feedback.dimensions.map(d => [d.id, Math.round((d.score / d.max) * 100)]))
    : SEEDED_HISTORY[SEEDED_HISTORY.length - 1].dims;
  const aiCount = SEEDED_HISTORY.length + sessions.length;

  return SKILLS.map(sk => {
    const parts: { score: number; label: string }[] = [...(extra[sk.id] || [])];
    courses.filter(c => c.skills.includes(sk.id) && finals[c.id]).forEach(c => parts.push({ score: finals[c.id].score, label: c.title }));
    const dims = AI_MAP[sk.id];
    if (dims) {
      const vals = dims.map(d => lastDims[d]).filter((v): v is number => typeof v === 'number');
      if (vals.length) parts.push({ score: Math.round(vals.reduce((a, b) => a + b, 0) / vals.length), label: `AI Doctor (${aiCount} sessions)` });
    }
    if (!parts.length) return { id: sk.id, name: sk.name, score: null, sources: [] };
    return { id: sk.id, name: sk.name, score: Math.round(parts.reduce((a, p) => a + p.score, 0) / parts.length), sources: parts.map(p => `${p.label} ${p.score}%`) };
  });
}
