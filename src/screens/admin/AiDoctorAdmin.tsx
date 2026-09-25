import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navTo } from '../../state';
import { PERSONAS, PRODUCTS, SCENARIOS, SPECIALTIES } from '../../ai/content';
import { ORG_ANALYTICS, clearSessions, resetConfig, updateConfig, useAiStore, type AdminConfig } from '../../ai/store';
import { liveAvailable, resetAvailability } from '../../ai/live';
import { runBenchmarks, BENCHMARKS, type BenchmarkResult } from '../../ai/benchmarks';
import { CRITICAL_NAMES, RUBRIC, type CriticalId } from '../../ai/types';
import { Bar, Button, C, Card, Crumb, Shell, Tabs, Tag } from '../../components/ui';
import Switch from '../../components/Switch';
import CountUp from '../../components/CountUp';

const TABS = ['Content', 'Scenarios & personas', 'Rules & certification', 'Analytics', 'AI usage & cost', 'Benchmarks'] as const;

function Toggle({ on, onChange, label, sub }: { on: boolean; onChange: () => void; label: string; sub?: string }) {
  return (
    <div className="toggle-row tap" onClick={onChange} role="button">
      <div style={{ flex: 1 }}><div style={{ fontSize: 14.5, fontWeight: 500 }}>{label}</div>{sub && <div className="muted" style={{ fontSize: 13 }}>{sub}</div>}</div>
      <Switch on={on} />
    </div>
  );
}

