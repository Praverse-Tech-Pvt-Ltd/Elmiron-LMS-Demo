import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FLOWS, SCREEN_IDS, SCREEN_NAMES, type ScreenId } from '../state';

/** Floating demo control. The dashed edge marks it as not part of the product, as in the design. */
export default function DemoBar({ screen, go }: { screen: ScreenId; go: (s: ScreenId | null) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const idx = SCREEN_IDS.indexOf(screen);
  const prev = SCREEN_IDS[idx - 1];
  const next = SCREEN_IDS[idx + 1];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight' && next && e.altKey) go(next);
      if (e.key === 'ArrowLeft' && prev && e.altKey) go(prev);
    };
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onDown); };
  }, [go, next, prev]);

  useEffect(() => setOpen(false), [screen]);

  return (
    <motion.div
      ref={ref}
      className="demobar"
      initial={{ y: -70, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ type: 'spring', stiffness: 260, damping: 26, delay: 0.25 }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            className="demobar-menu"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {FLOWS.map((f, fi) => (
              <div key={f.key} className="demobar-flow">
                <div className="demobar-flow-head">
                  <span className={'flow-tag flow-' + f.key}>Flow {f.key}</span>
                  <span>{f.title}</span>
                </div>
                <div className="demobar-grid">
                  {f.screens.map((id, i) => (
                    <motion.button
                      type="button"
                      key={id}
                      className={'demobar-item' + (id === screen ? ' is-current' : '')}
                      onClick={() => go(id)}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * (i + fi * 4), duration: 0.2 }}
                    >
                      <span className="demobar-code">{SCREEN_NAMES[id].split(' ')[0]}</span>
                      {SCREEN_NAMES[id].split(' ').slice(1).join(' ')}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <span className="demobar-label">
        Demo mode ·{' '}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={screen}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{ display: 'inline-block', color: '#1F211C' }}
          >
            {SCREEN_NAMES[screen]}
          </motion.span>
        </AnimatePresence>
      </span>
      <div className="demobar-actions">
        <button type="button" className="demobar-btn icon" disabled={!prev} onClick={() => prev && go(prev)} aria-label="Previous screen" title="Previous screen (Alt + ←)">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" className="demobar-btn icon" disabled={!next} onClick={() => next && go(next)} aria-label="Next screen" title="Next screen (Alt + →)">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" className={'demobar-btn' + (open ? ' is-open' : '')} onClick={() => setOpen(o => !o)} aria-expanded={open}>
          All screens
          <motion.svg width="12" height="12" viewBox="0 0 16 16" fill="none" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </button>
        <button type="button" className="demobar-btn" onClick={() => go(null)}>Exit demo</button>
      </div>
    </motion.div>
  );
}
