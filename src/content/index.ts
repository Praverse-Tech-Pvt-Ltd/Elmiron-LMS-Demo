import { COURSES_A, CASES_A } from './courses-a';
import { COURSES_B, CASES_B, MICRO } from './courses-b';
import { getLearn } from './learnStore';
import type { CertLevel, Course, LearningPath, OnboardingWeek } from './types';

export { MICRO };
export const CASES = [...CASES_A, ...CASES_B];

/** The design's own Elmiron course: it has bespoke screens (A3–A8), so the record only feeds the catalogue. */
const ELMIRON_PRODUCT: Course = {
  id: 'elmiron-product', title: 'Elmiron — Product Training', category: 'product', level: 'Intermediate',
  objective: 'Know the approved product information for Elmiron well enough to discuss it accurately with doctors.',
  audience: 'All MRs promoting Elmiron', duration: '2 h 40 min', minutes: 160, mandatory: true, markets: ['IN'],
  modules: [
    { id: 'ep-m1', title: 'Module 1 · Product overview', lessons: [{ id: 'ep-1', title: 'Product overview', kind: 'video', minutes: 10, summary: 'Sample content — pending medical review.' }] },
    { id: 'ep-m2', title: 'Module 2 · Disease context', lessons: [{ id: 'ep-2', title: 'Disease context', kind: 'lesson', minutes: 10, summary: 'Sample content — pending medical review.' }] },
    { id: 'ep-m3', title: 'Module 3 · Mechanism and use', lessons: [{ id: 'ep-3', title: 'Mechanism and use', kind: 'video', minutes: 12, summary: 'Sample content — pending medical review.' }] },
    { id: 'ep-m4', title: 'Module 4 · Handling questions in the field', lessons: [{ id: 'ep-4', title: 'Handling questions', kind: 'roleplay', minutes: 11, summary: 'Practise product questions with the AI Doctor.', aiScenario: 'product-recall' }] },
  ],
  takeaways: ['Quote the approved indication exactly', 'Know dosing, administration and monitoring', 'Refer anything beyond the label to Medical Information'],
  exercise: 'Explain the approved dosing and monitoring to a colleague in under a minute.',
  knowledgeCheck: [], finalAssessment: { questions: 20, passMark: 80, attempts: 3 }, certificate: 'Course certificate', skills: ['product'], covers: [16],
};

/** Courses with bespoke design screens open there instead of the generic course page. */
export const BESPOKE: Record<string, 'a3'> = { 'elmiron-product': 'a3' };

export function allCourses(): Course[] {
  const custom = getLearn().customCourses;
  const base = [ELMIRON_PRODUCT, ...COURSES_A, ...COURSES_B];
  return [...custom, ...base.filter(c => !custom.some(x => x.id === c.id))];
}
export const courseById = (id: string) => allCourses().find(c => c.id === id);
export const lessonCount = (c: Course) => c.modules.reduce((n, m) => n + m.lessons.length, 0);
export function progressOf(c: Course): number {
  const n = lessonCount(c);
  if (!n) return 0;
  return Math.round(((getLearn().done[c.id] || []).filter(id => c.modules.some(m => m.lessons.some(l => l.id === id))).length / n) * 100);
}

