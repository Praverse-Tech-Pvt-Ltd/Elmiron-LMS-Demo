import { motion } from 'framer-motion';
import { Bar, C, Card } from './ui';

export interface ScoredArea { name: string; pct: number }
export interface Recurring { text: string; count: number }

/* Side-by-side strengths and scope of improvement, each backed by the rubric score that produced it. */
export default function StrengthsScope({ strengths, scope, strengthLines = [], scopeLines = [], sessions }: {
  strengths: ScoredArea[]; scope: ScoredArea[]; strengthLines?: Recurring[]; scopeLines?: Recurring[]; sessions?: number;
}) {
  const col = (kind: 'good' | 'improve', title: string, areas: ScoredArea[], lines: Recurring[]) => (
    <Card className={'ss-col ' + kind} style={{ padding: '16px 18px' }}>
      <div className={'fb-head ' + kind}>{title}</div>
      <div className="stack" style={{ gap: 8, marginTop: 6 }}>
        {areas.map((a, i) => (
          <motion.div key={a.name} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.06 }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14.5, fontWeight: 600 }}>{a.name}</span>
              <span style={{ fontSize: 13.5, fontVariantNumeric: 'tabular-nums' }}>{a.pct}%</span>
            </div>
            <div className="row"><Bar pct={a.pct} height={5} color={a.pct >= 75 ? C.green : a.pct >= 50 ? '#B08A2E' : C.red} delay={0.1 + i * 0.06} /></div>
          </motion.div>
        ))}
        {areas.length === 0 && <span className="muted" style={{ fontSize: 14 }}>Shows after the first evaluated role-play.</span>}
      </div>
      {lines.length > 0 && (
        <ul className="fb-list" style={{ marginTop: 10 }}>
          {lines.map(l => <li key={l.text}>{l.text}{l.count > 1 && <span className="muted"> · in {l.count} role-plays</span>}</li>)}
        </ul>
      )}
    </Card>
  );
  return (
    <div>
      <div className="grid-2">
        {col('good', 'Strengths', strengths, strengthLines)}
        {col('improve', 'Scope of improvement', scope, scopeLines)}
      </div>
      {sessions !== undefined && <div className="muted" style={{ fontSize: 12.5, marginTop: 6 }}>From {sessions} evaluated role-play{sessions === 1 ? '' : 's'}, averaged per rubric dimension.</div>}
    </div>
  );
}
