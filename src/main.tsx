import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './screens/generated/pseudo.css';
import './animations.css';
import './app.css';
import './features.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/** Dismiss the start-up screen once the app has rendered and the typeface is ready
 *  (with a short floor so it never flickers, and a ceiling so slow font CDNs never block). */
function dismissBoot() {
  const boot = document.getElementById('boot');
  if (!boot) return;
  const shownFor = performance.now();
  const floor = new Promise(r => setTimeout(r, Math.max(0, 450 - shownFor)));
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const ceiling = new Promise(r => setTimeout(r, 2500));
  Promise.race([Promise.all([fonts, floor]), ceiling]).then(() => {
    boot.classList.add('is-done');
    setTimeout(() => boot.remove(), 400);
  });
}
dismissBoot();
