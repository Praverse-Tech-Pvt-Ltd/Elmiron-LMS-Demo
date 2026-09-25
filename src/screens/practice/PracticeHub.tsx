import { motion } from 'framer-motion';
import { navTo } from '../../state';
import { useAiStore } from '../../ai/store';
import { presetFor, setPendingConfig, trend, certificationStatus, describe, fmtLimit } from '../../ai/session';
import { scenarioById } from '../../ai/content';
import { Card, Shell, SectionTitle, Tag, TrendChart, C, Button, Crumb } from '../../components/ui';
import type { ScenarioId, SessionConfig } from '../../ai/types';
import { getLearn } from '../../content/learnStore';

function start(cfg: SessionConfig) { setPendingConfig(cfg); navTo('p2'); }

const MODES: { title: string; sub: string; icon: string; time: string; action: () => void }[] = [
  { title: 'Quick practice', sub: 'One minute with a busy doctor. Lead with a single approved message.', icon: 'bolt', time: '1 min', action: () => start(presetFor('sixty-second', { difficulty: 'Beginner' })) },
  { title: 'Product practice', sub: 'Precise questions on indication, dosing, monitoring and warnings.', icon: 'pill', time: '5 min', action: () => start(presetFor('product-recall')) },
  { title: 'Objection practice', sub: 'Listen, clarify, respond, support and confirm under pressure.', icon: 'chat', time: '4 min', action: () => start(presetFor('efficacy-objection')) },
  { title: 'Scientific practice', sub: 'Discuss evidence accurately without overstating conclusions.', icon: 'flask', time: '8 min', action: () => start(presetFor('scientific-discussion', { difficulty: 'Advanced' })) },
];

