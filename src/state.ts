import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from 'react';
import { BESPOKE, allCourses, progressOf } from './content';
import { getLearn } from './content/learnStore';
import { CATEGORIES, LEVELS } from './content/types';

export type ScreenId =
  | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a6b' | 'a6c' | 'a7' | 'a7b' | 'a8' | 'a9'
  | 'l1' | 'l2' | 'l3' | 'l4' | 'l5'
  | 'p1' | 'p2' | 'p3' | 'p4' | 'p5'
  | 'b1' | 'b2' | 'b3'
  | 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7';

export const SCREEN_NAMES: Record<ScreenId, string> = {
  l1: 'L1 Learn', a1: 'A1 Learning home', a2: 'A2 Browse courses', l2: 'L2 Course', l3: 'L3 Lesson', l4: 'L4 Paths & certification', l5: 'L5 Role-play & cases',
  a3: 'A3 Course detail', a4: 'A4 Video lesson',
  a5: 'A5 Document lesson', a6: 'A6 Assessment · Q7', a6b: 'A6 Assessment · Q8', a6c: 'A6 Submit',
  a7: 'A7 Result · passed', a7b: 'A7 Result · not cleared', a8: 'A8 Certificate', a9: 'A9 Training history',
  p1: 'P1 Practice with AI Doctor', p2: 'P2 Session setup', p3: 'P3 Live session', p4: 'P4 Session feedback', p5: 'P5 My progress',
  b1: 'B1 Team training', b2: 'B2 MR record', b3: 'B3 AI practice & assignments',
  c1: 'C1 Admin dashboard', c2: 'C2 Course builder',
  c3: 'C3 Question bank', c4: 'C4 Assign course', c5: 'C5 Reports', c6: 'C6 Curriculum & paths', c7: 'C7 AI Doctor admin',
};
export const SCREEN_IDS = Object.keys(SCREEN_NAMES) as ScreenId[];

