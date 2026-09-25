import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navTo } from '../../state';
import { PERSONAS, PRODUCTS, SPECIALTIES, personaById, productById, scenarioById, specialtyById } from '../../ai/content';
import { ASSESSMENT_ATTEMPTS, SCENARIO_GROUPS, attemptsFor, fmtLimit, getPendingConfig, scenariosIn, setPendingConfig } from '../../ai/session';
import type { Channel, Difficulty, Experience, Mode, SessionConfig } from '../../ai/types';
import { Button, C, Card, Crumb, Segmented, Shell, Tag } from '../../components/ui';

const DIFFS: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const EXPS: Experience[] = ['Junior doctor', 'Established consultant', 'Senior specialist', 'KOL-style scientific'];
const TIMES = [30, 60, 180, 300, 600];
const voiceSupported = typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

export default function SessionSetup() {
  const [cfg, setCfg] = useState<SessionConfig>(getPendingConfig);
  const set = (p: Partial<SessionConfig>) => setCfg(c => ({ ...c, ...p }));
  const product = productById(cfg.productId);
  const specialties = SPECIALTIES.filter(s => product.specialties.includes(s.id));
  const scenario = scenarioById(cfg.scenarioId);
  const persona = personaById(cfg.personaId);
  const used = useMemo(() => attemptsFor(cfg.scenarioId, 'assessment'), [cfg.scenarioId]);
  const locked = cfg.mode === 'assessment' && used >= ASSESSMENT_ATTEMPTS;

  const start = () => { setPendingConfig(cfg); navTo('p3'); };

  return (
    <Shell role="mr" active="p1" crumbs={<><Crumb to={() => navTo('p1')}>Practice with AI Doctor</Crumb> / Set up a session</>}>
      <div className="split">
        <div className="stack" style={{ gap: 18 }}>
          <div>
            <h1 className="page-title">Set up your practice call</h1>
            <div className="page-sub">Every choice changes how the doctor behaves. The dialogue varies each time, so there's nothing to memorise.</div>
          </div>

          <Card style={{ padding: 20 }}>
            <div className="setup-grid">
              <div className="field">
                <label>Product</label>
                <select className="select" value={cfg.productId} onChange={e => set({ productId: e.target.value })}>
                  {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name} · {p.molecule}</option>)}
                </select>
                <span className="muted" style={{ fontSize: 13 }}>Therapy area: {product.therapyArea}</span>
              </div>
              <div className="field">
                <label>Doctor specialty</label>
                <select className="select" value={cfg.specialtyId} onChange={e => set({ specialtyId: e.target.value })}>
                  {specialties.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <span className="muted" style={{ fontSize: 13 }}>{specialtyById(cfg.specialtyId).depth === 'clinical' ? 'Asks deeper clinical questions' : 'Focuses on practical use and patient selection'}</span>
              </div>
              <div className="field">
                <label>Doctor experience</label>
                <select className="select" value={cfg.experience} onChange={e => set({ experience: e.target.value as Experience })}>
                  {EXPS.map(x => <option key={x}>{x}</option>)}
                </select>
                <span className="muted" style={{ fontSize: 13 }}>Fictional training persona, not a real doctor</span>
              </div>
            </div>
          </Card>

          <div>
            <div className="field-label" style={{ marginBottom: 8 }}>Scenario</div>
            {SCENARIO_GROUPS.map(g => (
              <div key={g.id} style={{ marginBottom: 10 }}>
                <div className="muted" style={{ fontSize: 12.5, fontWeight: 600, margin: '0 0 6px 2px' }}>{g.name}</div>
                <div className="chips">
                  {scenariosIn(g.id).map(s => (
                    <button key={s.id} type="button" className={'chip' + (s.id === cfg.scenarioId ? ' is-on' : '')}
                      onClick={() => set({ scenarioId: s.id, personaId: s.defaultPersona, seconds: s.seconds })}>{s.number}. {s.title}</button>
                  ))}
                </div>
              </div>
            ))}
            <AnimatePresence mode="wait">
              <motion.div key={scenario.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="scenario-brief">
                <strong>{scenario.summary}</strong> {scenario.goal}
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <div className="field-label" style={{ marginBottom: 8 }}>Doctor persona</div>
            <div className="persona-grid">
              {PERSONAS.map(p => (
                <button key={p.id} type="button" className={'persona' + (p.id === cfg.personaId ? ' is-on' : '')} onClick={() => set({ personaId: p.id })}>
                  <span className="persona-name">{p.name}</span>
                  <span className="persona-traits">{p.traits.slice(0, 2).join(' · ')}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="setup-grid">
            <div className="field"><span className="field-label">Difficulty</span><Segmented options={DIFFS} value={cfg.difficulty} onChange={d => set({ difficulty: d })} /></div>
            <div className="field"><span className="field-label">Mode</span><Segmented options={['practice', 'assessment'] as Mode[]} value={cfg.mode} onChange={m => set({ mode: m })} /></div>
            <div className="field">
              <span className="field-label">Conversation</span>
              <Segmented options={(voiceSupported ? ['text', 'voice', 'hybrid'] : ['text']) as Channel[]} value={cfg.channel} onChange={ch => set({ channel: ch })} />
              {!voiceSupported && <span className="muted" style={{ fontSize: 12.5 }}>Voice needs a browser with speech recognition (e.g. Chrome).</span>}
            </div>
            <div className="field">
              <span className="field-label">Time limit</span>
              <div className="chips">
                {TIMES.map(t => <button key={t} type="button" className={'chip' + (t === cfg.seconds ? ' is-on' : '')} onClick={() => set({ seconds: t })}>{t < 60 ? `${t}s` : `${t / 60} min`}</button>)}
              </div>
            </div>
          </div>
        </div>

        <div className="setup-summary">
          <Card className="raised" style={{ padding: 22 }}>
            <div className="row" style={{ gap: 14, marginBottom: 14 }}>
              <div className="doctor-avatar"><span>Dr</span></div>
              <div>
                <div style={{ fontSize: 13.5, color: C.ink2 }}>You'll be meeting</div>
                <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-.007em' }}>{persona.name}</div>
              </div>
            </div>
            <dl className="summary-list">
              <dt>Product</dt><dd>{product.name}</dd>
              <dt>Doctor</dt><dd>{specialtyById(cfg.specialtyId).name}</dd>
              <dt>Persona</dt><dd>{persona.name.replace(/ doctor$/i, '')}</dd>
              <dt>Difficulty</dt><dd>{cfg.difficulty}</dd>
              <dt>Scenario</dt><dd>{scenario.title}</dd>
              <dt>Time</dt><dd>{fmtLimit(cfg.seconds)}</dd>
              <dt>Mode</dt><dd>{cfg.mode === 'practice' ? 'Practice · hints and live coaching' : `Assessment · attempt ${Math.min(used + 1, ASSESSMENT_ATTEMPTS)} of ${ASSESSMENT_ATTEMPTS}`}</dd>
            </dl>
            <Button kind="primary" onClick={start} disabled={locked} style={{ width: '100%', height: 50, marginTop: 16, fontSize: 16 }}>
              {cfg.mode === 'practice' ? 'Start practice' : 'Start assessment'}
            </Button>
            {locked && <div style={{ fontSize: 13.5, color: C.red, marginTop: 8 }}>No assessment attempts left for this scenario. Ask your manager for a reset.</div>}
            <div style={{ fontSize: 13, color: C.ink2, marginTop: 10 }}>
              {cfg.mode === 'practice' ? 'Unlimited attempts. No certification impact.' : 'No hints or coaching during the call. Your transcript and result are stored and may count toward certification.'}
            </div>
          </Card>
          <div className="privacy-note" style={{ marginTop: 12 }}>
            <span>Do not enter identifiable patient information. Grounded in <strong>{product.version}</strong>. <Tag tone="amber" style={{ marginLeft: 4 }}>Demo grounding</Tag></span>
          </div>
        </div>
      </div>
    </Shell>
  );
}

