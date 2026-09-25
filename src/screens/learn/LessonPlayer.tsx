import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navTo } from '../../state';
import { allCourses, courseById } from '../../content';
import { markDone, seedIfNeeded, submitAssignment, useLearn } from '../../content/learnStore';
import type { Lesson } from '../../content/types';
import { Button, C, Card, Crumb, Empty, Shell, Tag, useSaving } from '../../components/ui';
import QuestionCard from '../../components/QuestionCard';
import { presetFor, setPendingConfig } from '../../ai/session';
import { SCENARIOS } from '../../ai/content';
import type { ScenarioId } from '../../ai/types';
import { KIND_LABEL, KindIcon } from './CoursePage';
import { flatLessons } from './nav';

function VideoBlock({ lesson }: { lesson: Lesson }) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const total = lesson.minutes * 60;
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT(x => { if (x >= total) { setPlaying(false); return total; } return x + total / 60; }), 120);
    return () => clearInterval(id);
  }, [playing, total]);
  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  return (
    <div className="lesson-video" onClick={() => setPlaying(p => !p)} role="button" aria-label={playing ? 'Pause' : 'Play'}>
      <span className="lv-label">lesson video · {fmt(total)}</span>
      <motion.span className="lv-play" animate={{ scale: playing ? 0.9 : 1, opacity: playing ? 0 : 1 }}>
        <svg width="22" height="24" viewBox="0 0 10 11"><path d="M1.5 1.2v8.6L9 5.5z" fill="#fff" /></svg>
      </motion.span>
      <div className="lv-bar"><div style={{ width: `${(t / total) * 100}%` }} /></div>
      <span className="lv-time">{fmt(t)} / {fmt(total)}</span>
    </div>
  );
}

