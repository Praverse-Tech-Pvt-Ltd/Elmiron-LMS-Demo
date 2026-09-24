// Generated from the Elmiron Learning design. Edit freely.
import { Fragment } from 'react';
import type { DemoValues } from '../../state';
import CountUp from '../../components/CountUp';

export default function ScreenA7({ v }: { v: DemoValues }) {
  void Fragment; void CountUp;
  return (
    <div className="screen-frame" style={{ background: "#FBFAF7", overflow: "hidden", display: "flex" }}>
    <div style={{ width: "240px", background: "#F1EFE8", padding: "24px 0", flex: "none", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "0 22px 28px", display: "flex", alignItems: "center", gap: "10px" }}><span style={{ width: "24px", height: "24px", borderRadius: "8px", background: "#35593A" }}></span><span style={{ fontSize: "15px", fontWeight: "600", letterSpacing: "-.01em" }}>Elmiron Field</span></div>
      <div style={{ padding: "0 22px 8px", fontSize: "13.5px", fontWeight: "500", color: "#585B52" }}>Learning</div>
      <div className="tap" style={{ padding: "10px 22px", fontSize: "15px", fontWeight: "600", color: "#35593A", background: "#E4EAE3", boxShadow: "inset 3px 0 0 #35593A", cursor: "pointer" }} onClick={v.go.a1}>Learning home</div>
      <div className="tap h0" style={{ padding: "10px 22px", fontSize: "15px", color: "#585B52", cursor: "pointer" }} onClick={v.go.a2}>Browse courses</div>
      <div className="tap h0" style={{ padding: "10px 22px", fontSize: "15px", color: "#585B52", cursor: "pointer" }} onClick={v.go.a9}>Training history</div>
      <div className="tap h0" style={{ padding: "10px 22px", fontSize: "15px", color: "#585B52", cursor: "pointer" }} onClick={v.go.a8}>Certificates</div>
      <div style={{ marginTop: "auto", padding: "0 22px" }}><div style={{ borderTop: "1px solid #E1DFD7", paddingTop: "14px", display: "flex", gap: "10px", alignItems: "center" }}><span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#E4EAE3", color: "#35593A", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>RM</span><div><div style={{ fontSize: "14.5px", fontWeight: "600" }}>Rahul More</div><div style={{ fontSize: "13px", color: "#585B52" }}>MR · South Mumbai</div><div style={{ fontFamily: "'DM Mono',monospace", fontSize: "12px", color: "#585B52" }}>EMP-40218</div></div></div></div>
    </div>
    <div className="screen-main" style={{ flex: "1", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ height: "64px", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none" }}>
        <div style={{ fontSize: "14.5px", color: "#585B52" }}><span className="tap" style={{ cursor: "pointer", color: "#35593A", fontWeight: "500" }} onClick={v.go.a3}>Elmiron — Product Training</span> / Result</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px dashed #8B8E84", borderRadius: "999px", padding: "4px 4px 4px 14px" }}><span style={{ fontSize: "13px", fontWeight: "500", color: "#585B52" }}>Demo control · Viewing as</span><div style={{ display: "flex", gap: "2px" }}><button className="tap" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "#1F211C", color: "#FFFFFF", fontSize: "13px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a1}>MR</button><button className="tap h1" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.b1}>Manager</button><button className="tap h1" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.c1}>Admin</button></div></div>
      </div>
      <div style={{ flex: "1", display: "flex", justifyContent: "center", padding: "40px 40px 32px" }}>
        <div style={{ width: "640px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <span style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#35593A", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="26" height="26" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
          <div><div style={{ fontSize: "14.5px", fontWeight: "500", color: "#585B52" }}>Final assessment · Elmiron — Product Training · v2.0</div><div style={{ fontSize: "30px", fontWeight: "600", letterSpacing: "-.035em" }}>You passed</div></div>
          <div className="card" style={{ background: "#FFFFFF", borderRadius: "20px", padding: "24px 26px", boxShadow: "0 1px 2px rgba(20,21,15,.04),0 16px 40px -22px rgba(20,21,15,.35)" }}>
            <div style={{ display: "flex", gap: "40px", alignItems: "flex-end", paddingBottom: "18px", borderBottom: "1px solid #F2F0E9" }}>
              <div><div style={{ fontSize: "13.5px", fontWeight: "500", color: "#585B52" }}>Your score</div><div style={{ fontSize: "40px", fontWeight: "600", letterSpacing: "-.045em", lineHeight: "1.05", color: "#35593A" }}><CountUp to="86%" /></div></div>
              <div><div style={{ fontSize: "13.5px", fontWeight: "500", color: "#585B52" }}>Pass mark</div><div style={{ fontSize: "27px", fontWeight: "600", letterSpacing: "-.035em", lineHeight: "1.1" }}><CountUp to="80%" /></div></div>
              <div style={{ flex: "1" }}></div>
              <span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#E9F0E9", color: "#35593A", borderRadius: "999px", padding: "5px 12px 5px 9px", fontSize: "13.5px", fontWeight: "600" }}><span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#35593A", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>Completed</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", paddingTop: "16px", fontSize: "15px" }}><div><span style={{ color: "#585B52" }}>Marks</span> · 43 of 50</div><div><span style={{ color: "#585B52" }}>Attempt</span> · 1 of 3</div><div><span style={{ color: "#585B52" }}>Time taken</span> · 23 min 50 s</div><div><span style={{ color: "#585B52" }}>Submitted</span> · 24 Sep 2026, 14:18 IST</div></div>
          </div>
          <div style={{ background: "#E9F0E9", borderRadius: "16px", padding: "14px 18px", fontSize: "15px", lineHeight: "1.5" }}>The course is complete and your certificate <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "14px" }}>ELM-LMS-2026-000123</span> is ready.</div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="tap h2" style={{ height: "52px", padding: "0 26px", background: "#35593A", border: "none", borderRadius: "16px", color: "#FFFFFF", fontSize: "16px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a8}>View certificate</button>
            <button className="tap h0" style={{ height: "52px", padding: "0 22px", background: "#F1EFE8", border: "none", borderRadius: "16px", color: "#1F211C", fontSize: "16px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.a1}>Back to learning home</button>
          </div>
          <div style={{ fontSize: "14px", color: "#585B52" }}>Your score is visible to you, R. Deshpande and the training team. It isn't compared with anyone.</div>
        </div>
      </div>
    </div>
  </div>
  );
}
