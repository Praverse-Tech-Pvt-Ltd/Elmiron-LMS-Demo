import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navTo } from '../../state';
import { allCourses, courseById, lessonCount, progressOf } from '../../content';
import { recordFinal, seedIfNeeded, setMarket, useLearn } from '../../content/learnStore';
import { CATEGORIES, MARKET_NAMES, type Course, type Question } from '../../content/types';
import { Bar, Button, C, Card, Crumb, Empty, LevelTag, SectionTitle, Shell, Tag, statusPill } from '../../components/ui';
import QuestionCard from '../../components/QuestionCard';
import { flatLessons, nextLesson } from './nav';

export const KIND_LABEL: Record<string, string> = {
  lesson: 'Lesson', video: 'Video', flow: 'Framework', example: 'Example', scenario: 'Scenario', roleplay: 'Role-play', case: 'Case study', assignment: 'Assignment',
};
export function KindIcon({ kind }: { kind: string }) {
  const d: Record<string, string> = {
    lesson: 'M3 2h7l3 3v9H3zM10 2v3h3', video: 'M2 3h12v10H2zM7 6l3 2-3 2z', flow: 'M2 8h3M11 8h3M5 5h6v6H5z', example: 'M8 2l1.8 3.8L14 6.4l-3 2.9.7 4.2L8 11.5l-3.7 2 .7-4.2-3-2.9 4.2-.6z',
    scenario: 'M2 3h12v8H6l-4 3z', roleplay: 'M5 6a2 2 0 110-4 2 2 0 010 4zM11 8a2 2 0 110-4 2 2 0 010 4zM1 14c0-2.5 2-4 4-4s4 1.5 4 4M9 14c.3-2 1.5-3 3-3s2.7 1 3 3',
    case: 'M2 5h12v9H2zM6 5V3h4v2', assignment: 'M4 2h8v12H4zM6 6h4M6 9h4M6 12h2',
  };
  return <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ flex: 'none' }}><path d={d[kind] ?? d.lesson} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" /></svg>;
}

