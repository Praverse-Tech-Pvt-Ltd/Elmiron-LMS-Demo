// Generated from the Elmiron Learning design. Edit freely.
import { Fragment } from 'react';
import type { DemoValues } from '../../state';
import CountUp from '../../components/CountUp';
import Sidebar from '../../components/Sidebar';

export default function ScreenA5({ v }: { v: DemoValues }) {
  void Fragment; void CountUp;
  return (
    <div className="screen-frame" style={{ background: "#FBFAF7", overflow: "hidden", display: "flex" }}>
    <Sidebar role="mr" active="a1" />
    <div className="screen-main" style={{ flex: "1", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ height: "64px", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none" }}>
        <div style={{ fontSize: "14.5px", color: "#585B52" }}><span className="tap" style={{ cursor: "pointer", color: "#35593A", fontWeight: "500" }} onClick={v.go.a3}>Elmiron — Product Training</span> / Module 3 · Lesson 3.3</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px dashed #8B8E84", borderRadius: "999px", padding: "4px 4px 4px 14px" }}><span style={{ fontSize: "13px", fontWeight: "500", color: "#585B52" }}>Demo control · Viewing as</span><div style={{ display: "flex", gap: "2px" }}><button className="tap" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "#1F211C", color: "#FFFFFF", fontSize: "13px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a1}>MR</button><button className="tap h1" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.b1}>Manager</button><button className="tap h1" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.c1}>Admin</button></div></div>
      </div>
      <div style={{ flex: "1", padding: "4px 40px 32px", display: "grid", gridTemplateColumns: "minmax(0,1fr) 360px", gap: "24px", overflow: "hidden" }}>
        <div style={{ background: "#F1EFE8", borderRadius: "20px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ height: "56px", padding: "0 18px", display: "flex", alignItems: "center", gap: "10px", flex: "none" }}>
            <button className="tap h4" style={{ width: "36px", height: "36px", background: "#FFFFFF", border: "none", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} type="button" onClick={v.prevPage}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3.4L5.4 8L10 12.6" stroke="#1F211C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
            <span style={{ fontSize: "15px", fontWeight: "600", fontVariantNumeric: "tabular-nums", minWidth: "100px", textAlign: "center" }}>Page {v.page} of 14</span>
            <button className="tap h4" style={{ width: "36px", height: "36px", background: "#FFFFFF", border: "none", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} type="button" onClick={v.nextPage}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3.4L10.6 8L6 12.6" stroke="#1F211C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
            <div style={{ flex: "1" }}></div>
            <span style={{ fontSize: "14px", color: "#585B52" }}>100%</span>
          </div>
          <div style={{ flex: "1", display: "flex", justifyContent: "center", padding: "4px 0 24px", overflow: "hidden", perspective: "1200px" }}>
            <div key={v.page} className="doc-page" style={{ width: "500px", background: "#FFFFFF", borderRadius: "6px", boxShadow: "0 1px 2px rgba(20,21,15,.05),0 16px 40px -22px rgba(20,21,15,.35)", padding: "40px 44px", display: "flex", flexDirection: "column", gap: "16px", boxSizing: "border-box" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", color: "#585B52" }}><span>Elmiron — Product Training · Lesson 3.3</span><span>v2.0 · page {v.page}</span></div>
              <div style={{ fontSize: "21px", fontWeight: "600", letterSpacing: "-.025em" }}>Sample content — pending medical review.</div>
              <p style={{ fontSize: "15px", lineHeight: "1.6", color: "#585B52", margin: "0" }}>This page will carry the approved training material once Medical Affairs signs it off. No clinical, efficacy, dosing or safety statement is shown in this demo.</p>
              <div style={{ flex: "1", minHeight: "360px", borderRadius: "10px", background: "repeating-linear-gradient(135deg,#F1EFE8 0 8px,#EAE7DF 8px 16px)", display: "flex", alignItems: "flex-end", padding: "12px", boxSizing: "border-box" }}><span style={{ fontSize: "12px", color: "#585B52" }}>document page content</span></div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <div style={{ fontSize: "13.5px", fontWeight: "500", color: "#585B52" }}>Lesson 3.3 of 14 · PDF · 14 pages</div>
            <div style={{ fontSize: "21px", fontWeight: "600", letterSpacing: "-.025em", lineHeight: "1.25" }}>Sample content — pending medical review.</div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "14px" }}><div style={{ flex: "1", height: "6px", background: "#F1EFE8", borderRadius: "3px", overflow: "hidden" }}><div className="bar-fill" style={{ width: v.pagePct, height: "100%", background: "#35593A", borderRadius: "3px" }}></div></div><span style={{ fontSize: "14px", color: "#585B52", fontVariantNumeric: "tabular-nums" }}>{v.page} / 14</span></div>
          </div>
          <div className="card" style={{ background: "#FFFFFF", borderRadius: "20px", padding: "20px 22px", boxShadow: "0 1px 2px rgba(20,21,15,.04),0 16px 40px -22px rgba(20,21,15,.35)", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontSize: "16.5px", fontWeight: "600" }}>Acknowledgement</span><span style={{ background: "#F1EFE8", borderRadius: "999px", padding: "3px 10px", fontSize: "13px", fontWeight: "600" }}>Document v2.0</span></div>
            {v.ackPending && (<>
              <div className="tap" style={{ display: "flex", gap: "12px", alignItems: "flex-start", cursor: "pointer" }} onClick={v.toggleAck}>
                {v.notEnd && (<><span style={{ width: "22px", height: "22px", borderRadius: "6px", border: "1.5px dashed #C4C7BD", background: "#F7F5F0", flex: "none", boxSizing: "border-box", marginTop: "1px" }}></span></>)}
                {v.ackReady && (<><span style={{ width: "22px", height: "22px", borderRadius: "6px", border: "1.5px solid #8B8E84", background: "#FFFFFF", flex: "none", boxSizing: "border-box", marginTop: "1px" }}></span></>)}
                {v.ackCan && (<><span style={{ width: "22px", height: "22px", borderRadius: "6px", background: "#35593A", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px" }}><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path></svg></span></>)}
                <span style={{ fontSize: "16px", lineHeight: "1.45" }}>I have read and understood this training material</span>
              </div>
              {v.ackCan && (<><button className="tap h2" style={{ height: "48px", background: "#35593A", border: "none", borderRadius: "16px", color: "#FFFFFF", fontSize: "16px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.confirmAck}>Confirm</button></>)}
              {v.notEnd && (<><div style={{ height: "48px", background: "#F1EFE8", borderRadius: "16px", color: "#9B9E94", fontSize: "16px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" }}>Confirm</div><div style={{ fontSize: "14px", color: "#585B52", marginTop: "-6px" }}>Reach page 14 to acknowledge — you're on page {v.page}.</div></>)}
              {v.ackReady && (<><div style={{ height: "48px", background: "#F1EFE8", borderRadius: "16px", color: "#9B9E94", fontSize: "16px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" }}>Confirm</div><div style={{ fontSize: "14px", color: "#585B52", marginTop: "-6px" }}>Tick the box above to confirm.</div></>)}
            </>)}
            {v.ackDone && (<>
              <div style={{ background: "#E9F0E9", borderRadius: "14px", padding: "13px 15px", display: "flex", gap: "10px", alignItems: "flex-start" }}><svg style={{ marginTop: "4px", flex: "none" }} width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#35593A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path></svg><div style={{ fontSize: "15px", lineHeight: "1.5" }}>Acknowledged v2.0 on 24 Sep 2026 at 14:02 IST. It's in your training record.</div></div>
              <button className="tap h2" style={{ height: "48px", background: "#35593A", border: "none", borderRadius: "16px", color: "#FFFFFF", fontSize: "16px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a6}>Go to final assessment</button>
              <div style={{ fontSize: "13.5px", color: "#585B52", marginTop: "-6px" }}>Demo shortcut. In the course, lessons 3.4–4.3 come first.</div>
            </>)}
            <div style={{ fontSize: "14px", color: "#585B52", borderTop: "1px solid #F2F0E9", paddingTop: "12px" }}>If v2.0 is replaced, you'll be asked to read and acknowledge the new version.</div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-start" }}><button className="tap" style={{ height: "30px", padding: "0 12px", background: "transparent", border: "1px dashed #8B8E84", borderRadius: "999px", color: "#585B52", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.toEnd}>Demo control · jump to page 14</button></div>
        </div>
      </div>
    </div>
  </div>
  );
}
