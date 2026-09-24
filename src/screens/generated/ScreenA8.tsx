// Generated from the Elmiron Learning design. Edit freely.
import { Fragment } from 'react';
import type { DemoValues } from '../../state';
import CountUp from '../../components/CountUp';
import Sidebar from '../../components/Sidebar';

export default function ScreenA8({ v }: { v: DemoValues }) {
  void Fragment; void CountUp;
  return (
    <div className="screen-frame" style={{ background: "#FBFAF7", overflow: "hidden", display: "flex" }}>
    <Sidebar role="mr" active="a8" />
    <div className="screen-main" style={{ flex: "1", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ height: "64px", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none" }}>
        <div style={{ fontSize: "14.5px", color: "#585B52" }}>Certificates / Elmiron — Product Training</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px dashed #8B8E84", borderRadius: "999px", padding: "4px 4px 4px 14px" }}><span style={{ fontSize: "13px", fontWeight: "500", color: "#585B52" }}>Demo control · Viewing as</span><div style={{ display: "flex", gap: "2px" }}><button className="tap" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "#1F211C", color: "#FFFFFF", fontSize: "13px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a1}>MR</button><button className="tap h1" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.b1}>Manager</button><button className="tap h1" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.c1}>Admin</button></div></div>
      </div>
      <div style={{ flex: "1", padding: "8px 40px 32px", display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: "28px", overflow: "hidden" }}>
        <div style={{ background: "#F1EFE8", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", padding: "28px" }}>
          <div style={{ width: "800px", height: "566px", background: "#FFFFFF", borderRadius: "6px", boxShadow: "0 1px 2px rgba(20,21,15,.05),0 16px 40px -22px rgba(20,21,15,.35)", padding: "22px", boxSizing: "border-box" }}>
            <div style={{ height: "100%", border: "1px solid #E1DFD7", borderRadius: "4px", padding: "40px 48px", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ width: "24px", height: "24px", borderRadius: "8px", background: "#35593A" }}></span><span style={{ fontSize: "15px", fontWeight: "600" }}>Elmiron Field · Learning</span></div><span style={{ fontFamily: "'DM Mono',monospace", fontSize: "13px", color: "#585B52" }}>ELM-LMS-2026-000123</span></div>
              <div style={{ fontSize: "14.5px", fontWeight: "500", color: "#585B52", marginTop: "44px" }}>Certificate of completion</div>
              <div style={{ fontSize: "40px", fontWeight: "600", letterSpacing: "-.045em", lineHeight: "1.1", marginTop: "6px" }}>Rahul More</div>
              <div style={{ fontSize: "14.5px", color: "#585B52", marginTop: "2px" }}>Employee ID <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "13.5px", color: "#1F211C" }}>EMP-40218</span> · Medical Representative, South Mumbai</div>
              <div style={{ fontSize: "15px", color: "#585B52", marginTop: "22px" }}>has completed</div>
              <div style={{ fontSize: "27px", fontWeight: "600", letterSpacing: "-.035em" }}>Elmiron — Product Training</div>
              <div style={{ display: "flex", gap: "36px", marginTop: "18px", fontSize: "14.5px" }}><div><div style={{ color: "#585B52", fontSize: "13.5px", fontWeight: "500" }}>Version</div><div style={{ fontWeight: "600" }}>2.0</div></div><div><div style={{ color: "#585B52", fontSize: "13.5px", fontWeight: "500" }}>Completed</div><div style={{ fontWeight: "600" }}>24 Sep 2026</div></div><div><div style={{ color: "#585B52", fontSize: "13.5px", fontWeight: "500" }}>Score</div><div style={{ fontWeight: "600" }}>86% · pass mark 80%</div></div></div>
              <div style={{ marginTop: "auto", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px" }}>
                <div><div style={{ width: "200px", borderBottom: "1px solid #1F211C", height: "30px" }}></div><div style={{ fontSize: "14px", fontWeight: "600", marginTop: "6px" }}>Dr. M. Kulkarni</div><div style={{ fontSize: "13.5px", color: "#585B52" }}>Head of Medical Training · authorised signatory</div><div style={{ fontSize: "13.5px", color: "#585B52" }}>[Client organisation] Pvt. Ltd.</div></div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}><div style={{ width: "92px", height: "92px", borderRadius: "6px", background: "repeating-linear-gradient(135deg,#F1EFE8 0 6px,#E5E2D9 6px 12px)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: "11px", color: "#585B52", textAlign: "center" }}>QR code</span></div><span style={{ fontSize: "12.5px", color: "#585B52" }}>Scan to verify</span></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div className="card" style={{ background: "#FFFFFF", borderRadius: "20px", padding: "22px", boxShadow: "0 1px 2px rgba(20,21,15,.04),0 16px 40px -22px rgba(20,21,15,.35)", display: "flex", flexDirection: "column", gap: "12px" }}>
            <span className="pill" style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: "7px", background: "#E9F0E9", color: "#35593A", borderRadius: "999px", padding: "5px 12px 5px 9px", fontSize: "13.5px", fontWeight: "600" }}><span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#35593A", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>Valid</span>
            <div style={{ fontSize: "16.5px", fontWeight: "600" }}>Elmiron — Product Training · v2.0</div>
            <div style={{ fontSize: "14.5px", lineHeight: "1.55", color: "#585B52" }}>Valid until the course moves to a new version. You'll be reassigned automatically when that happens.</div>
            <button className="tap h2" style={{ height: "52px", background: "#35593A", border: "none", borderRadius: "16px", color: "#FFFFFF", fontSize: "16px", fontWeight: "600", cursor: "pointer" }} type="button">Download PDF</button>
          </div>
          <div className="card" style={{ background: "#FFFFFF", borderRadius: "20px", padding: "20px 22px", boxShadow: "0 1px 2px rgba(20,21,15,.05)" }}>
            <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "6px" }}>Verification</div>
            <div style={{ fontSize: "14.5px", lineHeight: "1.55", color: "#585B52" }}>Anyone can scan the QR code, or enter the number on the verification page, to confirm this certificate is genuine and current.</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "13.5px", background: "#F1EFE8", borderRadius: "10px", padding: "10px 12px", marginTop: "10px" }}>ELM-LMS-2026-000123</div>
          </div>
          <div className="tap" style={{ fontSize: "14.5px", fontWeight: "600", color: "#35593A", cursor: "pointer", padding: "0 4px" }} onClick={v.go.a9}>See all your training history</div>
        </div>
      </div>
    </div>
  </div>
  );
}
