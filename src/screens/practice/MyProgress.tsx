import { navTo } from '../../state';
import { useAiStore } from '../../ai/store';
import { certificationStatus, trend } from '../../ai/session';
import { RUBRIC } from '../../ai/types';
import { Card, Crumb, Shell, SectionTitle, Tag, TrendChart, Sparkline, C, Button } from '../../components/ui';
import { getLearn } from '../../content/learnStore';

export default function MyProgress() {
  const { sessions } = useAiStore();
  const pts = trend(sessions);
  const knowledge = getLearn().finals['elmiron-masterclass']?.score ?? 86;
  const cert = certificationStatus(sessions, knowledge, true);
  const engagement = pts.map(p => Math.round(((p.dims.opening ?? 0) + (p.dims.need ?? 0) + (p.dims.pitch ?? 0) + (p.dims.objection ?? 0) + (p.dims.communication ?? 0)) / 5));

  return (
    <Shell role="mr" active="p5" crumbs={<><Crumb to={() => navTo('p1')}>Practice with AI Doctor</Crumb> / My progress</>}
      actions={<Button small kind="primary" onClick={() => navTo('p2')}>New session</Button>}>
      <h1 className="page-title">My progress</h1>
      <div className="page-sub">Scores come only from AI Doctor sessions and assessments — never from arbitrary ratings.</div>

      <div className="split" style={{ marginTop: 8 }}>
        <div>
          <SectionTitle title="Doctor engagement" sub="Improvement over time" />
          <Card style={{ padding: '14px 18px' }}>
            <TrendChart points={engagement} labels={pts.map(p => p.label)} height={190} />
            <div className="row" style={{ gap: 18, flexWrap: 'wrap', borderTop: `1px solid ${C.rule}`, paddingTop: 10, marginTop: 4 }}>
              {engagement.slice(-4).map((v, i, arr) => <span key={i} style={{ fontSize: 14 }}>Attempt {pts.length - arr.length + i + 1}: <strong>{v}%</strong></span>)}
            </div>
          </Card>

          <SectionTitle title="By dimension" sub="Each line is one attempt" />
          <div className="grid-4">
            {RUBRIC.map(r => {
              const series = pts.map(p => p.dims[r.id] ?? 0);
              const last = series[series.length - 1] ?? 0;
              return (
                <Card key={r.id} style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: 13, color: C.ink2, minHeight: 34 }}>{r.name}</div>
                  <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-.03em' }}>{last}<span style={{ fontSize: 14, color: C.ink2 }}>%</span></span>
                    <Sparkline points={series} w={70} />
                  </div>
                </Card>
              );
            })}
          </div>

          <SectionTitle title="Sessions" sub={`${pts.length} in total`} />
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>#</th><th>Date</th><th>Scenario</th><th>Mode</th><th>Score</th><th /></tr></thead>
              <tbody>
                {[...pts].reverse().map(p => (
                  <tr key={p.label}>
                    <td className="mono">{p.label}</td>
                    <td>{p.date}</td>
                    <td>{p.scenario}</td>
                    <td><Tag tone={p.mode === 'assessment' ? 'ink' : 'wash'}>{p.mode === 'assessment' ? 'Assessment' : 'Practice'}</Tag></td>
                    <td><strong>{p.total}</strong>{p.critical && <Tag tone="red" style={{ marginLeft: 8 }}>Critical</Tag>}</td>
                    <td style={{ textAlign: 'right' }}>{p.id ? <button className="link" onClick={() => navTo('p4', p.id)}>Review</button> : <span className="muted" style={{ fontSize: 13 }}>Archived</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <SectionTitle title="Elmiron Product Certified" sub={cert.certified ? 'Certified' : `${cert.met} of ${cert.total}`} />
          <Card style={{ padding: '14px 18px' }}>
            {cert.items.map(i => (
              <div key={i.label} className="req-row">
                <span className={'req-dot' + (i.ok ? ' ok' : '')}>{i.ok ? '✓' : ''}</span>
                <span style={{ flex: 1 }}>{i.label}</span>
                {i.detail && <span className="muted" style={{ fontSize: 13 }}>{i.detail}</span>}
              </div>
            ))}
            <div className="muted" style={{ fontSize: 13, marginTop: 8 }}>Rules are configured by your training admin.</div>
          </Card>
          <SectionTitle title="Recommended practice" />
          <div className="stack" style={{ gap: 8 }}>
            {(sessions[0]?.feedback.recommended ?? [{ courseId: 'objection-handling', label: 'Handling doctor objections', minutes: 8 }, { courseId: 'scientific-communication', label: 'Scientific communication', minutes: 10 }]).map(r => (
              <Card key={r.courseId} onClick={() => navTo('l2', r.courseId)} style={{ padding: '12px 16px' }}>
                <div className="row" style={{ justifyContent: 'space-between' }}><span style={{ fontWeight: 600, fontSize: 14.5 }}>{r.label}</span><span className="muted" style={{ fontSize: 13.5 }}>{r.minutes} min</span></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
