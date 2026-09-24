// Generated from the Elmiron Learning design. Edit freely.
import { Fragment, useEffect } from 'react';
import type { DemoValues } from '../../state';
import CountUp from '../../components/CountUp';
import Sidebar from '../../components/Sidebar';

export default function ScreenA4({ v }: { v: DemoValues }) {
  void Fragment; void CountUp;
  // stop simulated playback when leaving the lesson
  const pause = v.pause;
  useEffect(() => pause, [pause]);
  return (
    <div className="screen-frame" style={{ background: "#FBFAF7", overflow: "hidden", display: "flex" }}>
    <Sidebar role="mr" active="a1" />
    <div className="screen-main" style={{ flex: "1", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ height: "64px", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none" }}>
        <div style={{ fontSize: "14.5px", color: "#585B52" }}><span className="tap" style={{ cursor: "pointer", color: "#35593A", fontWeight: "500" }} onClick={v.go.a3}>Elmiron — Product Training</span> / Module 3 · Mechanism and use</div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {v.outlineClosed && (<><button className="tap h0" style={{ height: "36px", padding: "0 14px", background: "#F1EFE8", border: "none", borderRadius: "12px", color: "#1F211C", fontSize: "14px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.toggleOutline}>Show outline</button></>)}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px dashed #8B8E84", borderRadius: "999px", padding: "4px 4px 4px 14px" }}><span style={{ fontSize: "13px", fontWeight: "500", color: "#585B52" }}>Demo control · Viewing as</span><div style={{ display: "flex", gap: "2px" }}><button className="tap" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "#1F211C", color: "#FFFFFF", fontSize: "13px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a1}>MR</button><button className="tap h1" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.b1}>Manager</button><button className="tap h1" style={{ height: "28px", padding: "0 12px", border: "none", borderRadius: "999px", background: "transparent", color: "#1F211C", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.c1}>Admin</button></div></div>
        </div>
      </div>
      <div style={{ flex: "1", display: "flex", overflow: "hidden" }}>
        <div style={{ flex: "1", minWidth: "0", padding: "4px 32px 28px 40px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ background: "#1F211C", borderRadius: "18px", aspectRatio: "16/9", maxHeight: "470px", position: "relative", overflow: "hidden", backgroundImage: "repeating-linear-gradient(135deg,rgba(255,255,255,.04) 0 10px,rgba(255,255,255,.08) 10px 20px)" }}>
            <span style={{ position: "absolute", top: "16px", left: "18px", fontSize: "12.5px", color: "rgba(255,255,255,.6)" }}>lesson video · 12:00</span>
            <div className={"video-hit" + (v.playing ? " is-playing" : "")} onClick={v.togglePlay} role="button" aria-label={v.playing ? "Pause" : "Play"} style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><span className="play-btn" style={{ width: "68px", height: "68px", borderRadius: "50%", background: "#35593A", display: "flex", alignItems: "center", justifyContent: "center" }}>{v.paused && (<svg width="22" height="24" viewBox="0 0 10 11" fill="none"><path d="M1.5 1.2v8.6L9 5.5z" fill="#FFFFFF"></path></svg>)}{v.playing && (<svg width="20" height="22" viewBox="0 0 10 11" fill="none"><path d="M2 1.2h2v8.6H2zM6 1.2h2v8.6H6z" fill="#FFFFFF"></path></svg>)}</span></div>
            <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", padding: "16px 20px", background: "linear-gradient(transparent,rgba(20,21,15,.7))" }}>
              <div style={{ position: "relative", height: "6px", background: "rgba(255,255,255,.2)", borderRadius: "3px" }}>
                <div className="bar-fill" style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: v.watchedPct, background: "#B8CDB8", borderRadius: "3px" }}></div>
                <div style={{ position: "absolute", left: "90%", top: "-5px", width: "2px", height: "16px", background: "#FFFFFF" }}></div>
                <div className="playhead" style={{ position: "absolute", left: v.watchedPct, top: "-4px", width: "14px", height: "14px", marginLeft: "-7px", borderRadius: "50%", background: "#FFFFFF" }}></div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", fontSize: "13.5px", color: "#FFFFFF", fontVariantNumeric: "tabular-nums" }}><span>{v.timeLabel} / 12:00</span><span style={{ color: "rgba(255,255,255,.75)" }}>90% mark · 10:48</span></div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "20px" }}>
            <div><div style={{ fontSize: "13.5px", fontWeight: "500", color: "#585B52" }}>Lesson 3.2 of 14 · Video · 12 min</div><div style={{ fontSize: "21px", fontWeight: "600", letterSpacing: "-.025em" }}>Sample content — pending medical review.</div></div>
          </div>
          <div style={{ background: "#E7EFF4", borderRadius: "16px", padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#2A5570", color: "#FFFFFF", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>i</span><span style={{ fontSize: "15.5px", fontWeight: "600" }}>Watch at least 90% to complete this lesson — you've watched {v.watched}%</span></div>
            <div style={{ fontSize: "14.5px", color: "#2A5570", margin: "4px 0 0 28px" }}>Resumed at 07:26, where you stopped on 22 Sep 2026 at 18:40 IST.</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "auto" }}>
            <button className="tap h0" style={{ height: "48px", padding: "0 20px", background: "#F1EFE8", border: "none", borderRadius: "16px", color: "#1F211C", fontSize: "16px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.go.a3}>Previous lesson</button>
            <div style={{ flex: "1" }}></div>
            {v.locked && (<>
              <span style={{ fontSize: "14.5px", color: "#585B52", textAlign: "right" }}>Watch {v.watchLeft}% more — about {v.watchLeftTime} — to unlock</span>
              <div style={{ height: "48px", padding: "0 22px", background: "#F1EFE8", borderRadius: "16px", color: "#9B9E94", fontSize: "16px", fontWeight: "600", display: "flex", alignItems: "center" }}>Next lesson</div>
            </>)}
            {v.unlocked && (<>
              <span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#E9F0E9", color: "#35593A", borderRadius: "999px", padding: "5px 12px 5px 9px", fontSize: "13.5px", fontWeight: "600" }}><span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#35593A", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>Lesson complete</span>
              <button className="tap h2" style={{ height: "48px", padding: "0 24px", background: "#35593A", border: "none", borderRadius: "16px", color: "#FFFFFF", fontSize: "16px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.go.a5}>Next lesson</button>
            </>)}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}><button className="tap" style={{ height: "30px", padding: "0 12px", background: "transparent", border: "1px dashed #8B8E84", borderRadius: "999px", color: "#585B52", fontSize: "13px", fontWeight: "500", cursor: "pointer" }} type="button" onClick={v.skipWatch}>Demo control · skip to 92% watched</button></div>
        </div>
        {v.outlineOpen && (<>
        <div style={{ width: "340px", flex: "none", background: "#FFFFFF", borderLeft: "1px solid #EFEDE6", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", borderBottom: "1px solid #F2F0E9", display: "flex", alignItems: "center", justifyContent: "space-between" }}><div><div style={{ fontSize: "16.5px", fontWeight: "600" }}>Course outline</div><div style={{ fontSize: "14px", color: "#585B52" }}>8 of 14 lessons done</div></div><button className="tap h0" style={{ height: "34px", padding: "0 12px", background: "#F1EFE8", border: "none", borderRadius: "10px", color: "#1F211C", fontSize: "13.5px", fontWeight: "600", cursor: "pointer" }} type="button" onClick={v.toggleOutline}>Hide</button></div>
          <div style={{ padding: "8px 0", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 22px" }}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#35593A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path></svg><span style={{ flex: "1", fontSize: "14.5px", fontWeight: "600" }}>Module 1 · Product overview</span><span style={{ fontSize: "13.5px", color: "#585B52" }}>4/4</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 22px" }}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#35593A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path></svg><span style={{ flex: "1", fontSize: "14.5px", fontWeight: "600" }}>Module 2 · Disease context</span><span style={{ fontSize: "13.5px", color: "#585B52" }}>3/3</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 22px" }}><span style={{ width: "13px", height: "13px", borderRadius: "50%", border: "1.8px solid #2A5570", background: "conic-gradient(#2A5570 0 25%,transparent 0)", boxSizing: "border-box" }}></span><span style={{ flex: "1", fontSize: "14.5px", fontWeight: "600" }}>Module 3 · Mechanism and use</span><span style={{ fontSize: "13.5px", color: "#585B52" }}>1/4</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 22px 8px 48px" }}><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#35593A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path></svg><span style={{ flex: "1", fontSize: "14px", color: "#585B52" }}>3.1 · Video · 9 min</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 22px 8px 48px", background: "#E4EAE3", boxShadow: "inset 3px 0 0 #35593A" }}><span style={{ width: "12px", height: "12px", borderRadius: "50%", border: "1.8px solid #35593A", background: "conic-gradient(#35593A 0 62%,transparent 0)", boxSizing: "border-box" }}></span><span style={{ flex: "1", fontSize: "14px", fontWeight: "600", color: "#35593A" }}>3.2 · Video · 12 min · now</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 22px 8px 48px" }}><span style={{ width: "12px", height: "12px", borderRadius: "50%", border: "1.8px solid #585B52", boxSizing: "border-box" }}></span><span style={{ flex: "1", fontSize: "14px", color: "#585B52" }}>3.3 · PDF · 14 pages</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 22px 8px 48px" }}><span style={{ width: "12px", height: "12px", borderRadius: "50%", border: "1.8px solid #585B52", boxSizing: "border-box" }}></span><span style={{ flex: "1", fontSize: "14px", color: "#585B52" }}>3.4 · Video · 11 min</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 22px" }}><span style={{ width: "13px", height: "13px", borderRadius: "50%", border: "1.8px solid #585B52", boxSizing: "border-box" }}></span><span style={{ flex: "1", fontSize: "14.5px", fontWeight: "600" }}>Module 4 · Handling questions</span><span style={{ fontSize: "13.5px", color: "#585B52" }}>0/3</span></div>
            <div style={{ height: "1px", background: "#F2F0E9", margin: "8px 22px" }}></div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 22px" }}><span style={{ width: "13px", height: "13px", borderRadius: "50%", border: "1.8px solid #585B52", boxSizing: "border-box" }}></span><span style={{ flex: "1", fontSize: "14.5px", fontWeight: "600" }}>Final assessment</span><span style={{ fontSize: "13.5px", color: "#585B52" }}>Locked</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 22px" }}><span style={{ width: "13px", height: "13px", borderRadius: "50%", border: "1.8px solid #585B52", boxSizing: "border-box" }}></span><span style={{ flex: "1", fontSize: "14.5px", fontWeight: "600" }}>Certificate</span></div>
          </div>
        </div>
        </>)}
      </div>
    </div>
  </div>
  );
}
