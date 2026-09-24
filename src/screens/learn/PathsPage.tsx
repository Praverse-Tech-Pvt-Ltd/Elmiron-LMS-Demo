import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navTo } from '../../state';
import { CERT_LEVELS, ONBOARDING, PATHS, allCourses, courseById, progressOf } from '../../content';
import { seedIfNeeded, useLearn } from '../../content/learnStore';
import { useAiStore } from '../../ai/store';
import { certificationStatus } from '../../ai/session';
import { Bar, C, Card, Crumb, SectionTitle, Shell, Tabs, Tag } from '../../components/ui';
import { openCourse } from './nav';

const TABS = ['Learning paths', 'New MR onboarding', 'Certification'] as const;

export default function PathsPage() {
  const learn = useLearn();
  const { sessions } = useAiStore();
  const [tab, setTab] = useState<(typeof TABS)[number]>('Learning paths');
  const [pathId, setPathId] = useState('senior-mr');
  useEffect(() => { seedIfNeeded(allCourses()); }, []);
  const passed = (id: string) => !!learn.finals[id]?.passed || progressOf(courseById(id) ?? { modules: [] } as never) >= 100;
  const path = PATHS.find(p => p.id === pathId)!;
  const cert = certificationStatus(sessions, learn.finals['elmiron-masterclass']?.score ?? 86, true);

  const stepState = (ids: string[]) => {
    if (!ids.length) return 'cert';
    const vals = ids.map(id => (courseById(id) ? (passed(id) ? 100 : progressOf(courseById(id)!)) : 0));
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return avg >= 100 ? 'done' : avg > 0 ? 'active' : 'todo';
  };

  return (
    <Shell role="mr" active="l4" crumbs={<><Crumb to={() => navTo('l1')}>Learn</Crumb> / Paths &amp; certification</>}>
      <h1 className="page-title">Paths &amp; certification</h1>
      <div className="page-sub">Beginner → intermediate → advanced → certification. Assigned by your training admin, visible to your manager.</div>
      <div style={{ margin: '18px 0 6px' }}><Tabs tabs={TABS} value={tab} onChange={setTab} /></div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
          {tab === 'Learning paths' && (
            <>
              <div className="chips" style={{ margin: '14px 0' }}>
                {PATHS.map(p => <button key={p.id} type="button" className={'chip' + (p.id === pathId ? ' is-on' : '')} onClick={() => setPathId(p.id)}>{p.title}</button>)}
              </div>
              <div className="split">
                <div>
                  <Card style={{ padding: '18px 20px' }}>
                    <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                      <div><div style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-.02em' }}>{path.title}</div><div className="muted" style={{ fontSize: 14 }}>{path.audience} · leads to {path.certification}</div></div>
                      {pathId === 'senior-mr' && <Tag tone="blue">Assigned to you · due 31 Dec 2026</Tag>}
                    </div>
                    <p style={{ fontSize: 15, color: C.ink2, margin: '10px 0 16px' }}>{path.summary}</p>
                    <div className="path-track">
                      {path.steps.map((s, i) => {
                        const st = stepState(s.courseIds);
                        return (
                          <motion.div key={s.label + i} className={'track-step ' + st} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.07 }}>
                            <span className="track-dot">{st === 'done' ? '✓' : st === 'cert' ? '★' : i + 1}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 15, fontWeight: 600 }}>{s.label}</div>
                              <div className="chips" style={{ marginTop: 6 }}>
                                {s.courseIds.map(id => {
                                  const c = courseById(id);
                                  if (!c) return null;
                                  const p = passed(id) ? 100 : progressOf(c);
                                  return <button key={id} type="button" className={'course-chip' + (p >= 100 ? ' done' : p > 0 ? ' part' : '')} onClick={() => openCourse(id)}>{p >= 100 ? '✓ ' : ''}{c.title}{p > 0 && p < 100 ? ` · ${p}%` : ''}</button>;
                                })}
                                {!s.courseIds.length && <span className="muted" style={{ fontSize: 13.5 }}>{path.certification} — awarded when every step is complete</span>}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </Card>
                </div>
                <div>
                  <SectionTitle title="All paths" />
                  <div className="stack" style={{ gap: 8 }}>
                    {PATHS.map(p => {
                      const ids = [...new Set(p.steps.flatMap(s => s.courseIds))].filter(id => courseById(id));
                      const pct = Math.round(ids.reduce((a, id) => a + (passed(id) ? 100 : progressOf(courseById(id)!)), 0) / Math.max(1, ids.length));
                      return (
                        <Card key={p.id} onClick={() => setPathId(p.id)} style={{ padding: '12px 16px', outline: p.id === pathId ? `2px solid ${C.green}` : 'none' }}>
                          <div style={{ fontSize: 14.5, fontWeight: 600 }}>{p.title}</div>
                          <div className="row" style={{ gap: 10, marginTop: 6 }}><Bar pct={pct} height={5} /><span className="muted" style={{ fontSize: 13 }}>{pct}%</span></div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === 'New MR onboarding' && (
            <>
              <p className="muted" style={{ fontSize: 15, margin: '14px 0' }}>Assigned automatically to every new MR on their first day. Each week unlocks when the previous one is complete; week 8 ends with a field certification and an AI Doctor assessment.</p>
              <div className="grid-4">
                {ONBOARDING.map((w, i) => (
                  <motion.div key={w.week} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card style={{ padding: '14px 16px', height: '100%' }} className="week-card">
                      <div className="row" style={{ justifyContent: 'space-between' }}><span className="mono muted" style={{ fontSize: 12 }}>Week {w.week}</span>{i < 1 && <Tag tone="green">Done</Tag>}</div>
                      <div style={{ fontSize: 16, fontWeight: 600, margin: '6px 0' }}>{w.title}</div>
                      <div className="muted" style={{ fontSize: 13.5, marginBottom: 8 }}>{w.focus.join(' · ')}</div>
                      <div className="stack" style={{ gap: 4 }}>
                        {w.courseIds.map(id => courseById(id) && <button key={id} type="button" className="link" style={{ textAlign: 'left', fontSize: 13.5 }} onClick={() => openCourse(id)}>{courseById(id)!.title}</button>)}
                        {!w.courseIds.length && <button type="button" className="link" style={{ textAlign: 'left', fontSize: 13.5 }} onClick={() => navTo('p1')}>AI Doctor field assessment</button>}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {tab === 'Certification' && (
            <div className="split" style={{ marginTop: 14 }}>
              <div className="stack" style={{ gap: 12 }}>
                {CERT_LEVELS.map((l, i) => {
                  const done = l.courseIds.filter(id => passed(id)).length;
                  const status = l.level === 1 ? 'Certified' : l.level === 2 ? (cert.certified ? 'Certified' : 'In progress') : done ? 'In progress' : 'Not started';
                  return (
                    <motion.div key={l.level} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                      <Card style={{ padding: '16px 20px' }} className={'cert-level lvl-' + l.level}>
                        <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                          <div className="row" style={{ gap: 12 }}>
                            <span className={'badge-seal lg' + (status === 'Certified' ? '' : ' dim')}>{l.level}</span>
                            <div><div className="muted" style={{ fontSize: 13 }}>Level {l.level}</div><div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-.02em' }}>{l.title}</div></div>
                          </div>
                          <Tag tone={status === 'Certified' ? 'green' : status === 'In progress' ? 'blue' : 'wash'}>{status}</Tag>
                        </div>
                        <div className="muted" style={{ fontSize: 14, margin: '10px 0 6px' }}>Covers {l.covers.join(', ').toLowerCase()}</div>
                        <ul className="fb-list">{l.requirements.map(r => <li key={r}>{r}</li>)}</ul>
                        <div className="chips" style={{ marginTop: 8 }}>
                          {l.courseIds.map(id => courseById(id) && <button key={id} type="button" className={'course-chip' + (passed(id) ? ' done' : '')} onClick={() => openCourse(id)}>{passed(id) ? '✓ ' : ''}{courseById(id)!.title}</button>)}
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
              <div>
                <SectionTitle title="Elmiron Product Certified" sub="Level 2 rule" />
                <Card style={{ padding: '14px 18px' }}>
                  {cert.items.map(i => (
                    <div key={i.label} className="req-row"><span className={'req-dot' + (i.ok ? ' ok' : '')}>{i.ok ? '✓' : ''}</span><span style={{ flex: 1 }}>{i.label}</span>{i.detail && <span className="muted" style={{ fontSize: 13 }}>{i.detail}</span>}</div>
                  ))}
                  <button type="button" className="link" style={{ marginTop: 10 }} onClick={() => navTo('p1')}>Go to AI Doctor practice →</button>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Shell>
  );
}
