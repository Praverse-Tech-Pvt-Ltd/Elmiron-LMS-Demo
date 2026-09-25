// Generated from the Elmiron Learning design. Edit freely.
import { Fragment } from 'react';
import type { DemoValues } from '../../state';
import CountUp from '../../components/CountUp';
import Sidebar from '../../components/Sidebar';
import Switch from '../../components/Switch';

export default function ScreenC3({ v }: { v: DemoValues }) {
  void Fragment; void CountUp;
  return (
    <div className="screen-frame" style={{ background: "#FBFAF7", overflow: "hidden", display: "flex" }}>
    <Sidebar role="admin" active="c3" />
    <div className="screen-main" style={{ flex: "1", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ height: "52px", padding: "0 30px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none" }}>
        <div style={{ fontSize: "14px", color: "#585B52" }}>Question bank</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px dashed #8B8E84", borderRadius: "999px", padding: "3px 3px 3px 12px" }}><span style={{ fontSize: "12.5px", fontWeight: "500", color: "#585B52" }}>Demo control · Viewing as</span><div style={{ display: "flex", gap: "2px" }}><button className="tap h1" style={{ height: "26px", padding: "0 11px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "12.5px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.a1}>MR</button><button className="tap h1" style={{ height: "26px", padding: "0 11px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "12.5px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.b1}>Manager</button><button className="tap" style={{ height: "26px", padding: "0 11px", border: "none", borderRadius: "999px", background: "#1F211C", color: "#FFFFFF", fontSize: "12.5px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.c1}>Admin</button></div></div>
      </div>
      <div style={{ flex: "1", padding: "0 30px 24px", overflow: "hidden", display: "grid", gridTemplateColumns: "minmax(0,1fr) 360px", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", minHeight: "0" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}><div style={{ fontSize: "24px", fontWeight: "600", letterSpacing: "-.015em" }}>Question bank</div><div style={{ fontSize: "14px", color: "#585B52" }}>100 questions · {v.activeCount} active</div></div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ height: "36px", flex: "1", background: "#FFFFFF", border: "1px solid #8B8E84", borderRadius: "10px", padding: "0 12px", display: "flex", alignItems: "center", fontSize: "14px", color: "#585B52", boxSizing: "border-box" }}>Search questions</div>
            <span style={{ height: "36px", padding: "0 12px", background: "#F1EFE8", borderRadius: "10px", fontSize: "13.5px", fontWeight: "600", display: "flex", alignItems: "center" }}>Course: Elmiron — Product Training</span>
            <span style={{ height: "36px", padding: "0 12px", background: "#F1EFE8", borderRadius: "10px", fontSize: "13.5px", fontWeight: "500", display: "flex", alignItems: "center" }}>Topic: all</span>
            <span style={{ height: "36px", padding: "0 12px", background: "#F1EFE8", borderRadius: "10px", fontSize: "13.5px", fontWeight: "500", display: "flex", alignItems: "center" }}>Difficulty: all</span>
          </div>
          <div style={{ background: "#FFFFFF", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 2px rgba(20,21,15,.05)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "72px minmax(0,1fr) 190px 80px 64px", background: "#F7F5F0", borderBottom: "1px solid #EFEDE6", fontSize: "12.5px", fontWeight: "600", color: "#585B52" }}><div style={{ padding: "9px 14px" }}>ID</div><div style={{ padding: "9px 10px" }}>Question</div><div style={{ padding: "9px 10px" }}>Tags</div><div style={{ padding: "9px 10px" }}>Difficulty</div><div style={{ padding: "9px 14px 9px 6px" }}>Active</div></div>
            {v.bank.map((b, b_i) => (<Fragment key={b_i}>
              <div style={{ display: "grid", gridTemplateColumns: "72px minmax(0,1fr) 190px 80px 64px", borderBottom: "1px solid #EFEDE6", alignItems: "center", minHeight: "48px" }}>
                <div style={{ padding: "8px 14px", fontSize: "13px", color: "#585B52", fontVariantNumeric: "tabular-nums" }}>{b.id}</div>
                <div style={{ padding: "8px 10px", fontSize: "14px", lineHeight: "1.4" }}>{b.q}</div>
                <div style={{ padding: "8px 10px", display: "flex", flexWrap: "wrap", gap: "4px" }}><span style={{ background: "#F1EFE8", borderRadius: "999px", padding: "2px 8px", fontSize: "12px", fontWeight: "500" }}>{b.course}</span><span style={{ background: "#F1EFE8", borderRadius: "999px", padding: "2px 8px", fontSize: "12px", fontWeight: "500" }}>{b.topic}</span></div>
                <div style={{ padding: "8px 10px", fontSize: "13.5px" }}>{b.diff}</div>
                <div className="tap" style={{ padding: "8px 14px 8px 6px", cursor: "pointer" }} onClick={b.toggle}><Switch on={b.on} /></div>
              </div>
            </Fragment>))}
            <div style={{ padding: "9px 14px", fontSize: "13px", color: "#585B52" }}>Showing 8 of 100. Inactive questions are never drawn, and past attempts that used them keep their marks.</div>
          </div>
        </div>
        <div style={{ background: "#FFFFFF", borderRadius: "14px", boxShadow: "0 1px 2px rgba(20,21,15,.04),0 16px 40px -22px rgba(20,21,15,.35)", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "12px", overflow: "hidden" }}>
          <div><div style={{ fontSize: "16px", fontWeight: "600" }}>Assessment settings</div><div style={{ fontSize: "13px", color: "#585B52" }}>Elmiron — Product Training · v2.1</div></div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ flex: "1", fontSize: "14px" }}>Questions drawn</span><div style={{ height: "34px", width: "60px", background: "#FBFAF7", border: "1px solid #8B8E84", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14.5px", fontWeight: "600", boxSizing: "border-box" }}>20</div><span style={{ fontSize: "13.5px", color: "#585B52", width: "70px" }}>from 100</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ flex: "1", fontSize: "14px" }}>Pass mark</span><div style={{ height: "34px", width: "60px", background: "#FBFAF7", border: "1px solid #8B8E84", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14.5px", fontWeight: "600", boxSizing: "border-box" }}>80</div><span style={{ fontSize: "13.5px", color: "#585B52", width: "70px" }}>%</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ flex: "1", fontSize: "14px" }}>Attempts allowed</span><div style={{ height: "34px", width: "60px", background: "#FBFAF7", border: "1px solid #8B8E84", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14.5px", fontWeight: "600", boxSizing: "border-box" }}>3</div><span style={{ fontSize: "13.5px", color: "#585B52", width: "70px" }}></span></div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ flex: "1", fontSize: "14px" }}>Time limit</span><div style={{ height: "34px", width: "60px", background: "#FBFAF7", border: "1px solid #8B8E84", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14.5px", fontWeight: "600", boxSizing: "border-box" }}>30</div><span style={{ fontSize: "13.5px", color: "#585B52", width: "70px" }}>minutes</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ flex: "1", fontSize: "14px" }}>Wait before retake</span><div style={{ height: "34px", width: "60px", background: "#FBFAF7", border: "1px solid #8B8E84", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14.5px", fontWeight: "600", boxSizing: "border-box" }}>24</div><span style={{ fontSize: "13.5px", color: "#585B52", width: "70px" }}>hours</span></div>
          <div style={{ height: "1px", background: "#F2F0E9" }}></div>
          <div className="tap" style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={v.toggleSq}><span style={{ flex: "1", fontSize: "14px" }}>Shuffle questions</span><Switch on={v.sqOn} /></div>
          <div className="tap" style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={v.toggleSo}><span style={{ flex: "1", fontSize: "14px" }}>Shuffle options</span><Switch on={v.soOn} /></div>
          <div className="tap" style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={v.toggleSa}><span style={{ flex: "1", fontSize: "14px" }}>Show answers after attempt<span style={{ display: "block", fontSize: "13px", color: "#585B52" }}>Off: learners see marks by module only</span></span><Switch on={v.saOn} /></div>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "6px" }}><button className="tap h2" style={{ height: "40px", background: "#35593A", border: "none", borderRadius: "10px", color: "#FFFFFF", fontSize: "14px", fontWeight: "600", cursor: "pointer" }} type="button">Save settings</button><div style={{ fontSize: "12.5px", color: "#585B52", textAlign: "center" }}>Applies to attempts that start after saving</div></div>
        </div>
      </div>
    </div>
  </div>
  );
}
