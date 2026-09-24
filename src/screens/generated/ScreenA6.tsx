// Generated from the Elmiron Learning design. Edit freely.
import { Fragment } from 'react';
import type { DemoValues } from '../../state';
import CountUp from '../../components/CountUp';

export default function ScreenA6({ v }: { v: DemoValues }) {
  void Fragment; void CountUp;
  return (
    <div className="screen-frame" style={{ background: "#FBFAF7", overflow: "hidden", display: "flex", flexDirection: "column" }}>
    <div style={{ height: "72px", padding: "0 40px", display: "flex", alignItems: "center", gap: "20px", flex: "none", background: "#FFFFFF" }}>
      <span style={{ width: "24px", height: "24px", borderRadius: "8px", background: "#35593A", flex: "none" }}></span>
      <div style={{ flex: "1" }}><div style={{ fontSize: "16.5px", fontWeight: "600" }}>Final assessment</div><div style={{ fontSize: "14px", color: "#585B52" }}>Elmiron — Product Training · v2.0 · attempt 1 of 3</div></div>
      <div style={{ display: "flex", alignItems: "center", gap: "9px", background: "#F1EFE8", borderRadius: "999px", padding: "8px 16px" }}><span style={{ width: "14px", height: "14px", borderRadius: "50%", border: "1.8px solid #1F211C", boxSizing: "border-box", position: "relative" }}></span><span style={{ fontSize: "16px", fontWeight: "600", fontVariantNumeric: "tabular-nums" }}>18:42</span><span style={{ fontSize: "14.5px", color: "#585B52" }}>left</span></div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px dashed #8B8E84", borderRadius: "999px", padding: "4px 4px 4px 14px" }}><span style={{ fontSize: "13px", fontWeight: "500", color: "#585B52" }}>Demo control · Viewing as</span><div style={{ display: "flex", gap: "2px" }}><button className="tap" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "#1F211C", color: "#FFFFFF", fontSize: "13px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a1}>MR</button><button className="tap h1" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.b1}>Manager</button><button className="tap h1" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.c1}>Admin</button></div></div>
    </div>
    <div style={{ height: "4px", background: "#F1EFE8", flex: "none" }}><div className="bar-fill" style={{ width: "35%", height: "100%", background: "#35593A" }}></div></div>
    <div className="screen-main" style={{ flex: "1", display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: "40px", padding: "36px 64px 32px 120px", overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "820px" }}>
        <div style={{ fontSize: "14.5px", fontWeight: "500", color: "#585B52" }}>Question 7 of 20 · Single choice · choose one · 2 marks</div>
        <div style={{ fontSize: "27px", fontWeight: "600", letterSpacing: "-.035em", lineHeight: "1.25" }}>Sample content — pending medical review. Placeholder product question 7.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {v.opts7.map((o, o_i) => (<Fragment key={o_i}>
            <div className="tap card h6" style={{ minHeight: "62px", padding: "0 20px", display: "flex", alignItems: "center", gap: "14px", borderRadius: "16px", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 1px 2px rgba(20,21,15,.05)" }} onClick={o.pick}>
              {o.sel && (<><span className="sel-pop" style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#35593A", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FFFFFF" }}></span></span></>)}
              {o.unsel && (<><span style={{ width: "22px", height: "22px", borderRadius: "50%", border: "1.5px solid #8B8E84", boxSizing: "border-box", flex: "none" }}></span></>)}
              <span style={{ fontSize: "14.5px", fontWeight: "600", color: "#585B52", width: "18px" }}>{o.letter}</span>
              <span style={{ fontSize: "16px" }}>{o.t}</span>
            </div>
          </Fragment>))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "auto" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14.5px", color: "#585B52" }}><svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#35593A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path></svg>Answers are saved as you go · last saved 14:02 IST</span>
          <div style={{ flex: "1" }}></div>
          <button className="tap h0" style={{ height: "48px", padding: "0 20px", background: "#F1EFE8", border: "none", borderRadius: "16px", color: "#1F211C", fontSize: "16px", fontWeight: "500", cursor: "pointer" }} type="button">Previous</button>
          <button className="tap h2" style={{ height: "48px", padding: "0 24px", background: "#35593A", border: "none", borderRadius: "16px", color: "#FFFFFF", fontSize: "16px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a6b}>Next question</button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div className="card" style={{ background: "#FFFFFF", borderRadius: "20px", padding: "18px 20px", boxShadow: "0 1px 2px rgba(20,21,15,.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}><span style={{ fontSize: "16px", fontWeight: "600" }}>Questions</span><span style={{ fontSize: "14px", color: "#585B52" }}>6 of 20 answered</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "7px" }}>
            {v.nav.map((n, n_i) => (<Fragment key={n_i}>
              {n.cur && (<><span style={{ height: "36px", borderRadius: "10px", background: "#1F211C", color: "#FFFFFF", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" }}>{n.n}</span></>)}
              {n.ans && (<><span style={{ height: "36px", borderRadius: "10px", background: "#E9F0E9", color: "#35593A", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" }}>{n.n}</span></>)}
              {n.open && (<><span style={{ height: "36px", borderRadius: "10px", border: "1px solid #8B8E84", boxSizing: "border-box", color: "#1F211C", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>{n.n}</span></>)}
            </Fragment>))}
          </div>
          <div style={{ display: "flex", gap: "14px", marginTop: "14px", fontSize: "13.5px", color: "#585B52" }}><span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ width: "12px", height: "12px", borderRadius: "4px", background: "#E9F0E9" }}></span>Answered</span><span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ width: "12px", height: "12px", borderRadius: "4px", border: "1px solid #8B8E84", boxSizing: "border-box" }}></span>Not yet</span><span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ width: "12px", height: "12px", borderRadius: "4px", background: "#1F211C" }}></span>Now</span></div>
        </div>
        <div style={{ background: "#F1EFE8", borderRadius: "16px", padding: "14px 16px", fontSize: "14px", lineHeight: "1.55", color: "#585B52" }}>If you lose signal, your answers are kept and the timer pauses until you're back.</div>
      </div>
    </div>
  </div>
  );
}
