import { Fragment, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { FLOWS, SCREEN_NAMES, type ScreenId } from '../state';
import StatusLegend from '../screens/generated/StatusLegend';

const ease = [0.2, 0.8, 0.2, 1] as const;
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: i * 0.08 } }),
};

/* ---------- status glyphs (same drawing as the design's pills) ---------- */
function Glyph({ kind, color }: { kind: 'ring' | 'part' | 'bang' | 'cross' | 'tick'; color: string }) {
  if (kind === 'ring') return <span style={{ width: 11, height: 11, borderRadius: '50%', border: `1.8px solid ${color}`, boxSizing: 'border-box' }} />;
  if (kind === 'part') return <span style={{ width: 12, height: 12, borderRadius: '50%', border: `1.8px solid ${color}`, background: `conic-gradient(${color} 0 45%,transparent 0)`, boxSizing: 'border-box' }} />;
  if (kind === 'bang') return <span style={{ width: 14, height: 14, borderRadius: '50%', background: color, color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>!</span>;
  if (kind === 'cross') return <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke={color} strokeWidth="2.8" strokeLinecap="round" /></svg>;
  return (
    <span style={{ width: 14, height: 14, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

type St = { label: string; bg: string; fg: string; kind: 'ring' | 'part' | 'bang' | 'cross' | 'tick' };
const S = {
  od: { label: 'Overdue by 3 days', bg: '#F8EAE6', fg: '#9C3B26', kind: 'cross' },
  ds: { label: 'Due in 2 days', bg: '#F7EFDD', fg: '#7A5510', kind: 'bang' },
  ip: { label: 'In progress · 45%', bg: '#E7EFF4', fg: '#2A5570', kind: 'part' },
  ns: { label: 'Not started', bg: '#F1EFE8', fg: '#585B52', kind: 'ring' },
  cp: { label: 'Completed', bg: '#E9F0E9', fg: '#35593A', kind: 'tick' },
} satisfies Record<string, St>;

function StatusPill({ s }: { s: St }) {
  return (
    <motion.span
      key={s.label}
      initial={{ opacity: 0, scale: 0.85, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: s.bg, color: s.fg, borderRadius: 999, padding: '4px 11px 4px 8px', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}
    >
      <Glyph kind={s.kind} color={s.fg} />
      {s.label}
    </motion.span>
  );
}

/* ---------- hero visual: a queue that works itself down ---------- */
const QUEUE: { title: string; meta: string; steps: St[] }[] = [
  { title: 'Adverse Event Reporting for Field Staff', meta: 'Compliance · 45 min', steps: [S.od, S.ip, S.cp] },
  { title: 'UCPMP 2024 — Ethical Promotion', meta: 'Compliance · 1 h 10 min', steps: [S.ds, S.ip, S.cp] },
  { title: 'Elmiron — Product Training', meta: 'Product Training · v2.0', steps: [S.ip, S.ip, S.cp] },
  { title: 'IC / BPS — Disease Awareness', meta: 'Disease Awareness · 1 h 20 min', steps: [S.ns, S.ip, S.cp] },
];

function HeroQueue() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 10), 1300);
    return () => clearInterval(id);
  }, []);
  // each row advances one step every few ticks, staggered; the whole loop resets at 0
  const stepFor = (row: number) => Math.max(0, Math.min(2, Math.floor((tick - row) / 2)));
  const done = QUEUE.filter((_, i) => stepFor(i) === 2).length;

  return (
    <motion.div
      className="hero-queue"
      initial={{ opacity: 0, y: 30, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.35 }}
    >
      <div className="hq-head">
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: '#585B52' }}>Mandatory and due</div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-.03em' }}>Rahul More · South Mumbai</div>
        </div>
        <div className="hq-count">
          <motion.span key={done} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>{done}</motion.span>
          <span style={{ color: '#585B52', fontSize: 14, fontWeight: 500 }}>&nbsp;of {QUEUE.length} done</span>
        </div>
      </div>
      <div className="hq-bar"><motion.div animate={{ width: `${(done / QUEUE.length) * 100}%` }} transition={{ duration: 0.6, ease }} /></div>
      {QUEUE.map((r, i) => (
        <motion.div
          key={r.title}
          className="hq-row"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease }}
        >
          <div style={{ minWidth: 0 }}>
            <div className="hq-title">{r.title}</div>
            <div style={{ fontSize: 13.5, color: '#585B52' }}>{r.meta}</div>
          </div>
          <StatusPill s={r.steps[stepFor(i)]} />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ---------- page ---------- */
export default function Landing({ go }: { go: (s: ScreenId | null) => void }) {
  const { scrollY } = useScroll();
  const navShadow = useTransform(scrollY, [0, 40], ['0 0 0 rgba(20,21,15,0)', '0 8px 24px -16px rgba(20,21,15,.35)']);
  const blobY = useTransform(scrollY, [0, 600], [0, 120]);
  const words = ['Assigned,', 'due,', 'done.'];

  return (
    <div className="landing">
      <motion.header className="l-nav" style={{ boxShadow: navShadow }}>
        <div className="l-wrap l-nav-inner">
          <a className="brand" href="#/" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <motion.span className="brand-mark" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} />
            <span className="brand-name">Elmiron Field</span>
            <span className="brand-dot" />
            <span className="brand-sub">Learning demo</span>
          </a>
          <nav className="l-links">
            <a href="#statuses" onClick={e => { e.preventDefault(); document.getElementById('statuses')?.scrollIntoView({ behavior: 'smooth' }); }}>Statuses</a>
            <a href="#flows" onClick={e => { e.preventDefault(); document.getElementById('flows')?.scrollIntoView({ behavior: 'smooth' }); }}>Flows</a>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => go('l1')}>Start demo</button>
          </nav>
        </div>
      </motion.header>

      <section className="hero l-wrap">
        <motion.div className="hero-blob" style={{ y: blobY }} aria-hidden />
        <div className="hero-copy">
          <motion.div className="eyebrow" variants={rise} initial="hidden" animate="show">
            36 courses · 14 AI Doctor scenarios · 32 screens
          </motion.div>
          <h1 className="hero-title">
            {words.map((w, i) => (
              <Fragment key={w}>
                <span className="word-mask">
                  <motion.span
                    style={{ display: 'inline-block' }}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.12 }}
                  >
                    {w}
                  </motion.span>
                </span>
                {i < words.length - 1 && ' '}
              </Fragment>
            ))}
          </h1>
          <motion.p className="hero-lead" variants={rise} initial="hidden" animate="show" custom={4}>
            A capability-development platform for Medical Representatives: from "I know very little about pharmaceutical selling" to
            certified in product, doctor engagement, territory, compliance and global markets — then practising safely with an AI Doctor.
          </motion.p>
          <motion.div className="hero-card" variants={rise} initial="hidden" animate="show" custom={5}>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: '#585B52', marginBottom: 10 }}>Presenting this</div>
            <p style={{ margin: '0 0 16px', fontSize: 15, lineHeight: 1.6 }}>
              Demo mode shows one screen at a time at full size. Try the loop{' '}
              <strong>Learn → course → lesson → AI Doctor → coaching → certification</strong>, then switch to the manager and admin views.
            </p>
            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => go('l1')}>
                Start as MR
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="btn-arrow"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" className="btn btn-wash" onClick={() => go('b1')}>Start as manager</button>
              <button type="button" className="btn btn-wash" onClick={() => go('c1')}>Start as admin</button>
            </div>
          </motion.div>
        </div>
        <HeroQueue />
      </section>

      <section id="statuses" className="l-wrap l-section">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={rise}>
          <div className="section-kicker">00 — Before the screens</div>
          <h2 className="section-title">Every course status, glyph first.</h2>
          <p className="section-lead">
            One pill component carries every status in the module, on every screen and table. The glyph and the word are both mandatory;
            the colour is the third signal, never the only one.
          </p>
        </motion.div>
        <motion.div className="legend-wrap" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={rise} custom={1}>
          <StatusLegend />
        </motion.div>
      </section>

      <section id="whats-new" className="l-wrap l-section">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={rise}>
          <div className="section-kicker">01 — Capability, not just product training</div>
          <h2 className="section-title">Learn → practise → get coached → certify.</h2>
          <p className="section-lead">Every course follows one template, every score comes from a defined assessment, and every piece of doctor-engagement training stays inside approved information and compliance.</p>
        </motion.div>
        <div className="feature-grid">
          {[
            { k: 'Curriculum', t: '36 courses, Beginner → Certification', d: 'Industry, Indian and global markets, doctor engagement, detailing, objections, scientific communication, territory, channel, digital, compliance and leadership.', to: 'a2' as ScreenId },
            { k: 'AI Doctor', t: 'Practise with a realistic doctor', d: 'Nine personas, fourteen scenarios, four difficulty levels, voice or text. The doctor challenges you; the AI Coach scores you on an eight-part rubric.', to: 'p1' as ScreenId },
            { k: 'Compliance', t: 'Critical errors override the score', d: 'Off-label promotion, invented evidence, unsupported superiority, ignored adverse events and inducements mean "Requires retraining".', to: 'p2' as ScreenId },
            { k: 'Paths', t: 'Paths, onboarding and certification', d: 'New MR, senior MR, international business and manager paths; an 8-week onboarding; four certification levels.', to: 'l4' as ScreenId },
            { k: 'Manager', t: 'Coaching, not surveillance', d: 'Team practice trends, compliance flags and assignment reviews, with transcript access set by company policy.', to: 'b3' as ScreenId },
            { k: 'Admin', t: 'Change content without code', d: 'Publish courses from a template, assign paths, edit approved claims, tune AI cost controls and run benchmark QA.', to: 'c7' as ScreenId },
          ].map((f, i) => (
            <motion.button key={f.k} type="button" className="feature" onClick={() => go(f.to)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={rise} custom={i % 3} whileHover={{ y: -4 }}>
              <span className="feature-k">{f.k}</span>
              <span className="feature-t">{f.t}</span>
              <span className="feature-d">{f.d}</span>
              <span className="feature-go">Open <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </motion.button>
          ))}
        </div>
      </section>

      <section id="flows" className="l-wrap l-section">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={rise}>
          <div className="section-kicker">02 — The screens</div>
          <h2 className="section-title">Three roles, one module.</h2>
          <p className="section-lead">Jump into any screen. Everything inside is clickable, and the demo bar at the bottom moves you between screens.</p>
        </motion.div>
        <div className="flows">
          {FLOWS.map((f, fi) => (
            <motion.div
              key={f.key}
              className="flow-card"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={rise}
              custom={fi}
              whileHover={{ y: -4 }}
            >
              <div className="flow-card-head">
                <span className={'flow-tag flow-' + f.key}>Flow {f.key}</span>
                <span className="flow-role">{f.role}</span>
              </div>
              <div className="flow-title">{f.title}</div>
              <p className="flow-blurb">{f.blurb}</p>
              <div className="flow-screens">
                {f.screens.map(id => (
                  <button type="button" key={id} className="screen-chip" onClick={() => go(id)}>
                    <span className="demobar-code">{SCREEN_NAMES[id].split(' ')[0]}</span>
                    <span>{SCREEN_NAMES[id].split(' ').slice(1).join(' ')}</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="chip-arrow"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="l-wrap l-footer">
        <span className="brand-mark" style={{ width: 18, height: 18, borderRadius: 6 }} />
        <span>Elmiron Field · Learning demo</span>
        <span style={{ marginLeft: 'auto' }}>Today is 24 Sep 2026 · All times IST</span>
      </footer>
    </div>
  );
}
