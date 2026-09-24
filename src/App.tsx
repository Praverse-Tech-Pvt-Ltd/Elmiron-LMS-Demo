import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDemo, useRoute } from './state';
import { MIN_HEIGHT, SCREENS } from './screens';
import Landing from './components/Landing';
import DemoBar from './components/DemoBar';

const ease = [0.2, 0.8, 0.2, 1] as const;

/** Marks a freshly mounted screen as "entering" for its first second, so the
 *  CSS entrance cascade plays once and later state changes don't replay it. */
function ScreenHost({ children }: { children: ReactNode }) {
  const [entering, setEntering] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => setEntering(false), 1200);
    return () => window.clearTimeout(id);
  }, []);
  return <div className={entering ? 'entering' : undefined}>{children}</div>;
}

export default function App() {
  const [screen, go] = useRoute();
  const v = useDemo(go);

  useLayoutEffect(() => { window.scrollTo(0, 0); }, [screen]);
  useEffect(() => {
    document.title = screen ? `Elmiron Learning · ${screen.toUpperCase()}` : 'Elmiron Learning';
  }, [screen]);

  const Screen = screen ? SCREENS[screen] : null;
  const flow = (screen?.[0] ?? 'a') as 'a' | 'b' | 'c';

  return (
    <>
      {/* thin progress sweep on every navigation */}
      <motion.div
        key={'sweep-' + (screen ?? 'home')}
        className="route-sweep"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ scaleX: { duration: 0.5, ease }, opacity: { duration: 0.3, delay: 0.45 } }}
      />
      <AnimatePresence mode="wait" initial={false}>
        {!Screen ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease }}>
            <Landing go={go} />
          </motion.div>
        ) : (
          // Keyed by flow: switching role (MR / Manager / Admin) swaps the whole shell;
          // moving within a flow keeps the shell and only restages the content.
          <motion.div
            key={'flow-' + flow}
            className="app-stage"
            style={{ ['--frame-min-h' as string]: MIN_HEIGHT[flow] + 'px' }}
            initial={{ opacity: 0, scale: 0.985, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: -10 }}
            transition={{ duration: 0.35, ease }}
          >
            <ScreenHost key={screen}><Screen v={v} /></ScreenHost>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>{screen && <DemoBar key="bar" screen={screen} go={go} />}</AnimatePresence>
    </>
  );
}
