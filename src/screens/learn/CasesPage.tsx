import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navTo } from '../../state';
import { CASES, courseById } from '../../content';
import { useLearn } from '../../content/learnStore';
import { SKILLS } from '../../content/types';
import { Button, C, Card, Crumb, Shell, Tag } from '../../components/ui';
import QuestionCard from '../../components/QuestionCard';
import { openCourse } from './nav';

const KINDS = { All: null, 'Role-play': 'roleplay', 'Case': 'case', 'Market entry': 'market-entry' } as const;
type KindKey = keyof typeof KINDS;

export default function CasesPage() {
  const { answers } = useLearn();
  const [kind, setKind] = useState<KindKey>('All');
  const [skill, setSkill] = useState<string>('all');
  const [openId, setOpenId] = useState<string>(CASES[0]?.id ?? '');
  const list = CASES.filter(c => (!KINDS[kind] || c.kind === KINDS[kind]) && (skill === 'all' || c.skill === skill));
  const doneCount = CASES.filter(c => answers[`case:${c.id}`] !== undefined).length;
  const current = list.find(c => c.id === openId) ?? list[0];

  return (
    <Shell role="mr" active="l5" crumbs={<><Crumb to={() => navTo('l1')}>Learn</Crumb> / Role-play &amp; cases</>}
      actions={<Button small kind="primary" onClick={() => navTo('p1')}>Practise live with AI Doctor</Button>}>
      <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="page-title">Role-play &amp; cases</h1>
          <div className="page-sub">Pick a response, then see what's strong, what's weak and what a better answer does. {doneCount} of {CASES.length} tried.</div>
        </div>
      </div>
      <div className="row" style={{ margin: '16px 0 14px', gap: 12, flexWrap: 'wrap' }}>
        <div className="chips">{(Object.keys(KINDS) as KindKey[]).map(k => <button key={k} type="button" className={'chip' + (k === kind ? ' is-on' : '')} onClick={() => setKind(k)}>{k}</button>)}</div>
        <select className="select" style={{ width: 220, height: 36 }} value={skill} onChange={e => setSkill(e.target.value)} aria-label="Filter by skill">
          <option value="all">All skills</option>
          {SKILLS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      <div className="split-wide">
        <div className="stack" style={{ gap: 6 }}>
          <AnimatePresence initial={false}>
            {list.map(c => (
              <motion.div key={c.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <button type="button" className={'case-item' + (current?.id === c.id ? ' is-on' : '')} onClick={() => setOpenId(c.id)}>
                  <span className={'lesson-state sm' + (answers[`case:${c.id}`] !== undefined ? ' ok' : '')}>{answers[`case:${c.id}`] !== undefined ? '✓' : ''}</span>
                  <span style={{ flex: 1, textAlign: 'left' }}>{c.title}</span>
                  <Tag tone={c.kind === 'market-entry' ? 'blue' : c.kind === 'roleplay' ? 'green' : 'wash'}>{c.kind === 'market-entry' ? 'Market' : c.kind === 'roleplay' ? 'Role-play' : 'Case'}</Tag>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          {current && (
            <motion.div key={current.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
              <Card style={{ padding: '20px 22px' }}>
                <div className="row" style={{ gap: 8, marginBottom: 10 }}>
                  <Tag tone="ink">{current.kind === 'market-entry' ? 'Market entry case' : current.kind === 'roleplay' ? 'Role-play' : 'Case study'}</Tag>
                  <Tag>{SKILLS.find(s => s.id === current.skill)?.name}</Tag>
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-.013em', margin: '0 0 8px' }}>{current.title}</h2>
                <div className="situation">{current.situation}</div>
                <QuestionCard q={current.question} qkey={`case:${current.id}`} />
                {current.courseId && courseById(current.courseId) && (
                  <div style={{ marginTop: 14, fontSize: 14, color: C.ink2 }}>Go deeper: <button type="button" className="link" onClick={() => openCourse(current.courseId!)}>{courseById(current.courseId)!.title}</button></div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Shell>
  );
}
