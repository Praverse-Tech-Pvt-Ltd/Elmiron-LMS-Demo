import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navTo } from '../../state';
import { MICRO, PATHS, allCourses, courseById, progressOf } from '../../content';
import { useLearn, seedIfNeeded } from '../../content/learnStore';
import { computeSkills } from '../../content/skills';
import { useAiStore } from '../../ai/store';
import type { Course, Micro } from '../../content/types';
import { Bar, Button, C, Card, Pill, SectionTitle, Shell, Tag, LevelTag } from '../../components/ui';
import { openCourse, nextLesson } from './nav';

const TODAY = 'Wed';

function MicroSheet({ m, onClose }: { m: Micro; onClose: () => void }) {
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [onClose]);
  return (
    <motion.div className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="sheet" role="dialog" aria-modal="true" aria-label={m.title} initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} onClick={e => e.stopPropagation()}>
        <div className="row" style={{ gap: 8, marginBottom: 8 }}><Tag tone="green">{m.kind}</Tag><Tag>{m.minutes} min</Tag></div>
        <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-.015em', margin: '0 0 8px' }}>{m.title}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: C.ink2, margin: '0 0 14px' }}>{m.body}</p>
        <ol className="micro-points">{m.points.map((p, i) => <motion.li key={p} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.08 }}>{p}</motion.li>)}</ol>
        <div className="row" style={{ gap: 8, marginTop: 18 }}>
          <Button kind="primary" onClick={onClose}>Done</Button>
          {m.courseId && courseById(m.courseId) && <Button onClick={() => { onClose(); openCourse(m.courseId!); }}>Open the full course</Button>}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MandatoryRow({ c, i }: { c: Course; i: number }) {
  const learn = useLearn();
  const pct = progressOf(c);
  const final = learn.finals[c.id];
  const due: Record<string, ReactNode> = {
    'elmiron-masterclass': <Pill kind="ip" pct={pct}>Certification · {pct}%</Pill>,
    'ae-reporting': <Pill kind="od">Overdue by 3 days</Pill>,
    'ucpmp-2024': <Pill kind="due">Due in 2 days</Pill>,
    'sample-sop': <Pill kind="due">Failed · 2 retakes left</Pill>,
    'ethical-marketing': <Pill kind="cp">Valid · recertify Jun 2027</Pill>,
    'elmiron-product': <Pill kind="ip" pct={pct}>In progress · {pct}%</Pill>,
  };
  return (
    <motion.div className="learn-row tap" onClick={() => openCourse(c.id)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 15.5, fontWeight: 600 }}>{c.title}</div>
        <div className="row" style={{ gap: 10, marginTop: 6 }}>
          <Bar pct={final?.passed ? 100 : pct} height={5} delay={0.2 + i * 0.05} />
          <span className="muted" style={{ fontSize: 13, width: 36, textAlign: 'right' }}>{final?.passed ? 100 : pct}%</span>
        </div>
      </div>
      <div style={{ width: 210, display: 'flex', justifyContent: 'flex-end' }}>{due[c.id] ?? <Pill kind={pct ? 'ip' : 'ns'} pct={pct}>{pct ? `In progress · ${pct}%` : 'Not started'}</Pill>}</div>
    </motion.div>
  );
}

