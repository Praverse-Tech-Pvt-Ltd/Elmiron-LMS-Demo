/* Content model for the capability curriculum.
   Everything the LMS shows is data: an admin can add courses, lessons,
   paths or cases by editing these records, with no screen code changes. */

export type Level = 'Beginner' | 'Intermediate' | 'Advanced' | 'Certification';
export const LEVELS: Level[] = ['Beginner', 'Intermediate', 'Advanced', 'Certification'];

/** Markets a course (or a course version) applies to. 'ALL' = every market. */
export type Market = 'ALL' | 'IN' | 'AE' | 'SA' | 'GCC' | 'UK' | 'EU' | 'US' | 'SEA' | 'AFR' | 'LATAM' | 'AU';
export const MARKET_NAMES: Record<Market, string> = {
  ALL: 'All markets', IN: 'India', AE: 'UAE', SA: 'Saudi Arabia', GCC: 'GCC', UK: 'United Kingdom', EU: 'Europe',
  US: 'United States', SEA: 'Southeast Asia', AFR: 'Africa', LATAM: 'Latin America', AU: 'Australia',
};

export type CategoryId =
  | 'foundation' | 'markets' | 'doctor' | 'selling' | 'science' | 'product' | 'territory'
  | 'channel' | 'digital' | 'professional' | 'intelligence' | 'compliance' | 'leadership' | 'global';

export const CATEGORIES: { id: CategoryId; name: string }[] = [
  { id: 'foundation', name: 'Industry foundation' },
  { id: 'markets', name: 'Markets' },
  { id: 'doctor', name: 'Doctor engagement' },
  { id: 'selling', name: 'Selling skills' },
  { id: 'science', name: 'Scientific communication' },
  { id: 'product', name: 'Product & therapy' },
  { id: 'territory', name: 'Territory & sales' },
  { id: 'channel', name: 'Channel & hospital' },
  { id: 'digital', name: 'Digital engagement' },
  { id: 'professional', name: 'Professional skills' },
  { id: 'intelligence', name: 'Market intelligence' },
  { id: 'compliance', name: 'Compliance' },
  { id: 'leadership', name: 'Leadership' },
  { id: 'global', name: 'International business' },
];

/** Learner capability dimensions. Scores come only from assessments and AI Doctor sessions. */
export type SkillId = 'product' | 'disease' | 'science' | 'engagement' | 'sales' | 'compliance' | 'territory' | 'global';
export const SKILLS: { id: SkillId; name: string }[] = [
  { id: 'product', name: 'Product knowledge' },
  { id: 'disease', name: 'Disease knowledge' },
  { id: 'science', name: 'Scientific communication' },
  { id: 'engagement', name: 'Doctor engagement' },
  { id: 'sales', name: 'Sales skills' },
  { id: 'compliance', name: 'Compliance' },
  { id: 'territory', name: 'Territory management' },
  { id: 'global', name: 'Global business' },
];

export type LessonKind =
  | 'lesson'      // short reading: summary + key points
  | 'video'       // video lesson (placeholder player) + key points
  | 'flow'        // a step sequence, rendered as a diagram (e.g. value chain, call cycle)
  | 'example'     // worked real-world example
  | 'scenario'    // practical situation with a choice and feedback
  | 'roleplay'    // role-play exercise; may link to an AI Doctor scenario
  | 'case'        // longer case study with a choice and feedback
  | 'assignment'; // practical assignment reviewed by a manager

/** One answer option. For scenario/case questions every option carries coaching feedback. */
export interface Choice {
  text: string;
  /** best = the model answer; ok = acceptable; weak = poor; noncompliant = breaks a rule */
  quality: 'best' | 'ok' | 'weak' | 'noncompliant';
  feedback: string;
}

export interface Question {
  prompt: string;
  choices: Choice[];
  /** The principle to learn, shown after answering. Never a script to memorise. */
  principle?: string;
}

export interface Lesson {
  id: string;
  title: string;
  kind: LessonKind;
  minutes: number;
  summary: string;
  points?: string[];
  /** For kind 'flow': ordered steps. */
  flow?: string[];
  example?: { title: string; body: string };
  question?: Question;
  assignment?: { brief: string; deliverable: string; rubric: string[] };
  /** Links a role-play to an AI Doctor scenario id (see src/ai/content.ts). */
  aiScenario?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

/** A market-specific version of a course (different references, rules or examples). */
export interface CourseVersion {
  market: Market;
  label: string;
  note: string;
}

/** Every course follows the same template (brief §50). */
export interface Course {
  id: string;
  title: string;
  category: CategoryId;
  level: Level;
  objective: string;
  audience: string;
  duration: string;
  minutes: number;
  mandatory?: boolean;
  /** e.g. 'Every 12 months' for courses that require recertification */
  recertification?: string;
  markets?: Market[];
  versions?: CourseVersion[];
  modules: Module[];
  takeaways: string[];
  exercise: string;
  knowledgeCheck: Question[];
  finalAssessment: { questions: number; passMark: number; attempts: number };
  certificate?: string;
  skills: SkillId[];
  /** Brief section numbers this course covers, for traceability. */
  covers: number[];
}

export interface LearningPath {
  id: string;
  title: string;
  audience: string;
  summary: string;
  steps: { label: string; courseIds: string[] }[];
  certification: string;
}

export interface CertLevel {
  level: 1 | 2 | 3 | 4;
  title: string;
  covers: string[];
  requirements: string[];
  courseIds: string[];
}

export interface OnboardingWeek {
  week: number;
  title: string;
  focus: string[];
  courseIds: string[];
}

export type MicroKind = 'Selling tip' | 'Doctor objection' | 'Product fact' | 'Clinical study' | 'Communication tip' | 'Compliance tip' | 'Territory tip';
export interface Micro {
  id: string;
  title: string;
  kind: MicroKind;
  minutes: 2 | 5 | 10;
  /** Day it appears in "Learn in 5 minutes" (brief §52). */
  day?: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  body: string;
  points: string[];
  courseId?: string;
}

/** Case-based and role-play practice (brief §39, §41, §47). */
export interface Case {
  id: string;
  title: string;
  kind: 'roleplay' | 'case' | 'market-entry';
  skill: SkillId;
  situation: string;
  question: Question;
  courseId?: string;
}