/* ---------- learning paths (brief §48) ---------- */
export const PATHS: LearningPath[] = [
  {
    id: 'new-mr', title: 'New MR learning path', audience: 'MRs in their first six months', certification: 'Field Certified (Level 3)',
    summary: 'From industry basics to a certified first field call, in the order a new MR needs it.',
    steps: [
      { label: 'Industry basics', courseIds: ['mr-induction', 'pharma-industry'] },
      { label: 'Compliance', courseIds: ['ethical-marketing', 'ae-reporting', 'ucpmp-2024', 'sample-sop'] },
      { label: 'Disease', courseIds: ['ic-bps-awareness'] },
      { label: 'Product', courseIds: ['elmiron-product', 'elmiron-masterclass'] },
      { label: 'Doctor engagement', courseIds: ['doctor-engagement', 'call-planning', 'doctor-cabin'] },
      { label: 'Selling skills', courseIds: ['product-detailing', 'objection-handling', 'positioning'] },
      { label: 'Assessment', courseIds: ['elmiron-masterclass'] },
      { label: 'Certification', courseIds: [] },
    ],
  },
  {
    id: 'senior-mr', title: 'Senior MR path', audience: 'MRs with 2+ years in the field', certification: 'Advanced Commercial Certified (Level 4)',
    summary: 'Sharper detailing, harder conversations and a view of the whole territory.',
    steps: [
      { label: 'Advanced detailing', courseIds: ['product-detailing', 'positioning', 'scientific-communication'] },
      { label: 'Objection handling', courseIds: ['objection-handling', 'cost-objections'] },
      { label: 'Territory management', courseIds: ['territory-management', 'sales-fundamentals'] },
      { label: 'Market intelligence', courseIds: ['market-intelligence', 'channel-engagement', 'hospital-market'] },
      { label: 'Advanced certification', courseIds: [] },
    ],
  },
  {
    id: 'international', title: 'International business path', audience: 'International business teams and managers', certification: 'Commercial Certified (International)',
    summary: 'How global pharma markets work and how to open and grow distributor partnerships.',
    steps: [
      { label: 'Global pharma', courseIds: ['global-market'] },
      { label: 'Market entry', courseIds: ['international-business', 'market-entry-cases'] },
      { label: 'Lead generation', courseIds: ['global-outreach'] },
      { label: 'Global pitch', courseIds: ['global-outreach', 'presentation-skills'] },
      { label: 'Negotiation', courseIds: ['negotiation-skills'] },
      { label: 'Commercial certification', courseIds: [] },
    ],
  },
  {
    id: 'manager', title: 'First-line manager path', audience: 'New and aspiring area managers', certification: 'Manager Foundation',
    summary: 'The move from MR to manager: coaching, field observation and compliance oversight.',
    steps: [
      { label: 'Becoming a manager', courseIds: ['first-line-manager'] },
      { label: 'Coaching', courseIds: ['manager-coaching'] },
      { label: 'Commercial skills', courseIds: ['negotiation-skills', 'sales-fundamentals'] },
      { label: 'Compliance oversight', courseIds: ['ethical-marketing', 'ae-reporting'] },
    ],
  },
];

/* ---------- 8-week onboarding (brief §37) ---------- */
export const ONBOARDING: OnboardingWeek[] = [
  { week: 1, title: 'Orientation', focus: ['Company orientation', 'Pharma industry fundamentals', 'Professional conduct'], courseIds: ['mr-induction', 'pharma-industry', 'professionalism'] },
  { week: 2, title: 'Disease and therapy', focus: ['Disease and therapy training'], courseIds: ['ic-bps-awareness'] },
  { week: 3, title: 'Product', focus: ['Product training'], courseIds: ['elmiron-product', 'elmiron-masterclass'] },
  { week: 4, title: 'Doctor engagement', focus: ['Doctor engagement'], courseIds: ['doctor-engagement', 'doctor-cabin'] },
  { week: 5, title: 'Detailing', focus: ['Product detailing'], courseIds: ['product-detailing', 'positioning'] },
  { week: 6, title: 'Objections', focus: ['Objection handling'], courseIds: ['objection-handling', 'cost-objections'] },
  { week: 7, title: 'Territory', focus: ['Territory management'], courseIds: ['territory-management', 'call-planning'] },
  { week: 8, title: 'Field certification', focus: ['Field certification', 'AI Doctor assessment'], courseIds: [] },
];

/* ---------- MR certification programme (brief §38) ---------- */
export const CERT_LEVELS: CertLevel[] = [
  { level: 1, title: 'Foundation Certified', covers: ['Industry basics', 'Compliance', 'Communication'], requirements: ['Pass the three foundation courses at 80%+', 'Complete mandatory compliance'], courseIds: ['pharma-industry', 'ethical-marketing', 'communication-skills'] },
  { level: 2, title: 'Product Certified', covers: ['Disease', 'Product', 'Scientific knowledge', 'Assessment'], requirements: ['Complete product course', 'Knowledge test 80%+', '3 AI Doctor practice sessions', 'Pass 1 AI Doctor assessment', 'No critical compliance failure'], courseIds: ['ic-bps-awareness', 'elmiron-masterclass', 'scientific-communication'] },
  { level: 3, title: 'Field Certified', covers: ['Doctor pitch', 'Objection handling', 'Territory planning', 'Role play'], requirements: ['Pass detailing, objection and territory courses', 'Manager-reviewed pitch assignment', 'AI Doctor assessment 75%+'], courseIds: ['product-detailing', 'objection-handling', 'territory-management'] },
  { level: 4, title: 'Advanced Commercial Certified', covers: ['Market development', 'Analytics', 'Advanced communication', 'Leadership fundamentals'], requirements: ['Pass the advanced commercial courses', 'Expert-level AI Doctor assessment'], courseIds: ['market-intelligence', 'sales-fundamentals', 'presentation-skills', 'first-line-manager'] },
];
