import { useEffect, useRef, useState } from 'react';

const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Counts a figure like "8", "86%" or "2,146" up from zero when it mounts or changes. */
export default function CountUp({ to, duration = 900 }: { to: string; duration?: number }) {
  const grouped = to.includes(',');
  const clean = to.replace(/,/g, '');
  const target = parseFloat(clean);
  const suffix = clean.replace(/^[\d.]+/, '');
  const decimals = (clean.split('.')[1] || '').replace(/\D/g, '').length;
  const fmt = (n: number) => grouped ? Math.round(n).toLocaleString('en-US') : n.toFixed(decimals);
  const [val, setVal] = useState(reduced() ? target : 0);
  const from = useRef(0);

  useEffect(() => {
    if (reduced()) { setVal(target); return; }
    const start = performance.now();
    const begin = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(begin + (target - begin) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(val)}{suffix}</span>;
}
