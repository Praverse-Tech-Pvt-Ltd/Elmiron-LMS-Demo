// Generated from the Elmiron Learning design. Edit freely.
import { Fragment } from 'react';
import type { DemoValues } from '../../state';
import CountUp from '../../components/CountUp';

export default function ScreenB1({ v }: { v: DemoValues }) {
  void Fragment; void CountUp;
  return (
    <div className="screen-frame" style={{ background: "#FBFAF7", overflow: "hidden", display: "flex" }}>
    <div style={{ width: "224px", background: "#F1EFE8", padding: "22px 0", flex: "none", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "0 20px 24px", display: "flex", alignItems: "center", gap: "9px" }}><span style={{ width: "22px", height: "22px", borderRadius: "7px", background: "#35593A" }}></span><span style={{ fontSize: "14.5px", fontWeight: "600" }}>Elmiron Field</span></div>
      <div style={{ padding: "9px 20px", fontSize: "14.5px", color: "#585B52" }}>Team today</div>
      <div style={{ padding: "9px 20px", fontSize: "14.5px", color: "#585B52" }}>Coaching queue</div>
      <div className="tap" style={{ padding: "9px 20px", fontSize: "14.5px", fontWeight: "600", color: "#35593A", background: "#E4EAE3", boxShadow: "inset 3px 0 0 #35593A", cursor: "pointer" }} onClick={v.go.b1}>Team training</div>
      <div className="tap h0" style={{ padding: "9px 20px", fontSize: "14.5px", color: "#585B52", cursor: "pointer" }} onClick={v.go.b2}>MR records</div>
      <div style={{ padding: "9px 20px", fontSize: "14.5px", color: "#585B52" }}>Approvals</div>
      <div style={{ marginTop: "auto", padding: "0 20px" }}><div style={{ fontSize: "13px", lineHeight: "1.5", color: "#585B52", borderTop: "1px solid #E1DFD7", paddingTop: "14px" }}><strong style={{ color: "#1F211C", fontWeight: "600" }}>R. Deshpande</strong><br  />Area manager · Mumbai · 12 MRs</div></div>
    </div>
    <div className="screen-main" style={{ flex: "1", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ height: "52px", padding: "0 30px", display: "flex", alignItems: "center", justifyContent: "flex-end", flex: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px dashed #8B8E84", borderRadius: "999px", padding: "3px 3px 3px 12px" }}><span style={{ fontSize: "12.5px", fontWeight: "500", color: "#585B52" }}>Demo control · Viewing as</span><div style={{ display: "flex", gap: "2px" }}><button className="tap h1" style={{ height: "26px", padding: "0 11px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "12.5px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.a1}>MR</button><button className="tap" style={{ height: "26px", padding: "0 11px", border: "none", borderRadius: "999px", background: "#1F211C", color: "#FFFFFF", fontSize: "12.5px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.b1}>Manager</button><button className="tap h1" style={{ height: "26px", padding: "0 11px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "12.5px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.c1}>Admin</button></div></div>
      </div>
      <div style={{ flex: "1", padding: "0 30px 26px", overflow: "hidden", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}><div style={{ fontSize: "26px", fontWeight: "600", letterSpacing: "-.03em" }}>Team training</div><div style={{ fontSize: "14px", color: "#585B52" }}>As of 24 Sep 2026, 09:00 IST</div></div>
        <div style={{ display: "grid", gridTemplateColumns: "300px minmax(0,1fr)", gap: "14px" }}>
          <div style={{ background: "#FFFFFF", borderRadius: "14px", padding: "16px 20px", boxShadow: "0 1px 2px rgba(20,21,15,.05)" }}>
            <div style={{ fontSize: "13.5px", fontWeight: "500", color: "#585B52", marginBottom: "4px" }}>Mandatory training compliance</div>
            <div style={{ fontSize: "40px", fontWeight: "600", letterSpacing: "-.045em", lineHeight: "1.05" }}><CountUp to="75%" /></div>
            <div style={{ fontSize: "14px", color: "#585B52", marginTop: "4px" }}>9 of 12 MRs have finished every mandatory course due so far</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ background: "#E9F0E9", borderRadius: "14px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "12px" }}><span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#35593A", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></span><span style={{ fontSize: "15px", flex: "1" }}><strong style={{ fontWeight: "600" }}>8 MRs are on track</strong> across all 6 mandatory courses. Nothing to do.</span><span style={{ fontSize: "14px", fontWeight: "600", color: "#35593A", cursor: "pointer" }}>Show them</span></div>
            <div style={{ background: "#FFFFFF", borderRadius: "14px", padding: "14px 18px", fontSize: "14.5px", lineHeight: "1.5", color: "#585B52", boxShadow: "0 1px 2px rgba(20,21,15,.05)" }}>Reminders go out automatically on the course schedule. Use "Send reminder" only when a personal nudge will help. Overdue MRs are escalated to you after 3 days.</div>
          </div>
        </div>
        <div style={{ background: "#FFFFFF", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 2px rgba(20,21,15,.05)" }}>
          <div style={{ padding: "13px 18px", borderBottom: "1px solid #EFEDE6", display: "flex", alignItems: "baseline", gap: "10px" }}><span style={{ fontSize: "16px", fontWeight: "600" }}>Needs your attention</span><span style={{ fontSize: "14px", color: "#585B52" }}>4 MRs · overdue first, then failed</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "190px minmax(0,1fr) 200px 150px 150px 170px", background: "#F7F5F0", borderBottom: "1px solid #EFEDE6", fontSize: "12.5px", fontWeight: "600", color: "#585B52" }}><div style={{ padding: "10px 18px" }}>MR</div><div style={{ padding: "10px 12px" }}>Course</div><div style={{ padding: "10px 12px" }}>Status</div><div style={{ padding: "10px 12px" }}>Due</div><div style={{ padding: "10px 12px" }}>Attempts</div><div style={{ padding: "10px 18px 10px 12px" }}></div></div>
          {v.b1rows.map((r, r_i) => (<Fragment key={r_i}>
            <div style={{ display: "grid", gridTemplateColumns: "190px minmax(0,1fr) 200px 150px 150px 170px", borderBottom: "1px solid #EFEDE6", alignItems: "center", minHeight: "64px" }}>
              <div className="tap" style={{ padding: "10px 18px", cursor: "pointer" }} onClick={r.open}><div style={{ fontSize: "15px", fontWeight: "600" }}>{r.name}</div><div style={{ fontSize: "13px", color: "#585B52" }}>{r.terr}</div></div>
              <div style={{ padding: "10px 12px", fontSize: "14.5px" }}>{r.course}</div>
              <div style={{ padding: "10px 12px" }}><span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: r.p.bg, color: r.p.fg, borderRadius: "999px", padding: "4px 10px 4px 7px", fontSize: "12.5px", fontWeight: "600", whiteSpace: "nowrap" }}>{r.p.bang && (<><span style={{ width: "13px", height: "13px", borderRadius: "50%", background: r.p.fg, color: "#FFFFFF", fontSize: "9.5px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>!</span></>)}{r.p.cross && (<><svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#9C3B26" strokeWidth="2.8" strokeLinecap="round"></path></svg></>)}{r.p.label}</span></div>
              <div style={{ padding: "10px 12px", fontSize: "14px", color: "#585B52" }}>{r.due}</div>
              <div style={{ padding: "10px 12px" }}><div style={{ fontSize: "14.5px", fontWeight: "500" }}>{r.att}</div><div style={{ fontSize: "13px", color: "#585B52" }}>{r.attSub}</div></div>
              <div style={{ padding: "10px 18px 10px 12px" }}>
                {r.unsent && (<><button className="tap h0" style={{ height: "36px", padding: "0 14px", background: "#F1EFE8", border: "none", borderRadius: "10px", color: "#1F211C", fontSize: "13.5px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={r.send}>{r.action}</button></>)}
                {r.sent && (<><span className="swap-in" style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13.5px", color: "#35593A", fontWeight: "600" }}><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#35593A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path></svg>{r.sentLabel}</span></>)}
              </div>
            </div>
          </Fragment>))}
          <div style={{ padding: "11px 18px", fontSize: "13.5px", color: "#585B52" }}>Scores and attempts are visible to you, the MR and the training team. There is no team ranking.</div>
        </div>
      </div>
    </div>
  </div>
  );
}