export const FLOWS: { key: 'A' | 'B' | 'C'; title: string; role: string; blurb: string; screens: ScreenId[] }[] = [
  { key: 'A', title: 'The MR learner', role: 'MR', blurb: 'Learn → course → lesson → assessment → certificate, then practise with the AI Doctor.', screens: ['l1', 'a1', 'a2', 'l2', 'l3', 'l4', 'l5', 'a3', 'a4', 'a5', 'a6', 'a6b', 'a6c', 'a7', 'a7b', 'a8', 'a9', 'p1', 'p2', 'p3', 'p4', 'p5'] },
  { key: 'B', title: 'The manager', role: 'Manager', blurb: 'Exception-first. Who needs help, how practice is going, what to review.', screens: ['b1', 'b2', 'b3'] },
  { key: 'C', title: 'The training admin', role: 'Admin', blurb: 'Build courses and paths, configure the AI Doctor, report on everything.', screens: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'] },
];

/** Screens that need a parameter get a sensible default when opened from a menu. */
export const DEFAULT_PARAMS: Partial<Record<ScreenId, string>> = {
  l2: 'product-detailing', l3: 'product-detailing', p4: 'latest',
};

type PillKey = 'ns' | 'ip' | 'ds' | 'od' | 'fr' | 'fx' | 'cp' | 'ex';
export type Pill = { label: string; bg: string; fg: string; ring: boolean; part: boolean; bang: boolean; cross: boolean; tick: boolean; dash: boolean };
function pill(k: PillKey, label: string): Pill {
  const ST: Record<PillKey, [string, string, string]> = {
    ns: ['#F1EFE8', '#585B52', 'ring'], ip: ['#E7EFF4', '#2A5570', 'part'], ds: ['#F7EFDD', '#7A5510', 'bang'], od: ['#F8EAE6', '#9C3B26', 'cross'],
    fr: ['#F7EFDD', '#7A5510', 'bang'], fx: ['#F8EAE6', '#9C3B26', 'cross'], cp: ['#E9F0E9', '#35593A', 'tick'], ex: ['#F1EFE8', '#585B52', 'dash'],
  };
  const p = ST[k];
  return { label, bg: p[0], fg: p[1], ring: p[2] === 'ring', part: p[2] === 'part', bang: p[2] === 'bang', cross: p[2] === 'cross', tick: p[2] === 'tick', dash: p[2] === 'dash' };
}

const INITIAL = {
  outline: true, watched: 62, playing: false, page: 6, ack: false, ackDone: false, q7: 1, q8: [0] as number[], cat: 'All', lvl: 'All levels', q: '',
  sent: {} as Record<string, boolean>, aud: { mu: 1, ms: 1, pu: 1, na: 1, ng: 0, go: 0 } as Record<string, number>, audTab: 'Area',
  ltype: 'video', ackReq: false, skipAhead: false, active: { 'Q-0107': false, 'Q-0233': false } as Record<string, boolean>, tab: 'Course',
  rem: { b7: 1, b3: 1, b1: 1, a1: 1, a3: 1, a7: 1 } as Record<string, number>, mand: true, sq: true, so: true, sa: false,
};
type S = typeof INITIAL;

/** Hash routing: '#/' is the landing page, '#/a1' a screen, '#/l2/<course>' a screen with parameters. */
function readHash(): { screen: ScreenId | null; params: string[] } {
  const parts = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const id = parts[0] as ScreenId;
  return SCREEN_IDS.includes(id) ? { screen: id, params: parts.slice(1) } : { screen: null, params: [] };
}

/** Navigate to a screen with optional parameters from anywhere. */
export function navTo(screen: ScreenId | null, ...params: string[]) {
  const path = screen ? [screen, ...params].map(encodeURIComponent).join('/') : '';
  window.location.hash = '/' + path;
}

export function useRoute(): [ScreenId | null, (s: ScreenId | null) => void, string[]] {
  const [route, setRoute] = useState(readHash);
  useEffect(() => {
    const on = () => setRoute(readHash());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const go = useCallback((s: ScreenId | null) => {
    const def = s ? DEFAULT_PARAMS[s] : undefined;
    if (def) navTo(s, ...def.split('/')); else navTo(s);
  }, []);
  return [route.screen, go, route.params];
}

export function useDemo(go: (s: ScreenId | null) => void) {
  const [s, set] = useState<S>(INITIAL);
  const setState = useCallback((u: Partial<S> | ((st: S) => Partial<S>)) => set(st => ({ ...st, ...(typeof u === 'function' ? u(st) : u) })), []);

  const pause = useCallback(() => setState({ playing: false }), [setState]);

  // Simulated video playback on A4: the watched share creeps up while playing.
  useEffect(() => {
    if (!s.playing) return;
    const id = window.setInterval(() => {
      set(st => {
        const watched = Math.min(100, st.watched + 0.5);
        return { ...st, watched, playing: watched < 100 };
      });
    }, 120);
    return () => window.clearInterval(id);
  }, [s.playing]);

  return useMemo(() => {
    const goMap = Object.fromEntries(SCREEN_IDS.map(i => [i, () => go(i)])) as Record<ScreenId, () => void>;
    const P = pill;

    // A2 — the full capability catalogue. The design's eight courses keep their statuses; the rest come from progress.
    const DESIGN_STATUS: Record<string, Pill> = {
      'elmiron-product': P('ip', 'In progress · 45%'), 'ic-bps-awareness': P('ns', 'Not started'), 'ucpmp-2024': P('ds', 'Due in 2 days'),
      'ae-reporting': P('od', 'Overdue by 3 days'), 'sample-sop': P('fr', 'Failed · 2 retakes left'), 'cost-objections': P('ns', 'Not started'),
      'doctor-cabin': P('cp', 'Completed'), 'mr-induction': P('cp', 'Completed'),
    };
    const ORDER = Object.keys(DESIGN_STATUS);
    const learn = getLearn();
    const catName = (id: string) => CATEGORIES.find(c => c.id === id)?.name ?? id;
    const COURSES = allCourses()
      .slice()
      .sort((a, b) => (ORDER.indexOf(a.id) + 1 || 99) - (ORDER.indexOf(b.id) + 1 || 99))
      .map(c => {
        const pct = progressOf(c);
        const fin = learn.finals[c.id];
        const status = DESIGN_STATUS[c.id] ?? (fin?.passed || pct >= 100 ? P('cp', 'Completed') : fin && !fin.passed ? P('fr', 'Not cleared · retake') : pct > 0 ? P('ip', `In progress · ${pct}%`) : P('ns', 'Not started'));
        return { id: c.id, title: c.title, cat: catName(c.category), level: c.level, meta: `${c.duration} · ${c.modules.length} modules · ${c.level}`, req: c.mandatory ? 'Mandatory' : 'Optional', p: status };
      });
    const CATS = ['All', ...CATEGORIES.map(c => c.name), 'Refresher'];
    const ql = s.q.trim().toLowerCase();
    const courseList = COURSES.filter(c => (s.cat === 'All' || c.cat === s.cat) && (s.lvl === 'All levels' || c.level === s.lvl) && (!ql || c.title.toLowerCase().includes(ql)))
      .map(c => ({ ...c, open: () => (BESPOKE[c.id] ? go(BESPOKE[c.id]) : navTo('l2', c.id)) }));
    const cats = CATS.map(n => ({ name: n, bg: n === s.cat ? '#1F211C' : '#F1EFE8', fg: n === s.cat ? '#FFFFFF' : '#1F211C', pick: () => setState({ cat: n }) }));
    const levels = ['All levels', ...LEVELS].map(n => ({ name: n, on: n === s.lvl, pick: () => setState({ lvl: n }) }));
    const emptyTitle = ql ? `No courses match “${s.q.trim()}”` : `No courses in ${s.cat === 'All' ? s.lvl : s.cat} yet`;
    const emptyBody = ql
      ? (s.cat === 'All' ? 'Check the spelling, or try a shorter word.' : `You're searching inside ${s.cat} only. Clear the filter to search every category.`)
      : 'The training team hasn’t published anything in this category. Assigned courses will also appear on your home screen.';

    // A4 / A5
    const unlocked = s.watched >= 90;
    const pageEnd = s.page >= 14;

    // A6
    const O7 = ['Option A — sample content, pending medical review.', 'Option B — sample content, pending medical review.', 'Option C — sample content, pending medical review.', 'Option D — sample content, pending medical review.'];
    const opts7 = O7.map((t, i) => ({ t, letter: 'ABCD'[i], sel: s.q7 === i, unsel: s.q7 !== i, pick: () => setState({ q7: i }) }));
    const O8 = ['Report it to pharmacovigilance within 24 hours, even if you are not sure the product caused it', 'Note the doctor’s name and the date you first heard about it', 'Wait until the doctor confirms the product caused the reaction', 'Write down the patient’s full name and phone number for follow-up'];
    const opts8 = O8.map((t, i) => {
      const on = s.q8.includes(i);
      return { t, sel: on, unsel: !on, pick: () => setState(st => ({ q8: st.q8.includes(i) ? st.q8.filter(x => x !== i) : [...st.q8, i] })) };
    });
    const nav = Array.from({ length: 20 }, (_, i) => { const n = i + 1; const cur = n === 7; const ans = n < 7; return { n, cur, ans: !cur && ans, open: !cur && !ans }; });
    const nav8 = Array.from({ length: 20 }, (_, i) => { const n = i + 1; const cur = n === 8; const ans = n < 8; return { n, cur, ans: !cur && ans, open: !cur && !ans }; });

    // B1
    const B1: [string, string, string, string, Pill, string, string, string, string][] = [
      ['iq', 'Imran Qureshi', 'Navi Mumbai', 'Adverse Event Reporting for Field Staff', P('od', 'Overdue by 6 days'), 'Was due 18 Sep 2026', '0 of 3', 'Escalated to you 21 Sep', 'Send reminder'],
      ['rm', 'Pratham Shrivastav', 'South Mumbai', 'Adverse Event Reporting for Field Staff', P('od', 'Overdue by 3 days'), 'Was due 21 Sep 2026', '0 of 3', 'Not started', 'Send reminder'],
      ['ar', 'Anita Rane', 'Dadar', 'UCPMP 2024 — Ethical Promotion', P('fx', 'Failed · no attempts left'), 'Due 26 Sep 2026', '3 of 3', '58%, 66%, 71%', 'Request reset'],
      ['ps', 'Priya Sethi', 'Thane', 'Elmiron — Product Training · v2.0', P('fr', 'Failed · 2 retakes left'), 'Due 30 Sep 2026', '1 of 3', '64% · retake from 25 Sep', 'Send reminder'],
    ];
    const b1rows = B1.map((r, i) => ({
      id: r[0], name: r[1], terr: r[2], course: r[3], p: r[4], due: r[5], att: r[6], attSub: r[7], action: r[8],
      sent: !!s.sent[r[0]], unsent: !s.sent[r[0]], sentLabel: r[8] === 'Request reset' ? 'Reset requested 14:05' : 'Reminder sent 14:05',
      last: i === B1.length - 1, open: r[0] === 'rm' ? goMap.b2 : undefined,
      send: () => setState(st => ({ sent: { ...st.sent, [r[0]]: true } })),
    }));

    // C3
    const BANK = [
      ['Q-0101', 'Sample content — pending medical review.', 'Elmiron — Product Training', 'Product overview', 'Easy'],
      ['Q-0107', 'Sample content — pending medical review.', 'Elmiron — Product Training', 'Product overview', 'Medium'],
      ['Q-0142', 'Sample content — pending medical review.', 'Elmiron — Product Training', 'Mechanism and use', 'Hard'],
      ['Q-0215', 'A doctor mentions an unexpected reaction in a patient. Which of these should you do?', 'Elmiron — Product Training', 'Safety reporting', 'Medium'],
      ['Q-0233', 'Within how many hours must you report an adverse event you heard about?', 'Adverse Event Reporting', 'Timelines', 'Easy'],
      ['Q-0301', 'Under UCPMP 2024, which of these may you give a doctor?', 'UCPMP 2024', 'Gifts and hospitality', 'Medium'],
      ['Q-0318', 'A doctor asks you to sponsor travel to a conference. What is the correct response?', 'UCPMP 2024', 'Sponsorship', 'Hard'],
      ['Q-0402', 'Which document must be signed when you leave samples with a doctor?', 'Sample Distribution SOP', 'Sample handling', 'Easy'],
    ];
    const bank = BANK.map(b => {
      const on = s.active[b[0]] !== false;
      return { id: b[0], q: b[1], course: b[2], topic: b[3], diff: b[4], on, off: !on, toggle: () => setState(st => ({ active: { ...st.active, [b[0]]: !on } })) };
    });
    const activeCount = 100 - bank.filter(b => b.off).length;

    // C4
    const AREAS: [string, string, string, number][] = [['mu', 'Mumbai', 'R. Deshpande', 12], ['ms', 'Mumbai Suburban', 'K. Bhosale', 13], ['pu', 'Pune', 'S. Joshi', 12], ['na', 'Nashik', 'A. Patil', 11], ['ng', 'Nagpur', 'V. Rao', 9], ['go', 'Goa', 'F. D’Souza', 8]];
    const areas = AREAS.map(a => ({ id: a[0], name: a[1], mgr: a[2], n: a[3] + ' MRs', on: !!s.aud[a[0]], off: !s.aud[a[0]], toggle: () => setState(st => ({ aud: { ...st.aud, [a[0]]: st.aud[a[0]] ? 0 : 1 } })) }));
    const audCount = AREAS.reduce((t, a) => t + (s.aud[a[0]] ? a[3] : 0), 0);
    const audAreas = AREAS.filter(a => s.aud[a[0]]).length;
    const audMgrs = AREAS.filter(a => s.aud[a[0]]).map(a => a[2]).join(', ');
    const audTabs = ['Region', 'Area', 'Territory', 'Role', 'Individual'].map(t => ({
      t, bg: t === s.audTab ? '#FFFFFF' : 'transparent', fw: t === s.audTab ? '600' : '500', sh: t === s.audTab ? '0 1px 2px rgba(20,21,15,.08)' : 'none', pick: () => setState({ audTab: t }),
    }));
    const REM = [['b7', '7 days before'], ['b3', '3 days before'], ['b1', '1 day before'], ['a1', '1 day after'], ['a3', '3 days after'], ['a7', '7 days after']];
    const rems = REM.map(r => ({ l: r[1], on: !!s.rem[r[0]], off: !s.rem[r[0]], toggle: () => setState(st => ({ rem: { ...st.rem, [r[0]]: st.rem[r[0]] ? 0 : 1 } })) }));

    // C5
    const REP: Record<string, { cols: string; head: string[]; rows: string[][] }> = {
      Course: { cols: '2.2fr .8fr .9fr .9fr .9fr .8fr .9fr 1.1fr', head: ['Course', 'Version', 'Assigned', 'Completed', 'Completion', 'Overdue', 'Avg score', 'First-attempt pass'], rows: [['Elmiron — Product Training', 'v2.0', '412', '268', '65%', '21', '84%', '78%'], ['Interstitial Cystitis / Bladder Pain Syndrome — Disease Awareness', 'v1.0', '412', '131', '32%', '0', '81%', '74%'], ['UCPMP 2024 — Ethical Promotion', 'v1.2', '412', '355', '86%', '18', '79%', '69%'], ['Adverse Event Reporting for Field Staff', 'v3.0', '412', '349', '85%', '38', '88%', '91%'], ['Sample Distribution SOP', 'v2.0', '386', '341', '88%', '9', '83%', '80%'], ['New MR Induction', 'v4.1', '112', '104', '93%', '8', '86%', '82%']] },
      User: { cols: '1.6fr 1.1fr 1.1fr .8fr .9fr .8fr .9fr 1.1fr', head: ['MR', 'Territory', 'Manager', 'Assigned', 'Completed', 'Overdue', 'Avg score', 'Last active'], rows: [['Pratham Shrivastav', 'South Mumbai', 'R. Deshpande', '13', '8', '1', '87%', '22 Sep 2026 18:40'], ['Priya Sethi', 'Thane', 'R. Deshpande', '13', '9', '0', '78%', '24 Sep 2026 09:12'], ['Imran Qureshi', 'Navi Mumbai', 'R. Deshpande', '13', '7', '1', '82%', '19 Sep 2026 20:05'], ['Anita Rane', 'Dadar', 'R. Deshpande', '13', '9', '0', '71%', '23 Sep 2026 21:30'], ['S. Kamble', 'Andheri East', 'K. Bhosale', '13', '12', '0', '90%', '24 Sep 2026 08:55'], ['M. Shaikh', 'Borivali', 'K. Bhosale', '13', '10', '1', '80%', '21 Sep 2026 17:20']] },
      Assessment: { cols: '2.2fr .8fr .9fr .9fr .9fr .9fr .9fr 1fr', head: ['Assessment', 'Version', 'Attempts', 'Passed', 'Not cleared', 'Avg score', 'Avg time', 'No attempts left'], rows: [['Elmiron — Product Training', 'v2.0', '341', '268', '73', '84%', '24 min', '3'], ['UCPMP 2024 — Ethical Promotion', 'v1.2', '498', '355', '143', '79%', '19 min', '11'], ['Adverse Event Reporting for Field Staff', 'v3.0', '381', '349', '32', '88%', '14 min', '1'], ['Sample Distribution SOP', 'v2.0', '402', '341', '61', '83%', '12 min', '2'], ['Interstitial Cystitis / Bladder Pain Syndrome — Disease Awareness', 'v1.0', '170', '131', '39', '81%', '21 min', '0'], ['New MR Induction', 'v4.1', '127', '104', '23', '86%', '38 min', '0']] },
      Compliance: { cols: '1.4fr 1.2fr .7fr 1fr 1.1fr .8fr 1fr 1fr', head: ['Area', 'Manager', 'MRs', 'Mandatory due', 'Done on time', 'Overdue', 'Compliance', 'Escalations'], rows: [['Mumbai', 'R. Deshpande', '12', '60', '52', '3', '75%', '1'], ['Mumbai Suburban', 'K. Bhosale', '13', '65', '61', '2', '85%', '0'], ['Pune', 'S. Joshi', '12', '60', '57', '1', '92%', '0'], ['Nashik', 'A. Patil', '11', '55', '49', '4', '82%', '2'], ['Nagpur', 'V. Rao', '9', '45', '44', '0', '100%', '0'], ['Goa', 'F. D’Souza', '8', '40', '35', '2', '88%', '1']] },
    };
    const rep = REP[s.tab];
    const repTabs = Object.keys(REP).map(t => ({ t, fg: t === s.tab ? '#35593A' : '#585B52', fw: t === s.tab ? '600' : '500', bar: t === s.tab ? 'inset 0 -2px 0 #35593A' : 'none', pick: () => setState({ tab: t }) }));
    const repRows = rep.rows.map(r => ({ first: r[0], rest: r.slice(1).map(v => ({ v })) }));

    return {
      go: goMap, tab: s.tab,
      // A2
      cats, courseList, hasCourses: courseList.length > 0, noCourses: courseList.length === 0, emptyTitle, emptyBody, q: s.q,
      onQ: (e: ChangeEvent<HTMLInputElement>) => setState({ q: e.target.value }),
      clearFilters: () => setState({ q: '', cat: 'All', lvl: 'All levels' }),
      levels,
      // A4
      outlineOpen: s.outline, outlineClosed: !s.outline, toggleOutline: () => setState(st => ({ outline: !st.outline })),
      watched: Math.floor(s.watched), watchedPct: s.watched + '%', locked: !unlocked, unlocked,
      watchLeft: Math.max(0, 90 - Math.floor(s.watched)),
      watchLeftTime: (() => { const sec = Math.max(0, Math.round((90 - s.watched) / 100 * 720)); return `${Math.floor(sec / 60)} min ${sec % 60} s`; })(),
      timeLabel: (() => { const sec = Math.round(s.watched / 100 * 720); return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`; })(),
      playing: s.playing, paused: !s.playing,
      togglePlay: () => setState(st => ({ playing: !st.playing && st.watched < 100 })),
      pause,
      skipWatch: () => setState({ watched: 92, playing: false }), resetWatch: () => setState({ watched: 62, playing: false }),
      // A5
      page: s.page, pagePct: Math.round(s.page / 14 * 100) + '%', notEnd: !pageEnd, atEnd: pageEnd,
      ackOn: s.ack, ackOff: !s.ack, ackReady: pageEnd && !s.ack && !s.ackDone, ackCan: pageEnd && s.ack && !s.ackDone, ackDone: s.ackDone, ackPending: !s.ackDone,
      toEnd: () => setState({ page: 14 }), prevPage: () => setState(st => ({ page: Math.max(1, st.page - 1) })), nextPage: () => setState(st => ({ page: Math.min(14, st.page + 1) })),
      toggleAck: () => { if (pageEnd && !s.ackDone) setState(st => ({ ack: !st.ack })); },
      confirmAck: () => setState({ ackDone: true }),
      // A6
      opts7, opts8, nav, nav8, q8count: s.q8.length,
      // B1
      b1rows,
      // C2
      isVideo: s.ltype === 'video', isPdf: s.ltype === 'pdf', isText: s.ltype === 'text',
      ltVideo: s.ltype === 'video' ? '#FFFFFF' : 'transparent', ltPdf: s.ltype === 'pdf' ? '#FFFFFF' : 'transparent', ltText: s.ltype === 'text' ? '#FFFFFF' : 'transparent',
      setVideo: () => setState({ ltype: 'video' }), setPdf: () => setState({ ltype: 'pdf', ackReq: true }), setText: () => setState({ ltype: 'text' }),
      ackReqOn: s.ackReq, ackReqOff: !s.ackReq, toggleAckReq: () => setState(st => ({ ackReq: !st.ackReq })),
      skipOn: s.skipAhead, skipOff: !s.skipAhead, toggleSkip: () => setState(st => ({ skipAhead: !st.skipAhead })),
      // C3
      bank, activeCount,
      sqOn: s.sq, sqOff: !s.sq, toggleSq: () => setState(st => ({ sq: !st.sq })),
      soOn: s.so, soOff: !s.so, toggleSo: () => setState(st => ({ so: !st.so })),
      saOn: s.sa, saOff: !s.sa, toggleSa: () => setState(st => ({ sa: !st.sa })),
      // C4
      areas, audCount, audAreas, audMgrs, audTabs, rems, hasAud: audCount > 0, noAud: audCount === 0,
      mandOn: s.mand, mandOff: !s.mand, toggleMand: () => setState(st => ({ mand: !st.mand })),
      // C5
      rep, repTabs, repRows,
    };
  }, [s, go, setState, pause]);
}

export type DemoValues = ReturnType<typeof useDemo>;
