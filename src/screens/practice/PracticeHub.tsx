import { motion } from 'framer-motion';
import { navTo } from '../../state';
import { useAiStore } from '../../ai/store';
import { presetFor, setPendingConfig, trend, certificationStatus, describe } from '../../ai/session';
import { scenarioById } from '../../ai/content';
import { Card, Shell, SectionTitle, Tag, TrendChart, C, Button, Crumb } from '../../components/ui';
import type { ScenarioId, SessionConfig } from '../../ai/types';
import { getLearn } from '../../content/learnStore';

function start(cfg: SessionConfig) { setPendingConfig(cfg); navTo('p2'); }

const CARDS: { title: string; sub: string; icon: string; action: () => void; tone?: 'ink' }[] = [
  { title: 'Quick practice', sub: '5-minute scenario with a busy doctor', icon: 'bolt', action: () => start(presetFor('sixty-second', { difficulty: 'Beginner' })) },
  { title: 'Product practice', sub: 'Choose a product and specialty', icon: 'pill', action: () => start(presetFor('product-recall')) },
  { title: 'Objection practice', sub: 'Handle difficult questions', icon: 'chat', action: () => start(presetFor('efficacy-objection')) },
  { title: 'Scientific practice', sub: 'Clinical and evidence discussion', icon: 'flask', action: () => start(presetFor('scientific-discussion', { difficulty: 'Advanced' })) },
  { title: 'Assessment', sub: 'Formal evaluation · counts toward certification', icon: 'shield', action: () => start(presetFor('competitor-preference', { mode: 'assessment', difficulty: 'Advanced' })), tone: 'ink' },
  { title: 'My progress', sub: 'Previous sessions and skill trend', icon: 'trend', action: () => navTo('p5') },
];

function Icon({ name }: { name: string }) {
  const p: Record<string, string> = {
    bolt: 'M9 1L3 9h4l-1 6 6-8H8l1-6z', pill: 'M5.5 10.5l5-5M4 12a2.8 2.8 0 010-4l4-4a2.8 2.8 0 014 4l-4 4a2.8 2.8 0 01-4 0z',
    chat: 'M2 3h12v8H6l-4 3V3z', flask: 'M6 1v5L2 14h12L10 6V1M5 1h6', shield: 'M8 1l6 2v5c0 3.5-2.6 6-6 7-3.4-1-6-3.5-6-7V3l6-2z', trend: 'M1 13l4-5 3 3 6-8M10 3h4v4',
  };
  return <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d={p[name]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function PracticeHub() {
  const { sessions } = useAiStore();
  const points = trend(sessions);
  const latest = sessions[0];
  const knowledge = getLearn().finals['elmiron-masterclass']?.score ?? 86;
  const cert = certificationStatus(sessions, knowledge, true);
  const quick: ScenarioId[] = ['first-meeting', 'competitor-preference', 'adverse-event', 'off-label', 'outside-knowledge', 'price-objection'];

  return (
    <Shell role="mr" active="p1" crumbs={<><Crumb to={() => navTo('l1')}>Learn</Crumb> / Practice with AI Doctor</>}>
      <div className="practice-hero">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'rgba(255,255,255,.65)', marginBottom: 6 }}>Practice with AI Doctor</div>
          <h1 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-.035em', margin: 0, color: '#fff', lineHeight: 1.12 }}>Make mistakes safely, then get coached.</h1>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 15.5, margin: '8px 0 18px', maxWidth: '58ch' }}>
            A fictional doctor challenges you in role. When the call ends, the AI Coach scores you against the rubric and shows what to try next time.
          </p>
          <div className="row" style={{ flexWrap: 'wrap' }}>
            <Button kind="primary" onClick={() => start(presetFor('first-meeting'))}>Start a practice call</Button>
            <button type="button" className="hero-ghost" onClick={() => navTo('p2')}>Choose your own setup</button>
          </div>
        </div>
        <div className="doctor-orbit" aria-hidden>
          <motion.div className="orbit-ring" animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} />
          <div className="doctor-avatar lg"><span>Dr</span></div>
          {['Skeptical', 'Busy', 'Friendly', 'Specialist'].map((t, i) => (
            <motion.span key={t} className="orbit-chip" style={{ ['--i' as string]: i }} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.12 }}>{t}</motion.span>
          ))}
        </div>
      </div>

      <div className="privacy-note" role="note">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l6 2v5c0 3.5-2.6 6-6 7-3.4-1-6-3.5-6-7V3l6-2z" stroke="currentColor" strokeWidth="1.6" /></svg>
        <span><strong>Do not enter patient names, phone numbers, medical record numbers or other identifiable patient information.</strong> Obvious identifiers are removed automatically before anything is stored or sent.</span>
      </div>

      <div className="grid-3" style={{ marginTop: 16 }}>
        {CARDS.map(c => (
          <Card key={c.title} onClick={c.action} className={'practice-card' + (c.tone === 'ink' ? ' is-ink' : '')}>
            <span className="pc-icon"><Icon name={c.icon} /></span>
            <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-.015em' }}>{c.title}</div>
            <div style={{ fontSize: 14, color: c.tone === 'ink' ? 'rgba(255,255,255,.7)' : C.ink2 }}>{c.sub}</div>
            <svg className="pc-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Card>
        ))}
      </div>

      <div className="split" style={{ marginTop: 8 }}>
        <div>
          <SectionTitle title="Scenario library" sub="Each one changes how the doctor behaves" right={<button className="link" onClick={() => navTo('p2')}>All 14 scenarios</button>} />
          <div className="grid-2">
            {quick.map(id => {
              const s = scenarioById(id);
              return (
                <Card key={id} onClick={() => start(presetFor(id))} style={{ padding: '16px 18px' }}>
                  <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                    <span className="mono muted" style={{ fontSize: 12 }}>Scenario {s.number}</span>
                    <Tag tone={s.group === 'compliance' ? 'red' : s.group === 'objection' ? 'amber' : s.group === 'scientific' ? 'blue' : 'wash'}>{s.group === 'core' ? 'Core call' : s.group[0].toUpperCase() + s.group.slice(1)}</Tag>
                  </div>
                  <div style={{ fontSize: 15.5, fontWeight: 600 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: C.ink2, marginTop: 2 }}>{s.summary}</div>
                </Card>
              );
            })}
          </div>
        </div>
        <div>
          <SectionTitle title="Your trend" sub="Doctor engagement score" />
          <Card style={{ padding: '14px 16px' }}>
            <TrendChart points={points.slice(-6).map(p => p.total)} labels={points.slice(-6).map(p => p.label)} height={160} />
            {latest && (
              <div className="row" style={{ justifyContent: 'space-between', borderTop: `1px solid ${C.rule}`, paddingTop: 10, marginTop: 6 }}>
                <span style={{ fontSize: 14 }}>Latest: {describe(latest.config).scenario} · <strong>{latest.feedback.total}</strong></span>
                <button className="link" onClick={() => navTo('p4', latest.id)}>Review</button>
              </div>
            )}
          </Card>
          <SectionTitle title="Elmiron Product Certified" sub={`${cert.met} of ${cert.total} met`} />
          <Card style={{ padding: '14px 18px' }}>
            {cert.items.map(i => (
              <div key={i.label} className="req-row">
                <span className={'req-dot' + (i.ok ? ' ok' : '')}>{i.ok ? '✓' : ''}</span>
                <span style={{ flex: 1 }}>{i.label}</span>
                {i.detail && <span className="muted" style={{ fontSize: 13 }}>{i.detail}</span>}
              </div>
            ))}
          </Card>
        </div>
      </div>
    </Shell>
  );
}
