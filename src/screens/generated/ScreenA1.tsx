// Generated from the Elmiron Learning design. Edit freely.
import { Fragment } from 'react';
import type { DemoValues } from '../../state';
import CountUp from '../../components/CountUp';
import Sidebar from '../../components/Sidebar';

export default function ScreenA1({ v }: { v: DemoValues }) {
  void Fragment; void CountUp;
  return (
    <div className="screen-frame" style={{ background: "#FBFAF7", overflow: "hidden", display: "flex" }}>
    <Sidebar role="mr" active="a1" />
    <div className="screen-main" style={{ flex: "1", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ height: "64px", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none" }}>
        <div style={{ fontSize: "14.5px", color: "#585B52" }}>Wednesday 24 Sep 2026</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px dashed #8B8E84", borderRadius: "999px", padding: "4px 4px 4px 14px" }}><span style={{ fontSize: "13px", fontWeight: "500", color: "#585B52" }}>Demo control · Viewing as</span><div style={{ display: "flex", gap: "2px" }}><button className="tap" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "#1F211C", color: "#FFFFFF", fontSize: "13px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a1}>MR</button><button className="tap h1" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.b1}>Manager</button><button className="tap h1" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.c1}>Admin</button></div></div>
      </div>
      <div style={{ flex: "1", padding: "4px 40px 32px", display: "flex", flexDirection: "column", gap: "20px", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px" }}>
          <div><div style={{ fontSize: "27px", fontWeight: "600", letterSpacing: "-.018em", lineHeight: "1.15" }}>Good morning, Pratham</div><div style={{ fontSize: "16px", color: "#585B52", marginTop: "4px" }}>5 mandatory courses are open. One is overdue.</div></div>
          <div className="card" style={{ background: "#FFFFFF", borderRadius: "20px", display: "flex", boxShadow: "0 1px 2px rgba(20,21,15,.05)" }}>
            <div style={{ padding: "14px 24px", display: "flex", flexDirection: "column", gap: "4px" }}><div style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13.5px", fontWeight: "500", color: "#585B52" }}><span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#35593A", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>Completed</div><div style={{ fontSize: "30px", fontWeight: "600", letterSpacing: "-.02em", lineHeight: "1" }}><CountUp to="8" /></div></div>
            <div style={{ padding: "14px 24px", display: "flex", flexDirection: "column", gap: "4px", borderLeft: "1px solid #F2F0E9" }}><div style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13.5px", fontWeight: "500", color: "#585B52" }}><span style={{ width: "12px", height: "12px", borderRadius: "50%", border: "1.8px solid #2A5570", background: "conic-gradient(#2A5570 0 45%,transparent 0)", boxSizing: "border-box" }}></span>In progress</div><div style={{ fontSize: "30px", fontWeight: "600", letterSpacing: "-.02em", lineHeight: "1" }}><CountUp to="2" /></div></div>
            <div style={{ padding: "14px 24px", display: "flex", flexDirection: "column", gap: "4px", borderLeft: "1px solid #F2F0E9" }}><div style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13.5px", fontWeight: "500", color: "#585B52" }}><span style={{ width: "11px", height: "11px", borderRadius: "50%", border: "1.8px solid #585B52", boxSizing: "border-box" }}></span>Pending</div><div style={{ fontSize: "30px", fontWeight: "600", letterSpacing: "-.02em", lineHeight: "1" }}><CountUp to="4" /></div></div>
            <div style={{ padding: "14px 24px", display: "flex", flexDirection: "column", gap: "4px", borderLeft: "1px solid #F2F0E9" }}><div style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13.5px", fontWeight: "500", color: "#9C3B26" }}><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#9C3B26" strokeWidth="2.8" strokeLinecap="round"></path></svg>Overdue</div><div style={{ fontSize: "30px", fontWeight: "600", letterSpacing: "-.02em", lineHeight: "1", color: "#9C3B26" }}><CountUp to="1" /></div></div>
          </div>
        </div>

        <div style={{ background: "#1F211C", borderRadius: "20px", padding: "22px", display: "flex", gap: "28px", alignItems: "center", boxShadow: "0 14px 30px -20px rgba(20,21,15,.8)" }}>
          <div style={{ width: "256px", height: "144px", borderRadius: "14px", flex: "none", background: "repeating-linear-gradient(135deg,rgba(255,255,255,.05) 0 8px,rgba(255,255,255,.1) 8px 16px)", display: "flex", alignItems: "flex-end", padding: "10px 12px", boxSizing: "border-box" }}><span style={{ fontSize: "12px", color: "rgba(255,255,255,.6)" }}>course thumbnail</span></div>
          <div style={{ flex: "1", minWidth: "0" }}>
            <div style={{ fontSize: "13.5px", fontWeight: "500", color: "rgba(255,255,255,.65)", marginBottom: "6px" }}>Continue learning</div>
            <div style={{ fontSize: "27px", fontWeight: "600", letterSpacing: "-.018em", color: "#FFFFFF", lineHeight: "1.15" }}>Elmiron — Product Training</div>
            <div style={{ fontSize: "15px", color: "rgba(255,255,255,.75)", marginTop: "4px" }}>Module 3 · Lesson 3.2 · Video · resume at 07:26</div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "16px", maxWidth: "520px" }}><div style={{ flex: "1", height: "6px", background: "rgba(255,255,255,.16)", borderRadius: "3px", overflow: "hidden" }}><div className="bar-fill" style={{ width: "45%", height: "100%", background: "#B8CDB8", borderRadius: "3px" }}></div></div><span style={{ fontSize: "14.5px", color: "#FFFFFF", fontWeight: "600" }}>45%</span><span style={{ fontSize: "14.5px", color: "rgba(255,255,255,.7)" }}>Due 30 Sep 2026</span></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "stretch", flex: "none", width: "200px" }}>
            <button className="tap h2" style={{ height: "52px", background: "#35593A", border: "none", borderRadius: "16px", color: "#FFFFFF", fontSize: "16px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a4}>Continue</button>
            <button className="tap h3" style={{ height: "40px", background: "transparent", border: "none", borderRadius: "14px", color: "#B8CDB8", fontSize: "15px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a3}>Course details</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: "20px", flex: "1", minHeight: "0" }}>
          <div className="card" style={{ background: "#FFFFFF", borderRadius: "20px", overflow: "hidden", boxShadow: "0 1px 2px rgba(20,21,15,.05)" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #F2F0E9", display: "flex", alignItems: "baseline", gap: "12px" }}><span style={{ fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.005em" }}>Mandatory and due</span><span style={{ fontSize: "14.5px", color: "#585B52" }}>Overdue first, then by due date</span></div>
            <div className="tap h4" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 200px 150px 110px", alignItems: "center", padding: "0 22px", minHeight: "62px", borderBottom: "1px solid #F2F0E9", cursor: "pointer" }} onClick={v.go.a3}>
              <div><div style={{ fontSize: "15.5px", fontWeight: "600" }}>Adverse Event Reporting for Field Staff</div><div style={{ fontSize: "14px", color: "#585B52" }}>Compliance · 45 min</div></div>
              <div><span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#F8EAE6", color: "#9C3B26", borderRadius: "999px", padding: "4px 11px 4px 8px", fontSize: "13px", fontWeight: "600" }}><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#9C3B26" strokeWidth="2.8" strokeLinecap="round"></path></svg>Overdue by 3 days</span></div>
              <div style={{ fontSize: "14px", color: "#585B52" }}>Was due 21 Sep 2026</div>
              <div style={{ textAlign: "right" }}><span style={{ display: "inline-flex", height: "36px", alignItems: "center", padding: "0 14px", background: "#F1EFE8", borderRadius: "12px", fontSize: "14px", fontWeight: "600" }}>Start</span></div>
            </div>
            <div className="tap h4" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 200px 150px 110px", alignItems: "center", padding: "0 22px", minHeight: "62px", borderBottom: "1px solid #F2F0E9", cursor: "pointer" }} onClick={v.go.a3}>
              <div><div style={{ fontSize: "15.5px", fontWeight: "600" }}>UCPMP 2024 — Ethical Promotion</div><div style={{ fontSize: "14px", color: "#585B52" }}>Compliance · 1 h 10 min · 30% done</div></div>
              <div><span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#F7EFDD", color: "#7A5510", borderRadius: "999px", padding: "4px 11px 4px 8px", fontSize: "13px", fontWeight: "600" }}><span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#7A5510", color: "#FFFFFF", fontSize: "10px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>!</span>Due in 2 days</span></div>
              <div style={{ fontSize: "14px", color: "#585B52" }}>26 Sep 2026</div>
              <div style={{ textAlign: "right" }}><span style={{ display: "inline-flex", height: "36px", alignItems: "center", padding: "0 14px", background: "#F1EFE8", borderRadius: "12px", fontSize: "14px", fontWeight: "600" }}>Continue</span></div>
            </div>
            <div className="tap h4" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 200px 150px 110px", alignItems: "center", padding: "0 22px", minHeight: "62px", borderBottom: "1px solid #F2F0E9", cursor: "pointer" }} onClick={v.go.a3}>
              <div><div style={{ fontSize: "15.5px", fontWeight: "600" }}>Elmiron — Product Training</div><div style={{ fontSize: "14px", color: "#585B52" }}>Product Training · v2.0 · 2 h 40 min</div></div>
              <div><span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#E7EFF4", color: "#2A5570", borderRadius: "999px", padding: "4px 11px 4px 8px", fontSize: "13px", fontWeight: "600" }}><span style={{ width: "12px", height: "12px", borderRadius: "50%", border: "1.8px solid #2A5570", background: "conic-gradient(#2A5570 0 45%,transparent 0)", boxSizing: "border-box" }}></span>In progress · 45%</span></div>
              <div style={{ fontSize: "14px", color: "#585B52" }}>30 Sep 2026</div>
              <div style={{ textAlign: "right" }}><span style={{ display: "inline-flex", height: "36px", alignItems: "center", padding: "0 14px", background: "#F1EFE8", borderRadius: "12px", fontSize: "14px", fontWeight: "600" }}>Continue</span></div>
            </div>
            <div className="tap h4" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 200px 150px 110px", alignItems: "center", padding: "0 22px", minHeight: "62px", borderBottom: "1px solid #F2F0E9", cursor: "pointer" }} onClick={v.go.a3}>
              <div><div style={{ fontSize: "15.5px", fontWeight: "600" }}>Interstitial Cystitis / Bladder Pain Syndrome — Disease Awareness</div><div style={{ fontSize: "14px", color: "#585B52" }}>Disease Awareness · 1 h 20 min</div></div>
              <div><span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#F1EFE8", color: "#585B52", borderRadius: "999px", padding: "4px 11px 4px 8px", fontSize: "13px", fontWeight: "600" }}><span style={{ width: "11px", height: "11px", borderRadius: "50%", border: "1.8px solid #585B52", boxSizing: "border-box" }}></span>Not started</span></div>
              <div style={{ fontSize: "14px", color: "#585B52" }}>10 Oct 2026</div>
              <div style={{ textAlign: "right" }}><span style={{ display: "inline-flex", height: "36px", alignItems: "center", padding: "0 14px", background: "#F1EFE8", borderRadius: "12px", fontSize: "14px", fontWeight: "600" }}>Start</span></div>
            </div>
            <div className="tap h4" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 200px 150px 110px", alignItems: "center", padding: "0 22px", minHeight: "62px", cursor: "pointer" }} onClick={v.go.a3}>
              <div><div style={{ fontSize: "15.5px", fontWeight: "600" }}>Sample Distribution SOP</div><div style={{ fontSize: "14px", color: "#585B52" }}>SOP Training · 40 min · retake opens now</div></div>
              <div><span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#F7EFDD", color: "#7A5510", borderRadius: "999px", padding: "4px 11px 4px 8px", fontSize: "13px", fontWeight: "600" }}><span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#7A5510", color: "#FFFFFF", fontSize: "10px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>!</span>Failed · 2 retakes left</span></div>
              <div style={{ fontSize: "14px", color: "#585B52" }}>15 Oct 2026</div>
              <div style={{ textAlign: "right" }}><span style={{ display: "inline-flex", height: "36px", alignItems: "center", padding: "0 14px", background: "#F1EFE8", borderRadius: "12px", fontSize: "14px", fontWeight: "600" }}>Review</span></div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "4px 2px 0" }}><span style={{ fontSize: "16.5px", fontWeight: "600", letterSpacing: "-.005em" }}>New courses</span><span className="tap" style={{ fontSize: "14.5px", fontWeight: "600", color: "#35593A", cursor: "pointer" }} onClick={v.go.a2}>Browse all courses</span></div>
            <div className="tap card h4" style={{ background: "#FFFFFF", borderRadius: "20px", padding: "14px", display: "flex", gap: "14px", alignItems: "center", boxShadow: "0 1px 2px rgba(20,21,15,.05)", cursor: "pointer" }} onClick={v.go.a2}>
              <div style={{ width: "96px", height: "64px", borderRadius: "12px", flex: "none", background: "repeating-linear-gradient(135deg,#F1EFE8 0 7px,#EAE7DF 7px 14px)" }}></div>
              <div><div style={{ fontSize: "15.5px", fontWeight: "600", lineHeight: "1.3" }}>Handling Cost Objections</div><div style={{ fontSize: "14px", color: "#585B52" }}>Selling Skills · 50 min · Optional</div><div style={{ fontSize: "13.5px", color: "#585B52" }}>Added 20 Sep 2026</div></div>
            </div>
            <div className="tap card h4" style={{ background: "#FFFFFF", borderRadius: "20px", padding: "14px", display: "flex", gap: "14px", alignItems: "center", boxShadow: "0 1px 2px rgba(20,21,15,.05)", cursor: "pointer" }} onClick={v.go.a2}>
              <div style={{ width: "96px", height: "64px", borderRadius: "12px", flex: "none", background: "repeating-linear-gradient(135deg,#F1EFE8 0 7px,#EAE7DF 7px 14px)" }}></div>
              <div><div style={{ fontSize: "15.5px", fontWeight: "600", lineHeight: "1.3" }}>Listening in the Doctor's Cabin</div><div style={{ fontSize: "14px", color: "#585B52" }}>Communication · 35 min · Optional</div><div style={{ fontSize: "13.5px", color: "#585B52" }}>Added 12 Sep 2026</div></div>
            </div>
            <div style={{ background: "#F1EFE8", borderRadius: "16px", padding: "14px 16px", fontSize: "14px", lineHeight: "1.5", color: "#585B52" }}>Optional courses never appear in "Mandatory and due" and never count against you.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
