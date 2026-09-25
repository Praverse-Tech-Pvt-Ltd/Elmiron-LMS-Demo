// Generated from the Elmiron Learning design. Edit freely.
import { Fragment } from 'react';
import type { DemoValues } from '../../state';
import CountUp from '../../components/CountUp';
import Sidebar from '../../components/Sidebar';
import Switch from '../../components/Switch';

export default function ScreenC4({ v }: { v: DemoValues }) {
  void Fragment; void CountUp;
  return (
    <div className="screen-frame" style={{ background: "#FBFAF7", overflow: "hidden", display: "flex" }}>
    <Sidebar role="admin" active="c4" />
    <div className="screen-main" style={{ flex: "1", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ height: "52px", padding: "0 30px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none" }}>
        <div style={{ fontSize: "14px", color: "#585B52" }}><span className="tap" style={{ cursor: "pointer", color: "#35593A", fontWeight: "500" }} onClick={v.go.c2}>Elmiron — Product Training</span> / Assign</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px dashed #8B8E84", borderRadius: "999px", padding: "3px 3px 3px 12px" }}><span style={{ fontSize: "12.5px", fontWeight: "500", color: "#585B52" }}>Demo control · Viewing as</span><div style={{ display: "flex", gap: "2px" }}><button className="tap h1" style={{ height: "26px", padding: "0 11px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "12.5px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.a1}>MR</button><button className="tap h1" style={{ height: "26px", padding: "0 11px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "12.5px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.b1}>Manager</button><button className="tap" style={{ height: "26px", padding: "0 11px", border: "none", borderRadius: "999px", background: "#1F211C", color: "#FFFFFF", fontSize: "12.5px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.c1}>Admin</button></div></div>
      </div>
      <div style={{ flex: "1", padding: "0 30px 24px", overflow: "hidden", display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}><div style={{ fontSize: "24px", fontWeight: "600", letterSpacing: "-.015em" }}>Assign course</div><span style={{ fontSize: "14.5px", color: "#585B52" }}>Elmiron — Product Training · v2.1 · approved 18 Sep 2026</span></div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(0,1fr)", gap: "16px", flex: "1", minHeight: "0" }}>
          <div style={{ background: "#FFFFFF", borderRadius: "14px", boxShadow: "0 1px 2px rgba(20,21,15,.05)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid #EFEDE6", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div><div style={{ fontSize: "15.5px", fontWeight: "600" }}>Audience</div><div style={{ fontSize: "13px", color: "#585B52" }}>West region · role: MR</div></div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: "29px", fontWeight: "600", letterSpacing: "-.018em", lineHeight: "1", fontVariantNumeric: "tabular-nums" }}><CountUp to={String(v.audCount)} duration={500} /></div><div style={{ fontSize: "13px", color: "#585B52" }}>MRs selected</div></div>
            </div>
            <div style={{ padding: "12px 18px 6px" }}><div style={{ display: "flex", gap: "3px", background: "#F1EFE8", borderRadius: "10px", padding: "3px" }}>
              {v.audTabs.map((t, t_i) => (<Fragment key={t_i}><button className="tap" style={{ flex: "1", height: "32px", border: "none", borderRadius: "8px", background: t.bg, boxShadow: t.sh, fontSize: "13.5px", fontWeight: t.fw, color: "#1F211C", cursor: "pointer" }} type="button" onClick={t.pick}>{t.t}</button></Fragment>))}
            </div></div>
            <div style={{ flex: "1", padding: "4px 0" }}>
              {v.areas.map((a, a_i) => (<Fragment key={a_i}>
                <div className="tap h4" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 18px", cursor: "pointer", borderBottom: "1px solid #F2F0E9" }} onClick={a.toggle}>
                  {a.on && (<><span className="sel-pop" style={{ width: "20px", height: "20px", borderRadius: "6px", background: "#35593A", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path></svg></span></>)}
                  {a.off && (<><span style={{ width: "20px", height: "20px", borderRadius: "6px", border: "1.5px solid #8B8E84", boxSizing: "border-box", flex: "none" }}></span></>)}
                  <div style={{ flex: "1" }}><div style={{ fontSize: "14.5px", fontWeight: "600" }}>{a.name}</div><div style={{ fontSize: "13px", color: "#585B52" }}>Area manager {a.mgr}</div></div>
                  <span style={{ fontSize: "14px", color: "#585B52", fontVariantNumeric: "tabular-nums" }}>{a.n}</span>
                </div>
              </Fragment>))}
            </div>
            <div style={{ padding: "10px 18px", fontSize: "13px", color: "#585B52", borderTop: "1px solid #EFEDE6" }}>MRs who completed v2.0 are included. They'll see v2.1 as a new assignment and keep their v2.0 record.</div>
          </div>
          <div style={{ background: "#FFFFFF", borderRadius: "14px", boxShadow: "0 1px 2px rgba(20,21,15,.04),0 16px 40px -22px rgba(20,21,15,.35)", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "12px", overflow: "hidden" }}>
            <div style={{ fontSize: "15.5px", fontWeight: "600" }}>Schedule and rules</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}><label style={{ fontSize: "13px", fontWeight: "500", color: "#585B52" }}>Start date</label><div style={{ height: "38px", background: "#FBFAF7", border: "1px solid #8B8E84", borderRadius: "10px", padding: "0 12px", display: "flex", alignItems: "center", fontSize: "14.5px", boxSizing: "border-box" }}>01 Oct 2026</div></div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}><label style={{ fontSize: "13px", fontWeight: "500", color: "#585B52" }}>Due date</label><div style={{ height: "38px", background: "#FBFAF7", border: "1px solid #8B8E84", borderRadius: "10px", padding: "0 12px", display: "flex", alignItems: "center", fontSize: "14.5px", boxSizing: "border-box" }}>31 Oct 2026</div></div>
            </div>
            <div className="tap" style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={v.toggleMand}><span style={{ flex: "1", fontSize: "14px" }}>Mandatory<span style={{ display: "block", fontSize: "13px", color: "#585B52" }}>Counts toward compliance and appears in "Mandatory and due"</span></span><Switch on={v.mandOn} /></div>
            <div style={{ height: "1px", background: "#F2F0E9" }}></div>
            <div><div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Reminders</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {v.rems.map((r, r_i) => (<Fragment key={r_i}>
                  {r.on && (<><button className="tap" style={{ height: "32px", padding: "0 12px 0 9px", border: "none", borderRadius: "999px", background: "#E9F0E9", color: "#35593A", fontSize: "13px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }} type="button" onClick={r.toggle}><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#35593A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"></path></svg>{r.l}</button></>)}
                  {r.off && (<><button className="tap" style={{ height: "32px", padding: "0 12px", border: "1px solid #8B8E84", borderRadius: "999px", background: "#FFFFFF", color: "#585B52", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={r.toggle}>{r.l}</button></>)}
                </Fragment>))}
              </div>
              <div style={{ fontSize: "13px", color: "#585B52", marginTop: "6px" }}>Relative to the due date. Sent by app notification and SMS at 09:00 IST.</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ flex: "1", fontSize: "14px" }}>Escalate to the MR's manager after</span><div style={{ height: "34px", width: "52px", background: "#FBFAF7", border: "1px solid #8B8E84", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14.5px", fontWeight: "600", boxSizing: "border-box" }}>3</div><span style={{ fontSize: "13.5px", color: "#585B52" }}>days overdue</span></div>
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
              {v.hasAud && (<>
                <div style={{ fontSize: "13.5px", color: "#585B52", lineHeight: "1.5" }}>{v.audCount} MRs across {v.audAreas} areas. Managers notified: {v.audMgrs}.</div>
                <button className="tap h2" style={{ height: "42px", background: "#35593A", border: "none", borderRadius: "10px", color: "#FFFFFF", fontSize: "14.5px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.b1}>Assign to {v.audCount} MRs</button>
              </>)}
              {v.noAud && (<>
                <div style={{ height: "42px", background: "#F1EFE8", borderRadius: "10px", color: "#9B9E94", fontSize: "14.5px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" }}>Assign</div>
                <div style={{ fontSize: "13.5px", color: "#585B52", textAlign: "center" }}>Select at least one area to assign.</div>
              </>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
