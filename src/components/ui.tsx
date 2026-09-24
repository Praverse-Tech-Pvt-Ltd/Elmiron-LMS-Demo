/* Small UI kit for the new screens, drawn from the design's tokens and components. */
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Sidebar, { type Role } from './Sidebar';
import { navTo, type ScreenId } from '../state';
import type { Level } from '../content/types';

export const C = {
  canvas: '#E9E7E0', paper: '#FBFAF7', card: '#FFFFFF', wash: '#F1EFE8', washPress: '#E5E2D9',
  ink: '#1F211C', ink2: '#585B52', rule: '#F2F0E9', green: '#35593A', greenWash: '#E9F0E9', navActive: '#E4EAE3',
  blue: '#2A5570', blueWash: '#E7EFF4', amber: '#7A5510', amberWash: '#F7EFDD', red: '#9C3B26', redWash: '#F8EAE6', mint: '#B8CDB8',
};

/* ---------- status pill (glyph + word, as in the design) ---------- */
export type PillKind = 'ns' | 'ip' | 'due' | 'od' | 'cp' | 'fail' | 'info';
const PILL: Record<PillKind, [string, string]> = {
  ns: [C.wash, C.ink2], ip: [C.blueWash, C.blue], due: [C.amberWash, C.amber], od: [C.redWash, C.red],
  cp: [C.greenWash, C.green], fail: [C.redWash, C.red], info: [C.wash, C.ink2],
};
export function Glyph({ kind, pct = 45, size = 12 }: { kind: PillKind; pct?: number; size?: number }) {
  const [, fg] = PILL[kind];
  if (kind === 'ns' || kind === 'info') return <span style={{ width: size - 1, height: size - 1, borderRadius: '50%', border: `1.8px solid ${fg}`, boxSizing: 'border-box', flex: 'none' }} />;
  if (kind === 'ip') return <span style={{ width: size, height: size, borderRadius: '50%', border: `1.8px solid ${fg}`, background: `conic-gradient(${fg} 0 ${pct}%,transparent 0)`, boxSizing: 'border-box', flex: 'none' }} />;
  if (kind === 'due') return <span style={{ width: size + 2, height: size + 2, borderRadius: '50%', background: fg, color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>!</span>;
  if (kind === 'od' || kind === 'fail') return <svg width="10" height="10" viewBox="0 0 16 16" fill="none" style={{ flex: 'none' }}><path d="M4 4l8 8M12 4l-8 8" stroke={fg} strokeWidth="2.8" strokeLinecap="round" /></svg>;
  return (
    <span style={{ width: size + 2, height: size + 2, borderRadius: '50%', background: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
      <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}
export function Pill({ kind, children, pct, small }: { kind: PillKind; children: ReactNode; pct?: number; small?: boolean }) {
  const [bg, fg] = PILL[kind];
  return (
    <span className="pill" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: bg, color: fg, borderRadius: 999, padding: small ? '3px 10px 3px 7px' : '4px 11px 4px 8px', fontSize: small ? 12.5 : 13, fontWeight: 600, whiteSpace: 'nowrap' }}>
      <Glyph kind={kind} pct={pct} />{children}
    </span>
  );
}
export function statusPill(pct: number, final?: { passed: boolean }) {
  if (final && !final.passed) return <Pill kind="fail">Not cleared · retake</Pill>;
  if (pct >= 100 || final?.passed) return <Pill kind="cp">Completed</Pill>;
  if (pct > 0) return <Pill kind="ip" pct={pct}>In progress · {pct}%</Pill>;
  return <Pill kind="ns">Not started</Pill>;
}

export function Tag({ children, tone = 'wash', style }: { children: ReactNode; tone?: 'wash' | 'ink' | 'green' | 'blue' | 'amber' | 'red' | 'white'; style?: CSSProperties }) {
  const map = { wash: [C.wash, C.ink], ink: [C.ink, '#fff'], green: [C.greenWash, C.green], blue: [C.blueWash, C.blue], amber: [C.amberWash, C.amber], red: [C.redWash, C.red], white: ['#fff', C.ink2] } as const;
  const [bg, fg] = map[tone];
  return <span className="tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: bg, color: fg, borderRadius: 999, padding: '3px 10px', fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap', ...style }}>{children}</span>;
}
const LEVEL_TONE: Record<Level, 'wash' | 'blue' | 'amber' | 'ink'> = { Beginner: 'wash', Intermediate: 'blue', Advanced: 'amber', Certification: 'ink' };
export const LevelTag = ({ level }: { level: Level }) => <Tag tone={LEVEL_TONE[level]}>{level}</Tag>;

/* ---------- progress ---------- */
export function Bar({ pct, color = C.green, track = C.wash, height = 6, delay = 0.15 }: { pct: number; color?: string; track?: string; height?: number; delay?: number }) {
  return (
    <div style={{ flex: 1, height, background: track, borderRadius: height / 2, overflow: 'hidden' }}>
      <motion.div initial={{ width: 0 }} animate={{ width: `${Math.max(0, Math.min(100, pct))}%` }} transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay }} style={{ height: '100%', background: color, borderRadius: height / 2 }} />
    </div>
  );
}

export function Ring({ value, max = 100, size = 132, stroke = 10, color = C.green, label }: { value: number; max?: number; size?: number; stroke?: number; color?: string; label?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const [shown, setShown] = useState(0);
  useEffect(() => {
    let raf = 0; const start = performance.now();
    const tick = (t: number) => { const k = Math.min(1, (t - start) / 1100); setShown(Math.round(value * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={C.wash} strokeWidth={stroke} fill="none" />
        <motion.circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - value / max) }} transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: size * 0.27, fontWeight: 600, letterSpacing: '-.04em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{shown}</span>
        {label && <span style={{ fontSize: 12.5, color: C.ink2, marginTop: 4 }}>{label}</span>}
      </div>
    </div>
  );
}

/** Line chart for skill trends (brief §32). */
export function TrendChart({ points, height = 170, labels }: { points: number[]; height?: number; labels?: string[] }) {
  const w = 560, h = height, pad = 28;
  if (!points.length) return <div style={{ color: C.ink2, fontSize: 14 }}>No sessions yet.</div>;
  const xs = points.map((_, i) => pad + (points.length === 1 ? (w - pad * 2) / 2 : (i * (w - pad * 2)) / (points.length - 1)));
  const ys = points.map(p => h - pad - (p / 100) * (h - pad * 2));
  const d = xs.map((x, i) => `${i ? 'L' : 'M'}${x},${ys[i]}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label="Score trend">
      {[0, 50, 100].map(g => { const y = h - pad - (g / 100) * (h - pad * 2); return <g key={g}><line x1={pad} x2={w - pad} y1={y} y2={y} stroke="#EFEDE6" /><text x={4} y={y + 4} fontSize="11" fill={C.ink2}>{g}</text></g>; })}
      <line x1={pad} x2={w - pad} y1={h - pad - 0.75 * (h - pad * 2)} y2={h - pad - 0.75 * (h - pad * 2)} stroke={C.green} strokeDasharray="4 4" opacity=".5" />
      <motion.path d={d} fill="none" stroke={C.green} strokeWidth="2.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: 'easeOut' }} />
      {xs.map((x, i) => (
        <motion.g key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 + i * 0.12 }} style={{ transformOrigin: `${x}px ${ys[i]}px` }}>
          <circle cx={x} cy={ys[i]} r="5" fill="#fff" stroke={C.green} strokeWidth="2.5" />
          <text x={x} y={ys[i] - 11} fontSize="12" fontWeight="600" textAnchor="middle" fill={C.ink}>{points[i]}</text>
          {labels?.[i] && <text x={x} y={h - 6} fontSize="11" textAnchor="middle" fill={C.ink2}>{labels[i]}</text>}
        </motion.g>
      ))}
    </svg>
  );
}

export function Sparkline({ points, w = 90, h = 26 }: { points: number[]; w?: number; h?: number }) {
  if (points.length < 2) return null;
  const min = Math.min(...points) - 5, max = Math.max(...points) + 5;
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${(i * w) / (points.length - 1)},${h - ((p - min) / (max - min)) * h}`).join(' ');
  const up = points[points.length - 1] >= points[0];
  return <svg width={w} height={h} style={{ overflow: 'visible' }}><motion.path d={d} fill="none" stroke={up ? C.green : C.red} strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9 }} /></svg>;
}

export function Tabs<T extends string>({ tabs, value, onChange }: { tabs: readonly T[] | T[]; value: T; onChange: (t: T) => void }) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map(t => (
        <button key={t} type="button" role="tab" aria-selected={t === value} className={'tab' + (t === value ? ' is-on' : '')} onClick={() => onChange(t)}>
          {t}
          {t === value && <motion.span layoutId="tab-underline" className="tab-line" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
        </button>
      ))}
    </div>
  );
}

