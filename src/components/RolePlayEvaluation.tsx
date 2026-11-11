import { motion } from 'framer-motion';
import { navTo } from '../state';
import { useAiStore } from '../ai/store';
import { presetFor, setPendingConfig } from '../ai/session';
import { SCENARIOS } from '../ai/content';
import { ROLEPLAY_PASS_MARK, passed, statusOf } from '../ai/evaluation';
import { CRITICAL_NAMES, RUBRIC, type RolePlayOrigin, type ScenarioId } from '../ai/types';
import { Button, C, Card, Ring, Tag } from './ui';

/* The role-play block used inside a course lesson and a library case: start a live AI Doctor
   role-play for this item, and once it is evaluated show the score, result, strengths and scope of
   improvement right here, linked to the full evaluation. */
export default function RolePlayEvaluation({ origin, scenarioId, intro }: { origin: RolePlayOrigin; scenarioId: ScenarioId; intro?: string }) {
  const { sessions } = useAiStore();
  const st = statusOf(sessions, origin.kind, origin.id);
  const scenario = SCENARIOS.find(s => s.id === scenarioId);
  const start = () => { setPendingConfig(presetFor(scenarioId, { origin })); navTo('p2'); };
  const latest = st.latest;
  const fb = latest?.feedback;
  const ok = latest ? passed(latest) : false;
  const tone = !fb ? 'wash' : fb.critical.length ? 'red' : ok ? 'green' : 'amber';
  const weakest = fb ? [...fb.dimensions].sort((a, b) => a.score / a.max - b.score / b.max)[0] : undefined;
  const strongest = fb ? [...fb.dimensions].sort((a, b) => b.score / b.max - a.score / a.max)[0] : undefined;
  const dimName = (id: string) => RUBRIC.find(r => r.id === id)?.name ?? id;

  return (
    <Card className="roleplay-card" style={{ padding: '18px 20px' }}>
      <div className="row" style={{ gap: 14, alignItems: 'flex-start' }}>
        <div className="doctor-avatar"><span>Dr</span></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>AI role-play with evaluation</span>
            <Tag tone={st.passed ? 'green' : st.attempts ? 'amber' : 'wash'}>{st.passed ? 'Passed' : st.attempts ? 'Not passed yet' : 'Not attempted'}</Tag>
          </div>
          <div className="muted" style={{ fontSize: 14, marginTop: 2 }}>
            {intro ?? (scenario ? `Scenario: ${scenario.title}. ${scenario.goal}` : 'Talk to the AI Doctor.')} The AI Coach evaluates you on an 8-part rubric. Pass mark {ROLEPLAY_PASS_MARK}/100 with no critical compliance error.
          </div>
        </div>
        {!latest && <Button kind="primary" onClick={start}>Start role-play</Button>}
      </div>

      {latest && fb && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rp-eval">
          <div className="rp-eval-score">
            <Ring value={fb.total} size={92} stroke={8} color={fb.critical.length ? C.red : ok ? C.green : C.amber} label="latest" />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{fb.result}</div>
              <div className="muted" style={{ fontSize: 13.5 }}>
                {st.attempts} attempt{st.attempts === 1 ? '' : 's'}{st.best && st.attempts > 1 ? ` · best ${st.best.feedback.total}/100` : ''}
              </div>
              <div className="row" style={{ gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                <Tag tone={tone}>{ok ? 'Meets pass mark' : fb.critical.length ? 'Critical error' : `${ROLEPLAY_PASS_MARK - fb.total > 0 ? ROLEPLAY_PASS_MARK - fb.total : 0} points to pass`}</Tag>
                <Tag tone={latest.engine === 'claude' ? 'green' : 'white'}>{latest.engine === 'claude' ? 'AI Coach' : 'Rules coach'}</Tag>
              </div>
            </div>
          </div>
          {fb.critical.length > 0 && (
            <div className="critical-banner" style={{ marginTop: 10 }}><strong>Critical:</strong> {fb.critical.map(c => CRITICAL_NAMES[c]).join(', ')}.</div>
          )}
          <div className="grid-2" style={{ marginTop: 12, gap: 10 }}>
            <div className="rp-col good">
              <div className="fb-head good">Strengths</div>
              {strongest && <div className="rp-dim">Strongest area: <strong>{dimName(strongest.id)}</strong> ({strongest.score}/{strongest.max})</div>}
              <ul className="fb-list">{(fb.strengths.length ? fb.strengths.slice(0, 2) : ['Strengths will show as you improve.']).map(x => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="rp-col improve">
              <div className="fb-head improve">Scope of improvement</div>
              {weakest && <div className="rp-dim">Focus area: <strong>{dimName(weakest.id)}</strong> ({weakest.score}/{weakest.max})</div>}
              <ul className="fb-list">{(fb.improvements.length ? fb.improvements.slice(0, 2) : ['Nothing major. Try a harder difficulty.']).map(x => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
          <div className="row" style={{ gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <Button onClick={() => navTo('p4', latest.id)}>See full evaluation</Button>
            <Button kind={ok ? 'wash' : 'primary'} onClick={start}>{ok ? 'Practise again' : 'Try again'}</Button>
          </div>
        </motion.div>
      )}
    </Card>
  );
}
