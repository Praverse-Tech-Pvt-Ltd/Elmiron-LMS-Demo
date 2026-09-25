/* Local persistence for the demo: admin configuration, practice sessions and AI usage.
   In production these live in the LMS database; the shapes match brief §29 (tracked fields). */

import { useSyncExternalStore } from 'react';
import type { CriticalId, DimensionId, SessionRecord } from './types';

export interface AdminConfig {
  criticalEnabled: Record<CriticalId, boolean>;
  /** Manager access to transcripts (brief §31). */
  transcriptAccess: 'none' | 'flagged' | 'all';
  engine: 'auto' | 'built-in';
  model: string;
  maxOutputTokens: number;
  maxTurns: number;
  /** USD per million tokens, for the cost estimate (brief §34). */
  priceIn: number;
  priceOut: number;
  certification: { minKnowledgeScore: number; minPracticeSessions: number; requireAssessmentPass: boolean; noCritical: boolean };
  prohibitedExtra: string[];
}

export const DEFAULT_CONFIG: AdminConfig = {
  criticalEnabled: { offlabel: true, fabricated: true, superiority: true, 'ignored-ae': true, inducement: true },
  transcriptAccess: 'flagged',
  engine: 'auto',
  model: 'claude-sonnet-5',
  maxOutputTokens: 320,
  maxTurns: 12,
  priceIn: 3,
  priceOut: 15,
  certification: { minKnowledgeScore: 80, minPracticeSessions: 3, requireAssessmentPass: true, noCritical: true },
  prohibitedExtra: [],
};

export interface UsageEntry { at: string; kind: 'doctor' | 'coach'; inputTokens: number; outputTokens: number; ms: number; ok: boolean; model: string }

const K = { config: 'elmiron.ai.config.v1', sessions: 'elmiron.ai.sessions.v2', usage: 'elmiron.ai.usage.v2' };

function read<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
}
function write(key: string, v: unknown) {
  try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage unavailable: keep in memory only */ }
}

/* A tiny external store so every screen sees updates immediately. */
type Snap = { config: AdminConfig; sessions: SessionRecord[]; usage: UsageEntry[] };
let snap: Snap = {
  config: { ...DEFAULT_CONFIG, ...read<Partial<AdminConfig>>(K.config, {}) },
  sessions: read<SessionRecord[]>(K.sessions, []),
  usage: read<UsageEntry[]>(K.usage, []),
};
const listeners = new Set<() => void>();
const emit = () => listeners.forEach(l => l());
const subscribe = (l: () => void) => { listeners.add(l); return () => listeners.delete(l); };

export function useAiStore(): Snap { return useSyncExternalStore(subscribe, () => snap); }
export const getAiStore = () => snap;

export function updateConfig(patch: Partial<AdminConfig>) {
  snap = { ...snap, config: { ...snap.config, ...patch } }; write(K.config, snap.config); emit();
}
export function resetConfig() { snap = { ...snap, config: DEFAULT_CONFIG }; write(K.config, DEFAULT_CONFIG); emit(); }

export function saveSession(rec: SessionRecord) {
  snap = { ...snap, sessions: [rec, ...snap.sessions].slice(0, 60) }; write(K.sessions, snap.sessions); emit();
}
export function clearSessions() { snap = { ...snap, sessions: [] }; write(K.sessions, []); emit(); }

export function logUsage(e: UsageEntry) {
  snap = { ...snap, usage: [e, ...snap.usage].slice(0, 500) }; write(K.usage, snap.usage); emit();
}

/* ---------- seeded history so trends and dashboards have shape (brief §32) ---------- */

export interface HistoryPoint { attempt: number; date: string; scenario: string; total: number; dims: Partial<Record<DimensionId, number>>; mode: 'practice' | 'assessment'; critical: boolean }