function ContentTab() {
  const { config } = useAiStore();
  const p = PRODUCTS[0];
  const [claim, setClaim] = useState('');
  return (
    <div className="split">
      <div className="stack" style={{ gap: 14 }}>
        <Card style={{ padding: '16px 20px' }}>
          <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <div><div style={{ fontSize: 18, fontWeight: 600 }}>{p.name} · {p.molecule}</div><div className="muted" style={{ fontSize: 14 }}>{p.therapyArea} · {p.version}</div></div>
            <Tag tone="amber">{p.status}</Tag>
          </div>
          <div className="upload-drop">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M8 11V2M4.5 5.5L8 2l3.5 3.5M2 11v3h12v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span>Upload approved material: prescribing information, detail aids, FAQs and objection handlers. Each upload is versioned; the AI only retrieves from approved versions.</span>
          </div>
        </Card>
        <Card style={{ padding: '6px 0' }}>
          <div style={{ padding: '10px 20px', fontSize: 15, fontWeight: 600 }}>Approved product facts <span className="muted" style={{ fontWeight: 400, fontSize: 13.5 }}>· the only grounding the doctor and scorer treat as true</span></div>
          {p.facts.map(f => (
            <div key={f.id} className="fact-row">
              <Tag>{f.topic}</Tag>
              <span style={{ flex: 1, fontSize: 14 }}>{f.text}</span>
              <span className="mono muted" style={{ fontSize: 11.5, whiteSpace: 'nowrap' }}>{f.source}</span>
            </div>
          ))}
        </Card>
        <div className="grid-2">
          <Card style={{ padding: '14px 18px' }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Common doctor objections</div>
            {p.objections.map(o => <div key={o.line} style={{ padding: '6px 0', borderTop: `1px solid ${C.rule}`, fontSize: 14 }}><Tag tone="amber">{o.category}</Tag> <span style={{ marginLeft: 6 }}>"{o.line}"</span><div className="muted" style={{ fontSize: 13, marginTop: 3 }}>{o.responsePoints.join(' · ')}</div></div>)}
          </Card>
          <Card style={{ padding: '14px 18px' }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>FAQs and references</div>
            {p.faqs.map(f => <div key={f.q} style={{ padding: '6px 0', borderTop: `1px solid ${C.rule}`, fontSize: 14 }}><strong>{f.q}</strong><div className="muted" style={{ fontSize: 13.5 }}>{f.a}</div></div>)}
            {p.references.map(r => <div key={r} className="muted" style={{ fontSize: 13, paddingTop: 6 }}>• {r}</div>)}
          </Card>
        </div>
      </div>
      <div className="stack" style={{ gap: 14 }}>
        <Card style={{ padding: '14px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Approved claims</div>
          <ul className="fb-list">{p.approvedClaims.map(c => <li key={c}>{c}</li>)}</ul>
        </Card>
        <Card style={{ padding: '14px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Prohibited claims</div>
          <ul className="fb-list bad">{p.prohibitedClaims.map(c => <li key={c}>{c}</li>)}</ul>
          <AnimatePresence initial={false}>
            {config.prohibitedExtra.map(c => (
              <motion.div key={c} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="row" style={{ justifyContent: 'space-between', fontSize: 14, padding: '4px 0' }}>
                <span>• "{c}" <Tag tone="green">Added</Tag></span>
                <button className="link" style={{ color: C.red }} onClick={() => updateConfig({ prohibitedExtra: config.prohibitedExtra.filter(x => x !== c) })}>Remove</button>
              </motion.div>
            ))}
          </AnimatePresence>
          <form className="row" style={{ marginTop: 8, gap: 8 }} onSubmit={e => { e.preventDefault(); if (claim.trim().length > 3) { updateConfig({ prohibitedExtra: [...config.prohibitedExtra, claim.trim()] }); setClaim(''); } }}>
            <input className="input" value={claim} onChange={e => setClaim(e.target.value)} placeholder='e.g. "fastest relief"' />
            <Button type="submit" small kind="primary">Add</Button>
          </form>
          <div className="muted" style={{ fontSize: 12.5, marginTop: 6 }}>Takes effect in the next practice session: the doctor challenges it and the scorer flags it.</div>
        </Card>
      </div>
    </div>
  );
}

function ScenariosTab() {
  const [spec, setSpec] = useState<string[]>(PRODUCTS[0].specialties);
  return (
    <div className="stack" style={{ gap: 14 }}>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>#</th><th>Scenario</th><th>Default persona</th><th>Time</th><th>Group</th><th>Critical checks</th><th>Assessed on</th></tr></thead>
          <tbody>
            {SCENARIOS.map(s => (
              <tr key={s.id}>
                <td className="mono">{s.number}</td>
                <td><div style={{ fontWeight: 600 }}>{s.title}</div><div className="muted" style={{ fontSize: 13 }}>{s.summary}</div></td>
                <td>{PERSONAS.find(p => p.id === s.defaultPersona)?.name}</td>
                <td>{s.seconds < 60 ? `${s.seconds}s` : `${s.seconds / 60} min`}</td>
                <td><Tag tone={s.group === 'compliance' ? 'red' : s.group === 'objection' ? 'amber' : s.group === 'scientific' ? 'blue' : 'wash'}>{s.group}</Tag></td>
                <td style={{ fontSize: 13 }}>{s.critical.map(c => CRITICAL_NAMES[c]).join(', ')}</td>
                <td style={{ fontSize: 13, maxWidth: 260 }}>{s.goodSigns.slice(0, 2).join('; ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid-2">
        <Card style={{ padding: '14px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Doctor personas <span className="muted" style={{ fontWeight: 400, fontSize: 13.5 }}>· fictional, always professional</span></div>
          {PERSONAS.map(p => (
            <div key={p.id} className="row" style={{ justifyContent: 'space-between', padding: '7px 0', borderTop: `1px solid ${C.rule}`, gap: 10 }}>
              <div><div style={{ fontSize: 14.5, fontWeight: 600 }}>{p.name}</div><div className="muted" style={{ fontSize: 13 }}>{p.traits.join(' · ')}</div></div>
              <div style={{ textAlign: 'right', fontSize: 12.5, whiteSpace: 'nowrap' }} className="muted">≤{p.wordBudget} words · patience {p.patience}</div>
            </div>
          ))}
        </Card>
        <Card style={{ padding: '14px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Specialties for Elmiron</div>
          {SPECIALTIES.map(s => (
            <Toggle key={s.id} on={spec.includes(s.id)} onChange={() => setSpec(x => x.includes(s.id) ? x.filter(y => y !== s.id) : [...x, s.id])} label={s.name} sub={s.depth === 'clinical' ? 'Deeper clinical questions' : 'Practical questions'} />
          ))}
        </Card>
      </div>
    </div>
  );
}

function RulesTab() {
  const { config } = useAiStore();
  const set = (p: Partial<AdminConfig>) => updateConfig(p);
  const cert = config.certification;
  return (
    <div className="grid-2">
      <Card style={{ padding: '14px 18px' }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Critical compliance errors</div>
        <div className="muted" style={{ fontSize: 13.5, marginBottom: 6 }}>Any enabled error sets the result to <strong>Requires retraining</strong>, whatever the score.</div>
        {(Object.keys(CRITICAL_NAMES) as CriticalId[]).map(c => (
          <Toggle key={c} on={config.criticalEnabled[c]} onChange={() => set({ criticalEnabled: { ...config.criticalEnabled, [c]: !config.criticalEnabled[c] } })} label={CRITICAL_NAMES[c]} />
        ))}
      </Card>
      <div className="stack" style={{ gap: 14 }}>
        <Card style={{ padding: '14px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Elmiron Product Certified rule</div>
          <div className="setup-grid">
            <div className="field"><label>Minimum knowledge score (%)</label><input className="input" type="number" min={50} max={100} value={cert.minKnowledgeScore} onChange={e => set({ certification: { ...cert, minKnowledgeScore: +e.target.value } })} /></div>
            <div className="field"><label>Practice sessions required</label><input className="input" type="number" min={0} max={20} value={cert.minPracticeSessions} onChange={e => set({ certification: { ...cert, minPracticeSessions: +e.target.value } })} /></div>
          </div>
          <Toggle on={cert.requireAssessmentPass} onChange={() => set({ certification: { ...cert, requireAssessmentPass: !cert.requireAssessmentPass } })} label="Pass one AI Doctor formal assessment" />
          <Toggle on={cert.noCritical} onChange={() => set({ certification: { ...cert, noCritical: !cert.noCritical } })} label="No critical compliance failure" />
        </Card>
        <Card style={{ padding: '14px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Manager transcript access</div>
          <div className="chips">
            {([['none', 'Scores only'], ['flagged', 'Flagged sessions'], ['all', 'All transcripts']] as const).map(([v, l]) => (
              <button key={v} type="button" className={'chip' + (config.transcriptAccess === v ? ' is-on' : '')} onClick={() => set({ transcriptAccess: v })}>{l}</button>
            ))}
          </div>
          <div className="muted" style={{ fontSize: 13, marginTop: 8 }}>Set per company policy. Managers always see scores.</div>
        </Card>
        <Card style={{ padding: '14px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Scoring rubric</div>
          {RUBRIC.map(r => <div key={r.id} className="row" style={{ justifyContent: 'space-between', fontSize: 14, padding: '3px 0' }}><span>{r.name}</span><span className="muted">{r.weight}%</span></div>)}
        </Card>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  const a = ORG_ANALYTICS;
  const max = Math.max(...a.byScenario.map(s => s.sessions));
  return (
    <div className="stack" style={{ gap: 14 }}>
      <div className="grid-4">
        {[{ l: 'Simulations', v: String(a.sessions) }, { l: 'Average AI Doctor score', v: String(a.avg) }, { l: 'Critical compliance failures', v: String(a.criticalFailures), red: true }, { l: 'Improvement after practice', v: a.improvement }].map(k => (
          <Card key={k.l} style={{ padding: '14px 18px' }}><div style={{ fontSize: 13.5, color: k.red ? C.red : C.ink2 }}>{k.l}</div><div style={{ fontSize: k.v.length > 6 ? 20 : 30, fontWeight: 600, letterSpacing: '-.015em', color: k.red ? C.red : C.ink }}>{/^\d+$/.test(k.v) ? <CountUp to={k.v} /> : k.v}</div></Card>
        ))}
      </div>
      <div className="split">
        <Card style={{ padding: '14px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>By scenario</div>
          {a.byScenario.map((s, i) => (
            <div key={s.name} className="an-row">
              <span style={{ width: 190, fontSize: 14 }}>{s.name}</span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}><Bar pct={(s.sessions / max) * 100} height={8} color={C.mint} delay={0.1 + i * 0.05} /><span className="muted" style={{ fontSize: 12.5, width: 34 }}>{s.sessions}</span></div>
              <span style={{ width: 56, textAlign: 'right', fontSize: 14 }}>avg <strong>{s.avg}</strong></span>
              <span style={{ width: 72, textAlign: 'right' }}>{s.fail > 15 ? <Tag tone="red">{s.fail}% fail</Tag> : <span className="muted" style={{ fontSize: 13 }}>{s.fail}% fail</span>}</span>
            </div>
          ))}
        </Card>
        <Card style={{ padding: '14px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>By region</div>
          {a.byRegion.map((r, i) => <div key={r.name} className="an-row"><span style={{ width: 70, fontSize: 14 }}>{r.name}</span><Bar pct={r.avg} height={8} delay={0.1 + i * 0.05} /><strong style={{ width: 30, textAlign: 'right', fontSize: 14 }}>{r.avg}</strong></div>)}
          <div className="muted" style={{ fontSize: 12.5, marginTop: 8 }}>Individual results are visible only to the MR, their manager and admins, per organisational permissions.</div>
        </Card>
      </div>
      <div className="grid-3">
        <Card style={{ padding: '14px 18px' }}><div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Common MR mistakes</div><ul className="fb-list">{a.commonMistakes.map(m => <li key={m}>{m}</li>)}</ul></Card>
        <Card style={{ padding: '14px 18px' }}><div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Frequent doctor questions</div><ul className="fb-list">{a.frequentQuestions.map(m => <li key={m}>{m}</li>)}</ul></Card>
        <Card style={{ padding: '14px 18px' }}><div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Compliance flags</div>{a.complianceFlags.map(f => <div key={f.flag} className="row" style={{ justifyContent: 'space-between', fontSize: 14, padding: '3px 0' }}><span>{f.flag}</span><Tag tone="red">{f.count}</Tag></div>)}<div className="muted" style={{ fontSize: 13, marginTop: 8 }}>Hardest areas: {a.hardestAreas.join(', ')}</div></Card>
      </div>
    </div>
  );
}

function UsageTab() {
  const { usage, config, sessions } = useAiStore();
  const [avail, setAvail] = useState<boolean | null>(null);
  useEffect(() => { resetAvailability(); liveAvailable().then(setAvail); }, [config.engine]);
  const inT = usage.reduce((a, u) => a + u.inputTokens, 0);
  const outT = usage.reduce((a, u) => a + u.outputTokens, 0);
  const cost = (inT * config.priceIn + outT * config.priceOut) / 1_000_000;
  const fails = usage.filter(u => !u.ok).length;
  return (
    <div className="split">
      <div className="stack" style={{ gap: 14 }}>
        <div className="grid-4">
          {[{ l: 'AI calls', v: String(usage.length) }, { l: 'Input tokens', v: inT.toLocaleString('en-US') }, { l: 'Output tokens', v: outT.toLocaleString('en-US') }, { l: 'Estimated cost', v: `$${cost.toFixed(4)}` }].map(k => (
            <Card key={k.l} style={{ padding: '14px 18px' }}><div style={{ fontSize: 13.5, color: C.ink2 }}>{k.l}</div><div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-.015em' }}>{k.v}</div></Card>
          ))}
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>When</th><th>Call</th><th>Model</th><th>In</th><th>Out</th><th>Latency</th><th>Status</th></tr></thead>
            <tbody>
              {usage.slice(0, 25).map((u, i) => <tr key={i}><td style={{ fontSize: 13 }}>{new Date(u.at).toLocaleTimeString('en-GB')}</td><td>{u.kind === 'doctor' ? 'Doctor turn' : 'Coach review'}</td><td className="mono" style={{ fontSize: 12.5 }}>{u.model}</td><td>{u.inputTokens}</td><td>{u.outputTokens}</td><td>{u.ms} ms</td><td>{u.ok ? <Tag tone="green">OK</Tag> : <Tag tone="red">Fallback</Tag>}</td></tr>)}
              {!usage.length && <tr><td colSpan={7} className="muted" style={{ textAlign: 'center', padding: 24 }}>No live AI calls yet. Sessions so far used the built-in doctor ({sessions.length} sessions, zero AI cost).</td></tr>}
            </tbody>
          </table>
        </div>
        {fails > 0 && <div className="muted" style={{ fontSize: 13.5 }}>{fails} call{fails === 1 ? '' : 's'} fell back to the built-in engine (timeout or service error), sessions were not interrupted.</div>}
      </div>
      <div className="stack" style={{ gap: 14 }}>
        <Card style={{ padding: '14px 18px' }}>
          <div className="row" style={{ justifyContent: 'space-between' }}><span style={{ fontSize: 15, fontWeight: 600 }}>Engine</span>{avail === null ? <Tag>Checking…</Tag> : avail ? <Tag tone="green">Live AI connected</Tag> : <Tag tone="white">Built-in only</Tag>}</div>
          <div className="chips" style={{ margin: '10px 0' }}>
            {([['auto', 'Live AI when available'], ['built-in', 'Built-in only']] as const).map(([v, l]) => <button key={v} type="button" className={'chip' + (config.engine === v ? ' is-on' : '')} onClick={() => updateConfig({ engine: v })}>{l}</button>)}
          </div>
          <div className="muted" style={{ fontSize: 13.5, lineHeight: 1.5 }}>{avail ? 'The server holds the API key; the browser never sees it.' : 'To enable live AI, set ANTHROPIC_API_KEY on the server (see README). Until then the built-in rules engine runs every session at no cost.'}</div>
        </Card>
        <Card style={{ padding: '14px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Cost controls</div>
          <div className="setup-grid">
            <div className="field"><label>Model</label><select className="select" value={config.model} onChange={e => updateConfig({ model: e.target.value })}><option value="claude-sonnet-5">Claude Sonnet 5</option><option value="claude-haiku-4-5-20251001">Claude Haiku 4.5 (lowest cost)</option><option value="claude-opus-5-5">Claude Opus 5.5 (highest quality)</option></select></div>
            <div className="field"><label>Max tokens per doctor turn</label><input className="input" type="number" min={64} max={600} value={config.maxOutputTokens} onChange={e => updateConfig({ maxOutputTokens: +e.target.value })} /></div>
            <div className="field"><label>Turn limit per session</label><input className="input" type="number" min={4} max={30} value={config.maxTurns} onChange={e => updateConfig({ maxTurns: +e.target.value })} /></div>
            <div className="field"><label>Price in / out ($ per M tokens)</label><div className="row" style={{ gap: 6 }}><input className="input" type="number" value={config.priceIn} onChange={e => updateConfig({ priceIn: +e.target.value })} /><input className="input" type="number" value={config.priceOut} onChange={e => updateConfig({ priceOut: +e.target.value })} /></div></div>
          </div>
          <ul className="fb-list" style={{ marginTop: 10 }}>
            <li>Only the 4 most relevant approved facts are retrieved per turn</li>
            <li>Conversation older than 8 turns is compressed to one line</li>
            <li>Structured scenario instructions are reused, never the whole LMS</li>
          </ul>
        </Card>
        <div className="row" style={{ gap: 8 }}><Button small onClick={() => { if (confirm('Reset all AI Doctor settings to defaults?')) resetConfig(); }}>Reset settings</Button><Button small kind="danger" onClick={() => { if (confirm('Clear all stored practice sessions on this device?')) clearSessions(); }}>Clear demo sessions</Button></div>
      </div>
    </div>
  );
}

function BenchmarksTab() {
  const { config } = useAiStore();
  const [results, setResults] = useState<BenchmarkResult[] | null>(null);
  const [running, setRunning] = useState(false);
  const run = () => { setRunning(true); setResults(null); setTimeout(() => { setResults(runBenchmarks(config.criticalEnabled)); setRunning(false); }, 500); };
  const passed = results?.filter(r => r.pass).length ?? 0;
  return (
    <div className="stack" style={{ gap: 14 }}>
      <Card style={{ padding: '16px 20px' }}>
        <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ maxWidth: '70ch' }}><div style={{ fontSize: 16, fontWeight: 600 }}>Benchmark conversations</div><div className="muted" style={{ fontSize: 14 }}>{BENCHMARKS.length} fixed conversations with expected score ranges and critical errors. Run them whenever the model, prompts, product content or scoring change, so updates never silently change assessment results. Also runs in CI with <span className="mono">npm test</span>.</div></div>
          <Button kind="primary" onClick={run} disabled={running}>{running ? 'Running…' : 'Run benchmarks'}</Button>
        </div>
        {results && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="row" style={{ gap: 10, marginTop: 12 }}><Bar pct={(passed / results.length) * 100} color={passed === results.length ? C.green : C.red} /><strong>{passed} / {results.length} passed</strong></motion.div>}
      </Card>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Benchmark</th><th>Expected</th><th>Score</th><th>Result</th><th>Status</th></tr></thead>
          <tbody>
            {BENCHMARKS.map((b, i) => {
              const r = results?.[i];
              return (
                <motion.tr key={b.id} initial={false} animate={{ backgroundColor: r ? (r.pass ? 'rgba(233,240,233,0)' : '#FBF1EE') : 'rgba(0,0,0,0)' }}>
                  <td><div style={{ fontWeight: 600 }}>{b.label}</div><div className="muted" style={{ fontSize: 12.5 }}>{b.mr.length} MR turns · {SCENARIOS.find(s => s.id === b.scenarioId)?.title}</div></td>
                  <td style={{ fontSize: 13.5 }}>{b.expect.min}–{b.expect.max}{b.expect.result ? ` · ${b.expect.result}` : ''}{b.expect.critical ? ` · ${b.expect.critical.join(', ')}` : ''}</td>
                  <td>{r ? <strong>{r.total}</strong> : '—'}</td>
                  <td style={{ fontSize: 13.5 }}>{r ? r.result : '—'}</td>
                  <td>{running ? <span className="spinner" /> : r ? (r.pass ? <Tag tone="green">Pass</Tag> : <span title={r.reasons.join('\n')}><Tag tone="red">Fail</Tag> <span className="muted" style={{ fontSize: 12.5 }}>{r.reasons[0]}</span></span>) : <span className="muted">Not run</span>}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AiDoctorAdmin() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Content');
  return (
    <Shell role="admin" active="c7" crumbs={<><Crumb to={() => navTo('c1')}>Training admin</Crumb> / AI Doctor</>}>
      <h1 className="page-title">AI Doctor</h1>
      <div className="page-sub">Approved grounding, scenarios, rules, analytics, cost and quality checks, all configurable without code changes.</div>
      <div style={{ margin: '16px 0 14px' }}><Tabs tabs={TABS} value={tab} onChange={setTab} /></div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {tab === 'Content' && <ContentTab />}
          {tab === 'Scenarios & personas' && <ScenariosTab />}
          {tab === 'Rules & certification' && <RulesTab />}
          {tab === 'Analytics' && <AnalyticsTab />}
          {tab === 'AI usage & cost' && <UsageTab />}
          {tab === 'Benchmarks' && <BenchmarksTab />}
        </motion.div>
      </AnimatePresence>
    </Shell>
  );
}
