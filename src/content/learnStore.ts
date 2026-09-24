/* Learner progress and admin-authored content, persisted locally for the demo.
   In production this is the LMS database; the shapes are what the screens need. */

import { useSyncExternalStore } from 'react';
import type { Course } from './types';

export interface Assignment {
  id: string;
  courseId: string;
  lessonId: string;
  title: string;
  learner: string;
  text: string;
  submittedAt: string;
  review?: { score: number; comment: string; by: string; at: string };
}

export interface PathAssignment { pathId: string; audience: string; due: string; assignedAt: string; learners: number }

interface Snap {
  done: Record<string, string[]>;           // courseId -> completed lesson ids
  answers: Record<string, number>;          // question key -> chosen choice index
  finals: Record<string, { score: number; passed: boolean; at: string; attempts: number }>;
  assignments: Assignment[];
  customCourses: Course[];
  pathAssignments: PathAssignment[];
  market: string;                           // learner's market for course versions
  seeded: boolean;
}

const KEY = 'elmiron.learn.v1';
const empty: Snap = { done: {}, answers: {}, finals: {}, assignments: [], customCourses: [], pathAssignments: [], market: 'IN', seeded: false };

function load(): Snap {
  try { const v = localStorage.getItem(KEY); return v ? { ...empty, ...JSON.parse(v) } : empty; } catch { return empty; }
}
let snap: Snap = load();
const listeners = new Set<() => void>();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(snap)); } catch { /* memory only */ } listeners.forEach(l => l()); };
const set = (patch: Partial<Snap>) => { snap = { ...snap, ...patch }; save(); };

export const useLearn = () => useSyncExternalStore(cb => { listeners.add(cb); return () => listeners.delete(cb); }, () => snap);
export const getLearn = () => snap;

/** Rahul's progress before today (matches the design's statuses and brief §56). */
export const SEED_PROGRESS: Record<string, number> = {
  'mr-induction': 100, 'doctor-cabin': 100, 'pharma-industry': 100, 'communication-skills': 100,
  'elmiron-product': 45, 'elmiron-masterclass': 70, 'product-detailing': 40, 'ucpmp-2024': 30,
  'call-planning': 60, 'doctor-engagement': 100, 'ethical-marketing': 100, 'territory-management': 25,
};
export const SEED_FINALS: Record<string, { score: number; passed: boolean; at: string; attempts: number }> = {
  'mr-induction': { score: 88, passed: true, at: '2025-11-20', attempts: 1 },
  'doctor-cabin': { score: 92, passed: true, at: '2026-08-14', attempts: 1 },
  'pharma-industry': { score: 84, passed: true, at: '2026-07-02', attempts: 1 },
  'doctor-engagement': { score: 81, passed: true, at: '2026-08-28', attempts: 2 },
  'ethical-marketing': { score: 100, passed: true, at: '2026-06-11', attempts: 1 },
  'communication-skills': { score: 86, passed: true, at: '2026-05-19', attempts: 1 },
  'sample-sop': { score: 64, passed: false, at: '2026-09-18', attempts: 1 },
};

export function seedIfNeeded(courses: Course[]) {
  if (snap.seeded) return;
  const done: Record<string, string[]> = {};
  for (const c of courses) {
    const pct = SEED_PROGRESS[c.id];
    if (!pct) continue;
    const ids = c.modules.flatMap(m => m.lessons.map(l => l.id));
    done[c.id] = ids.slice(0, Math.round(ids.length * pct / 100));
  }
  const assignments: Assignment[] = [
    { id: 'as-seed-1', courseId: 'product-detailing', lessonId: '', title: 'Prepare a 60-second product pitch', learner: 'Priya Sethi', text: 'Doctor, for your patients with bladder pain associated with interstitial cystitis, Elmiron is indicated for relief of pain or discomfort. The recommended dose is 100 mg three times daily and patients are reassessed at 3 months. May I leave the approved dosing summary?', submittedAt: '2026-09-23T17:40:00' },
    { id: 'as-seed-2', courseId: 'territory-management', lessonId: '', title: 'Create a weekly territory plan', learner: 'Imran Qureshi', text: 'Mon: Vashi hospital cluster (6 calls). Tue: Nerul clinics (8 calls) + 2 stockists. Wed: follow-ups from last week, pharmacy mapping. Thu: Kharghar (7 calls). Fri: admin, reporting, planning next week.', submittedAt: '2026-09-22T19:05:00' },
    { id: 'as-seed-3', courseId: 'objection-handling', lessonId: '', title: 'Explain how you would respond to this objection', learner: 'Anita Rane', text: 'Listen fully, then clarify what they mean by "no difference". Respond with the label guidance on reassessment at 3 months, offer the approved reference, and check whether that addresses the concern. If they ask for data I do not have, refer to Medical Information.', submittedAt: '2026-09-21T12:10:00', review: { score: 4, comment: 'Clear structure and correct escalation. Add a clarifying question example.', by: 'R. Deshpande', at: '2026-09-22T09:00:00' } },
  ];
  snap = { ...snap, done, finals: { ...SEED_FINALS, ...snap.finals }, assignments: [...assignments, ...snap.assignments], seeded: true };
  save();
}

export function markDone(courseId: string, lessonId: string, on = true) {
  const cur = new Set(snap.done[courseId] || []);
  if (on) cur.add(lessonId); else cur.delete(lessonId);
  set({ done: { ...snap.done, [courseId]: [...cur] } });
}
export const answer = (key: string, idx: number) => set({ answers: { ...snap.answers, [key]: idx } });
export const resetAnswer = (key: string) => { const a = { ...snap.answers }; delete a[key]; set({ answers: a }); };
export function recordFinal(courseId: string, score: number, passMark: number) {
  const prev = snap.finals[courseId];
  set({ finals: { ...snap.finals, [courseId]: { score, passed: score >= passMark, at: new Date().toISOString().slice(0, 10), attempts: (prev?.attempts || 0) + 1 } } });
}
export function submitAssignment(a: Omit<Assignment, 'id' | 'submittedAt'>) {
  set({ assignments: [{ ...a, id: 'as-' + Date.now(), submittedAt: new Date().toISOString() }, ...snap.assignments] });
}
export function reviewAssignment(id: string, score: number, comment: string) {
  set({ assignments: snap.assignments.map(a => (a.id === id ? { ...a, review: { score, comment, by: 'R. Deshpande', at: new Date().toISOString() } } : a)) });
}
export const addCourse = (c: Course) => set({ customCourses: [c, ...snap.customCourses.filter(x => x.id !== c.id)] });
export const removeCourse = (id: string) => set({ customCourses: snap.customCourses.filter(c => c.id !== id) });
export const assignPath = (p: PathAssignment) => set({ pathAssignments: [p, ...snap.pathAssignments] });
export const setMarket = (market: string) => set({ market });
export function resetLearn() { snap = empty; save(); }
