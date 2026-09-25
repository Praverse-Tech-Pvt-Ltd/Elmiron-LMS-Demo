import { Suspense, useEffect, useLayoutEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SCREEN_NAMES, useDemo, useRoute } from './state';
import { MIN_HEIGHT, SCREENS, roleOf } from './screens';
import Landing from './components/Landing';
import DemoBar from './components/DemoBar';
import ScreenSkeleton from './components/ScreenSkeleton';

const ease = [0.22, 1, 0.36, 1] as const; // ease-out-quint

/** Marks a freshly mounted screen as "entering" for its first second, so the
 *  CSS entrance cascade plays once and later state changes don't replay it. */
function ScreenHost({ children }: { children: ReactNode }) {
  const [entering, setEntering] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => setEntering(false), 1100);
    return () => window.clearTimeout(id);
  }, []);
  return <div className={entering ? 'entering' : undefined}>{children}</div>;
}

export default function App() {
  const [screen, go, params] = useRoute();
  const v = useDemo(go);

  useLayoutEffect(() => { window.scrollTo(0, 0); }, [screen, params.join('/')]);
  useEffect(() => {
    document.title = screen ? `${SCREEN_NAMES[screen].replace(/^[A-Z]\d+b?\s/, '')} · Elmiron Learning` : 'Elmiron Learning';
  }, [screen]);

  const Screen = screen ? SCREENS[screen] : null;
  // l* (learn) and p* (practice) screens belong to the MR flow
  const letter = screen?.[0] ?? 'a';
  const flow = (letter === 'l' || letter === 'p' ? 'a' : letter) as 'a' | 'b' | 'c';

  return (
    <>
      {/* thin progress sweep on every navigation */}
      <motion.div
        key={'sweep-' + (screen ?? 'home') + params.join('/')}
        className="route-sweep"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ scaleX: { duration: 0.45, ease }, opacity: { duration: 0.25, delay: 0.4 } }}
      />
      <AnimatePresence mode="wait" initial={false}>
        {!Screen ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.32, ease } }} exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease } }}>
            <Landing go={go} />
          </motion.div>
        ) : (
          // Keyed by flow: switching role (MR / Manager / Admin) swaps the whole shell;
          // moving within a flow keeps the shell and only restages the content.
          <motion.div
            key={'flow-' + flow}
            className="app-stage"
            style={{ ['--frame-min-h' as string]: MIN_HEIGHT[flow] + 'px' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.32, ease } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.22, ease } }}
          >
            <Suspense fallback={<ScreenSkeleton role={roleOf(screen!)} />}>
              <ScreenHost key={screen + '/' + params.join('/')}><Screen v={v} params={params} /></ScreenHost>
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>{screen && <DemoBar key="bar" screen={screen} go={go} />}</AnimatePresence>
    </>
  );
}
