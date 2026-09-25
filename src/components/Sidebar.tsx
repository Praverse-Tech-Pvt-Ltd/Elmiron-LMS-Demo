import { navTo, type ScreenId } from '../state';

export type Role = 'mr' | 'manager' | 'admin';

type Item = { label: string; to?: ScreenId; badge?: string };
const NAV: Record<Role, { title: string; groups: { label?: string; items: Item[] }[] }> = {
  mr: {
    title: 'Learning',
    groups: [
      { label: 'Learning', items: [
        { label: 'Learn', to: 'l1' },
        { label: 'Assigned & due', to: 'a1' },
        { label: 'Browse courses', to: 'a2' },
        { label: 'Paths & certification', to: 'l4' },
        { label: 'Training history', to: 'a9' },
        { label: 'Certificates', to: 'a8' },
      ] },
      { label: 'Practice', items: [
        { label: 'AI Doctor', to: 'p1', badge: 'New' },
        { label: 'Role-play & cases', to: 'l5' },
        { label: 'My progress', to: 'p5' },
      ] },
    ],
  },
  manager: {
    title: 'Manager',
    groups: [{ items: [
      { label: 'Team today' }, { label: 'Coaching queue' },
      { label: 'Team training', to: 'b1' }, { label: 'MR records', to: 'b2' },
      { label: 'AI practice & reviews', to: 'b3', badge: 'New' }, { label: 'Approvals' },
    ] }],
  },
  admin: {
    title: 'Training admin',
    groups: [{ label: 'Training admin', items: [
      { label: 'Dashboard', to: 'c1' }, { label: 'Courses', to: 'c2' }, { label: 'Curriculum & paths', to: 'c6', badge: 'New' },
      { label: 'Question bank', to: 'c3' }, { label: 'Assign', to: 'c4' }, { label: 'AI Doctor', to: 'c7', badge: 'New' },
      { label: 'Reports', to: 'c5' }, { label: 'Users & roles' },
    ] }],
  },
};

/** The design's sidebar, shared by every screen so navigation stays consistent. */
export default function Sidebar({ role, active }: { role: Role; active: ScreenId }) {
  const mr = role === 'mr';
  const nav = NAV[role];
  const pad = mr ? '10px 22px' : '9px 20px';
  const size = mr ? '15px' : '14.5px';
  return (
    <div className="sidebar" style={{ width: mr ? '240px' : '224px', background: '#F1EFE8', padding: mr ? '24px 0' : '22px 0', flex: 'none', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: mr ? '0 22px 28px' : '0 20px 24px', display: 'flex', alignItems: 'center', gap: mr ? '10px' : '9px', cursor: 'pointer' }} onClick={() => navTo(null)} title="Back to overview">
        <span style={{ width: mr ? 24 : 22, height: mr ? 24 : 22, borderRadius: mr ? 8 : 7, background: '#35593A' }} />
        <span style={{ fontSize: mr ? '15px' : '14.5px', fontWeight: 600, letterSpacing: '-.005em' }}>Elmiron Field</span>
      </div>
      <div className="sidebar-scroll">
        {nav.groups.map((g, gi) => (
          <div key={gi} role="group" aria-labelledby={g.label ? `nav-group-${role}-${gi}` : undefined} style={{ marginTop: gi > 0 ? 22 : 0 }}>
            {g.label && <div id={`nav-group-${role}-${gi}`} className="nav-group-label" style={{ padding: mr ? '0 22px 6px' : '0 20px 6px' }}>{g.label}</div>}
            {g.items.map(it => {
              const on = it.to === active;
              const style = on
                ? { padding: pad, fontSize: size, fontWeight: 600, color: '#35593A', background: '#E4EAE3', boxShadow: 'inset 3px 0 0 #35593A', cursor: 'pointer' }
                : { padding: pad, fontSize: size, color: '#585B52', cursor: it.to ? 'pointer' : 'default' };
              return (
                <div key={it.label} className={it.to && !on ? 'tap h0 nav-item' : 'nav-item'} style={{ ...style, display: 'flex', alignItems: 'center', gap: 8 }} onClick={it.to ? () => navTo(it.to!) : undefined}>
                  <span style={{ flex: 1 }}>{it.label}</span>
                  {it.badge && <span className="nav-badge">{it.badge}</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {mr && (
        <div style={{ marginTop: 'auto', padding: '0 22px' }}>
          <div style={{ borderTop: '1px solid #E1DFD7', paddingTop: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ width: 34, height: 34, borderRadius: '50%', background: '#E4EAE3', color: '#35593A', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>PS</span>
            <div><div style={{ fontSize: '14.5px', fontWeight: 600 }}>Pratham Shrivastav</div><div style={{ fontSize: 13, color: '#585B52' }}>MR · South Mumbai</div><div style={{ fontFamily: "'Source Code Pro',monospace", fontSize: 12, color: '#585B52' }}>EMP-40218</div></div>
          </div>
        </div>
      )}
      {role === 'manager' && (
        <div style={{ marginTop: 'auto', padding: '0 20px' }}>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: '#585B52', borderTop: '1px solid #E1DFD7', paddingTop: 14 }}><strong style={{ color: '#1F211C', fontWeight: 600 }}>R. Deshpande</strong><br />Area manager · Mumbai · 12 MRs</div>
        </div>
      )}
      {role === 'admin' && (
        <div style={{ marginTop: 'auto', padding: '0 20px' }}>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: '#585B52', borderTop: '1px solid #E1DFD7', paddingTop: 14 }}><strong style={{ color: '#1F211C', fontWeight: 600 }}>S. Pillai</strong><br />Training admin · all regions</div>
        </div>
      )}
    </div>
  );
}