export function Segmented<T extends string>({ options, value, onChange }: { options: readonly T[] | T[]; value: T; onChange: (t: T) => void }) {
  return (
    <div className="segmented">
      {options.map(o => (
        <button key={o} type="button" className={'seg' + (o === value ? ' is-on' : '')} onClick={() => onChange(o)}>
          {o === value && <motion.span layoutId={'seg-' + options.join('')} className="seg-bg" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
          <span style={{ position: 'relative' }}>{o}</span>
        </button>
      ))}
    </div>
  );
}

export const Card = ({ children, className = '', style, onClick }: { children: ReactNode; className?: string; style?: CSSProperties; onClick?: () => void }) => (
  <div className={'ui-card ' + (onClick ? 'is-click ' : '') + className} style={style} onClick={onClick}>{children}</div>
);

export const Button = ({ children, kind = 'wash', onClick, disabled, small, type = 'button', style }: { children: ReactNode; kind?: 'primary' | 'wash' | 'ghost' | 'danger'; onClick?: () => void; disabled?: boolean; small?: boolean; type?: 'button' | 'submit'; style?: CSSProperties }) => (
  <button type={type} className={`ui-btn ui-btn-${kind}${small ? ' ui-btn-sm' : ''}`} onClick={onClick} disabled={disabled} style={style}>{children}</button>
);

/* ---------- the page shell for new screens ---------- */
const ROLE_HOME: Record<Role, ScreenId> = { mr: 'l1', manager: 'b1', admin: 'c1' };
export function Shell({ role, active, crumbs, children, actions }: { role: Role; active: ScreenId; crumbs: ReactNode; children: ReactNode; actions?: ReactNode }) {
  return (
    <div className="shell screen-frame-lite">
      <Sidebar role={role} active={active} />
      <div className="shell-main">
        <div className="shell-head">
          <div className="crumbs">{crumbs}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {actions}
            <div className="role-switch">
              <span>Demo control · Viewing as</span>
              {(['mr', 'manager', 'admin'] as Role[]).map(r => (
                <button key={r} type="button" className={r === role ? 'is-on' : ''} onClick={() => navTo(ROLE_HOME[r])}>{r === 'mr' ? 'MR' : r === 'manager' ? 'Manager' : 'Admin'}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="shell-body">{children}</div>
      </div>
    </div>
  );
}

export const Crumb = ({ to, children }: { to?: () => void; children: ReactNode }) =>
  to ? <span className="crumb-link" onClick={to}>{children}</span> : <span>{children}</span>;

export function SectionTitle({ title, sub, right }: { title: ReactNode; sub?: ReactNode; right?: ReactNode }) {
  return (
    <div className="section-head">
      <div><span className="st-title">{title}</span>{sub && <span className="st-sub">{sub}</span>}</div>
      {right}
    </div>
  );
}

export const Empty = ({ title, body, action }: { title: string; body: string; action?: ReactNode }) => (
  <div className="ui-card" style={{ padding: '44px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
    <span style={{ width: 36, height: 36, borderRadius: '50%', border: `2px solid ${C.ink2}`, marginBottom: 6 }} />
    <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-.02em' }}>{title}</div>
    <div style={{ fontSize: 15, color: C.ink2, maxWidth: '48ch' }}>{body}</div>
    {action}
  </div>
);
