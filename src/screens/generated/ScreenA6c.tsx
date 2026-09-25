// Generated from the Elmiron Learning design. Edit freely.
import { Fragment } from 'react';
import type { DemoValues } from '../../state';
import CountUp from '../../components/CountUp';

export default function ScreenA6c({ v }: { v: DemoValues }) {
  void Fragment; void CountUp;
  return (
    <div className="screen-frame" style={{ background: "#FBFAF7", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
    <div style={{ height: "72px", padding: "0 40px", display: "flex", alignItems: "center", gap: "20px", flex: "none", background: "#FFFFFF" }}>
      <span style={{ width: "24px", height: "24px", borderRadius: "8px", background: "#35593A", flex: "none" }}></span>
      <div style={{ flex: "1" }}><div style={{ fontSize: "16.5px", fontWeight: "600" }}>Final assessment</div><div style={{ fontSize: "14px", color: "#585B52" }}>Elmiron — Product Training · v2.0 · attempt 1 of 3</div></div>
      <div style={{ display: "flex", alignItems: "center", gap: "9px", background: "#F1EFE8", borderRadius: "999px", padding: "8px 16px" }}><span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "1.8px solid #1F211C", boxSizing: "border-box" }}></span><span style={{ fontSize: "16px", fontWeight: "600", fontVariantNumeric: "tabular-nums" }}>06:10</span><span style={{ fontSize: "14.5px", color: "#585B52" }}>left</span></div>
    </div>
    <div style={{ height: "4px", background: "#F1EFE8", flex: "none" }}><div className="bar-fill" style={{ width: "100%", height: "100%", background: "#35593A" }}></div></div>
    <div className="screen-main" style={{ flex: "1", padding: "36px 64px 32px 120px", display: "flex", flexDirection: "column", gap: "22px", maxWidth: "900px" }}>
      <div style={{ fontSize: "14.5px", fontWeight: "500", color: "#585B52" }}>Question 20 of 20 · Single choice · choose one · 2 marks</div>
      <div style={{ fontSize: "27px", fontWeight: "600", letterSpacing: "-.018em", lineHeight: "1.25" }}>Under UCPMP 2024, which of these may an MR give a doctor?</div>
      <div style={{ height: "62px", borderRadius: "16px", background: "#FFFFFF" }}></div><div style={{ height: "62px", borderRadius: "16px", background: "#FFFFFF" }}></div><div style={{ height: "62px", borderRadius: "16px", background: "#FFFFFF" }}></div>
    </div>
    <div className="overlay-in" style={{ position: "absolute", inset: "0", background: "rgba(20,21,15,.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card" style={{ width: "520px", background: "#FFFFFF", borderRadius: "20px", padding: "28px 30px", boxShadow: "0 30px 60px -20px rgba(20,21,15,.5)", display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ fontSize: "24px", fontWeight: "600", letterSpacing: "-.015em" }}>Submit your assessment?</div>
        <div style={{ fontSize: "16px", lineHeight: "1.55" }}>You've answered <strong style={{ fontWeight: "600" }}>19 of 20</strong> questions. Question 14 is unanswered and will score no marks.</div>
        <div style={{ background: "#F1EFE8", borderRadius: "14px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "14.5px" }}><div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#585B52" }}>Time left</span><span style={{ fontWeight: "600" }}>06:10</span></div><div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#585B52" }}>Attempt</span><span style={{ fontWeight: "600" }}>1 of 3</span></div><div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#585B52" }}>Pass mark</span><span style={{ fontWeight: "600" }}>80%</span></div></div>
        <div style={{ fontSize: "14.5px", color: "#585B52" }}>You can't change answers after you submit.</div>
        <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
          <button className="tap h2" style={{ flex: "1", height: "52px", background: "#35593A", border: "none", borderRadius: "16px", color: "#FFFFFF", fontSize: "16px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a7}>Submit assessment</button>
          <button className="tap h0" style={{ height: "52px", padding: "0 20px", background: "#F1EFE8", border: "none", borderRadius: "16px", color: "#1F211C", fontSize: "16px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.a6}>Go to question 14</button>
        </div>
      </div>
    </div>
  </div>
  );
}
