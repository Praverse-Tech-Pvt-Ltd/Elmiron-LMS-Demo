/* AI Doctor practice simulator: content and session model.
   Personas, scenarios, specialties, product packs and rules are data,
   so an admin can add more without new application code. */

export type PersonaId =
  | 'friendly' | 'busy' | 'skeptical' | 'specialist' | 'new' | 'competitor' | 'price' | 'evidence' | 'difficult';

export type Tone = 'Interested' | 'Neutral' | 'Skeptical' | 'Impatient' | 'Concerned' | 'Curious';

export interface Persona {
  id: PersonaId;
  name: string;
  traits: string[];
  tone: Tone;
  /** Words per MR turn before this doctor starts to lose patience. */
  wordBudget: number;
  /** How many weak or overlong turns before the doctor ends the call. */
  patience: number;
  /** 0–1: how readily the doctor challenges claims. */
  challenge: number;
  greetings: string[];
  acknowledgements: string[];
  interruptions: string[];
  closings: string[];
}

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type Experience = 'Junior doctor' | 'Established consultant' | 'Senior specialist' | 'KOL-style scientific';

export interface Specialty {
  id: string;
  name: string;
  /** Questions this specialty tends to ask (clinically sensible, never invented to be hard). */
  questions: string[];
  depth: 'practical' | 'clinical';
}

export type ScenarioId =
  | 'first-meeting' | 'sixty-second' | 'efficacy-objection' | 'safety-question' | 'competitor-preference'
  | 'price-objection' | 'scientific-discussion' | 'not-interested' | 'follow-up' | 'product-recall'
  | 'outside-knowledge' | 'off-label' | 'adverse-event' | 'product-complaint';

/** A doctor move the scenario injects at a given MR turn. */
export interface ScenarioBeat {
  atTurn: number;
  /** What kind of event this is; drives scoring. */
  event: 'objection' | 'question' | 'safety' | 'complaint' | 'offlabel' | 'outside' | 'dismissal' | 'recall';
  lines: string[];
  /** Objection category for objection events. */
  category?: 'Efficacy' | 'Safety' | 'Price' | 'Availability' | 'Experience' | 'Competitor preference' | 'Evidence' | 'Patient suitability';
}

export interface Scenario {
  id: ScenarioId;
  number: number;
  title: string;
  summary: string;
  goal: string;
  defaultPersona: PersonaId;
  /** Suggested time limit in seconds (30 elevator, 60 busy, 180 standard, 300–600 scientific). */
  seconds: number;
  opening: string[];
  beats: ScenarioBeat[];
  /** What a strong performance looks like, used by the coach and benchmarks. */
  goodSigns: string[];
  weakSigns: string[];
  critical: CriticalId[];
  hints: string[];
  recommend: string[]; // course ids
  group: 'quick' | 'objection' | 'scientific' | 'compliance' | 'core';
}

export interface ApprovedFact {
  id: string;
  topic: 'Indication' | 'Dosage' | 'Administration' | 'Mechanism' | 'Warnings' | 'Adverse effects' | 'Contraindications' | 'Interactions' | 'Monitoring';
  text: string;
  /** Words that show the MR has covered this fact. */
  keywords: string[];
  source: string;
}

export interface ProductPack {
  id: string;
  name: string;
  molecule: string;
  therapyArea: string;
  version: string;
  status: 'Demo grounding: verify against the current approved PI' | 'Approved';
  specialties: string[];
  facts: ApprovedFact[];
  approvedClaims: string[];
  prohibitedClaims: string[];
  objections: { category: string; line: string; responsePoints: string[] }[];
  faqs: { q: string; a: string }[];
  references: string[];
}

export type CriticalId = 'offlabel' | 'fabricated' | 'superiority' | 'ignored-ae' | 'inducement';
export const CRITICAL_NAMES: Record<CriticalId, string> = {
  offlabel: 'Off-label promotion',
  fabricated: 'Fabricating evidence or statistics',
  superiority: 'Unsupported superiority claim',
  'ignored-ae': 'Ignoring an adverse-event report',
  inducement: 'Encouraging or offering an improper inducement',
};

export type DimensionId = 'opening' | 'need' | 'product' | 'science' | 'pitch' | 'objection' | 'communication' | 'compliance';
export const RUBRIC: { id: DimensionId; name: string; weight: number; checks: string[] }[] = [
  { id: 'opening', name: 'Opening & introduction', weight: 10, checks: ['Professional greeting', 'Introduction', 'Clear purpose'] },
  { id: 'need', name: 'Need identification', weight: 10, checks: ['Asked appropriate questions', 'Listened', 'Understood doctor concerns'] },
  { id: 'product', name: 'Product knowledge', weight: 20, checks: ['Accurate product information', 'Appropriate indication', 'Correct approved information'] },
  { id: 'science', name: 'Scientific communication', weight: 15, checks: ['Evidence-based communication', 'Clear explanation', 'No exaggeration'] },
  { id: 'pitch', name: 'Product pitch', weight: 10, checks: ['Relevant', 'Concise', 'Structured'] },
  { id: 'objection', name: 'Objection handling', weight: 15, checks: ['Listened', 'Clarified', 'Responded correctly', 'Confirmed response'] },
  { id: 'communication', name: 'Communication skills', weight: 10, checks: ['Clarity', 'Confidence', 'Conciseness', 'Professional tone'] },
  { id: 'compliance', name: 'Compliance', weight: 10, checks: ['No unsupported claims', 'No off-label promotion', 'Correct safety escalation', 'Ethical interaction'] },
];

export type Mode = 'practice' | 'assessment';
export type Channel = 'text' | 'voice' | 'hybrid';

export interface SessionConfig {
  productId: string;
  specialtyId: string;
  personaId: PersonaId;
  scenarioId: ScenarioId;
  difficulty: Difficulty;
  experience: Experience;
  mode: Mode;
  channel: Channel;
  seconds: number;
}

export type Tag = 'strong' | 'missed' | 'compliance' | 'excellent-objection' | 'redacted';

export interface Turn {
  who: 'doctor' | 'mr' | 'system';
  text: string;
  at: number; // seconds from start
  tags?: Tag[];
  note?: string;
  tone?: Tone;
}

export interface DimensionScore { id: DimensionId; score: number; max: number; notes: string[] }

export type Result = 'Good performance' | 'Needs improvement' | 'Requires retraining';

export interface Feedback {
  total: number;
  result: Result;
  dimensions: DimensionScore[];
  critical: CriticalId[];
  strengths: string[];
  improvements: string[];
  betterResponses: { situation: string; principle: string; example: string }[];
  coach: string[];
  recommended: { courseId: string; label: string; minutes: number }[];
  nextScenario: ScenarioId;
}

export interface SessionRecord {
  id: string;
  user: string;
  config: SessionConfig;
  startedAt: string;
  durationSec: number;
  attempt: number;
  turns: Turn[];
  feedback: Feedback;
  engine: 'built-in' | 'claude';
  usage?: { inputTokens: number; outputTokens: number; calls: number };
}
