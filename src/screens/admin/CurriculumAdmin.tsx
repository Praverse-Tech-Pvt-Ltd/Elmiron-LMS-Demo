import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navTo } from '../../state';
import { CERT_LEVELS, ONBOARDING, PATHS, allCourses, lessonCount } from '../../content';
import { addCourse, assignPath, removeCourse, useLearn } from '../../content/learnStore';
import { CATEGORIES, LEVELS, MARKET_NAMES, type CategoryId, type Course, type Lesson, type LessonKind, type Level, type Market } from '../../content/types';
import { Button, C, Card, Crumb, LevelTag, Shell, Tabs, Tag } from '../../components/ui';
import Switch from '../../components/Switch';

const TABS = ['Course catalogue', 'New course', 'Assign learning paths', 'Certification'] as const;
const KINDS: LessonKind[] = ['lesson', 'video', 'flow', 'example', 'scenario', 'roleplay', 'case', 'assignment'];

interface Draft {
  title: string; category: CategoryId; level: Level; audience: string; objective: string; duration: string; markets: Market[]; mandatory: boolean;
  modules: { title: string; lessons: { title: string; kind: LessonKind; minutes: number; summary: string }[] }[];
  takeaways: string; exercise: string; passMark: number; questions: number; certificate: string; assignment: string;
}
const blank: Draft = {
  title: '', category: 'selling', level: 'Beginner', audience: 'All MRs', objective: '', duration: '30 min', markets: ['ALL'], mandatory: false,
  modules: [{ title: 'Module 1', lessons: [{ title: '', kind: 'lesson', minutes: 5, summary: '' }] }],
  takeaways: '', exercise: '', passMark: 80, questions: 10, certificate: 'Course certificate', assignment: '',
};