/** Pratham Shrivastav's earlier sessions, before today's live ones. Percent scores per dimension. */
export const SEEDED_HISTORY: HistoryPoint[] = [
  { attempt: 1, date: '02 Sep 2026', scenario: 'First meeting', total: 61, mode: 'practice', critical: false, dims: { opening: 70, need: 40, product: 65, science: 53, pitch: 60, objection: 47, communication: 70, compliance: 90 } },
  { attempt: 2, date: '09 Sep 2026', scenario: 'Product objection', total: 69, mode: 'practice', critical: false, dims: { opening: 80, need: 60, product: 75, science: 60, pitch: 70, objection: 53, communication: 70, compliance: 100 } },
  { attempt: 3, date: '16 Sep 2026', scenario: 'Competitor preference', total: 78, mode: 'practice', critical: false, dims: { opening: 90, need: 70, product: 80, science: 67, pitch: 80, objection: 73, communication: 80, compliance: 100 } },
  { attempt: 4, date: '22 Sep 2026', scenario: 'Scientific discussion', total: 86, mode: 'assessment', critical: false, dims: { opening: 90, need: 80, product: 90, science: 80, pitch: 90, objection: 80, communication: 90, compliance: 100 } },
];

/** Team roll-up for the manager dashboard (brief §31). Pratham's live sessions are merged in at runtime. */
export const TEAM_PRACTICE = [
  { id: 'rm', name: 'Pratham Shrivastav', territory: 'South Mumbai', sessions: 4, avg: 74, latest: 86, trend: [61, 69, 78, 86], product: 90, objection: 80, communication: 90, compliance: 100, criticals: 0, cert: 'In progress · 3 of 5 met' },
  { id: 'ps', name: 'Priya Sethi', territory: 'Thane', sessions: 6, avg: 71, latest: 76, trend: [58, 66, 70, 72, 74, 76], product: 80, objection: 67, communication: 80, compliance: 100, criticals: 0, cert: 'In progress · 4 of 5 met' },
  { id: 'iq', name: 'Imran Qureshi', territory: 'Navi Mumbai', sessions: 2, avg: 55, latest: 58, trend: [52, 58], product: 60, objection: 47, communication: 70, compliance: 60, criticals: 1, cert: 'Requires retraining' },
  { id: 'ar', name: 'Anita Rane', territory: 'Dadar', sessions: 5, avg: 81, latest: 88, trend: [72, 77, 80, 84, 88], product: 95, objection: 87, communication: 90, compliance: 100, criticals: 0, cert: 'Elmiron Product Certified' },
  { id: 'sk', name: 'S. Kamble', territory: 'Andheri East', sessions: 3, avg: 77, latest: 79, trend: [74, 78, 79], product: 85, objection: 73, communication: 80, compliance: 100, criticals: 0, cert: 'In progress · 3 of 5 met' },
];

/** Organisation-level analytics for the admin (brief §39–40). */
export const ORG_ANALYTICS = {
  sessions: 1284, avg: 74, criticalFailures: 23, improvement: '+14 pts after 3 sessions',
  byScenario: [
    { name: 'First meeting', sessions: 312, avg: 79, fail: 4 },
    { name: '60-second detailing', sessions: 246, avg: 71, fail: 11 },
    { name: 'Competitor preference', sessions: 188, avg: 68, fail: 16 },
    { name: 'Price objection', sessions: 151, avg: 70, fail: 9 },
    { name: 'Scientific discussion', sessions: 122, avg: 66, fail: 14 },
    { name: 'Adverse event mention', sessions: 140, avg: 76, fail: 21 },
    { name: 'Off-label question', sessions: 125, avg: 73, fail: 18 },
  ],
  byRegion: [
    { name: 'West', avg: 76 }, { name: 'South', avg: 74 }, { name: 'Central', avg: 72 }, { name: 'North', avg: 73 }, { name: 'East', avg: 70 },
  ],
  commonMistakes: [
    'Pitching before asking any question about the doctor’s patients',
    'Quoting efficacy figures from memory instead of the approved reference',
    'Moving on after a doctor mentions a patient reaction',
    'Answering off-label questions instead of referring them',
    'Opening turns over 80 words with a busy doctor',
  ],
  frequentQuestions: [
    'What monitoring does the label require?',
    'How long before I should reassess response?',
    'Any bleeding concerns with anticoagulants?',
    'Why should I change what I already prescribe?',
  ],
  complianceFlags: [
    { flag: 'Unsupported superiority claim', count: 9 },
    { flag: 'Ignored adverse event', count: 6 },
    { flag: 'Off-label promotion', count: 5 },
    { flag: 'Fabricated statistic', count: 3 },
  ],
  hardestAreas: ['Retinal warning and monitoring', 'Evidence and study design', 'Competitor comparisons'],
};