function FlowBlock({ steps }: { steps: string[] }) {
  return (
    <div className="flow">
      {steps.map((s, i) => (
        <motion.div key={s + i} className="flow-step" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.09, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
          <span className="flow-n">{i + 1}</span>
          <span className="flow-t">{s}</span>
          {i < steps.length - 1 && (
            <motion.span className="flow-arrow" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.2 + i * 0.09 }}>
              <svg width="12" height="14" viewBox="0 0 12 14"><path d="M6 0v11M1.5 7L6 12l4.5-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function AssignmentBlock({ lesson, courseId }: { lesson: Lesson; courseId: string }) {
  const { assignments } = useLearn();
  const mine = assignments.find(a => a.lessonId === lesson.id && a.learner === 'Pratham Shrivastav');
  const [text, setText] = useState('');
  const [sending, runSend] = useSaving(650);
  const a = lesson.assignment!;
  return (
    <div className="stack" style={{ gap: 14 }}>
      <Card style={{ padding: '16px 18px', background: C.wash, boxShadow: 'none' }}>
        <div style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 4 }}>{a.brief}</div>
        <div style={{ fontSize: 14.5 }}><span className="muted">Deliverable:</span> {a.deliverable}</div>
        <div className="muted" style={{ fontSize: 13.5, marginTop: 10, fontWeight: 600 }}>Your manager will score it on</div>
        <ul className="fb-list" style={{ marginTop: 4 }}>{a.rubric.map(r => <li key={r}>{r}</li>)}</ul>
      </Card>
      {mine ? (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <Card style={{ padding: '14px 18px' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}><Tag tone={mine.review ? 'green' : 'blue'}>{mine.review ? `Reviewed · ${mine.review.score}/5` : 'Submitted · awaiting manager review'}</Tag><span className="muted" style={{ fontSize: 13 }}>{new Date(mine.submittedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</span></div>
            <p style={{ fontSize: 14.5, lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>{mine.text}</p>
            {mine.review && <div className="example-quote">{mine.review.comment} ({mine.review.by})</div>}
          </Card>
        </motion.div>
      ) : (
        <>
          <textarea className="textarea" value={text} onChange={e => setText(e.target.value)} placeholder="Write your response. Do not include identifiable patient information." rows={6} />
          <div className="row"><Button kind="primary" disabled={text.trim().length < 20} loading={sending} onClick={() => runSend(() => { submitAssignment({ courseId, lessonId: lesson.id, title: a.brief, learner: 'Pratham Shrivastav', text: text.trim() }); markDone(courseId, lesson.id); })}>{sending ? 'Submitting' : 'Submit for review'}</Button><span className="muted" style={{ fontSize: 13.5 }}>Your manager reviews and scores it.</span></div>
        </>
      )}
    </div>
  );
}

export default function LessonPlayer({ courseId, lessonId }: { courseId?: string; lessonId?: string }) {
  const learn = useLearn();
  useEffect(() => { seedIfNeeded(allCourses()); }, []);
  const course = courseId ? courseById(courseId) : undefined;
  if (!course) return <Shell role="mr" active="a2" crumbs="Lesson"><Empty title="Lesson not found" body="Pick a course from the catalogue." action={<Button onClick={() => navTo('a2')}>Browse courses</Button>} /></Shell>;
  const all = flatLessons(course);
  const cur = all.find(x => x.lesson.id === lessonId) ?? all[0];
  const { lesson, module } = cur;
  const prev = all[cur.index - 1];
  const next = all[cur.index + 1];
  const done = new Set(learn.done[course.id] || []);
  const isDone = done.has(lesson.id);
  const aiScenario = lesson.aiScenario && SCENARIOS.some(s => s.id === lesson.aiScenario) ? lesson.aiScenario as ScenarioId : null;

  const complete = () => { markDone(course.id, lesson.id); if (next) navTo('l3', course.id, next.lesson.id); else navTo('l2', course.id); };

  return (
    <Shell role="mr" active="a2" crumbs={<><Crumb to={() => navTo('a2')}>Browse courses</Crumb> / <Crumb to={() => navTo('l2', course.id)}>{course.title}</Crumb> / {module.title}</>}>
      <div className="split-wide">
        <aside className="lesson-outline">
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{course.title}</div>
          <div className="muted" style={{ fontSize: 13, marginBottom: 12 }}>{done.size} of {all.length} lessons done</div>
          {course.modules.map(m => (
            <div key={m.id} style={{ marginBottom: 10 }}>
              <div className="outline-module">{m.title}</div>
              {m.lessons.map(l => (
                <div key={l.id} className={'outline-lesson tap' + (l.id === lesson.id ? ' is-current' : '')} onClick={() => navTo('l3', course.id, l.id)}>
                  <span className={'lesson-state sm' + (done.has(l.id) ? ' ok' : '')}>{done.has(l.id) ? '✓' : ''}</span>
                  <span style={{ flex: 1 }}>{l.title}</span>
                </div>
              ))}
            </div>
          ))}
        </aside>

        <AnimatePresence mode="wait">
          <motion.article key={lesson.id} className="lesson-body" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}>
            <div className="row" style={{ gap: 8, marginBottom: 8 }}>
              <span className="lesson-kind big"><KindIcon kind={lesson.kind} />{KIND_LABEL[lesson.kind]}</span>
              <span className="muted" style={{ fontSize: 13.5 }}>{lesson.minutes} min · lesson {cur.index + 1} of {all.length}</span>
            </div>
            <h1 className="page-title" style={{ fontSize: 28 }}>{lesson.title}</h1>
            <p className="lesson-summary">{lesson.summary}</p>

            {lesson.kind === 'video' && <VideoBlock lesson={lesson} />}
            {lesson.flow && <FlowBlock steps={lesson.flow} />}
            {lesson.points && lesson.points.length > 0 && (
              <Card style={{ padding: '16px 20px' }}>
                <div className="field-label" style={{ marginBottom: 6 }}>Key points</div>
                <ul className="key-points">{lesson.points.map((p, i) => <motion.li key={p} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }}>{p}</motion.li>)}</ul>
              </Card>
            )}
            {lesson.example && (
              <Card className="example-card" style={{ padding: '16px 20px' }}>
                <Tag tone="amber">Example</Tag>
                <div style={{ fontSize: 16, fontWeight: 600, margin: '8px 0 4px' }}>{lesson.example.title}</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>{lesson.example.body}</p>
              </Card>
            )}
            {lesson.question && <Card style={{ padding: '18px 20px' }}><QuestionCard q={lesson.question} qkey={`${course.id}:${lesson.id}`} /></Card>}
            {lesson.kind === 'assignment' && lesson.assignment && <AssignmentBlock lesson={lesson} courseId={course.id} />}
            {lesson.kind === 'roleplay' && (
              <Card className="roleplay-card" style={{ padding: '18px 20px' }}>
                <div className="row" style={{ gap: 14 }}>
                  <div className="doctor-avatar"><span>Dr</span></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>Role-play this with the AI Doctor</div>
                    <div className="muted" style={{ fontSize: 14 }}>{aiScenario ? `Scenario: ${SCENARIOS.find(s => s.id === aiScenario)!.title}. The doctor reacts to what you say, then the AI Coach scores you.` : 'Practise with a colleague, or pick any AI Doctor scenario.'}</div>
                  </div>
                  <Button kind="primary" onClick={() => { markDone(course.id, lesson.id); setPendingConfig(presetFor(aiScenario ?? 'first-meeting')); navTo('p2'); }}>Practise now</Button>
                </div>
              </Card>
            )}

            <div className="lesson-nav">
              <Button onClick={() => prev && navTo('l3', course.id, prev.lesson.id)} disabled={!prev}>Previous</Button>
              <div style={{ flex: 1 }} />
              {isDone && <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="done-chip">✓ Completed</motion.span>}
              <Button kind="primary" onClick={complete}>{next ? (isDone ? 'Next lesson' : 'Complete and continue') : 'Finish course'}</Button>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </Shell>
  );
}
