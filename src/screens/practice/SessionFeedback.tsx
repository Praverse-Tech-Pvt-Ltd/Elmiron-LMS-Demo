import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navTo } from '../../state';
import { useAiStore } from '../../ai/store';
import { scenarioById, specialtyById, personaById } from '../../ai/content';
import { presetFor, setPendingConfig, fmtTime } from '../../ai/session';
import { CRITICAL_NAMES, RUBRIC, type Tag as TurnTag } from '../../ai/types';
import { Bar, Button, C, Card, Crumb, Empty, Ring, SectionTitle, Segmented, Shell, Tag } from '../../components/ui';
import { courseById } from '../../content';

const TAG_LABEL: Record<TurnTag, { label: string; tone: 'green' | 'amber' | 'red' | 'blue' | 'wash' }> = {
  strong: { label: 'Strong answer', tone: 'green' },
  'excellent-objection': { label: 'Excellent objection handling', tone: 'green' },
  missed: { label: 'Missed opportunity', tone: 'amber' },
  compliance: { label: 'Compliance concern', tone: 'red' },
  redacted: { label: 'Identifiers removed', tone: 'blue' },
};

export default function SessionFeedback({ id }: { id?: string }) {
  const { sessions } = useAiStore();
  const s = !id || id === 'latest' ? sessions[0] : sessions.find(x => x.id === id);
  const [filter, setFilter] = useState<'All' | 'Highlights'>('All');
  const transcriptRef = useRef<HTMLDivElement>(null);

  if (!s) {
    return (
      <Shell role="mr" active="p1" crumbs={<><Crumb to={() => navTo('p1')}>Practice with AI Doctor</Crumb> / Feedback</>}>
        <Empty title="No sessions yet" body="Complete a practice call with the AI Doctor and your feedback will appear here." action={<Button kind="primary" onClick={() => navTo('p2')}>Start a practice call</Button>} />
      </Shell>
    );
  }
  const fb = s.feedback;
  const sc = scenarioById(s.config.scenarioId);
  const retrain = fb.result === 'Requires retraining';
  const resultTone = retrain ? 'red' : fb.result === 'Good performance' ? 'green' : 'amber';
  const next = scenarioById(fb.nextScenario);
  const turns = filter === 'All' ? s.turns : s.turns.filter(t => t.tags?.length);

  const again = () => { setPendingConfig(s.config); navTo('p3'); };
  const nextScenario = () => { setPendingConfig(presetFor(fb.nextScenario, { specialtyId: s.config.specialtyId, difficulty: s.config.difficulty, mode: 'practice' })); navTo('p2'); };

  return (
    <Shell role="mr" active="p1" crumbs={<><Crumb to={() => navTo('p1')}>Practice with AI Doctor</Crumb> / Session feedback</>}>
      <div className="feedback-hero">
        <Ring value={fb.total} size={148} stroke={11} color={retrain ? C.red : fb.total >= 75 ? C.green : C.amber} label="out of 100" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="muted" style={{ fontSize: 14 }}>Session complete · {sc.title} · {personaById(s.config.personaId).name} ({specialtyById(s.config.specialtyId).name.toLowerCase()})</div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-.018em', margin: '4px 0 8px' }}>{fb.result}</motion.div>
          <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
            <Tag tone={resultTone}>{s.config.mode === 'assessment' ? 'Assessment' : 'Practice'} · attempt {s.attempt}</Tag>
            <Tag>{s.config.difficulty}</Tag>
            <Tag>{fmtTime(s.durationSec)} min</Tag>
            <Tag tone={s.engine === 'claude' ? 'green' : 'white'}>{s.engine === 'claude' ? 'Live AI doctor + AI Coach' : 'Built-in doctor + rules coach'}</Tag>
          </div>
          {retrain && (
            <motion.div className="critical-banner" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
              <strong>Requires retraining.</strong> A critical compliance error overrides the conversation score: {fb.critical.map(c => CRITICAL_NAMES[c]).join(', ')}.
            </motion.div>
          )}
          <div className="row" style={{ gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <Button onClick={() => transcriptRef.current?.scrollIntoView({ behavior: 'smooth' })}>Review conversation</Button>
            <Button kind="primary" onClick={again}>Practice again</Button>
            <Button onClick={nextScenario}>Next scenario: {next.title}</Button>
          </div>
        </div>
      </div>

      <div className="split">
        <div>
          <SectionTitle title="Score by dimension" sub="Weighted rubric, total 100" />
          <Card style={{ padding: '8px 18px' }}>
            {fb.dimensions.map((d, i) => {
              const r = RUBRIC.find(x => x.id === d.id)!;
              const pct = (d.score / d.max) * 100;
              return (
                <div key={d.id} className="dim-row">
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14.5, fontWeight: 500 }}>{r.name}</span>
                    <span style={{ fontSize: 14, fontVariantNumeric: 'tabular-nums' }}><strong>{d.score}</strong><span className="muted"> / {d.max}</span></span>
                  </div>
                  <div className="row"><Bar pct={pct} color={pct >= 75 ? C.green : pct >= 50 ? '#B08A2E' : C.red} delay={0.1 + i * 0.06} /></div>
                  {d.notes.length > 0 && pct < 100 && <div className="dim-note">{d.notes.slice(0, 2).join(' · ')}</div>}
                </div>
              );
            })}
          </Card>

          <div className="grid-2" style={{ marginTop: 16 }}>
            <Card style={{ padding: '16px 18px' }}>
              <div className="fb-head good">What you did well</div>
              <ul className="fb-list">{(fb.strengths.length ? fb.strengths : ['Keep practising. Strengths will show here as you improve.']).map(x => <li key={x}>{x}</li>)}</ul>
            </Card>
            <Card style={{ padding: '16px 18px' }}>
              <div className="fb-head improve">Areas to improve</div>
              <ul className="fb-list">{(fb.improvements.length ? fb.improvements : ['Nothing major. Try a harder difficulty next.']).map(x => <li key={x}>{x}</li>)}</ul>
            </Card>
          </div>

          {fb.betterResponses.length > 0 && (
            <>
              <SectionTitle title="Better response examples" sub="Learn the principle, not the script" />
              <div className="stack">
                {fb.betterResponses.map(b => (
                  <Card key={b.situation} style={{ padding: '14px 18px' }}>
                    <div style={{ fontSize: 13.5, color: C.ink2 }}>{b.situation}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, margin: '2px 0 6px' }}>{b.principle}</div>
                    <div className="example-quote">{b.example}</div>
                  </Card>
                ))}
              </div>
            </>
          )}

          <div ref={transcriptRef} />
          <SectionTitle title="Conversation transcript" sub={`${s.turns.filter(t => t.who !== 'system').length} turns`} right={<Segmented options={['All', 'Highlights'] as const} value={filter} onChange={setFilter} />} />
          <Card style={{ padding: '10px 18px' }}>
            <AnimatePresence initial={false}>
              {turns.map((t, i) => (
                <motion.div key={i + t.text} layout className={'tx-row ' + t.who} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="tx-who">{t.who === 'doctor' ? 'Doctor' : t.who === 'mr' ? 'MR' : 'System'}<span className="muted mono" style={{ fontSize: 11.5, marginLeft: 6 }}>{fmtTime(t.at)}</span></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>{t.text}</div>
                    {(t.tags?.length || t.note) && (
                      <div className="row" style={{ gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                        {[...new Set(t.tags)].map(tag => <Tag key={tag} tone={TAG_LABEL[tag].tone}>{TAG_LABEL[tag].label}</Tag>)}
                        {t.note && <span style={{ fontSize: 13, color: C.ink2 }}>{t.note}</span>}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </Card>
        </div>

        <div>
          <SectionTitle title="AI Coach" sub="After the call" />
          <Card className="coach-card" style={{ padding: 18 }}>
            <div className="row" style={{ gap: 12, marginBottom: 10 }}>
              <div className="coach-avatar">AI<br />Coach</div>
              <div style={{ fontSize: 13.5, color: C.ink2 }}>The doctor has left. I score against the rubric, using the approved product information as the source of truth.</div>
            </div>
            {fb.coach.map((p, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.12 }} className="coach-para">{p}</motion.p>
            ))}
          </Card>

          <SectionTitle title="Recommended next" />
          <div className="stack" style={{ gap: 8 }}>
            {fb.recommended.map(r => {
              const course = courseById(r.courseId);
              return (
                <Card key={r.courseId} onClick={() => navTo('l2', r.courseId)} style={{ padding: '12px 16px' }}>
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14.5, fontWeight: 600 }}>{course?.title ?? r.label}</span>
                    <span className="muted" style={{ fontSize: 13.5, whiteSpace: 'nowrap' }}>{r.minutes} min</span>
                  </div>
                </Card>
              );
            })}
            <Card onClick={again} style={{ padding: '12px 16px', background: C.greenWash }}>
              <div className="row" style={{ justifyContent: 'space-between' }}><span style={{ fontSize: 14.5, fontWeight: 600, color: C.green }}>Then: practise again</span><span style={{ color: C.green }}>→</span></div>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  );
}
