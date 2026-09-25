import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navTo } from '../../state';
import { hintFor, mrTurn, redact, scoreSession, startSession, type EngineState } from '../../ai/engine';
import { getPendingConfig, fmtTime, attemptsFor } from '../../ai/session';
import { getAiStore, saveSession } from '../../ai/store';
import { liveAvailable, liveCoach, liveDoctor } from '../../ai/live';
import { RUBRIC, type Feedback, type SessionRecord, type Tone, type Turn } from '../../ai/types';
import { Button, C, Tag } from '../../components/ui';

const TONE_COLOR: Record<Tone, string> = { Interested: '#35593A', Neutral: '#8B8E84', Skeptical: '#7A5510', Impatient: '#9C3B26', Concerned: '#2A5570', Curious: '#2A5570' };

type SR = { start: () => void; stop: () => void; abort: () => void; onresult: ((e: { resultIndex: number; results: { isFinal: boolean; 0: { transcript: string } }[] & { length: number } }) => void) | null; onend: (() => void) | null; onerror: (() => void) | null; interimResults: boolean; continuous: boolean; lang: string };

export default function LiveSession() {
  const [cfg] = useState(getPendingConfig);
  const engine = useRef<EngineState | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [tone, setTone] = useState<Tone>('Neutral');
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [left, setLeft] = useState(cfg.seconds);
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [chips, setChips] = useState<string[]>([]);
  const [hint, setHint] = useState<string | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [live, setLive] = useState(false);
  const [listening, setListening] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const started = useRef(Date.now());
  const usage = useRef({ inputTokens: 0, outputTokens: 0, calls: 0 });
  const scroller = useRef<HTMLDivElement>(null);
  const rec = useRef<SR | null>(null);
  const busy = useRef(false);
  const turnsRef = useRef<Turn[]>([]);
  const finishing = useRef(false);
  turnsRef.current = turns;
  const practice = cfg.mode === 'practice';
  const hintsAllowed = practice && (cfg.difficulty === 'Beginner' || cfg.difficulty === 'Intermediate');
  const speak = cfg.channel !== 'text';
  const elapsed = () => Math.round((Date.now() - started.current) / 1000);

  const say = useCallback((text: string) => {
    if (!speak || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = window.speechSynthesis.getVoices().find(x => /en[-_]IN/i.test(x.lang)) || window.speechSynthesis.getVoices().find(x => /^en/i.test(x.lang));
      if (v) u.voice = v;
      u.rate = 1.02;
      window.speechSynthesis.speak(u);
    } catch { /* speech is optional */ }
  }, [speak]);

  // Start: doctor opens the call
  useEffect(() => {
    const { state, opening } = startSession(cfg, getAiStore().config.prohibitedExtra);
    engine.current = state;
    setTone(opening.tone);
    setTyping(true);
    const t = setTimeout(() => { setTyping(false); setTurns([{ who: 'doctor', text: opening.text, at: 0, tone: opening.tone }]); say(opening.text); }, 900);
    liveAvailable().then(setLive);
    return () => { clearTimeout(t); try { window.speechSynthesis?.cancel(); rec.current?.abort(); } catch { /* ignore */ } };
  }, [cfg, say]);

  // Countdown (pausable only in practice)
  useEffect(() => {
    if (ended || paused || scoring) return;
    const id = setInterval(() => setLeft(l => l - 1), 1000);
    return () => clearInterval(id);
  }, [ended, paused, scoring]);

  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' }); }, [turns, typing]);

  const finish = useCallback(async (finalTurns: Turn[]) => {
    const st = engine.current;
    if (!st || finishing.current) return;
    finishing.current = true;
    setScoring(true); setEnded(true);
    const { config } = getAiStore();
    let fb: Feedback = scoreSession(st, config.criticalEnabled);
    if (live) {
      // AI Coach review, blended with the rules. Compliance and critical errors always come from the rules.
      const j = await liveCoach(cfg, finalTurns);
      usage.current.calls++;
      if (j) {
        const dims = fb.dimensions.map(d => {
          const ai = j.dimensions[d.id];
          if (typeof ai !== 'number' || d.id === 'compliance') return d;
          const blended = Math.round((d.score + Math.max(0, Math.min(d.max, ai))) / 2);
          return { ...d, score: blended };
        });
        const total = dims.reduce((a, d) => a + d.score, 0);
        fb = {
          ...fb, dimensions: dims, total,
          result: fb.critical.length ? 'Requires retraining' : total >= 75 ? 'Good performance' : 'Needs improvement',
          strengths: j.strengths?.length ? j.strengths.slice(0, 5) : fb.strengths,
          improvements: fb.critical.length ? fb.improvements : (j.improvements?.length ? j.improvements.slice(0, 5) : fb.improvements),
          coach: j.coach?.length ? j.coach : fb.coach,
        };
      }
    }
    const record: SessionRecord = {
      id: 's-' + Date.now().toString(36), user: 'Pratham Shrivastav', config: cfg, startedAt: new Date(started.current).toISOString(),
      durationSec: elapsed(), attempt: attemptsFor(cfg.scenarioId, cfg.mode) + 1, turns: finalTurns, feedback: fb,
      engine: live ? 'claude' : 'built-in', usage: live ? usage.current : undefined,
    };
    saveSession(record);
    setTimeout(() => navTo('p4', record.id), 1500);
  }, [cfg, live]);

  // Time up
  useEffect(() => {
    if (left > 0 || ended) return;
    const line = 'I am sorry, I have to see my next patient now.';
    if (engine.current) engine.current.endReason = 'Time ran out.';
    const next = [...turnsRef.current, { who: 'doctor' as const, text: line, at: elapsed(), tone: 'Impatient' as Tone }];
    setTurns(next);
    finish(next);
  }, [left, ended, finish]);

  const send = async (raw: string) => {
    const st = engine.current;
    if (!st || busy.current || ended || typing) return;
    const { text, redacted } = redact(raw.trim());
    if (!text && !raw) return;
    busy.current = true;
    setInput(''); setHint(null);
    const at = elapsed();
    const move = mrTurn(st, text);
    const mrTurnRec: Turn = { who: 'mr', text, at, tags: [...move.mrTags, ...(redacted ? ['redacted' as const] : [])], note: move.mrNote };
    let next: Turn[] = [...turnsRef.current, mrTurnRec];
    if (redacted) {
      next.push({ who: 'system', text: 'Patient identifiers were removed from your message. Never share identifiable patient information.', at });
      setNotice('Identifiers removed from your message.');
      setTimeout(() => setNotice(null), 4000);
    }
    setTurns(next);
    if (practice) setChips(move.chips);
    setTyping(true);

    let reply = move.text;
    if (live) {
      const note = move.end ? `End the call politely now; your closing is roughly: "${move.text}"` : `Your reaction should convey roughly: "${move.text}"`;
      const t0 = performance.now();
      const ai = await liveDoctor(cfg, next, note);
      usage.current.calls++;
      if (ai) reply = ai; else setNotice('Live AI unavailable, so the built-in doctor is continuing the call.');
      await new Promise(r => setTimeout(r, Math.max(0, 500 - (performance.now() - t0))));
    } else {
      await new Promise(r => setTimeout(r, 650 + Math.min(1400, reply.length * 14)));
    }
    setTyping(false);
    setTone(move.tone);
    next = [...next, { who: 'doctor', text: reply, at: elapsed(), tone: move.tone }];
    setTurns(next);
    say(reply);
    busy.current = false;
    if (move.end) finish(next);
  };

  const toggleMic = () => {
    const Ctor = (window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR }).SpeechRecognition
      || (window as unknown as { webkitSpeechRecognition?: new () => SR }).webkitSpeechRecognition;
    if (!Ctor) { setNotice('Voice input is not supported in this browser. Type your answer instead.'); return; }
    if (listening) { rec.current?.stop(); return; }
    const r = new Ctor();
    r.lang = 'en-IN'; r.interimResults = true; r.continuous = false;
    let finalText = '';
    r.onresult = e => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript; else interim += e.results[i][0].transcript;
      }
      setInput((finalText + ' ' + interim).trim());
    };
    r.onend = () => { setListening(false); if (cfg.channel === 'voice' && finalText.trim()) send(finalText); };
    r.onerror = () => { setListening(false); setNotice('Could not hear that clearly. Try again or type your answer.'); };
    rec.current = r; setListening(true); r.start();
  };

  const st = engine.current;
  const pct = Math.max(0, left / cfg.seconds);
  const lowTime = left <= Math.min(20, cfg.seconds * 0.2);

  return (
    <div className="session">
      <div className="session-top">
        <div className="row" style={{ gap: 14, minWidth: 0 }}>
          <motion.div className="doctor-avatar" animate={{ boxShadow: `0 0 0 4px ${TONE_COLOR[tone]}33, 0 0 0 1px ${TONE_COLOR[tone]}` }} transition={{ duration: 0.5 }}>
            <span>Dr</span>
            {typing && <motion.i className="speaking-dot" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1 }} />}
          </motion.div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 16.5, fontWeight: 600 }}>{st?.persona.name ?? 'Doctor'} · {st?.specialty.name}</div>
            <div className="row" style={{ gap: 8, marginTop: 2, flexWrap: 'wrap' }}>
              <AnimatePresence mode="wait">
                <motion.span key={tone} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="tone-chip" style={{ color: TONE_COLOR[tone], borderColor: TONE_COLOR[tone] + '55' }}>{tone}</motion.span>
              </AnimatePresence>
              <span className="muted" style={{ fontSize: 13.5 }}>{st?.scenario.title} · {cfg.difficulty}</span>
              <Tag tone={practice ? 'wash' : 'ink'}>{practice ? 'Practice' : 'Assessment'}</Tag>
              <Tag tone={live ? 'green' : 'white'}>{live ? 'Live AI' : 'Built-in doctor'}</Tag>
            </div>
          </div>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <div className={'timer' + (lowTime ? ' is-low' : '')} aria-label="Time left">
            <svg width="38" height="38" viewBox="0 0 38 38"><circle cx="19" cy="19" r="16" stroke="#E5E2D9" strokeWidth="3" fill="none" /><circle cx="19" cy="19" r="16" stroke={lowTime ? C.red : C.green} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray={100.5} strokeDashoffset={100.5 * (1 - pct)} style={{ transition: 'stroke-dashoffset 1s linear, stroke .3s' }} transform="rotate(-90 19 19)" /></svg>
            <span>{fmtTime(left)}</span>
          </div>
          {practice && !ended && <Button small onClick={() => setPaused(p => !p)}>{paused ? 'Resume' : 'Pause'}</Button>}
          <Button small kind="danger" onClick={() => finish(turns)} disabled={ended || turns.length < 2}>End session</Button>
        </div>
      </div>

      <div className="session-body">
        <div className="chat" ref={scroller}>
          <div className="privacy-inline">Training simulation with a fictional doctor. Do not enter patient names, phone numbers or record numbers.</div>
          <AnimatePresence initial={false}>
            {turns.map((t, i) => (
              <motion.div key={i} className={'bubble-row ' + t.who} initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}>
                {t.who === 'system' ? <div className="bubble system">{t.text}</div> : (
                  <div className={'bubble ' + t.who}>
                    <div className="bubble-who">{t.who === 'doctor' ? 'Doctor' : 'You'}</div>
                    {t.text || <em className="muted">(no answer)</em>}
                  </div>
                )}
              </motion.div>
            ))}
            {typing && (
              <motion.div key="typing" className="bubble-row doctor" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="bubble doctor typing"><span /><span /><span /></div>
              </motion.div>
            )}
          </AnimatePresence>
          {scoring && (
            <motion.div className="coach-handover" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} role="status" aria-live="polite">
              <div className="row" style={{ gap: 12 }}>
                <div className="coach-avatar">AI<br />Coach</div>
                <div><strong>Session complete.</strong> The doctor has left the room. Your AI Coach is scoring the conversation.</div>
              </div>
              <ol className="scoring-list">
                {RUBRIC.map((r, i) => (
                  <motion.li key={r.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.13, duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
                    <motion.span className="scoring-check" initial={{ backgroundColor: 'rgba(255,255,255,0.12)' }} animate={{ backgroundColor: '#B8CDB8' }} transition={{ delay: 0.3 + i * 0.13, duration: 0.2 }}>
                      <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M3 8.4L6.2 11.6L13 4.8" stroke="#1F211C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </motion.span>
                    {r.name}
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          )}
        </div>

        <aside className="session-side">
          <div className="side-block">
            <div className="field-label">Your goal</div>
            <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>{st?.scenario.goal}</div>
          </div>
          {practice ? (
            <div className="side-block">
              <div className="field-label">Live coaching</div>
              <div className="coach-chips">
                <AnimatePresence>
                  {chips.length ? chips.map(c => (
                    <motion.span key={c} className="coach-chip" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>{c}</motion.span>
                  )) : <span className="muted" style={{ fontSize: 13.5 }}>Nudges appear here after each answer.</span>}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="side-block"><div className="field-label">Assessment</div><div className="muted" style={{ fontSize: 14 }}>No hints or coaching. Your transcript and result will be stored.</div></div>
          )}
          {hintsAllowed && (
            <div className="side-block">
              <Button small onClick={() => { if (st) { setHint(hintFor(st, hintsUsed)); setHintsUsed(h => h + 1); } }} disabled={ended}>Need a hint?</Button>
              <AnimatePresence>
                {hint && <motion.div className="hint" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{hint}</motion.div>}
              </AnimatePresence>
            </div>
          )}
          <div className="side-block">
            <div className="field-label">Rubric</div>
            {RUBRIC.map(r => <div key={r.id} className="row" style={{ justifyContent: 'space-between', fontSize: 13.5, padding: '2px 0' }}><span>{r.name}</span><span className="muted">{r.weight}</span></div>)}
          </div>
        </aside>
      </div>

      <form className="composer" onSubmit={e => { e.preventDefault(); send(input); }}>
        <AnimatePresence>{notice && <motion.div className="composer-notice" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{notice}</motion.div>}</AnimatePresence>
        {cfg.channel !== 'text' && (
          <button type="button" className={'mic' + (listening ? ' is-on' : '')} onClick={toggleMic} disabled={ended || paused} aria-label={listening ? 'Stop listening' : 'Speak'}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><rect x="5.5" y="1.5" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.6" /><path d="M3 7.5a5 5 0 0010 0M8 12.5V15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            {listening && <motion.i className="mic-pulse" animate={{ scale: [1, 1.8], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 1.1 }} />}
          </button>
        )}
        <input className="input composer-input" value={input} onChange={e => setInput(e.target.value)} disabled={ended || paused}
          placeholder={paused ? 'Paused' : listening ? 'Listening…' : cfg.channel === 'voice' ? 'Tap the microphone and speak' : 'Type what you would say to the doctor'} maxLength={1200} aria-label="Your reply" />
        <Button kind="primary" type="submit" disabled={ended || paused || typing || !input.trim()}>Send</Button>
      </form>
    </div>
  );
}
