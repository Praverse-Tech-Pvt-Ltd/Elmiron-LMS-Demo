import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navTo } from '../../state';
import { TEAM_PRACTICE, useAiStore } from '../../ai/store';
import { allCourses } from '../../content';
import { reviewAssignment, seedIfNeeded, useLearn, type Assignment } from '../../content/learnStore';
import { Bar, Button, C, Card, Crumb, Shell, Sparkline, Tabs, Tag, useSaving } from '../../components/ui';
import { scenarioById } from '../../ai/content';
import CountUp from '../../components/CountUp';

const TABS = ['AI Doctor practice', 'Assignments to review'] as const;

function ReviewCard({ a }: { a: Assignment }) {
  const [score, setScore] = useState(a.review?.score ?? 0);
  const [comment, setComment] = useState(a.review?.comment ?? '');
  const [saved, setSaved] = useState(false);
  const [saving, runSave] = useSaving(500);
  return (
    <Card style={{ padding: '16px 18px' }}>
      <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div><div style={{ fontSize: 15.5, fontWeight: 600 }}>{a.title}</div><div className="muted" style={{ fontSize: 13.5 }}>{a.learner} · {new Date(a.submittedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</div></div>
        <Tag tone={a.review ? 'green' : 'amber'}>{a.review ? `Scored ${a.review.score}/5` : 'Awaiting review'}</Tag>
      </div>
      <p style={{ fontSize: 14.5, lineHeight: 1.55, background: C.wash, borderRadius: 12, padding: '10px 12px', whiteSpace: 'pre-wrap' }}>{a.text}</p>
      <div className="row" style={{ gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div className="field">
          <span className="field-label">Score</span>
          <div className="row" style={{ gap: 4 }}>
            {[1, 2, 3, 4, 5].map(n => (
              <motion.button key={n} type="button" className={'score-dot' + (n <= score ? ' on' : '')} onClick={() => setScore(n)} whileTap={{ scale: 0.85 }} aria-label={`Score ${n}`}>{n}</motion.button>
            ))}
          </div>
        </div>
        <div className="field" style={{ flex: 1, minWidth: 220 }}>
          <span className="field-label">Feedback for the MR</span>
          <input className="input" value={comment} onChange={e => setComment(e.target.value)} placeholder="One strength and one thing to improve" />
        </div>
        <Button kind="primary" disabled={!score} loading={saving} onClick={() => runSave(() => { reviewAssignment(a.id, score, comment || 'Reviewed.'); setSaved(true); setTimeout(() => setSaved(false), 1800); })}>{saving ? 'Saving' : a.review ? 'Update review' : 'Save review'}</Button>
        <AnimatePresence>{saved && <motion.span className="done-chip" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>✓ Saved</motion.span>}</AnimatePresence>
      </div>
    </Card>
  );
}

export default function TeamPractice() {
  const { sessions, config } = useAiStore();
  const { assignments } = useLearn();
  const [tab, setTab] = useState<(typeof TABS)[number]>('AI Doctor practice');
  useEffect(() => { seedIfNeeded(allCourses()); }, []);

  // Merge Pratham's live sessions into the seeded team view.
  const team = TEAM_PRACTICE.map(m => {
    if (m.id !== 'rm' || !sessions.length) return m;
    const live = [...sessions].reverse().map(s => s.feedback.total);
    const trend = [...m.trend, ...live];
    return { ...m, sessions: m.sessions + sessions.length, trend, latest: trend[trend.length - 1], avg: Math.round(trend.reduce((a, b) => a + b, 0) / trend.length), criticals: m.criticals + sessions.filter(s => s.feedback.critical.length).length };
  });
  const totals = { sessions: team.reduce((a, m) => a + m.sessions, 0), avg: Math.round(team.reduce((a, m) => a + m.avg, 0) / team.length), criticals: team.reduce((a, m) => a + m.criticals, 0), certified: team.filter(m => m.cert.includes('Certified') && !m.cert.includes('Requires')).length };
  const pending = assignments.filter(a => !a.review).length;
  const canSee = (flagged: boolean) => config.transcriptAccess === 'all' || (config.transcriptAccess === 'flagged' && flagged);

  return (
    <Shell role="manager" active="b3" crumbs={<><Crumb to={() => navTo('b1')}>Team training</Crumb> / AI practice &amp; reviews</>}>
      <h1 className="page-title">AI practice &amp; reviews</h1>
      <div className="page-sub">How your team is practising, where they need coaching, and what's waiting for your review.</div>

      <div className="grid-4" style={{ margin: '18px 0 14px' }}>
        {[
          { l: 'Simulations completed', v: totals.sessions },
          { l: 'Average score', v: totals.avg },
          { l: 'Critical compliance failures', v: totals.criticals, red: totals.criticals > 0 },
          { l: 'Elmiron Product Certified', v: totals.certified },
        ].map(k => (
          <Card key={k.l} style={{ padding: '14px 18px' }}>
            <div style={{ fontSize: 13.5, color: k.red ? C.red : C.ink2, fontWeight: 500 }}>{k.l}</div>
            <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-.02em', color: k.red ? C.red : C.ink }}><CountUp to={String(k.v)} /></div>
          </Card>
        ))}
      </div>

      <Tabs tabs={TABS} value={tab} onChange={setTab} />
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ marginTop: 14 }}>
          {tab === 'AI Doctor practice' ? (
            <>
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>MR</th><th>Sessions</th><th>Average</th><th>Latest</th><th>Trend</th><th>Product</th><th>Objections</th><th>Communication</th><th>Compliance</th><th>Certification</th><th /></tr></thead>
                  <tbody>
                    {team.map((m, i) => (
                      <motion.tr key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <td><div style={{ fontWeight: 600 }}>{m.name}</div><div className="muted" style={{ fontSize: 13 }}>{m.territory}</div></td>
                        <td>{m.sessions}</td>
                        <td>{m.avg}</td>
                        <td><strong>{m.latest}</strong></td>
                        <td><Sparkline points={m.trend} /></td>
                        {[m.product, m.objection, m.communication].map((v, k) => <td key={k}><div className="row" style={{ gap: 6, minWidth: 80 }}><Bar pct={v} height={5} color={v < 70 ? '#B08A2E' : C.green} /><span style={{ fontSize: 13 }}>{v}</span></div></td>)}
                        <td>{m.criticals ? <Tag tone="red">{m.criticals} critical</Tag> : <span style={{ color: C.green, fontWeight: 600 }}>{m.compliance}</span>}</td>
                        <td><Tag tone={m.cert.includes('Requires') ? 'red' : m.cert.startsWith('Elmiron') ? 'green' : 'blue'}>{m.cert}</Tag></td>
                        <td style={{ textAlign: 'right' }}>
                          {m.id === 'rm' && sessions[0] && canSee(sessions[0].feedback.critical.length > 0)
                            ? <button className="link" onClick={() => navTo('p4', sessions[0].id)}>Transcript</button>
                            : <span className="muted" style={{ fontSize: 12.5 }} title="Transcript access is set by your training admin">{config.transcriptAccess === 'none' ? 'Scores only' : config.transcriptAccess === 'flagged' ? (m.criticals ? 'Flagged · request' : 'Scores only') : '—'}</span>}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid-2" style={{ marginTop: 16 }}>
                <Card style={{ padding: '16px 18px' }}>
                  <div style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 8 }}>Coaching focus this week</div>
                  <ul className="fb-list">
                    <li><strong>Imran Qureshi</strong>: critical flag on an adverse-event scenario. Book a joint field visit and assign <button className="link" onClick={() => navTo('l2', 'ae-reporting')}>Adverse Event Reporting</button>.</li>
                    <li><strong>Priya Sethi</strong>: objection handling at 67%. Suggest the price objection scenario.</li>
                    <li><strong>Team</strong>: need identification is the lowest dimension across the area.</li>
                  </ul>
                </Card>
                <Card style={{ padding: '16px 18px' }}>
                  <div style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 8 }}>Latest from Pratham Shrivastav</div>
                  {sessions[0] ? (
                    <div style={{ fontSize: 14.5, lineHeight: 1.6 }}>{scenarioById(sessions[0].config.scenarioId).title} · <strong>{sessions[0].feedback.total}</strong> · {sessions[0].feedback.result}<div className="muted" style={{ fontSize: 13.5 }}>{sessions[0].feedback.strengths[0] ?? ''}</div></div>
                  ) : <div className="muted" style={{ fontSize: 14 }}>Scientific discussion · 86 · Good performance (22 Sep)</div>}
                  <div className="muted" style={{ fontSize: 12.5, marginTop: 10 }}>Transcript access: {config.transcriptAccess === 'all' ? 'all sessions' : config.transcriptAccess === 'flagged' ? 'only sessions with compliance flags' : 'scores only'}, set by the training admin per company policy.</div>
                </Card>
              </div>
            </>
          ) : (
            <div className="stack" style={{ gap: 12 }}>
              <div className="muted" style={{ fontSize: 14.5 }}>{pending} waiting · practical assignments from courses (pitches, territory plans, objection responses, distributor introductions).</div>
              {assignments.map(a => <ReviewCard key={a.id} a={a} />)}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Shell>
  );
}
