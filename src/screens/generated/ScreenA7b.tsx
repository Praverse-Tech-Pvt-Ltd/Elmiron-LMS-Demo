// Generated from the Elmiron Learning design. Edit freely.
import { Fragment } from 'react';
import type { DemoValues } from '../../state';
import CountUp from '../../components/CountUp';

export default function ScreenA7b({ v }: { v: DemoValues }) {
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
          <span style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#F7EFDD", color: "#7A5510", fontSize: "26px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>!</span>
          <div><div style={{ fontSize: "14.5px", fontWeight: "500", color: "#585B52" }}>Final assessment · Elmiron — Product Training · v2.0</div><div style={{ fontSize: "30px", fontWeight: "600", letterSpacing: "-.035em" }}>Not cleared this time</div></div>
          <div className="card" style={{ background: "#FFFFFF", borderRadius: "20px", padding: "24px 26px", boxShadow: "0 1px 2px rgba(20,21,15,.04),0 16px 40px -22px rgba(20,21,15,.35)" }}>
            <div style={{ display: "flex", gap: "40px", alignItems: "flex-end", paddingBottom: "18px", borderBottom: "1px solid #F2F0E9" }}>
              <div><div style={{ fontSize: "13.5px", fontWeight: "500", color: "#585B52" }}>Your score</div><div style={{ fontSize: "40px", fontWeight: "600", letterSpacing: "-.045em", lineHeight: "1.05" }}><CountUp to="64%" /></div></div>
              <div><div style={{ fontSize: "13.5px", fontWeight: "500", color: "#585B52" }}>Pass mark</div><div style={{ fontSize: "27px", fontWeight: "600", letterSpacing: "-.035em", lineHeight: "1.1" }}><CountUp to="80%" /></div></div>
              <div style={{ flex: "1" }}></div>
              <span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#F7EFDD", color: "#7A5510", borderRadius: "999px", padding: "5px 12px 5px 9px", fontSize: "13.5px", fontWeight: "600" }}><span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#7A5510", color: "#FFFFFF", fontSize: "10px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>!</span>2 of 3 attempts left</span>
            </div>
            <div style={{ paddingTop: "16px" }}><div style={{ fontSize: "14.5px", fontWeight: "600", marginBottom: "8px" }}>Where the marks were lost</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "15px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><span>Module 3 · Mechanism and use</span><span style={{ color: "#585B52" }}>5 of 14 marks</span></div><div style={{ display: "flex", justifyContent: "space-between" }}><span>Module 4 · Handling questions in the field</span><span style={{ color: "#585B52" }}>7 of 12 marks</span></div><div style={{ display: "flex", justifyContent: "space-between" }}><span>Modules 1–2</span><span style={{ color: "#585B52" }}>20 of 24 marks</span></div></div>
            </div>
          </div>
          <div style={{ background: "#E7EFF4", borderRadius: "16px", padding: "14px 18px" }}><div style={{ fontSize: "15.5px", fontWeight: "600" }}>Review the course, then retake after 24 hours</div><div style={{ fontSize: "14.5px", color: "#2A5570", marginTop: "2px" }}>Your next attempt opens on 25 Sep 2026 at 14:18 IST. Due date is still 30 Sep 2026.</div></div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button className="tap h2" style={{ height: "52px", padding: "0 26px", background: "#35593A", border: "none", borderRadius: "16px", color: "#FFFFFF", fontSize: "16px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a3}>Review the course</button>
            <div style={{ height: "52px", padding: "0 22px", background: "#F1EFE8", borderRadius: "16px", color: "#9B9E94", fontSize: "16px", fontWeight: "600", display: "flex", alignItems: "center" }}>Retake assessment</div>
            <span style={{ fontSize: "14px", color: "#585B52" }}>Opens in 23 h 59 min</span>
          </div>
          <div style={{ fontSize: "14px", color: "#585B52" }}>R. Deshpande can see this result. Nobody else on your team can.</div>
        </div>
      </div>
    </div>
  </div>
  );
}
