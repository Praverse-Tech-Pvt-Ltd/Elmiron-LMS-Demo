// Generated from the Elmiron Learning design. Edit freely.
import { Fragment } from 'react';
import type { DemoValues } from '../../state';
import CountUp from '../../components/CountUp';

export default function ScreenA2({ v }: { v: DemoValues }) {
  void Fragment; void CountUp;
  return (
    <div className="screen-frame" style={{ background: "#FBFAF7", overflow: "hidden", display: "flex" }}>
    <div style={{ width: "240px", background: "#F1EFE8", padding: "24px 0", flex: "none", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "0 22px 28px", display: "flex", alignItems: "center", gap: "10px" }}><span style={{ width: "24px", height: "24px", borderRadius: "8px", background: "#35593A" }}></span><span style={{ fontSize: "15px", fontWeight: "600", letterSpacing: "-.01em" }}>Elmiron Field</span></div>
      <div style={{ padding: "0 22px 8px", fontSize: "13.5px", fontWeight: "500", color: "#585B52" }}>Learning</div>
      <div className="tap h0" style={{ padding: "10px 22px", fontSize: "15px", color: "#585B52", cursor: "pointer" }} onClick={v.go.a1}>Learning home</div>
      <div className="tap" style={{ padding: "10px 22px", fontSize: "15px", fontWeight: "600", color: "#35593A", background: "#E4EAE3", boxShadow: "inset 3px 0 0 #35593A", cursor: "pointer" }} onClick={v.go.a2}>Browse courses</div>
      <div className="tap h0" style={{ padding: "10px 22px", fontSize: "15px", color: "#585B52", cursor: "pointer" }} onClick={v.go.a9}>Training history</div>
      <div className="tap h0" style={{ padding: "10px 22px", fontSize: "15px", color: "#585B52", cursor: "pointer" }} onClick={v.go.a8}>Certificates</div>
      <div style={{ marginTop: "auto", padding: "0 22px" }}><div style={{ borderTop: "1px solid #E1DFD7", paddingTop: "14px", display: "flex", gap: "10px", alignItems: "center" }}><span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#E4EAE3", color: "#35593A", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>RM</span><div><div style={{ fontSize: "14.5px", fontWeight: "600" }}>Rahul More</div><div style={{ fontSize: "13px", color: "#585B52" }}>MR · South Mumbai</div><div style={{ fontFamily: "'DM Mono',monospace", fontSize: "12px", color: "#585B52" }}>EMP-40218</div></div></div></div>
    </div>
    <div className="screen-main" style={{ flex: "1", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ height: "64px", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none" }}>
        <div style={{ fontSize: "14.5px", color: "#585B52" }}><span className="tap" style={{ cursor: "pointer", color: "#35593A", fontWeight: "500" }} onClick={v.go.a1}>Learning home</span> / Browse courses</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px dashed #8B8E84", borderRadius: "999px", padding: "4px 4px 4px 14px" }}><span style={{ fontSize: "13px", fontWeight: "500", color: "#585B52" }}>Demo control · Viewing as</span><div style={{ display: "flex", gap: "2px" }}><button className="tap" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "#1F211C", color: "#FFFFFF", fontSize: "13px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a1}>MR</button><button className="tap h1" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.b1}>Manager</button><button className="tap h1" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.c1}>Admin</button></div></div>
      </div>
      <div style={{ flex: "1", padding: "4px 40px 32px", display: "flex", flexDirection: "column", gap: "18px", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px" }}>
          <div><div style={{ fontSize: "27px", fontWeight: "600", letterSpacing: "-.035em", lineHeight: "1.15" }}>Browse courses</div><div style={{ fontSize: "16px", color: "#585B52", marginTop: "4px" }}>Everything open to you. Assigned courses also sit on your home screen with their due dates.</div></div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "340px" }}><label style={{ fontSize: "13.5px", fontWeight: "500", color: "#585B52" }}>Search courses</label><input className="f5" style={{ height: "46px", background: "#FFFFFF", border: "1px solid #8B8E84", borderRadius: "14px", color: "#1F211C", fontFamily: "'DM Sans',sans-serif", fontSize: "16px", padding: "0 14px", outline: "none", boxSizing: "border-box" }} type="text" value={v.q} onChange={v.onQ} placeholder="Course name" /></div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {v.cats.map((c, c_i) => (<Fragment key={c_i}>
            <button className="tap" style={{ height: "36px", padding: "0 15px", border: "none", borderRadius: "999px", background: c.bg, color: c.fg, fontSize: "14px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={c.pick}>{c.name}</button>
          </Fragment>))}
        </div>
        {v.hasCourses && (<>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "18px" }}>
          {v.courseList.map((c, c_i) => (<Fragment key={c.title}>
            <div className="tap card h4 row-in" style={{ animationDelay: c_i * 0.035 + "s", background: "#FFFFFF", borderRadius: "20px", overflow: "hidden", boxShadow: "0 1px 2px rgba(20,21,15,.04),0 16px 40px -22px rgba(20,21,15,.35)", cursor: "pointer", display: "flex", flexDirection: "column" }} onClick={v.go.a3}>
              <div style={{ height: "108px", background: "repeating-linear-gradient(135deg,#F1EFE8 0 8px,#EAE7DF 8px 16px)", display: "flex", alignItems: "flex-end", padding: "10px 12px", boxSizing: "border-box" }}><span style={{ fontSize: "12px", color: "#585B52" }}>course thumbnail</span></div>
              <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: "4px", flex: "1" }}>
                <div style={{ fontSize: "13.5px", fontWeight: "500", color: "#585B52" }}>{c.cat}</div>
                <div style={{ fontSize: "16px", fontWeight: "600", letterSpacing: "-.01em", lineHeight: "1.3" }}>{c.title}</div>
                <div style={{ fontSize: "14px", color: "#585B52" }}>{c.meta}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto", paddingTop: "10px" }}>
                  <span className="pill" style={{ display: "inline-flex", alignItems: "center", background: "#F1EFE8", borderRadius: "999px", padding: "4px 10px", fontSize: "13px", fontWeight: "600", color: "#1F211C" }}>{c.req}</span>
                  <span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: c.p.bg, color: c.p.fg, borderRadius: "999px", padding: "4px 11px 4px 8px", fontSize: "13px", fontWeight: "600" }}>{c.p.ring && (<><span style={{ width: "11px", height: "11px", borderRadius: "50%", border: "1.8px solid #585B52", boxSizing: "border-box", display: "block" }}></span></>)}{c.p.part && (<><span style={{ width: "12px", height: "12px", borderRadius: "50%", border: "1.8px solid #2A5570", background: "conic-gradient(#2A5570 0 45%,transparent 0)", boxSizing: "border-box", display: "block" }}></span></>)}{c.p.bang && (<><span style={{ width: "14px", height: "14px", borderRadius: "50%", background: c.p.fg, color: "#FFFFFF", fontSize: "10px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>!</span></>)}{c.p.cross && (<><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#9C3B26" strokeWidth="2.8" strokeLinecap="round"></path></svg></>)}{c.p.tick && (<><span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#35593A", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></svg></span></>)}{c.p.label}</span>
                </div>
              </div>
            </div>
          </Fragment>))}
        </div>
        </>)}
        {v.noCourses && (<>
          <div className="card row-in" style={{ background: "#FFFFFF", borderRadius: "20px", padding: "56px 40px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "8px", boxShadow: "0 1px 2px rgba(20,21,15,.05)" }}>
            <span style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #585B52", boxSizing: "border-box", marginBottom: "8px" }}></span>
            <div style={{ fontSize: "21px", fontWeight: "600", letterSpacing: "-.025em" }}>{v.emptyTitle}</div>
            <div style={{ fontSize: "16px", color: "#585B52", maxWidth: "52ch" }}>{v.emptyBody}</div>
            <button className="tap h0" style={{ marginTop: "12px", height: "46px", padding: "0 20px", background: "#F1EFE8", border: "none", borderRadius: "16px", color: "#1F211C", fontSize: "15.5px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.clearFilters}>Clear search and filter</button>
          </div>
        </>)}
      </div>
    </div>
  </div>
  );
}
