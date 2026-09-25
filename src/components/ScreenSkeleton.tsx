import type { Role } from './Sidebar';

/** Loading placeholder shaped like the screen that is on its way: the role's sidebar,
 *  the header, a title and the first content blocks. It fades in only if loading takes
 *  longer than a beat, so fast loads never flash. */
export default function ScreenSkeleton({ role }: { role: Role }) {
  const mr = role === 'mr';
  const navItems = mr ? 9 : role === 'manager' ? 6 : 8;
  return (
    <div className="skel-screen" role="status" aria-live="polite" aria-label="Loading screen">
      <div className="skel-side" style={{ width: mr ? 240 : 224 }}>
        <div className="skel-brand"><span className="skel-mark" /><span className="skel b" style={{ width: 96 }} /></div>
        {Array.from({ length: navItems }, (_, i) => (
          <span key={i} className="skel b" style={{ width: `${54 + ((i * 37) % 38)}%`, marginTop: i === 6 && mr ? 26 : 0 }} />
        ))}
      </div>
      <div className="skel-main">
        <div className="skel-head"><span className="skel" style={{ width: 180 }} /><span className="skel pill" style={{ width: 260 }} /></div>
        <span className="skel title" style={{ width: '32%' }} />
        <span className="skel" style={{ width: '48%', marginTop: 10 }} />
        <div className="skel-block hero" />
        <div className="skel-row">
          <div className="skel-block" style={{ flex: 1.6 }}>
            {Array.from({ length: 5 }, (_, i) => <span key={i} className="skel line" style={{ width: `${82 - i * 7}%` }} />)}
          </div>
          <div className="skel-block" style={{ flex: 1 }}>
            {Array.from({ length: 4 }, (_, i) => <span key={i} className="skel line" style={{ width: `${70 - i * 6}%` }} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