function FinalAssessment({ course, onClose }: { course: Course; onClose: () => void }) {
  const questions: Question[] = useMemo(() => [
    ...course.knowledgeCheck,
    ...course.modules.flatMap(m => m.lessons.filter(l => l.question).map(l => l.question!)),
  ].slice(0, 8), [course]);
  const [i, setI] = useState(0);
  const [picks, setPicks] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const score = Math.round((picks.filter((p, k) => questions[k].choices[p]?.quality === 'best').length / questions.length) * 100);
  const pass = course.finalAssessment.passMark;
  const q = questions[i];

  const pick = (c: number) => {
    const next = [...picks]; next[i] = c; setPicks(next);
    setTimeout(() => {
      if (i < questions.length - 1) setI(i + 1);
      else { setDone(true); recordFinal(course.id, Math.round((next.filter((p, k) => questions[k].choices[p]?.quality === 'best').length / questions.length) * 100), pass); }
    }, 260);
  };

  return (
    <motion.div className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="sheet wide" role="dialog" aria-modal="true" aria-label="Final assessment" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ type: 'spring', stiffness: 340, damping: 32 }}>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <div><div className="muted" style={{ fontSize: 13.5 }}>Final assessment · pass mark {pass}%</div><div style={{ fontSize: 18, fontWeight: 600 }}>{course.title}</div></div>
          <Button small onClick={onClose}>{done ? 'Close' : 'Exit'}</Button>
        </div>
        {!done ? (
          <>
            <div className="row" style={{ gap: 10, marginBottom: 14 }}><Bar pct={(i / questions.length) * 100} height={4} delay={0} /><span className="muted" style={{ fontSize: 13 }}>{i + 1} / {questions.length}</span></div>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }}>
                <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.35, marginBottom: 14 }}>{q.prompt}</div>
                <div className="stack" style={{ gap: 8 }}>
                  {q.choices.map((c, k) => (
                    <button key={k} type="button" className={'q-choice' + (picks[i] === k ? ' is-chosen' : '')} onClick={() => pick(k)}>
                      <span className="q-letter">{'ABCDE'[k]}</span><span style={{ flex: 1 }}>{c.text}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{ fontSize: 13.5, color: C.ink2 }}>Your score</div>
            <div style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-.05em', color: score >= pass ? C.green : C.red }}>{score}%</div>
            {score >= pass ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="cert-issued">
                <span className="badge-seal lg">✓</span>
                <div><strong>Passed.</strong> {course.certificate ?? 'Course certificate'} issued · {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
              </motion.div>
            ) : (
              <div style={{ fontSize: 15, color: C.ink2 }}>Not cleared this time — the pass mark is {pass}%. Review the lessons flagged in the knowledge check and try again.</div>
            )}
            <div className="stack" style={{ textAlign: 'left', marginTop: 16, gap: 6 }}>
              {questions.map((qq, k) => {
                const ok = qq.choices[picks[k]]?.quality === 'best';
                return <div key={k} className="row" style={{ fontSize: 14, gap: 8 }}><Tag tone={ok ? 'green' : 'red'}>{ok ? 'Correct' : 'Review'}</Tag><span style={{ flex: 1 }}>{qq.prompt}</span></div>;
              })}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function CoursePage({ id }: { id?: string }) {
  const learn = useLearn();
  useEffect(() => { seedIfNeeded(allCourses()); }, []);
  const [open, setOpen] = useState<string | null>(null);
  const [assess, setAssess] = useState(false);
  const course = id ? courseById(id) : undefined;
  if (!course) return <Shell role="mr" active="a2" crumbs="Course"><Empty title="Course not found" body="It may have been removed by your training admin." action={<Button onClick={() => navTo('a2')}>Browse courses</Button>} /></Shell>;

  const pct = progressOf(course);
  const done = new Set(learn.done[course.id] || []);
  const next = nextLesson(course);
  const final = learn.finals[course.id];
  const cat = CATEGORIES.find(c => c.id === course.category)?.name;
  const version = course.versions?.find(v => v.market === learn.market) ?? course.versions?.find(v => v.market === 'ALL') ?? course.versions?.[0];
  const lessons = flatLessons(course);
  const firstOpen = open ?? course.modules.find(m => m.lessons.some(l => !done.has(l.id)))?.id ?? course.modules[0]?.id;

  return (
    <Shell role="mr" active="a2" crumbs={<><Crumb to={() => navTo('a2')}>Browse courses</Crumb> / {course.title}</>}>
      <div className="split">
        <div>
          <div className="row" style={{ gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            {course.mandatory && <Tag tone="ink">Mandatory</Tag>}<LevelTag level={course.level} /><Tag>{cat}</Tag>
            {course.recertification && <Tag tone="amber">Recertify {course.recertification.toLowerCase()}</Tag>}
            {course.markets && !course.markets.includes('ALL') && <Tag tone="blue">{course.markets.map(m => MARKET_NAMES[m]).join(', ')}</Tag>}
          </div>
          <h1 className="page-title" style={{ fontSize: 30 }}>{course.title}</h1>
          <p style={{ fontSize: 16.5, color: C.ink2, lineHeight: 1.55, margin: '8px 0 0', maxWidth: '70ch' }}>{course.objective}</p>
          <div className="course-facts">
            <div><span>Who should take it</span><strong>{course.audience}</strong></div>
            <div><span>Duration</span><strong>{course.duration}</strong></div>
            <div><span>Modules</span><strong>{course.modules.length} · {lessonCount(course)} lessons</strong></div>
            <div><span>Passing score</span><strong>{course.finalAssessment.passMark}%</strong></div>
          </div>

          {course.versions && course.versions.length > 0 && (
            <Card style={{ padding: '12px 16px', marginTop: 14, background: C.blueWash, boxShadow: 'none' }}>
              <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontSize: 14, color: C.blue, fontWeight: 600 }}>Market version</span>
                <div className="chips">{course.versions.map(v => <button key={v.market} type="button" className={'chip' + (v === version ? ' is-on' : '')} onClick={() => setMarket(v.market)}>{v.label}</button>)}</div>
              </div>
              <AnimatePresence mode="wait"><motion.div key={version?.market} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ fontSize: 14.5, marginTop: 6 }}>{version?.note}</motion.div></AnimatePresence>
            </Card>
          )}

          <SectionTitle title="Modules" sub={`${done.size} of ${lessonCount(course)} lessons done`} />
          <div className="stack" style={{ gap: 10 }}>
            {course.modules.map((m, mi) => {
              const isOpen = firstOpen === m.id;
              const mDone = m.lessons.filter(l => done.has(l.id)).length;
              return (
                <Card key={m.id} style={{ overflow: 'hidden' }}>
                  <button type="button" className="module-head" onClick={() => setOpen(isOpen ? '' : m.id)} aria-expanded={isOpen}>
                    <span className={'module-check' + (mDone === m.lessons.length ? ' ok' : mDone ? ' part' : '')}>{mDone === m.lessons.length ? '✓' : mi + 1}</span>
                    <span style={{ flex: 1, textAlign: 'left' }}><span style={{ fontSize: 15.5, fontWeight: 600 }}>{m.title}</span><span className="muted" style={{ fontSize: 13.5, marginLeft: 10 }}>{mDone}/{m.lessons.length}</span></span>
                    <motion.svg width="14" height="14" viewBox="0 0 16 16" animate={{ rotate: isOpen ? 180 : 0 }}><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></motion.svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }} style={{ overflow: 'hidden' }}>
                        {m.lessons.map(l => (
                          <div key={l.id} className="lesson-row tap" onClick={() => navTo('l3', course.id, l.id)}>
                            <span className={'lesson-state' + (done.has(l.id) ? ' ok' : '')}>{done.has(l.id) ? '✓' : ''}</span>
                            <span className="lesson-kind"><KindIcon kind={l.kind} />{KIND_LABEL[l.kind]}</span>
                            <span style={{ flex: 1, fontSize: 14.5 }}>{l.title}</span>
                            <span className="muted" style={{ fontSize: 13 }}>{l.minutes} min</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </div>

          <SectionTitle title="Key takeaways" />
          <Card style={{ padding: '14px 18px' }}><ul className="fb-list">{course.takeaways.map(t => <li key={t}>{t}</li>)}</ul></Card>

          <SectionTitle title="Practical exercise" />
          <Card style={{ padding: '14px 18px', fontSize: 15, lineHeight: 1.55 }}>{course.exercise}</Card>

          {course.knowledgeCheck.length > 0 && (
            <>
              <SectionTitle title="Knowledge check" sub="Not scored — see why each answer is strong or weak" />
              <div className="stack" style={{ gap: 12 }}>
                {course.knowledgeCheck.map((q, i) => <Card key={i} style={{ padding: '16px 18px' }}><QuestionCard q={q} qkey={`${course.id}:kc:${i}`} number={i + 1} /></Card>)}
              </div>
            </>
          )}
        </div>

        <div className="sticky-col">
          <Card className="raised" style={{ padding: 20 }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>{statusPill(pct, final)}<span className="muted" style={{ fontSize: 13.5 }}>{lessons.length} lessons</span></div>
            <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-.045em', margin: '10px 0 4px' }}>{pct}%</div>
            <Bar pct={pct} />
            <Button kind="primary" style={{ width: '100%', height: 50, marginTop: 16, fontSize: 16 }} onClick={() => next ? navTo('l3', course.id, next.lesson.id) : setAssess(true)}>
              {pct === 0 ? 'Start course' : next ? 'Continue' : 'Take final assessment'}
            </Button>
            {next && <div className="muted" style={{ fontSize: 13.5, marginTop: 8 }}>Next: {next.lesson.title} · {next.lesson.minutes} min</div>}
          </Card>
          <Card style={{ padding: '16px 18px', marginTop: 14 }}>
            <div style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 6 }}>Final assessment</div>
            <div className="muted" style={{ fontSize: 14, lineHeight: 1.55 }}>{course.finalAssessment.questions} questions · pass mark {course.finalAssessment.passMark}% · {course.finalAssessment.attempts} attempts</div>
            {final && <div style={{ fontSize: 14, marginTop: 8 }}>Last result: <strong style={{ color: final.passed ? C.green : C.red }}>{final.score}%</strong> · attempt {final.attempts}</div>}
            <Button small style={{ marginTop: 12 }} onClick={() => setAssess(true)} disabled={!!final && !final.passed && final.attempts >= course.finalAssessment.attempts}>{final?.passed ? 'Retake for practice' : 'Start assessment'}</Button>
          </Card>
          <Card style={{ padding: '16px 18px', marginTop: 14 }}>
            <div className="row" style={{ gap: 12 }}>
              <span className={'badge-seal' + (final?.passed ? '' : ' dim')}>✓</span>
              <div><div style={{ fontSize: 15, fontWeight: 600 }}>{course.certificate ?? 'Course certificate'}</div><div className="muted" style={{ fontSize: 13.5 }}>{final?.passed ? `Issued ${final.at}` : 'Issued when you pass the final assessment'}</div></div>
            </div>
          </Card>
        </div>
      </div>
      <AnimatePresence>{assess && <FinalAssessment course={course} onClose={() => setAssess(false)} />}</AnimatePresence>
    </Shell>
  );
}
