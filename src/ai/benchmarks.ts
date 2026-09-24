/* Benchmark conversations (brief §47–48).
   Each case fixes the MR's side of a conversation and the expected outcome.
   Run them whenever the model, prompts, product content or scoring change —
   from the admin screen (AI Doctor → Benchmarks) or with `npm test`. */

import { replay, scoreSession, seedRandom } from './engine';
import type { CriticalId, Result, ScenarioId, SessionConfig } from './types';

export interface Benchmark {
  id: string;
  scenarioId: ScenarioId;
  personaId: SessionConfig['personaId'];
  label: string;
  mr: string[];
  expect: { min: number; max: number; result?: Result; critical?: CriticalId[]; noCritical?: boolean };
}

const base = (scenarioId: ScenarioId, personaId: SessionConfig['personaId']): SessionConfig => ({
  productId: 'elmiron', specialtyId: 'urology', personaId, scenarioId, difficulty: 'Intermediate',
  experience: 'Established consultant', mode: 'assessment', channel: 'text', seconds: 300,
});

export const BENCHMARKS: Benchmark[] = [
  {
    id: 'bm-first-strong', scenarioId: 'first-meeting', personaId: 'new', label: 'First meeting — strong',
    mr: [
      'Good morning, doctor. My name is Rahul More and I am from Elmiron Field. I would like to discuss a treatment option for some of your patients.',
      'We focus on urology. May I ask how often you see patients with chronic bladder pain, and what challenges you find in managing them?',
      'I understand. Elmiron is indicated for the relief of bladder pain or discomfort associated with interstitial cystitis, as per the prescribing information.',
      'The recommended dose is 100 mg three times daily with water, one hour before or two hours after meals, and patients should be reassessed after 3 months.',
      'Baseline and periodic eye examinations are recommended in the label. Does that answer your question?',
      'Thank you for your time, doctor. I will leave the approved material and follow up next visit.',
    ],
    expect: { min: 70, max: 100, result: 'Good performance', noCritical: true },
  },
  {
    id: 'bm-first-weak', scenarioId: 'first-meeting', personaId: 'new', label: 'First meeting — weak, no questions',
    mr: ['Our product is really good.', 'It works well.', 'Okay.'],
    expect: { min: 0, max: 45, result: 'Needs improvement', noCritical: true },
  },
  {
    id: 'bm-superiority', scenarioId: 'competitor-preference', personaId: 'competitor', label: 'Competitor — superiority claim (critical)',
    mr: [
      'Good morning doctor, I am from Elmiron Field.',
      'Honestly doctor, our product is better than what you use and it is the best option for these patients.',
      'Thank you for your time.',
    ],
    expect: { min: 0, max: 60, result: 'Requires retraining', critical: ['superiority'] },
  },
  {
    id: 'bm-competitor-good', scenarioId: 'competitor-preference', personaId: 'competitor', label: 'Competitor — respectful, approved info',
    mr: [
      'Good morning doctor, I am Rahul from Elmiron Field. I would like to share approved information briefly.',
      'That is fair, and I understand your current therapy works for many patients. Are there patients who still have symptoms?',
      'I see. For appropriate patients, Elmiron is indicated for bladder pain or discomfort associated with interstitial cystitis. I can share the prescribing information.',
      'The label recommends reassessment after 3 months. Would that help for the patients you mentioned?',
      'Thank you for your time, doctor. I will leave the approved material.',
    ],
    expect: { min: 60, max: 100, noCritical: true },
  },
  {
    id: 'bm-offlabel-promoted', scenarioId: 'off-label', personaId: 'friendly', label: 'Off-label — promoted (critical)',
    mr: [
      'Good morning doctor, I am from Elmiron Field to discuss Elmiron.',
      'It is indicated for bladder pain associated with interstitial cystitis.',
      'Yes, it could help those patients too, you can try it.',
    ],
    expect: { min: 0, max: 70, result: 'Requires retraining', critical: ['offlabel'] },
  },
  {
    id: 'bm-offlabel-handled', scenarioId: 'off-label', personaId: 'friendly', label: 'Off-label — referred to Medical Information',
    mr: [
      'Good morning doctor, I am Rahul from Elmiron Field. I would like to share a brief update.',
      'Elmiron is indicated for the relief of bladder pain or discomfort associated with interstitial cystitis, as per the prescribing information.',
      'It is approved only for that indication. For any other use, I can ask our Medical Information team to contact you directly.',
      'Thank you for your time, doctor.',
    ],
    expect: { min: 50, max: 100, noCritical: true },
  },
  {
    id: 'bm-ae-ignored', scenarioId: 'adverse-event', personaId: 'friendly', label: 'Adverse event — ignored (critical)',
    mr: [
      'Good morning doctor, I am from Elmiron Field.',
      'Elmiron is indicated for bladder pain associated with interstitial cystitis.',
      'Anyway, the dose is 100 mg three times daily.',
      'It is taken with water before meals.',
    ],
    expect: { min: 0, max: 70, result: 'Requires retraining', critical: ['ignored-ae'] },
  },
  {
    id: 'bm-ae-reported', scenarioId: 'adverse-event', personaId: 'friendly', label: 'Adverse event — recognised and reported',
    mr: [
      'Good morning doctor, I am Rahul from Elmiron Field. I would like to share a brief update on Elmiron.',
      'It is indicated for bladder pain or discomfort associated with interstitial cystitis.',
      'Thank you for telling me, doctor. I need to report this to our pharmacovigilance team within 24 hours. Could I note a few details without the patient identity?',
      'Thank you for your time, doctor. I will follow up.',
    ],
    expect: { min: 50, max: 100, noCritical: true },
  },
  {
    id: 'bm-fabricated', scenarioId: 'scientific-discussion', personaId: 'evidence', label: 'Evidence — invented statistic (critical)',
    mr: ['Good morning doctor.', 'Studies show 90% of patients improve within two weeks.', 'Thank you for your time.'],
    expect: { min: 0, max: 55, result: 'Requires retraining', critical: ['fabricated'] },
  },
  {
    id: 'bm-outside', scenarioId: 'outside-knowledge', personaId: 'specialist', label: 'Outside knowledge — defers correctly',
    mr: [
      'Good morning doctor, I am Rahul from Elmiron Field. I would like to discuss Elmiron briefly.',
      'It is indicated for bladder pain or discomfort associated with interstitial cystitis, per the prescribing information.',
      'That is a good question. I would like to confirm that with our medical team and get back to you.',
      'Thank you for your time, doctor. I will follow up by Friday.',
    ],
    expect: { min: 50, max: 100, noCritical: true },
  },
  {
    id: 'bm-inducement', scenarioId: 'price-objection', personaId: 'price', label: 'Price — inducement offered (critical)',
    mr: ['Good morning doctor, I am from Elmiron Field.', 'If you prescribe more we can sponsor your conference trip.'],
    expect: { min: 0, max: 60, result: 'Requires retraining', critical: ['inducement'] },
  },
  {
    id: 'bm-busy-long', scenarioId: 'sixty-second', personaId: 'busy', label: 'Busy doctor — overlong answer',
    mr: [
      'Good morning doctor, thank you so much for seeing me today, I know you are very busy but I wanted to take a few minutes to walk you through our company history, our manufacturing facilities, our quality systems, the full product portfolio, and then some detailed background on interstitial cystitis and the patient journey before getting to our product.',
      'So as I was saying the company was founded many years ago and we have grown steadily across several therapy areas and regions with a strong focus on quality and patient outcomes across the board.',
    ],
    expect: { min: 0, max: 50, noCritical: true },
  },
];

export interface BenchmarkResult { id: string; label: string; total: number; result: Result; critical: CriticalId[]; pass: boolean; reasons: string[] }

export function runBenchmarks(enabledCritical: Record<CriticalId, boolean>): BenchmarkResult[] {
  return BENCHMARKS.map((b, i) => {
    seedRandom(1000 + i);
    const { state } = replay(base(b.scenarioId, b.personaId), b.mr);
    const fb = scoreSession(state, enabledCritical);
    seedRandom(null);
    const reasons: string[] = [];
    if (fb.total < b.expect.min || fb.total > b.expect.max) reasons.push(`Score ${fb.total} outside ${b.expect.min}–${b.expect.max}`);
    if (b.expect.result && fb.result !== b.expect.result) reasons.push(`Result "${fb.result}", expected "${b.expect.result}"`);
    b.expect.critical?.forEach(c => { if (!fb.critical.includes(c)) reasons.push(`Missed critical: ${c}`); });
    if (b.expect.noCritical && fb.critical.length) reasons.push(`Unexpected critical: ${fb.critical.join(', ')}`);
    return { id: b.id, label: b.label, total: fb.total, result: fb.result, critical: fb.critical, pass: !reasons.length, reasons };
  });
}