function Icon({ name }: { name: string }) {
  const p: Record<string, string> = {
    bolt: 'M9 1L3 9h4l-1 6 6-8H8l1-6z', pill: 'M5.5 10.5l5-5M4 12a2.8 2.8 0 010-4l4-4a2.8 2.8 0 014 4l-4 4a2.8 2.8 0 01-4 0z',
    chat: 'M2 3h12v8H6l-4 3V3z', flask: 'M6 1v5L2 14h12L10 6V1M5 1h6', shield: 'M8 1l6 2v5c0 3.5-2.6 6-6 7-3.4-1-6-3.5-6-7V3l6-2z',
  };
  return <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden><path d={p[name]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

const Chevron = () => <svg className="row-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;

const GROUP_TONE = { compliance: 'red', objection: 'amber', scientific: 'blue', core: 'wash', quick: 'wash' } as const;

export default function PracticeHub() {
  const { sessions } = useAiStore();
  const points = trend(sessions);
  const latest = sessions[0];
  const knowledge = getLearn().finals['elmiron-masterclass']?.score ?? 86;
  const cert = certificationStatus(sessions, knowledge, true);
  const library: ScenarioId[] = ['first-meeting', 'competitor-preference', 'price-objection', 'adverse-event', 'off-label', 'outside-knowledge'];

  return (
    <Shell role="mr" active="p1" crumbs={<><Crumb to={() => navTo('l1')}>Learn</Crumb> / Practice with AI Doctor</>}>
      <div className="practice-hero">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,.68)', marginBottom: 6 }}>Practice with AI Doctor</div>
          <h1 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-.012em', margin: 0, color: '#fff', lineHeight: 1.15 }}>Make mistakes safely, then get coached.</h1>
          <p style={{ color: 'rgba(255,255,255,.78)', fontSize: 16, margin: '8px 0 18px', maxWidth: '58ch' }}>
            A fictional doctor challenges you in role. When the call ends, the AI Coach scores you against the rubric and shows what to try next time.
          </p>
          <div className="row" style={{ flexWrap: 'wrap' }}>
            <Button kind="primary" onClick={() => start(presetFor('first-meeting'))}>Start a practice call</Button>
            <button type="button" className="hero-ghost" onClick={() => navTo('p2')}>Choose your own setup</button>
          </div>
        </div>
        <div className="doctor-orbit" aria-hidden>
          <div className="orbit-ring" />
          <div className="doctor-avatar lg"><span>Dr</span></div>
          {['Skeptical', 'Busy', 'Friendly', 'Specialist'].map((t, i) => (
            <motion.span key={t} className="orbit-chip" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.08, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>{t}</motion.span>
          ))}
        </div>
      </div>

      <div className="privacy-note" role="note">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M8 1l6 2v5c0 3.5-2.6 6-6 7-3.4-1-6-3.5-6-7V3l6-2z" stroke="currentColor" strokeWidth="1.6" /></svg>
        <span><strong>Do not enter patient names, phone numbers, medical record numbers or other identifiable patient information.</strong> Obvious identifiers are removed automatically before anything is stored or sent.</span>
      </div>

      <div className="split" style={{ marginTop: 6 }}>
        <div>
          <SectionTitle title="Ways to practise" sub="Each opens the setup with sensible defaults" />
          <div className="list-panel">
            {MODES.map(m => (
              <button key={m.title} type="button" className="list-row" onClick={m.action}>
                <span className="lr-icon"><Icon name={m.icon} /></span>
                <span className="lr-text"><span className="lr-title">{m.title}</span><span className="lr-sub">{m.sub}</span></span>
                <span className="lr-meta">{m.time}</span>
                <Chevron />
              </button>
            ))}
          </div>

          <SectionTitle title="Scenario library" sub="The doctor's behaviour changes with each one" right={<button className="link" onClick={() => navTo('p2')}>All 14 scenarios</button>} />
          <div className="list-panel">
            {library.map(id => {
              const s = scenarioById(id);
              return (
                <button key={id} type="button" className="list-row compact" onClick={() => start(presetFor(id))}>
                  <span className="lr-num mono">{String(s.number).padStart(2, '0')}</span>
                  <span className="lr-text"><span className="lr-title">{s.title}</span><span className="lr-sub">{s.summary}</span></span>
                  <Tag tone={GROUP_TONE[s.group]}>{s.group === 'core' ? 'Core call' : s.group[0].toUpperCase() + s.group.slice(1)}</Tag>
                  <span className="lr-meta">{fmtLimit(s.seconds)}</span>
                  <Chevron />
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="assess-panel">
            <span className="lr-icon on-ink"><Icon name="shield" /></span>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 10 }}>Formal assessment</div>
            <p style={{ margin: '4px 0 14px', color: 'rgba(255,255,255,.78)', fontSize: 15, lineHeight: 1.5 }}>No hints or live coaching. Three attempts per scenario, and a pass counts toward Elmiron Product Certified.</p>
            <Button kind="primary" onClick={() => start(presetFor('competitor-preference', { mode: 'assessment', difficulty: 'Advanced' }))}>Set up an assessment</Button>
          </div>

          <SectionTitle title="Your trend" sub="Doctor engagement score" right={<button className="link" onClick={() => navTo('p5')}>My progress</button>} />
          <Card style={{ padding: '14px 16px' }}>
            <TrendChart points={points.slice(-6).map(p => p.total)} labels={points.slice(-6).map(p => p.label)} height={160} />
            {latest && (
              <div className="row" style={{ justifyContent: 'space-between', borderTop: `1px solid ${C.rule}`, paddingTop: 10, marginTop: 6 }}>
                <span style={{ fontSize: 14.5 }}>Latest: {describe(latest.config).scenario} · <strong>{latest.feedback.total}</strong></span>
                <button className="link" onClick={() => navTo('p4', latest.id)}>Review</button>
              </div>
            )}
          </Card>

          <SectionTitle title="Elmiron Product Certified" sub={`${cert.met} of ${cert.total} met`} />
          <Card style={{ padding: '10px 18px' }}>
            {cert.items.map(i => (
              <div key={i.label} className="req-row">
                <span className={'req-dot' + (i.ok ? ' ok' : '')}>{i.ok ? '✓' : ''}</span>
                <span style={{ flex: 1 }}>{i.label}</span>
                {i.detail && <span className="muted" style={{ fontSize: 13.5 }}>{i.detail}</span>}
              </div>
            ))}
          </Card>
        </div>
      </div>
    </Shell>
  );
}
