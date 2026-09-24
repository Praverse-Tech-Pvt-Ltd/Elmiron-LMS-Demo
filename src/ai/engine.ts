/* Built-in AI Doctor engine.
   A deterministic-rules simulator that needs no API key: it reads each MR turn,
   reacts in persona, injects scenario beats, and gathers evidence for the rubric.
   The same scorer also runs as a safety net over live-AI sessions, so critical
   compliance checks never depend on a model's judgement alone. */

import { personaById, productById, scenarioById, specialtyById } from './content';
import type {
  CriticalId, DimensionId, DimensionScore, Feedback, Persona, ProductPack, Scenario, ScenarioBeat,
  ScenarioId, SessionConfig, Specialty, Tag, Tone, Turn,
} from './types';
import { RUBRIC, CRITICAL_NAMES } from './types';

/* ---------------- utilities ---------------- */

let rnd: () => number = Math.random;
/** Seed the doctor's variation (benchmarks); live sessions stay random so retries differ. */
export function seedRandom(seed: number | null) {
  if (seed === null) { rnd = Math.random; return; }
  let a = seed >>> 0;
  rnd = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const pick = <T,>(arr: T[], avoid: string[] = []): T => {
  const pool = arr.filter(x => !avoid.includes(String(x)));
  const from = pool.length ? pool : arr;
  return from[Math.floor(rnd() * from.length)];
};
const words = (t: string) => (t.trim() ? t.trim().split(/\s+/).length : 0);

/** Removes obvious patient identifiers before anything is stored or sent (brief §41). */
export function redact(text: string): { text: string; redacted: boolean } {
  let out = text;
  out = out.replace(/(\+?\d[\d\s-]{8,}\d)/g, m => (m.replace(/\D/g, '').length >= 10 ? '[phone removed]' : m));
  out = out.replace(/\b(MRN|UHID|IP ?No\.?|medical record( number)?|record no\.?)\s*[:#-]?\s*[A-Z0-9-]{3,}/gi, '[record number removed]');
  out = out.replace(/\b(patient|pt\.?)\s+(named|called)?\s*(Mr|Mrs|Ms|Miss|Shri|Smt)\.?\s+[A-Z][a-z]+(\s+[A-Z][a-z]+)?/g, '$1 [name removed]');
  out = out.replace(/\b(patient|pt\.?)\s+(named|called)\s+[A-Z][a-z]+(\s+[A-Z][a-z]+)?/g, '$1 [name removed]');
  out = out.replace(/\b[\w.+-]+@[\w-]+\.[\w.]+\b/g, '[email removed]');
  return { text: out, redacted: out !== text };
}

/* ---------------- signal detection ---------------- */

const RE = {
  greet: /\b(good (morning|afternoon|evening)|hello|hi|namaste|namaskar|greetings)\b/i,
  intro: /\b(my name is|i am \w+|i'm \w+|this is \w+)\b.*\b(from|with|representing)\b|\b(representing|from elmiron|elmiron field)\b/i,
  purpose: /\b(purpose|reason for (my|the) visit|i('d| would) like to (discuss|share|talk|update|brief)|wanted to (share|discuss|update|brief)|here to (discuss|share|talk|update)|a (quick|brief) (update|word|minute)|brief you)\b/i,
  question: /\?\s*$|^(what|how|which|do you|could you|can you|may i|would you|are you|is there|have you|when|who|why)\b/i,
  needTopic: /\b(patients?|practice|challenges?|currently|you see|your experience|prefer|usually|find|struggl|concern|manage|treat)\b/i,
  ack: /\b(i understand|i see|that makes sense|fair (point|enough)|good question|thank you for (sharing|telling)|i appreciate|that('s| is) (a )?(valid|fair|important)|i hear you|absolutely|of course|understood)\b/i,
  indication: /\b(interstitial cystitis|bladder pain|bladder discomfort|ic\/bps|bps)\b/i,
  evidence: /\b(study|studies|trial|trials|data|published|publication|evidence|clinical (data|experience)|reference|journal)\b/i,
  approvedSource: /\b(prescribing information|product information|label|approved (material|information|leaflet|detail aid)|\bpi\b|smpc|package insert|approved)\b/i,
  superiority: /\b(best|the most effective|superior|better than|more effective than|outperforms?|number one|no\.? ?1|fastest|strongest|only (drug|treatment|option) that)\b/i,
  guarantee: /\b(guarantee[ds]?|cures?|cured|100 ?% (safe|effective)|always works|never fails|works for (all|every)(one| patient)?|no side[- ]?effects|completely safe|totally safe|zero side|risk[- ]free)\b/i,
  stat: /\b\d{1,3}(\.\d+)?\s?%(?!\s*(of )?(the )?(time|discount))|\b\d+ (out of|in) \d+\b|\bp ?[<=] ?0?\.\d+/i,
  disparage: /\b(competitor|other (brand|product|drug|company)|their (product|drug)|that (brand|product|drug))\b.{0,50}\b(bad|useless|inferior|worse|dangerous|cheap|rubbish|fake|poor quality|doesn'?t work)\b|\b(useless|inferior|rubbish|dangerous|fake)\b.{0,30}\b(brand|product|drug|competitor)/i,
  inducement: /\b(gift|gifts|sponsor(ship)?|sponsored|free trip|conference trip|travel|incentive|commission|reward|dinner|hotel|holiday|discount (for|if|when) (you )?prescrib|something (for|in return)|take care of you|cash)\b/i,
  refusalOfInducement: /\b(can(no|')t (offer|provide|give|sponsor)|not (able|allowed|permitted) to (offer|give|sponsor)|against (our|company) (policy|code)|not permitted|does(n't| not) allow)\b/i,
  medical: /\b(medical (team|affairs|information|advisor|department|colleague)|med ?info|get back to you|confirm (that|this|it|with)|check (with|and come back)|follow up with (our|the) (medical|scientific)|scientific (team|colleague))\b/i,
  report: /\b(report|reported|reporting|pharmacovigilance|\bpv\b|drug safety|safety (team|department|desk)|adverse event|side[- ]effect report|within 24|24 hours|one working day|capture (the )?details|form)\b/i,
  investigate: /\b(probably (not|un)related|not related|unrelated|coincidence|can'?t be (the|our) (drug|product)|must be something else|are you sure it was|was it definitely|did (the patient|they) take (it )?correctly|what else (was|were) (the patient|they) taking)\b/i,
  complaintAck: /\b(complaint|batch|lot( number)?|quality (team|department|assurance)|\bqa\b|escalate|report|photo|return (the )?(pack|strip|sample))\b/i,
  commitment: /\b(i('ll| will) (replace|refund|give you new|send (a )?(new|free))|free replacement|definitely (a|the) (transport|packaging|courier|storage)|transport (issue|problem)|it('s| is) (just|only) (the )?packaging|nothing to worry)\b/i,
  offlabelYes: /\b(yes|sure|definitely|certainly|of course|it (can|could|should|would|will|may|might) (help|work|be used|be useful)|you (can|could|may) (use|try)|worth (a )?try(ing)?|many doctors use it (for|in))\b/i,
  close: /\b(thank you for your time|thanks for your time|thank you,? doctor|i('ll| will) (follow up|come back|leave|send|share)|see you (next|again|soon)|next visit|may i (come|visit|return)|shall i (come|visit)|book (a|some) time|leave (the|this|some|approved)? ?(material|leaflet|detail aid|information))\b/i,
  confirm: /\b(does (that|this) (help|answer|address)|any (other )?questions|was (this|that) (useful|helpful)|is there anything (else)?|did that (answer|help)|does that make sense|would that help)\b/i,
  recall: /\b(last (time|visit|week)|you (asked|mentioned)|as promised|following up|previous(ly)? (discussion|visit)|when we (met|spoke))\b/i,
  permission: /\b(may i|could i|would it be (ok|okay|alright)|would you mind|if you (allow|permit)|another time|better time|come back (later|another))\b/i,
  hedge: /\b(um+|uh+|er+|maybe maybe|i think i think|kind of|sort of|i guess|not sure but|basically basically)\b/i,
  informal: /\b(bro|dude|yaar|buddy|lol|gonna|wanna|ya know|chill|boss)\b|[!]{2,}|\p{Extended_Pictographic}/iu,
  wrongDose: /\b(\d{2,4}) ?mg\b/i,
  onceTwice: /\b(once|twice|two times|four times) (a |per )?(day|daily)\b|\b(od|bd|bid|qid)\b/i,
};

export interface Signals {
  words: number;
  greet: boolean; intro: boolean; purpose: boolean; question: boolean; needQuestion: boolean; ack: boolean;
  indication: boolean; facts: string[]; wrongFacts: string[];
  evidence: boolean; approvedSource: boolean;
  superiority: boolean; guarantee: boolean; stat: boolean; disparage: boolean;
  inducement: boolean; medical: boolean; report: boolean; investigate: boolean;
  complaintAck: boolean; commitment: boolean; offlabelYes: boolean;
  close: boolean; confirm: boolean; recall: boolean; permission: boolean; hedge: boolean; informal: boolean;
}

export function analyze(raw: string, product: ProductPack, extraProhibited: string[] = []): Signals {
  const t = raw.trim();
  const lower = t.toLowerCase();
  // The indication counts only when stated as an indication, not when the disease is merely named.
  const indication = RE.indication.test(t) && /\b(indicat|approved (for|in)|relief of|it is for|used for|elmiron is for|for patients with)/i.test(t);
  const facts = product.facts.filter(f => f.keywords.some(k => lower.includes(k))).filter(f => f.id !== 'ind' || indication).map(f => f.id);
  const wrongFacts: string[] = [];
  const dose = lower.match(RE.wrongDose);
  if (dose && dose[1] !== '100' && /\b(dose|take|tablet|daily|mg)\b/.test(lower)) wrongFacts.push(`Dose stated as ${dose[1]} mg (approved: 100 mg three times daily)`);
  if (RE.onceTwice.test(lower) && /\b(dose|take|tablet|daily|given)\b/.test(lower)) wrongFacts.push('Dosing frequency stated incorrectly (approved: three times daily)');
  const question = t.split(/(?<=[.?!])\s+/).some(s => RE.question.test(s.trim()));
  const inducement = RE.inducement.test(lower) && !RE.refusalOfInducement.test(lower);
  return {
    words: words(t),
    greet: RE.greet.test(t), intro: RE.intro.test(t), purpose: RE.purpose.test(t),
    question, needQuestion: question && RE.needTopic.test(t), ack: RE.ack.test(t),
    indication, facts, wrongFacts,
    evidence: RE.evidence.test(t), approvedSource: RE.approvedSource.test(t),
    superiority: RE.superiority.test(t) && !/\bnot (the )?(best|superior|better)\b/i.test(t),
    guarantee: (RE.guarantee.test(t) && !/\b(not|never|cannot|can't|won't) (a )?(cure|guarantee)/i.test(t))
      || extraProhibited.some(p => p.trim().length > 3 && lower.includes(p.trim().toLowerCase())),
    stat: RE.stat.test(t), disparage: RE.disparage.test(t),
    inducement, medical: RE.medical.test(t), report: RE.report.test(t), investigate: RE.investigate.test(t),
    complaintAck: RE.complaintAck.test(t), commitment: RE.commitment.test(t), offlabelYes: RE.offlabelYes.test(t),
    close: RE.close.test(t), confirm: RE.confirm.test(t), recall: RE.recall.test(t), permission: RE.permission.test(t),
    hedge: RE.hedge.test(t), informal: RE.informal.test(t),
  };
}

/* ---------------- evidence gathered across the session ---------------- */

export interface Evidence {
  mrTurns: number;
  greet: boolean; intro: boolean; purpose: boolean; openingTurns: number;
  questions: number; needQuestions: number; acks: number;
  facts: string[]; inaccuracies: string[]; indication: boolean;
  evidenceRefs: number; approvedSource: number;
  unsupported: string[]; stats: number; superiority: number; disparage: number;
  inducement: boolean; offlabelPromoted: boolean;
  offlabel: { raised: boolean; handled: boolean };
  ae: { raised: boolean; recognised: boolean; investigated: boolean; missedOnce: boolean; ignored: boolean };
  complaint: { raised: boolean; recognised: boolean; commitment: boolean };
  outside: { raised: boolean; deferred: boolean; guessed: boolean };
  objections: { category: string; clarified: boolean; responded: boolean; supported: boolean; confirmed: boolean }[];
  pendingAsked: number; pendingAnswered: number;
  dismissals: number; calmHandling: number;
  wordsPerTurn: number[]; overlong: number; hedges: number; informal: number;
  closes: boolean; confirms: number; recalled: boolean; interruptions: number;
}

const newEvidence = (): Evidence => ({
  mrTurns: 0, greet: false, intro: false, purpose: false, openingTurns: 0,
  questions: 0, needQuestions: 0, acks: 0, facts: [], inaccuracies: [], indication: false,
  evidenceRefs: 0, approvedSource: 0, unsupported: [], stats: 0, superiority: 0, disparage: 0,
  inducement: false, offlabelPromoted: false,
  offlabel: { raised: false, handled: false },
  ae: { raised: false, recognised: false, investigated: false, missedOnce: false, ignored: false },
  complaint: { raised: false, recognised: false, commitment: false },
  outside: { raised: false, deferred: false, guessed: false },
  objections: [], pendingAsked: 0, pendingAnswered: 0, dismissals: 0, calmHandling: 0,
  wordsPerTurn: [], overlong: 0, hedges: 0, informal: 0, closes: false, confirms: 0, recalled: false, interruptions: 0,
});

/* ---------------- conversation engine ---------------- */

interface Pending { beat: ScenarioBeat; line: string; tries: number }

export interface EngineState {
  cfg: SessionConfig;
  persona: Persona;
  scenario: Scenario;
  product: ProductPack;
  specialty: Specialty;
  patience: number;
  tone: Tone;
  firedBeats: number[];
  pending: Pending | null;
  askedLines: string[];
  ended: boolean;
  endReason: string;
  ev: Evidence;
  /** Admin-configured prohibited phrases, treated as unsupported claims. */
  extraProhibited: string[];
}

export interface DoctorMove {
  text: string;
  tone: Tone;
  end?: boolean;
  /** Coaching tags for the MR turn just analysed (shown in the transcript). */
  mrTags: Tag[];
  mrNote?: string;
  /** Real-time coaching chips (practice mode only). */
  chips: string[];
}

const difficultyScale = { Beginner: 0.6, Intermediate: 1, Advanced: 1.25, Expert: 1.5 } as const;

export function startSession(cfg: SessionConfig, extraProhibited: string[] = []): { state: EngineState; opening: DoctorMove } {
  const persona = personaById(cfg.personaId);
  const scenario = scenarioById(cfg.scenarioId);
  const product = productById(cfg.productId);
  const specialty = specialtyById(cfg.specialtyId);
  const state: EngineState = {
    cfg, persona, scenario, product, specialty,
    patience: Math.max(2, Math.round(persona.patience / (cfg.difficulty === 'Expert' ? 1.3 : 1))),
    tone: persona.tone, firedBeats: [], pending: null, askedLines: [], ended: false, endReason: '', ev: newEvidence(), extraProhibited,
  };
  const line = scenario.opening.length ? pick(scenario.opening) : pick(persona.greetings);
  state.askedLines.push(line);
  // Beats scheduled at turn 0 fire with the opening (e.g. a complaint raised immediately).
  return { state, opening: { text: line, tone: persona.tone, mrTags: [], chips: [] } };
}

function fireBeat(state: EngineState, beat: ScenarioBeat): string {
  const line = pick(beat.lines, state.askedLines);
  state.askedLines.push(line);
  state.firedBeats.push(beat.atTurn);
  state.pending = { beat, line, tries: 0 };
  state.ev.pendingAsked++;
  if (beat.event === 'objection') state.ev.objections.push({ category: beat.category || 'General', clarified: false, responded: false, supported: false, confirmed: false });
  if (beat.event === 'safety') state.ev.ae.raised = true;
  if (beat.event === 'complaint') state.ev.complaint.raised = true;
  if (beat.event === 'offlabel') state.ev.offlabel.raised = true;
  if (beat.event === 'outside') state.ev.outside.raised = true;
  if (beat.event === 'dismissal') state.ev.dismissals++;
  return line;
}

const NEED_ANSWERS = [
  'I see perhaps five or six patients a month with chronic bladder pain. Most have tried several things already.',
  'Mostly women between thirty and sixty. The diagnosis often takes a long time to reach.',
  'The main challenge is keeping patients on any treatment long enough to judge it.',
  'Honestly, what I need is clear practical information I can give patients.',
];

/** Process one MR turn and produce the doctor's reaction. */
export function mrTurn(state: EngineState, text: string): DoctorMove {
  const { persona, scenario, product, ev, cfg } = state;
  const s = analyze(text, product, state.extraProhibited);
  const tags: Tag[] = [];
  const chips: string[] = [];
  let note: string | undefined;
  const budget = Math.round(persona.wordBudget / (difficultyScale[cfg.difficulty] > 1 ? 1.1 : 0.85));

  if (!text.trim()) {
    return { text: pick(['Sorry, I did not catch that.', 'Yes? Go on.']), tone: state.tone, mrTags: ['missed'], chips: ['Say something to the doctor'] };
  }

  /* --- update evidence --- */
  ev.mrTurns++;
  ev.wordsPerTurn.push(s.words);
  if (ev.mrTurns <= 2) {
    ev.greet ||= s.greet; ev.intro ||= s.intro; ev.purpose ||= s.purpose || (s.indication && ev.mrTurns === 1);
  }
  if (s.question) ev.questions++;
  if (s.needQuestion) ev.needQuestions++;
  if (s.ack) ev.acks++;
  s.facts.forEach(f => { if (!ev.facts.includes(f)) ev.facts.push(f); });
  if (s.indication) ev.indication = true;
  ev.inaccuracies.push(...s.wrongFacts);
  if (s.evidence) ev.evidenceRefs++;
  if (s.approvedSource) ev.approvedSource++;
  if (s.hedge) ev.hedges++;
  if (s.informal) ev.informal++;
  if (s.confirm) ev.confirms++;
  if (s.recall) ev.recalled = true;
  if (s.words > budget) { ev.overlong++; chips.push(s.words > budget * 1.6 ? 'Too long' : 'Be concise'); }
  if (s.close && ev.mrTurns >= 2) ev.closes = true;

  const unsupported = s.superiority || s.guarantee;
  if (unsupported) { ev.unsupported.push(text.trim().slice(0, 140)); if (s.superiority) ev.superiority++; tags.push('compliance'); chips.push('Unsupported claim'); note = 'Unsupported claim — only approved statements can be made.'; }
  if (s.stat && !s.approvedSource) { ev.stats++; tags.push('compliance'); chips.push('Unsupported claim'); note = 'A figure without an approved source counts as fabricated evidence.'; }
  if (s.disparage) { ev.disparage++; tags.push('compliance'); note = 'Do not criticise competitor products.'; }
  if (s.inducement) { ev.inducement = true; tags.push('compliance'); note = 'Offering anything of value in connection with prescribing is an inducement.'; }
  if (s.wrongFacts.length) { tags.push('missed'); note = s.wrongFacts[0]; }

  /* --- inducement always stops the conversation's direction --- */
  if (s.inducement) {
    state.tone = 'Concerned';
    return { text: 'I do not accept anything like that, and I would rather you did not offer it. Let us keep this strictly professional.', tone: state.tone, mrTags: tags, mrNote: note, chips };
  }

  /* --- respond to a pending scenario event --- */
  const p = state.pending;
  if (p) {
    const b = p.beat;
    const resolve = (answered = true) => { state.pending = null; if (answered) ev.pendingAnswered++; };
    if (b.event === 'safety') {
      if (s.report || (s.ack && /report|safety/i.test(text))) {
        ev.ae.recognised = true; resolve(); tags.push('strong');
        if (s.investigate) { ev.ae.investigated = true; tags.push('compliance'); note = 'Report it — do not judge causality yourself.'; }
        state.tone = 'Neutral';
        return { text: pick(['Yes, please report it. What do you need from me?', 'Good — I would appreciate that. My staff can share the details your safety team needs.']), tone: state.tone, mrTags: tags, mrNote: note ?? 'Safety information recognised and escalated.', chips };
      }
      if (s.investigate) { ev.ae.investigated = true; tags.push('compliance'); note = 'Do not investigate or conclude causality — report it.'; }
      if (p.tries === 0) {
        p.tries++; ev.ae.missedOnce = true; tags.push('missed'); note ??= 'The doctor mentioned a possible adverse event — it must be acknowledged and reported.';
        state.tone = 'Concerned';
        return { text: s.investigate ? 'You are saying it is unrelated? I am not sure either of us can conclude that.' : 'Sorry — did you hear what I said about my patient?', tone: state.tone, mrTags: tags, mrNote: note, chips: [...chips, 'Recognise the safety information'] };
      }
      ev.ae.ignored = true; resolve(false); tags.push('compliance'); note = 'The adverse event was not recognised or escalated.';
      state.tone = 'Concerned';
      return { text: 'Okay. I thought someone from your company would want to know about that.', tone: state.tone, mrTags: tags, mrNote: note, chips };
    }
    if (b.event === 'complaint') {
      if (s.commitment) { ev.complaint.commitment = true; tags.push('compliance'); note = 'Do not promise outcomes or guess the cause — escalate.'; }
      if (s.complaintAck) {
        ev.complaint.recognised = true; resolve(); if (!s.commitment) tags.push('strong');
        return { text: pick(['The batch number is on the strip — I can have my assistant share a photo.', 'Fine. I will ask the patient to keep the pack.']), tone: 'Neutral', mrTags: tags, mrNote: note ?? 'Product complaint recognised.', chips };
      }
      if (p.tries === 0) { p.tries++; tags.push('missed'); return { text: 'So what happens with the damaged pack?', tone: 'Concerned', mrTags: tags, mrNote: note ?? 'This is a product complaint — escalate it.', chips: [...chips, 'Recognise the product complaint'] }; }
      resolve(false); tags.push('missed');
      return { text: 'All right. Let us move on, then.', tone: 'Neutral', mrTags: tags, mrNote: 'The complaint was not escalated.', chips };
    }
    if (b.event === 'offlabel') {
      if (s.offlabelYes && !s.medical && !/\b(only|approved (for|indication)|not approved)\b/i.test(text)) {
        ev.offlabelPromoted = true; resolve(); tags.push('compliance'); note = 'Off-label promotion: never suggest use outside the approved indication.';
        return { text: 'Interesting. I might try that then.', tone: 'Curious', mrTags: tags, mrNote: note, chips };
      }
      if (s.medical || /\b(approved (for|indication)|not approved|outside (the )?(approved|label|indication)|can(no|')t (discuss|recommend|comment))\b/i.test(text)) {
        ev.offlabel.handled = true; resolve(); tags.push('strong');
        return { text: pick(['Fair enough. I will send the question to your medical team.', 'Understood — please have Medical Information contact me.']), tone: 'Neutral', mrTags: tags, mrNote: 'Off-label question handled correctly.', chips };
      }
      if (p.tries === 0) { p.tries++; tags.push('missed'); return { text: 'So — can I use it for that or not?', tone: 'Curious', mrTags: tags, mrNote: 'Keep to the approved indication and refer the question.', chips }; }
      resolve(false); tags.push('missed');
      return { text: 'Okay, I will look into it myself.', tone: 'Neutral', mrTags: tags, chips };
    }
    if (b.event === 'outside') {
      if (s.medical) {
        ev.outside.deferred = true; resolve(); tags.push('strong');
        return { text: pick(['Good, please do. I would rather have the right answer than a quick one.', 'Thank you — that is the correct approach.']), tone: 'Interested', mrTags: tags, mrNote: 'Correct: confirmed with the medical team rather than guessing.', chips };
      }
      ev.outside.guessed = true; resolve(false); tags.push('missed'); note ??= 'This was outside approved information — the right answer is to confirm with the medical team.';
      return { text: 'Is that from the label? I would rather have the reference than an estimate.', tone: 'Skeptical', mrTags: tags, mrNote: note, chips };
    }
    if (b.event === 'dismissal') {
      if (s.ack || s.permission) {
        ev.calmHandling++; resolve(); tags.push('strong');
        return { text: pick(['All right — one quick point, then.', 'Fine. You can leave the approved material.', 'Okay, maybe another time.']), tone: 'Neutral', mrTags: tags, mrNote: 'Calm, respectful handling.', chips };
      }
      state.patience--; resolve(false); tags.push('missed');
      return { text: pick(persona.interruptions), tone: 'Impatient', mrTags: tags, mrNote: 'Acknowledge the doctor’s position before continuing.', chips: [...chips, 'Acknowledge first'] };
    }
    if (b.event === 'objection') {
      const o = ev.objections[ev.objections.length - 1];
      if (s.question && !o.clarified && !o.responded) {
        o.clarified = true; tags.push('strong');
        const clar: Record<string, string[]> = {
          Efficacy: ['Mostly they stop after a few weeks because nothing seems to change.', 'I suppose I did not give it very long.'],
          Safety: ['Mainly the eye findings — patients read about them online.', 'I want to know what to monitor.'],
          Price: ['It is the total cost over several months that worries them.', 'Most of my patients pay out of pocket.'],
          'Competitor preference': ['It works for most of my patients. A few still have symptoms.', 'I am used to it, frankly.'],
          Evidence: ['I want to know what was actually measured.', 'Anything published in a decent journal?'],
        };
        return { text: pick(clar[o.category] ?? ['I just want a straight answer.']), tone: state.tone, mrTags: tags, mrNote: 'Good — clarified the objection before responding.', chips };
      }
      const responded = s.facts.length > 0 || s.approvedSource || s.medical || s.ack;
      if (responded && !unsupported && !s.disparage && !(s.stat && !s.approvedSource)) {
        o.responded = true; o.supported ||= s.evidence || s.approvedSource; o.confirmed ||= s.confirm;
        if (o.clarified && o.supported && o.confirmed) tags.push('excellent-objection'); else tags.push('strong');
        if (o.confirmed || p.tries > 0) {
          resolve(); state.tone = 'Interested';
          return { text: pick(['Yes, that answers it. Thank you.', 'That is useful. Can you tell me about the evidence?', 'Okay, that is reasonable.']), tone: state.tone, mrTags: tags, mrNote: 'Objection handled with approved information.', chips };
        }
        p.tries++;
        return { text: pick(persona.acknowledgements), tone: state.tone, mrTags: tags, mrNote: o.clarified ? undefined : 'Tip: clarify the concern before responding.', chips: o.confirmed ? chips : [...chips, 'Confirm the answer helped'] };
      }
      if (unsupported || (s.stat && !s.approvedSource)) {
        state.tone = 'Skeptical'; p.tries++;
        return { text: pick(['I am not familiar with that claim. What is your source?', 'Is that an approved claim?']), tone: state.tone, mrTags: tags, mrNote: note, chips };
      }
      if (s.disparage) { state.tone = 'Skeptical'; p.tries++; return { text: 'I would rather you did not run down other products. Tell me about yours.', tone: state.tone, mrTags: tags, mrNote: note, chips }; }
      p.tries++; state.patience--; tags.push('missed');
      if (p.tries >= 2) { resolve(false); }
      return { text: pick(['You have not really answered my question.', 'That does not address what I asked.']), tone: 'Skeptical', mrTags: tags, mrNote: 'The objection was not addressed.', chips: [...chips, 'Clarify the objection'] };
    }
    if (b.event === 'question' || b.event === 'recall') {
      const answered = s.facts.length > 0 || s.medical || s.indication || (s.words > 6 && !s.question);
      if (answered && !s.wrongFacts.length && !unsupported) {
        resolve(); if (s.facts.length) tags.push('strong');
        return { text: pick(persona.acknowledgements), tone: state.tone, mrTags: tags, mrNote: note, chips };
      }
      if (s.wrongFacts.length) {
        state.tone = 'Skeptical'; resolve(false);
        return { text: 'That is not what I understood from the label. Are you sure about that?', tone: state.tone, mrTags: tags, mrNote: note, chips };
      }
      p.tries++; if (p.tries >= 2) resolve(false);
      tags.push('missed');
      return { text: 'Sorry, that did not answer my question.', tone: 'Neutral', mrTags: tags, mrNote: 'Answer the question asked, from approved information.', chips };
    }
  }

  /* --- general reactions --- */
  if (unsupported || (s.stat && !s.approvedSource)) {
    state.tone = 'Skeptical';
    if (rnd() < persona.challenge * difficultyScale[cfg.difficulty] || cfg.difficulty !== 'Beginner') {
      return { text: pick(['Is that an approved claim?', 'I am not familiar with that claim. What is your source?', 'Where does that figure come from?']), tone: state.tone, mrTags: tags, mrNote: note, chips };
    }
  }
  if (s.disparage) {
    state.tone = 'Skeptical';
    return { text: 'I would rather you did not criticise other products. Just tell me about yours.', tone: state.tone, mrTags: tags, mrNote: note, chips };
  }
  if (s.wrongFacts.length) {
    state.tone = 'Skeptical';
    return { text: 'Hm. That is not what I remember from the label. Are you sure?', tone: state.tone, mrTags: tags, mrNote: note, chips };
  }
  if (s.words > budget) {
    ev.interruptions++; state.patience--; state.tone = 'Impatient';
    if (state.patience <= 0) return endWith(state, pick(persona.closings), tags, note, chips, 'The doctor ran out of time.');
    return { text: pick(persona.interruptions), tone: state.tone, mrTags: tags, mrNote: note ?? 'The doctor interrupted — the answer ran too long for this persona.', chips };
  }

  // MR asked about the doctor's practice: a real doctor answers before moving on
  // (any scenario beat that was due simply fires on the next turn).
  if (s.needQuestion && !s.close) {
    tags.push('strong');
    const answer = pick(NEED_ANSWERS, state.askedLines);
    state.askedLines.push(answer);
    if (state.tone === 'Impatient') state.tone = 'Neutral';
    return { text: answer, tone: state.tone, mrTags: tags, mrNote: 'Good — asked about the doctor’s patients.', chips };
  }

  // The MR closes the call. Compliance events still due (safety, off-label, complaint,
  // out-of-scope) are the point of those scenarios, so they fire before the doctor lets the MR go.
  const complianceDue = scenario.beats.some(b => !state.firedBeats.includes(b.atTurn) && ['safety', 'offlabel', 'complaint', 'outside'].includes(b.event));
  if (s.close && ev.mrTurns >= 2 && !complianceDue) {
    return endWith(state, pick(persona.closings), tags, note, chips, 'The MR closed the call.');
  }

  // Scheduled scenario beat for this turn
  const beat = scenario.beats.find(b => b.atTurn <= ev.mrTurns && !state.firedBeats.includes(b.atTurn));
  if (beat) {
    const lead = s.facts.length || s.indication ? pick(persona.acknowledgements) + ' ' : '';
    if (s.facts.length) tags.push('strong');
    return { text: lead + fireBeat(state, beat), tone: state.tone, mrTags: tags, mrNote: note, chips };
  }

  // MR closes the call
  if (s.close && ev.mrTurns >= 2) {
    return endWith(state, pick(persona.closings), tags, note, chips, 'The MR closed the call.');
  }

  // Cost control: every session has a turn cap
  if (ev.mrTurns >= 12) return endWith(state, 'I need to see my next patient now. Thank you.', tags, note, chips, 'Turn limit reached.');
  if (!ev.questions && ev.mrTurns >= 2) chips.push('Ask a question');

  // Scenario beats still to come: keep the floor open rather than asking something new
  const beatsLeft = scenario.beats.some(b => !state.firedBeats.includes(b.atTurn));
  if (beatsLeft || (ev.mrTurns === 1 && !s.facts.length)) {
    const lead = s.facts.length ? pick(persona.acknowledgements) + ' ' : '';
    if (s.facts.length) tags.push('strong');
    const invite = ev.mrTurns === 1 && !s.facts.length
      ? pick(['Okay. What would you like to discuss?', 'Go ahead.', 'Yes, go on.'])
      : pick(['Go on.', 'Okay. What else?', 'And?']);
    return { text: lead + invite, tone: state.tone, mrTags: tags, mrNote: note, chips };
  }

  // Otherwise a specialty-appropriate question the doctor has not asked yet
  const q = pick(state.specialty.questions, state.askedLines);
  if (!state.askedLines.includes(q)) {
    state.askedLines.push(q);
    state.pending = { beat: { atTurn: -1, event: 'question', lines: [q] }, line: q, tries: 0 };
    ev.pendingAsked++;
    const lead = s.facts.length ? pick(persona.acknowledgements) + ' ' : '';
    if (s.facts.length) tags.push('strong');
    return { text: lead + q, tone: state.tone, mrTags: tags, mrNote: note, chips };
  }
  return { text: pick(['Anything else?', 'Okay. What else should I know?', 'Is that all?']), tone: state.tone, mrTags: tags, mrNote: note, chips };
}

function endWith(state: EngineState, text: string, tags: Tag[], note: string | undefined, chips: string[], reason: string): DoctorMove {
  state.ended = true; state.endReason = reason;
  return { text, tone: state.tone, end: true, mrTags: tags, mrNote: note, chips };
}

/** Context-aware hint (practice mode). Points to the principle, never the exact answer. */
export function hintFor(state: EngineState, used: number): string {
  const p = state.pending;
  if (p) {
    const byEvent: Record<string, string> = {
      objection: 'Clarify the concern first, then respond with approved information and check that it helped.',
      safety: 'Something the doctor said may be reportable safety information. Acknowledge it and explain it will be reported — do not judge the cause.',
      complaint: 'This sounds like a product complaint. Note the batch number if available and escalate — no promises.',
      offlabel: 'Stay within the approved indication. Unsolicited questions about other uses go to Medical Information.',
      outside: 'If it is outside your approved information, it is right to say you will confirm with the medical team.',
      dismissal: 'Acknowledge the doctor’s position and ask permission before continuing.',
      question: 'Answer the question directly from the approved product information.',
      recall: 'This is in the prescribing information — dose, administration, monitoring or warnings.',
    };
    return byEvent[p.beat.event];
  }
  const hints = state.scenario.hints;
  return hints[Math.min(used, hints.length - 1)] || 'Consider the relevant patient need, approved product information and supporting evidence.';
}

/* ---------------- scoring (brief §13–15) ---------------- */

const clamp = (n: number, max: number) => Math.max(0, Math.min(max, Math.round(n)));

export function scoreSession(state: EngineState, enabledCritical: Record<CriticalId, boolean>): Feedback {
  const { ev, scenario, persona } = state;
  const notes: Record<DimensionId, string[]> = { opening: [], need: [], product: [], science: [], pitch: [], objection: [], communication: [], compliance: [] };
  const quick = scenario.group === 'quick';

  // Opening & introduction (10)
  let opening = 0;
  if (ev.greet) opening += 3; else notes.opening.push('No greeting');
  const introNeeded = !['follow-up', 'sixty-second', 'product-recall'].includes(scenario.id);
  if (!introNeeded) opening += 4; else if (ev.intro) opening += 4; else notes.opening.push('Did not introduce yourself or the company');
  if (scenario.id === 'follow-up') { if (!ev.recalled) { opening -= 2; notes.opening.push('Did not reference the previous discussion'); } }
  if (ev.purpose) opening += 3; else notes.opening.push('Purpose of the visit was not clear');
  if (ev.mrTurns === 0) opening = 0;

  // Need identification (10)
  let need = quick ? 5 : 0;
  need += ev.needQuestions >= 2 ? 7 : ev.needQuestions === 1 ? 5 : ev.questions > 0 ? 3 : 0;
  if (ev.acks > 0) need += 3; else notes.need.push('Few signs of active listening (acknowledging what the doctor said)');
  if (!ev.needQuestions && !quick) notes.need.push('No questions about the doctor’s patients or practice');

  // Product knowledge (20)
  let product = Math.min(12, ev.facts.length * 4);
  if (ev.indication) product += 5; else notes.product.push('Approved indication not stated');
  if (!ev.inaccuracies.length && ev.facts.length) product += 3;
  product -= ev.inaccuracies.length * 6;
  if (ev.offlabelPromoted) product -= 6;
  ev.inaccuracies.forEach(i => notes.product.push(i));
  if (!ev.facts.length) notes.product.push('No approved product information was covered');

  // Scientific communication (15)
  let science = 0;
  if (ev.evidenceRefs) science += 5; else notes.science.push('No reference to evidence');
  if (ev.approvedSource) science += 5; else notes.science.push('Did not point to the prescribing information or approved material');
  if (!ev.unsupported.length && !ev.stats) science += 5; else notes.science.push('Exaggerated or unsupported statements');
  if (ev.outside.deferred) science += 5;
  if (ev.outside.guessed) { science -= 5; notes.science.push('Guessed at information outside the approved content'); }
  science -= ev.stats * 5;

  // Product pitch (10)
  let pitch = 0;
  if (ev.indication || ev.facts.length) pitch += 4; else notes.pitch.push('The pitch did not connect to the approved indication');
  const avgWords = ev.wordsPerTurn.length ? ev.wordsPerTurn.reduce((a, b) => a + b, 0) / ev.wordsPerTurn.length : 0;
  if (avgWords > 0 && avgWords <= persona.wordBudget) pitch += 3; else if (avgWords) notes.pitch.push('Messages were longer than this doctor could take');
  if (ev.closes) pitch += 3; else notes.pitch.push('No professional close or follow-up');

  // Objection handling (15)
  let objection: number;
  if (ev.objections.length) {
    const per = ev.objections.map(o => (o.clarified ? 4 : 0) + (o.responded ? 5 : 0) + (o.supported ? 3 : 0) + (o.confirmed ? 3 : 0));
    objection = per.reduce((a, b) => a + b, 0) / per.length;
    const o = ev.objections[0];
    if (!o.clarified) notes.objection.push('Did not clarify the objection before responding');
    if (!o.responded) notes.objection.push('Objection not answered with approved information');
    if (!o.supported) notes.objection.push('No supporting evidence offered');
    if (!o.confirmed) notes.objection.push('Did not check whether the answer addressed the concern');
  } else {
    const ratio = ev.pendingAsked ? ev.pendingAnswered / ev.pendingAsked : ev.mrTurns ? 0.7 : 0;
    objection = ratio * 12 + (ev.confirms ? 3 : 0);
    if (ratio < 1 && ev.pendingAsked) notes.objection.push('Some of the doctor’s questions were not answered');
  }
  if (ev.dismissals) objection = Math.min(objection, 6) + Math.min(9, ev.calmHandling * 5);

  // Communication (10)
  let communication = ev.overlong === 0 ? 4 : ev.overlong === 1 ? 2 : 0;
  if (ev.overlong) notes.communication.push(`Spoke for too long ${ev.overlong === 1 ? 'once' : `${ev.overlong} times`}`);
  communication += ev.informal ? 0 : 3;
  if (ev.informal) notes.communication.push('Informal language');
  communication += ev.hedges <= 1 ? 3 : 1;
  if (ev.hedges > 1) notes.communication.push('Hesitant delivery (fillers, hedging)');
  if (!ev.mrTurns) communication = 0;

  // Compliance (10) + critical errors (brief §14)
  if (ev.ae.raised && !ev.ae.recognised) ev.ae.ignored = true;
  const critical: CriticalId[] = [];
  if (ev.offlabelPromoted) critical.push('offlabel');
  if (ev.stats) critical.push('fabricated');
  if (ev.superiority) critical.push('superiority');
  if (ev.ae.ignored) critical.push('ignored-ae');
  if (ev.inducement) critical.push('inducement');
  let compliance = 10;
  if (ev.disparage) { compliance -= 4; notes.compliance.push('Criticised a competitor'); }
  if (ev.unsupported.length && !ev.superiority) { compliance -= 4; notes.compliance.push('Unsupported or absolute claim'); }
  if (ev.ae.investigated) { compliance -= 3; notes.compliance.push('Tried to judge causality of an adverse event'); }
  if (ev.ae.missedOnce && ev.ae.recognised) { compliance -= 2; notes.compliance.push('Adverse event recognised only after a prompt'); }
  if (ev.complaint.raised && !ev.complaint.recognised) { compliance -= 5; notes.compliance.push('Product complaint not escalated'); }
  if (ev.complaint.commitment) { compliance -= 3; notes.compliance.push('Made an unsupported commitment about the complaint'); }
  if (ev.offlabel.raised && !ev.offlabel.handled && !ev.offlabelPromoted) { compliance -= 4; notes.compliance.push('Off-label question not referred to Medical Information'); }
  const activeCritical = critical.filter(c => enabledCritical[c] !== false);
  activeCritical.forEach(c => notes.compliance.push(`Critical: ${CRITICAL_NAMES[c]}`));
  if (activeCritical.length) compliance = 0;

  const raw: Record<DimensionId, number> = { opening, need, product, science, pitch, objection, communication, compliance };
  const dimensions: DimensionScore[] = RUBRIC.map(r => ({ id: r.id, max: r.weight, score: clamp(raw[r.id], r.weight), notes: notes[r.id] }));
  const total = dimensions.reduce((a, d) => a + d.score, 0);
  const result = activeCritical.length ? 'Requires retraining' : total >= 75 ? 'Good performance' : 'Needs improvement';

  return { total, result, dimensions, critical: activeCritical, ...coachFeedback(state, dimensions, activeCritical) };
}

/* ---------------- feedback + coach (brief §15, §17, §33) ---------------- */

const DIM_COURSE: Record<DimensionId, { courseId: string; label: string; minutes: number }> = {
  opening: { courseId: 'doctor-engagement', label: 'Professional doctor engagement', minutes: 10 },
  need: { courseId: 'doctor-cabin', label: 'Listening in the doctor’s cabin', minutes: 5 },
  product: { courseId: 'elmiron-masterclass', label: 'Elmiron product knowledge', minutes: 8 },
  science: { courseId: 'scientific-communication', label: 'Scientific communication', minutes: 10 },
  pitch: { courseId: 'product-detailing', label: 'Effective product detailing', minutes: 10 },
  objection: { courseId: 'objection-handling', label: 'Handling doctor objections', minutes: 8 },
  communication: { courseId: 'communication-skills', label: 'Communication skills', minutes: 5 },
  compliance: { courseId: 'ethical-marketing', label: 'Ethical promotion and claims', minutes: 10 },
};

const DIM_SCENARIO: Record<DimensionId, ScenarioId> = {
  opening: 'first-meeting', need: 'first-meeting', product: 'product-recall', science: 'scientific-discussion',
  pitch: 'sixty-second', objection: 'efficacy-objection', communication: 'sixty-second', compliance: 'off-label',
};

function coachFeedback(state: EngineState, dims: DimensionScore[], critical: CriticalId[]) {
  const { ev, scenario, persona } = state;
  const strengths: string[] = [];
  const improvements: string[] = [];
  const better: Feedback['betterResponses'] = [];

  if (ev.greet && ev.purpose) strengths.push('Clear, professional opening with a stated purpose');
  if (ev.needQuestions) strengths.push('Asked about the doctor’s patients before pitching');
  if (ev.indication) strengths.push('Stated the approved indication');
  if (ev.facts.length >= 2 && !ev.inaccuracies.length) strengths.push('Accurate product information from the approved label');
  if (ev.approvedSource) strengths.push('Pointed the doctor to approved sources');
  if (ev.objections.some(o => o.clarified && o.responded)) strengths.push('Clarified the objection before answering it');
  if (ev.ae.recognised) strengths.push('Recognised and escalated the safety information');
  if (ev.offlabel.handled) strengths.push('Handled the off-label question correctly');
  if (ev.outside.deferred) strengths.push('Did not guess — offered to confirm with the medical team');
  if (ev.complaint.recognised && !ev.complaint.commitment) strengths.push('Treated the damaged pack as a product complaint');
  if (ev.calmHandling) strengths.push('Stayed calm and respectful when the doctor pushed back');
  if (ev.closes) strengths.push('Closed professionally with a follow-up');
  if (!ev.overlong && ev.mrTurns >= 2) strengths.push('Kept every answer concise');

  const sorted = [...dims].sort((a, b) => a.score / a.max - b.score / b.max);
  sorted.slice(0, 3).forEach(d => { if (d.score / d.max < 0.8) d.notes.filter(n => !n.startsWith('Critical:')).slice(0, 2).forEach(n => improvements.push(n)); });
  critical.forEach(c => improvements.unshift(`Critical — ${CRITICAL_NAMES[c]}. This requires retraining regardless of the overall score.`));

  if (ev.overlong) better.push({ situation: `${persona.name} with limited time`, principle: 'Lead with one approved message and offer more if they want it.', example: '"Doctor, briefly: Elmiron is indicated for bladder pain or discomfort associated with interstitial cystitis. Would it help if I left the approved dosing summary?"' });
  if (!ev.needQuestions && scenario.group !== 'quick') better.push({ situation: 'Before the product discussion', principle: 'Understand the doctor’s patients first so the information you share is relevant.', example: '"Before I start — how often do you see patients with chronic bladder pain, and what is the biggest practical challenge?"' });
  if (ev.objections.some(o => !o.clarified)) better.push({ situation: 'When an objection is raised', principle: 'Listen, clarify, respond with approved information, support it, and confirm.', example: '"Could I ask what you have seen with those patients? … The label recommends reassessing after 3 months — does that help with how you would review them?"' });
  if (ev.unsupported.length || ev.stats) better.push({ situation: 'Making a claim', principle: 'Only approved claims — no absolutes, no figures from memory, no comparisons without approval.', example: '"What I can share is what the prescribing information states, and I can send you the approved reference."' });
  if (ev.offlabelPromoted || (ev.offlabel.raised && !ev.offlabel.handled)) better.push({ situation: 'A question about another condition', principle: 'Do not discuss unapproved uses; route unsolicited questions to Medical Information.', example: '"It is approved for bladder pain or discomfort associated with interstitial cystitis. For any other use, I can ask our Medical Information team to respond to you directly."' });
  if (ev.ae.raised && (!ev.ae.recognised || ev.ae.missedOnce)) better.push({ situation: 'A patient reaction is mentioned', principle: 'Acknowledge, capture what the process requires, report within the company timeline — do not judge causality.', example: '"Thank you for telling me, doctor. I need to report this to our safety team — could I note a few details, without the patient’s identity?"' });
  if (ev.outside.guessed) better.push({ situation: 'A question outside approved information', principle: 'Saying "I will confirm" builds credibility; guessing destroys it.', example: '"I would like to confirm that with our medical team and get back to you by Friday."' });
  if (ev.complaint.raised && (!ev.complaint.recognised || ev.complaint.commitment)) better.push({ situation: 'A damaged or unusual pack', principle: 'Record what is required, escalate through the complaint process, promise nothing.', example: '"Thank you — I will log this as a product complaint. If the batch number is on the strip, that helps our quality team."' });

  // AI Coach narrative — separate from the doctor persona (brief §17)
  const coach: string[] = [];
  const diff = state.cfg.difficulty.toLowerCase();
  coach.push(`What happened: ${/^[aeiou]/.test(diff) ? 'an' : 'a'} ${diff} "${scenario.title}" call with a ${persona.name.toLowerCase()} (${state.specialty.name.toLowerCase()}). You spoke ${ev.mrTurns} time${ev.mrTurns === 1 ? '' : 's'}${state.endReason ? `, and the call ended because ${state.endReason.charAt(0).toLowerCase() + state.endReason.slice(1)}` : ''}.`);
  const why: string[] = [];
  if (ev.interruptions) why.push(`the doctor interrupted ${ev.interruptions === 1 ? 'once' : `${ev.interruptions} times`} because answers ran past what a ${persona.name.toLowerCase()} will listen to`);
  if (ev.unsupported.length || ev.stats) why.push('the doctor challenged claims that were not supported by approved information');
  if (ev.objections.length) why.push(`the scenario raised a ${ev.objections[0].category.toLowerCase()} objection to test how you listen and respond`);
  if (ev.ae.raised) why.push('the doctor mentioned a patient reaction to test safety recognition');
  if (why.length) coach.push(`Why the doctor reacted that way: ${why.join('; ')}.`);
  if (strengths.length) coach.push(`What you did well: ${strengths.slice(0, 3).join('; ').toLowerCase()}.`);
  if (improvements.length) coach.push(`What to improve: ${improvements.slice(0, 3).map(x => x.replace(/\.$/, '')).join('; ')}.`);
  coach.push(`Next time: ${scenario.hints[0]} Remember the goal — ${scenario.goal.charAt(0).toLowerCase() + scenario.goal.slice(1)}`);

  const weak = sorted.filter(d => d.score / d.max < 0.85).slice(0, 3);
  const recommended = (weak.length ? weak : sorted.slice(0, 2)).map(d => DIM_COURSE[d.id]);
  const nextScenario = critical.includes('ignored-ae') ? 'adverse-event' : critical.includes('offlabel') ? 'off-label' : DIM_SCENARIO[sorted[0].id] === scenario.id ? DIM_SCENARIO[sorted[1].id] : DIM_SCENARIO[sorted[0].id];

  return { strengths: strengths.slice(0, 5), improvements: improvements.slice(0, 5), betterResponses: better.slice(0, 3), coach, recommended, nextScenario };
}

/** Rescore a finished transcript (used for benchmarks and as the safety net over live-AI sessions). */
export function replay(cfg: SessionConfig, mrLines: string[]): { state: EngineState; turns: Turn[] } {
  const { state, opening } = startSession(cfg);
  const turns: Turn[] = [{ who: 'doctor', text: opening.text, at: 0, tone: opening.tone }];
  mrLines.forEach((line, i) => {
    if (state.ended) return;
    const move = mrTurn(state, line);
    turns.push({ who: 'mr', text: line, at: i * 20 + 10, tags: move.mrTags, note: move.mrNote });
    turns.push({ who: 'doctor', text: move.text, at: i * 20 + 15, tone: move.tone });
  });
  return { state, turns };
}
