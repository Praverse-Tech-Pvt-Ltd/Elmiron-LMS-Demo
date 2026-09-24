// Generated from the Elmiron Learning design. Edit freely.
import { Fragment } from 'react';
import type { DemoValues } from '../../state';
import CountUp from '../../components/CountUp';

export default function ScreenC5({ v }: { v: DemoValues }) {
  void Fragment; void CountUp;
  return (
    <div className="screen-frame" style={{ background: "#FBFAF7", overflow: "hidden", display: "flex" }}>
    <div style={{ width: "224px", background: "#F1EFE8", padding: "22px 0", flex: "none", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "0 20px 24px", display: "flex", alignItems: "center", gap: "9px" }}><span style={{ width: "22px", height: "22px", borderRadius: "7px", background: "#35593A" }}></span><span style={{ fontSize: "14.5px", fontWeight: "600" }}>Elmiron Field</span></div>
      <div style={{ padding: "0 20px 6px", fontSize: "13px", fontWeight: "500", color: "#585B52" }}>Training admin</div>
      <div className="tap h0" style={{ padding: "9px 20px", fontSize: "14.5px", color: "#585B52", cursor: "pointer" }} onClick={v.go.c1}>Dashboard</div>
      <div className="tap h0" style={{ padding: "9px 20px", fontSize: "14.5px", color: "#585B52", cursor: "pointer" }} onClick={v.go.c2}>Courses</div>
      <div className="tap h0" style={{ padding: "9px 20px", fontSize: "14.5px", color: "#585B52", cursor: "pointer" }} onClick={v.go.c3}>Question bank</div>
      <div className="tap h0" style={{ padding: "9px 20px", fontSize: "14.5px", color: "#585B52", cursor: "pointer" }} onClick={v.go.c4}>Assign</div>
      <div className="tap" style={{ padding: "9px 20px", fontSize: "14.5px", fontWeight: "600", color: "#35593A", background: "#E4EAE3", boxShadow: "inset 3px 0 0 #35593A", cursor: "pointer" }} onClick={v.go.c5}>Reports</div>
      <div style={{ padding: "9px 20px", fontSize: "14.5px", color: "#585B52" }}>Users &amp; roles</div>
      <div style={{ marginTop: "auto", padding: "0 20px" }}><div style={{ fontSize: "13px", lineHeight: "1.5", color: "#585B52", borderTop: "1px solid #E1DFD7", paddingTop: "14px" }}><strong style={{ color: "#1F211C", fontWeight: "600" }}>S. Pillai</strong><br  />Training admin · all regions</div></div>
    </div>
    <div className="screen-main" style={{ flex: "1", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ height: "52px", padding: "0 30px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none" }}>
        <div style={{ fontSize: "14px", color: "#585B52" }}>Reports</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px dashed #8B8E84", borderRadius: "999px", padding: "3px 3px 3px 12px" }}><span style={{ fontSize: "12.5px", fontWeight: "500", color: "#585B52" }}>Demo control · Viewing as</span><div style={{ display: "flex", gap: "2px" }}><button className="tap h1" style={{ height: "26px", padding: "0 11px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "12.5px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.a1}>MR</button><button className="tap h1" style={{ height: "26px", padding: "0 11px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "12.5px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.b1}>Manager</button><button className="tap" style={{ height: "26px", padding: "0 11px", border: "none", borderRadius: "999px", background: "#1F211C", color: "#FFFFFF", fontSize: "12.5px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.c1}>Admin</button></div></div>
      </div>
      <div style={{ flex: "1", padding: "0 30px 24px", overflow: "hidden", display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><div style={{ fontSize: "24px", fontWeight: "600", letterSpacing: "-.03em" }}>Reports</div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ fontSize: "13.5px", color: "#585B52" }}>Export</span><div style={{ display: "flex", gap: "3px", background: "#F1EFE8", borderRadius: "10px", padding: "3px" }}><button className="tap h7" style={{ height: "30px", padding: "0 12px", border: "none", borderRadius: "8px", background: "transparent", fontSize: "13.5px", fontWeight: "600", cursor: "pointer" }} type="button">Excel</button><button className="tap h7" style={{ height: "30px", padding: "0 12px", border: "none", borderRadius: "8px", background: "transparent", fontSize: "13.5px", fontWeight: "600", cursor: "pointer" }} type="button">CSV</button><button className="tap h7" style={{ height: "30px", padding: "0 12px", border: "none", borderRadius: "8px", background: "transparent", fontSize: "13.5px", fontWeight: "600", cursor: "pointer" }} type="button">PDF</button></div></div>
        </div>
        <div style={{ display: "flex", gap: "22px", borderBottom: "1px solid #E1DFD7" }}>
          {v.repTabs.map((t, t_i) => (<Fragment key={t_i}><div className="tap" style={{ padding: "8px 2px 10px", fontSize: "14.5px", fontWeight: t.fw, color: t.fg, boxShadow: t.bar, cursor: "pointer" }} onClick={t.pick}>{t.t}</div></Fragment>))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1.3fr 1fr 1fr 1fr auto", gap: "10px", alignItems: "end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}><label style={{ fontSize: "12.5px", fontWeight: "500", color: "#585B52" }}>Date range</label><div style={{ height: "36px", background: "#FFFFFF", border: "1px solid #8B8E84", borderRadius: "10px", padding: "0 12px", display: "flex", alignItems: "center", fontSize: "14px", boxSizing: "border-box" }}>01 Sep – 24 Sep 2026</div></div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}><label style={{ fontSize: "12.5px", fontWeight: "500", color: "#585B52" }}>Course</label><div style={{ height: "36px", background: "#FFFFFF", border: "1px solid #8B8E84", borderRadius: "10px", padding: "0 12px", display: "flex", alignItems: "center", fontSize: "14px", boxSizing: "border-box" }}>All mandatory courses</div></div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}><label style={{ fontSize: "12.5px", fontWeight: "500", color: "#585B52" }}>Region</label><div style={{ height: "36px", background: "#FFFFFF", border: "1px solid #8B8E84", borderRadius: "10px", padding: "0 12px", display: "flex", alignItems: "center", fontSize: "14px", boxSizing: "border-box" }}>West</div></div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}><label style={{ fontSize: "12.5px", fontWeight: "500", color: "#585B52" }}>Manager</label><div style={{ height: "36px", background: "#FFFFFF", border: "1px solid #8B8E84", borderRadius: "10px", padding: "0 12px", display: "flex", alignItems: "center", fontSize: "14px", boxSizing: "border-box" }}>All managers</div></div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}><label style={{ fontSize: "12.5px", fontWeight: "500", color: "#585B52" }}>Status</label><div style={{ height: "36px", background: "#FFFFFF", border: "1px solid #8B8E84", borderRadius: "10px", padding: "0 12px", display: "flex", alignItems: "center", fontSize: "14px", boxSizing: "border-box" }}>All statuses</div></div>
          <button className="tap h1" style={{ height: "36px", padding: "0 12px", background: "transparent", border: "none", borderRadius: "10px", color: "#35593A", fontSize: "13.5px", fontWeight: "600", cursor: "pointer" }} type="button">Clear filters</button>
        </div>
        <div style={{ background: "#FFFFFF", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 2px rgba(20,21,15,.05)" }}>
          <div key={v.tab} className="row-in" style={{ display: "grid", gridTemplateColumns: v.rep.cols, background: "#F7F5F0", borderBottom: "1px solid #EFEDE6", fontSize: "12.5px", fontWeight: "600", color: "#585B52" }}>
            {v.rep.head.map((h, h_i) => (<Fragment key={h_i}><div style={{ padding: "10px 14px" }}>{h}</div></Fragment>))}
          </div>
          {v.repRows.map((r, r_i) => (<Fragment key={v.tab + r_i}>
            <div className="row-in" style={{ animationDelay: r_i * 0.04 + "s", display: "grid", gridTemplateColumns: v.rep.cols, borderBottom: "1px solid #EFEDE6", alignItems: "center", minHeight: "50px", fontSize: "14px" }}>
              <div style={{ padding: "8px 14px", fontWeight: "600" }}>{r.first}</div>
              {r.rest.map((c, c_i) => (<Fragment key={c_i}><div style={{ padding: "8px 14px", fontVariantNumeric: "tabular-nums" }}>{c.v}</div></Fragment>))}
            </div>
          </Fragment>))}
          <div style={{ padding: "10px 14px", fontSize: "13px", color: "#585B52" }}>6 rows · West region · generated 24 Sep 2026, 14:20 IST. Exports include every filtered row, not only this page.</div>
        </div>
      </div>
    </div>
  </div>
  );
}