function NewCourse({ onDone }: { onDone: () => void }) {
  const [d, setD] = useState<Draft>(blank);
  const set = (p: Partial<Draft>) => setD(x => ({ ...x, ...p }));
  const valid = d.title.trim().length > 3 && d.objective.trim().length > 10 && d.modules.every(m => m.title && m.lessons.every(l => l.title));
  const save = () => {
    const id = 'custom-' + d.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
    const course: Course = {
      id, title: d.title.trim(), category: d.category, level: d.level, objective: d.objective.trim(), audience: d.audience, duration: d.duration,
      minutes: d.modules.reduce((a, m) => a + m.lessons.reduce((b, l) => b + l.minutes, 0), 0), mandatory: d.mandatory, markets: d.markets,
      modules: d.modules.map((m, mi) => ({
        id: `${id}-m${mi + 1}`, title: m.title,
        lessons: m.lessons.map((l, li): Lesson => ({ id: `${id}-m${mi + 1}-l${li + 1}`, title: l.title, kind: l.kind, minutes: l.minutes, summary: l.summary || 'Content to be added by the training team.', ...(l.kind === 'assignment' && d.assignment ? { assignment: { brief: d.assignment, deliverable: 'Written response', rubric: ['Accurate', 'Compliant', 'Clear'] } } : {}) })),
      })),
      takeaways: d.takeaways.split('\n').map(s => s.trim()).filter(Boolean), exercise: d.exercise || 'Apply this in your next field day.',
      knowledgeCheck: [], finalAssessment: { questions: d.questions, passMark: d.passMark, attempts: 3 }, certificate: d.certificate, skills: ['sales'], covers: [55],
    };
    addCourse(course);
    onDone();
  };
  const upd = (mi: number, li: number, p: Partial<Draft['modules'][0]['lessons'][0]>) =>
    set({ modules: d.modules.map((m, i) => i !== mi ? m : { ...m, lessons: m.lessons.map((l, j) => j !== li ? l : { ...l, ...p }) }) });

  return (
    <div className="split">
      <div className="stack" style={{ gap: 14 }}>
        <Card style={{ padding: 20 }}>
          <div className="field-label" style={{ marginBottom: 10, fontSize: 15, color: C.ink, fontWeight: 600 }}>Course template</div>
          <div className="setup-grid">
            <div className="field" style={{ gridColumn: '1 / -1' }}><label>Course title</label><input className="input" value={d.title} onChange={e => set({ title: e.target.value })} placeholder="e.g. Handling hospital formulary questions" /></div>
            <div className="field" style={{ gridColumn: '1 / -1' }}><label>Objective</label><input className="input" value={d.objective} onChange={e => set({ objective: e.target.value })} placeholder="What the learner will be able to do" /></div>
            <div className="field"><label>Category</label><select className="select" value={d.category} onChange={e => set({ category: e.target.value as CategoryId })}>{CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div className="field"><label>Difficulty</label><select className="select" value={d.level} onChange={e => set({ level: e.target.value as Level })}>{LEVELS.map(l => <option key={l}>{l}</option>)}</select></div>
            <div className="field"><label>Who should take it</label><input className="input" value={d.audience} onChange={e => set({ audience: e.target.value })} /></div>
            <div className="field"><label>Expected duration</label><input className="input" value={d.duration} onChange={e => set({ duration: e.target.value })} /></div>
            <div className="field"><label>Market</label><select className="select" value={d.markets[0]} onChange={e => set({ markets: [e.target.value as Market] })}>{(Object.keys(MARKET_NAMES) as Market[]).map(m => <option key={m} value={m}>{MARKET_NAMES[m]}</option>)}</select></div>
            <div className="field"><label>Mandatory</label><div className="tap" style={{ cursor: 'pointer', width: 'fit-content' }} onClick={() => set({ mandatory: !d.mandatory })}><Switch on={d.mandatory} /></div></div>
          </div>
        </Card>

        <Card style={{ padding: 20 }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>Modules and lessons</span>
            <Button small onClick={() => set({ modules: [...d.modules, { title: `Module ${d.modules.length + 1}`, lessons: [{ title: '', kind: 'lesson', minutes: 5, summary: '' }] }] })}>Add module</Button>
          </div>
          <AnimatePresence initial={false}>
            {d.modules.map((m, mi) => (
              <motion.div key={mi} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="builder-module">
                <input className="input" value={m.title} onChange={e => set({ modules: d.modules.map((x, i) => i === mi ? { ...x, title: e.target.value } : x) })} style={{ fontWeight: 600 }} aria-label="Module title" />
                {m.lessons.map((l, li) => (
                  <div key={li} className="builder-lesson">
                    <input className="input" value={l.title} onChange={e => upd(mi, li, { title: e.target.value })} placeholder="Lesson title" />
                    <select className="select" value={l.kind} onChange={e => upd(mi, li, { kind: e.target.value as LessonKind })}>{KINDS.map(k => <option key={k}>{k}</option>)}</select>
                    <select className="select" value={l.minutes} onChange={e => upd(mi, li, { minutes: +e.target.value })}>{[2, 3, 5, 8, 10].map(n => <option key={n} value={n}>{n} min</option>)}</select>
                    <input className="input" value={l.summary} onChange={e => upd(mi, li, { summary: e.target.value })} placeholder="Short summary" style={{ gridColumn: '1 / -1' }} />
                  </div>
                ))}
                <button type="button" className="link" onClick={() => set({ modules: d.modules.map((x, i) => i === mi ? { ...x, lessons: [...x.lessons, { title: '', kind: 'lesson', minutes: 5, summary: '' }] } : x) })}>+ Add lesson</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </Card>

        <Card style={{ padding: 20 }}>
          <div className="setup-grid">
            <div className="field" style={{ gridColumn: '1 / -1' }}><label>Key takeaways (one per line)</label><textarea className="textarea" rows={3} value={d.takeaways} onChange={e => set({ takeaways: e.target.value })} /></div>
            <div className="field" style={{ gridColumn: '1 / -1' }}><label>Practical exercise</label><input className="input" value={d.exercise} onChange={e => set({ exercise: e.target.value })} /></div>
            <div className="field" style={{ gridColumn: '1 / -1' }}><label>Assignment brief (used by any "assignment" lesson)</label><input className="input" value={d.assignment} onChange={e => set({ assignment: e.target.value })} placeholder="e.g. Prepare a 60-second product pitch" /></div>
            <div className="field"><label>Final assessment questions</label><input className="input" type="number" min={5} max={40} value={d.questions} onChange={e => set({ questions: +e.target.value })} /></div>
            <div className="field"><label>Passing score (%)</label><input className="input" type="number" min={50} max={100} value={d.passMark} onChange={e => set({ passMark: +e.target.value })} /></div>
            <div className="field"><label>Certificate</label><input className="input" value={d.certificate} onChange={e => set({ certificate: e.target.value })} /></div>
          </div>
        </Card>
      </div>
      <div className="sticky-col">
        <Card className="raised" style={{ padding: 20 }}>
          <div className="muted" style={{ fontSize: 13.5 }}>Preview</div>
          <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-.02em', margin: '4px 0 8px' }}>{d.title || 'Untitled course'}</div>
          <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}><LevelTag level={d.level} /><Tag>{CATEGORIES.find(c => c.id === d.category)?.name}</Tag>{d.mandatory && <Tag tone="ink">Mandatory</Tag>}</div>
          <div className="muted" style={{ fontSize: 14, margin: '10px 0' }}>{d.modules.length} modules · {d.modules.reduce((a, m) => a + m.lessons.length, 0)} lessons · pass {d.passMark}%</div>
          <Button kind="primary" disabled={!valid} onClick={save} style={{ width: '100%' }}>Publish course</Button>
          <div className="muted" style={{ fontSize: 13, marginTop: 8 }}>Publishes to the catalogue immediately — no code change or release needed.</div>
        </Card>
      </div>
    </div>
  );
}

export default function CurriculumAdmin() {
  const { customCourses, pathAssignments } = useLearn();
  const [tab, setTab] = useState<(typeof TABS)[number]>('Course catalogue');
  const [q, setQ] = useState('');
  const [flash, setFlash] = useState('');
  const [pathId, setPathId] = useState(PATHS[0].id);
  const [aud, setAud] = useState('New joiners · all regions');
  const [due, setDue] = useState('2026-12-31');
  const [auto, setAuto] = useState(true);
  const courses = useMemo(() => allCourses(), [customCourses]); // eslint-disable-line react-hooks/exhaustive-deps
  const list = courses.filter(c => c.title.toLowerCase().includes(q.toLowerCase()));
  const note = (m: string) => { setFlash(m); setTimeout(() => setFlash(''), 2600); };

  return (
    <Shell role="admin" active="c6" crumbs={<><Crumb to={() => navTo('c1')}>Training admin</Crumb> / Curriculum &amp; paths</>}>
      <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h1 className="page-title">Curriculum &amp; paths</h1>
          <div className="page-sub">{courses.length} courses · {courses.reduce((a, c) => a + lessonCount(c), 0)} lessons · {PATHS.length} learning paths. Everything here is data — add modules without code changes.</div>
        </div>
        <AnimatePresence>{flash && <motion.span className="done-chip" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>✓ {flash}</motion.span>}</AnimatePresence>
      </div>
      <div style={{ margin: '16px 0 14px' }}><Tabs tabs={TABS} value={tab} onChange={setTab} /></div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {tab === 'Course catalogue' && (
            <>
              <input className="input" style={{ maxWidth: 360, marginBottom: 12 }} placeholder="Search courses" value={q} onChange={e => setQ(e.target.value)} />
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Course</th><th>Category</th><th>Difficulty</th><th>Audience</th><th>Lessons</th><th>Quiz</th><th>Pass</th><th>Certificate</th><th>Market</th><th /></tr></thead>
                  <tbody>
                    {list.map(c => (
                      <tr key={c.id}>
                        <td><div style={{ fontWeight: 600, maxWidth: 280 }}>{c.title}</div><div className="row" style={{ gap: 4, marginTop: 3 }}>{c.mandatory && <Tag tone="ink">Mandatory</Tag>}{c.recertification && <Tag tone="amber">Recert</Tag>}{c.id.startsWith('custom-') && <Tag tone="green">New</Tag>}</div></td>
                        <td>{CATEGORIES.find(x => x.id === c.category)?.name}</td>
                        <td><LevelTag level={c.level} /></td>
                        <td style={{ maxWidth: 200, fontSize: 13.5 }}>{c.audience}</td>
                        <td>{lessonCount(c)}</td>
                        <td>{c.knowledgeCheck.length || '—'}</td>
                        <td>{c.finalAssessment.passMark}%</td>
                        <td style={{ fontSize: 13.5 }}>{c.certificate ?? '—'}</td>
                        <td style={{ fontSize: 13.5 }}>{(c.versions?.length ? c.versions.map(v => v.label).join(', ') : (c.markets ?? ['ALL']).map(m => MARKET_NAMES[m]).join(', '))}</td>
                        <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <button className="link" onClick={() => navTo('l2', c.id)}>Open</button>
                          {c.id.startsWith('custom-') && <button className="link" style={{ marginLeft: 10, color: C.red }} onClick={() => { removeCourse(c.id); note('Course removed'); }}>Remove</button>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {tab === 'New course' && <NewCourse onDone={() => { setTab('Course catalogue'); note('Course published to the catalogue'); }} />}
          {tab === 'Assign learning paths' && (
            <div className="split">
              <div className="stack" style={{ gap: 14 }}>
                <Card style={{ padding: 20 }}>
                  <div className="setup-grid">
                    <div className="field"><label>Learning path</label><select className="select" value={pathId} onChange={e => setPathId(e.target.value)}>{PATHS.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}</select></div>
                    <div className="field"><label>Audience</label><select className="select" value={aud} onChange={e => setAud(e.target.value)}>{['New joiners · all regions', 'West region · MRs', 'Mumbai area · MRs', 'Senior MRs · all regions', 'International business team', 'Area managers'].map(a => <option key={a}>{a}</option>)}</select></div>
                    <div className="field"><label>Due date</label><input className="input" type="date" value={due} onChange={e => setDue(e.target.value)} /></div>
                  </div>
                  <div className="path-preview">
                    {PATHS.find(p => p.id === pathId)!.steps.map((s, i, arr) => (
                      <motion.span key={pathId + i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="pp-step">{s.label}{i < arr.length - 1 && <span className="pp-arrow">→</span>}</motion.span>
                    ))}
                  </div>
                  <Button kind="primary" onClick={() => { assignPath({ pathId, audience: aud, due, assignedAt: new Date().toISOString(), learners: aud.includes('all regions') ? 412 : aud.includes('Mumbai') ? 12 : aud.includes('West') ? 96 : aud.includes('International') ? 18 : 64 }); note('Learning path assigned'); }}>Assign path</Button>
                </Card>
                <Card style={{ padding: '16px 20px' }}>
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <div><div style={{ fontSize: 15.5, fontWeight: 600 }}>Automatic new-MR onboarding</div><div className="muted" style={{ fontSize: 14 }}>Assign the 8-week onboarding path to every new MR on day one.</div></div>
                    <div className="tap" style={{ cursor: 'pointer' }} onClick={() => setAuto(a => !a)}><Switch on={auto} /></div>
                  </div>
                  <div className="onboard-strip">{ONBOARDING.map(w => <span key={w.week}><b>W{w.week}</b>{w.title}</span>)}</div>
                </Card>
              </div>
              <div>
                <div className="field-label" style={{ margin: '4px 2px 8px' }}>Active assignments</div>
                <div className="stack" style={{ gap: 8 }}>
                  {[...pathAssignments, { pathId: 'new-mr', audience: 'New joiners · all regions', due: 'Rolling · 8 weeks', assignedAt: '2026-04-01', learners: 38 }, { pathId: 'senior-mr', audience: 'Mumbai area · MRs', due: '2026-12-31', assignedAt: '2026-09-01', learners: 12 }].map((a, i) => (
                    <motion.div key={i} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                      <Card style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 600, fontSize: 14.5 }}>{PATHS.find(p => p.id === a.pathId)?.title}</div>
                        <div className="muted" style={{ fontSize: 13.5 }}>{a.audience} · {a.learners} learners · due {a.due}</div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {tab === 'Certification' && (
            <div className="grid-2">
              {CERT_LEVELS.map(l => (
                <Card key={l.level} style={{ padding: '16px 20px' }}>
                  <div className="row" style={{ gap: 10 }}><span className="badge-seal">{l.level}</span><div style={{ fontSize: 17, fontWeight: 600 }}>{l.title}</div></div>
                  <ul className="fb-list" style={{ marginTop: 10 }}>{l.requirements.map(r => <li key={r}>{r}</li>)}</ul>
                  <div className="muted" style={{ fontSize: 13.5 }}>Courses: {l.courseIds.map(id => courses.find(c => c.id === id)?.title).filter(Boolean).join(', ')}</div>
                  {l.level === 2 && <button className="link" style={{ marginTop: 8 }} onClick={() => navTo('c7')}>Configure AI Doctor certification rules →</button>}
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Shell>
  );
}