export default function LearnHub() {
  const learn = useLearn();
  const { sessions } = useAiStore();
  const [micro, setMicro] = useState<Micro | null>(null);
  const [len, setLen] = useState<2 | 5 | 10>(5);
  useEffect(() => { seedIfNeeded(allCourses()); }, []);

  const courses = allCourses();
  const mandatory = ['ae-reporting', 'ucpmp-2024', 'sample-sop', 'elmiron-masterclass', 'ethical-marketing'].map(id => courses.find(c => c.id === id)).filter(Boolean) as Course[];
  const cont = courseById('product-detailing')!;
  const contPct = progressOf(cont);
  const next = nextLesson(cont);
  const skills = useMemo(() => computeSkills(learn.finals, sessions), [learn.finals, sessions]);
  const weakest = [...skills].filter(s => s.score !== null).sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
  const recommended = ['objection-handling', 'scientific-communication', 'territory-management'].map(id => courseById(id)).filter(Boolean) as Course[];
  const today = MICRO.find(m => m.day === TODAY) ?? MICRO[0];
  const quick = MICRO.filter(m => m.minutes === len && m.id !== today.id).slice(0, 4);
  const path = PATHS.find(p => p.id === 'senior-mr')!;
  const pathStep = 1;
  const badges = [
    { t: 'New MR Induction', d: 'Nov 2025' }, { t: 'Ethical Marketing certified', d: 'Jun 2026' },
    { t: 'Doctor’s Cabin', d: 'Aug 2026' }, { t: 'Foundation Certified', d: 'Level 1' },
  ];

  return (
    <Shell role="mr" active="l1" crumbs={<span>Wednesday 24 Sep 2026</span>}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="page-title">Good morning, Pratham</h1>
          <div className="page-sub">Two mandatory items need you this week. Your AI Doctor score is up 25 points since September 2.</div>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <span className="streak"><span aria-hidden>●</span> 6-day learning streak</span>
          <Tag tone="green">Level 1 · Foundation Certified</Tag>
        </div>
      </div>

      <div className="continue-card">
        <div className="continue-thumb"><span>Effective product detailing</span></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'rgba(255,255,255,.65)', marginBottom: 6 }}>Continue learning</div>
          <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-.018em', color: '#fff', lineHeight: 1.15 }}>How to pitch to doctors</div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,.75)', marginTop: 4 }}>{cont.title} · next: {next?.lesson.title ?? 'Final assessment'}</div>
          <div className="row" style={{ gap: 14, marginTop: 16, maxWidth: 520 }}>
            <Bar pct={contPct} color={C.mint} track="rgba(255,255,255,.16)" />
            <span style={{ fontSize: 14.5, color: '#fff', fontWeight: 600 }}>{contPct}%</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 200, flex: 'none' }}>
          <Button kind="primary" style={{ height: 52, fontSize: 16 }} onClick={() => next ? navTo('l3', cont.id, next.lesson.id) : navTo('l2', cont.id)}>Continue</Button>
          <button type="button" className="hero-ghost" onClick={() => navTo('l2', cont.id)}>Course details</button>
        </div>
      </div>

      <div className="split">
        <div>
          <SectionTitle title="Mandatory" sub="Overdue first" right={<button className="link" onClick={() => navTo('a1')}>Assigned &amp; due</button>} />
          <Card style={{ padding: '4px 0' }}>{mandatory.map((c, i) => <MandatoryRow key={c.id} c={c} i={i} />)}</Card>

          <SectionTitle title="Recommended for you" sub={weakest[0] ? `Based on your ${weakest[0].name.toLowerCase()} score` : undefined} right={<button className="link" onClick={() => navTo('a2')}>Browse all courses</button>} />
          <div className="grid-3">
            {recommended.map(c => (
              <Card key={c.id} onClick={() => openCourse(c.id)} style={{ padding: 16 }} className="rec-card">
                <div className="row" style={{ gap: 6, marginBottom: 8 }}><LevelTag level={c.level} /><span className="muted" style={{ fontSize: 13 }}>{c.duration}</span></div>
                <div style={{ fontSize: 15.5, fontWeight: 600, lineHeight: 1.3 }}>{c.title}</div>
                <div className="muted" style={{ fontSize: 13.5, marginTop: 4 }}>{c.objective.slice(0, 90)}{c.objective.length > 90 ? '…' : ''}</div>
              </Card>
            ))}
          </div>

          <SectionTitle title="Quick learning" sub="2, 5 or 10 minutes" right={
            <div className="chips">{([2, 5, 10] as const).map(n => <button key={n} type="button" className={'chip' + (n === len ? ' is-on' : '')} onClick={() => setLen(n)}>{n} min</button>)}</div>
          } />
          <div className="grid-2">
            <Card onClick={() => setMicro(today)} className="today-card" style={{ padding: 18 }}>
              <div className="row" style={{ justifyContent: 'space-between' }}><Tag tone="green">Learn in 5 minutes · today</Tag><span className="muted" style={{ fontSize: 13 }}>{today.kind}</span></div>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-.01em', margin: '10px 0 4px' }}>{today.title}</div>
              <div className="muted" style={{ fontSize: 14 }}>{today.body}</div>
              <div className="week-strip">{(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const).map((d, i, days) => <span key={d} className={d === TODAY ? 'is-today' : i < days.indexOf(TODAY) ? 'is-done' : ''}>{d}</span>)}</div>
            </Card>
            <div className="stack" style={{ gap: 8 }}>
              <AnimatePresence mode="popLayout">
                {quick.map(m => (
                  <motion.div key={m.id} layout initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                    <Card onClick={() => setMicro(m)} style={{ padding: '11px 14px' }}>
                      <div className="row" style={{ justifyContent: 'space-between' }}><span style={{ fontWeight: 600, fontSize: 14.5 }}>{m.title}</span><span className="muted" style={{ fontSize: 12.5, whiteSpace: 'nowrap' }}>{m.kind}</span></div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div>
          <SectionTitle title="My skills" sub="From assessments" />
          <Card style={{ padding: '14px 18px' }}>
            {skills.map((s, i) => (
              <div key={s.id} className="skill-row" title={s.sources.join('\n')}>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14 }}>{s.name}</span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{s.score === null ? <span className="muted" style={{ fontWeight: 400 }}>Not assessed</span> : `${s.score}%`}</span>
                </div>
                <div className="row"><Bar pct={s.score ?? 0} height={5} delay={0.2 + i * 0.05} color={s.score !== null && s.score < 70 ? '#B08A2E' : C.green} /></div>
              </div>
            ))}
            <div className="muted" style={{ fontSize: 12.5, marginTop: 8 }}>Hover a skill to see which assessments it comes from.</div>
          </Card>

          <Card onClick={() => navTo('p1')} className="ai-cta" style={{ padding: 18, marginTop: 14 }}>
            <div className="row" style={{ gap: 12 }}>
              <div className="doctor-avatar sm"><span>Dr</span></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15.5, fontWeight: 600 }}>Practice with AI Doctor</div>
                <div className="muted" style={{ fontSize: 13.5 }}>Try the skeptical specialist on competitor preference</div>
              </div>
              <span style={{ color: C.green, fontSize: 18 }}>→</span>
            </div>
          </Card>

          <SectionTitle title="Your path" sub={path.title} right={<button className="link" onClick={() => navTo('l4')}>View</button>} />
          <Card style={{ padding: '14px 18px' }}>
            {path.steps.map((s, i) => (
              <div key={s.label} className={'path-step' + (i < pathStep ? ' done' : i === pathStep ? ' current' : '')}>
                <span className="path-dot" />{s.label}
              </div>
            ))}
          </Card>

          <SectionTitle title="Badges" />
          <div className="badges">
            {badges.map((b, i) => (
              <motion.div key={b.t} className="badge" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
                <span className="badge-seal">✓</span><span className="badge-t">{b.t}</span><span className="badge-d">{b.d}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>{micro && <MicroSheet m={micro} onClose={() => setMicro(null)} />}</AnimatePresence>
    </Shell>
  );
}
