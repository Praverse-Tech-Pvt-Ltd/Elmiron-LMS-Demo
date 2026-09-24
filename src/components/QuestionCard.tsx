import { AnimatePresence, motion } from 'framer-motion';
import type { Question } from '../content/types';
import { answer, resetAnswer, useLearn } from '../content/learnStore';

const Q: Record<string, { label: string; cls: string }> = {
  best: { label: 'Best response', cls: 'q-best' },
  ok: { label: 'Acceptable', cls: 'q-ok' },
  weak: { label: 'Weak', cls: 'q-weak' },
  noncompliant: { label: 'Not compliant', cls: 'q-bad' },
};

/** A scenario/case/knowledge-check question: choose, then see why each option is strong or weak. */
export default function QuestionCard({ q, qkey, number }: { q: Question; qkey: string; number?: number }) {
  const { answers } = useLearn();
  const chosen = answers[qkey];
  const done = chosen !== undefined;
  const best = q.choices.findIndex(c => c.quality === 'best');

  return (
    <div className="question">
      <div className="q-prompt">{number !== undefined && <span className="q-num">{number}</span>}{q.prompt}</div>
      <div className="q-choices">
        {q.choices.map((c, i) => {
          const isChosen = chosen === i;
          const show = done && (isChosen || i === best);
          return (
            <motion.button key={i} type="button" layout className={'q-choice' + (show ? ' ' + Q[c.quality].cls : '') + (isChosen ? ' is-chosen' : '') + (done ? ' is-done' : '')}
              onClick={() => !done && answer(qkey, i)} disabled={done && !isChosen && i !== best} whileTap={done ? undefined : { scale: 0.99 }}>
              <span className="q-letter">{'ABCDE'[i]}</span>
              <span style={{ flex: 1 }}>
                {c.text}
                <AnimatePresence>
                  {show && (
                    <motion.span className="q-feedback" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                      <strong>{Q[c.quality].label}{isChosen ? ' · your answer' : ''}.</strong> {c.feedback}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {done && (
          <motion.div className="q-footer" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {q.principle && <div className="q-principle"><strong>Principle:</strong> {q.principle}</div>}
            <button type="button" className="link" onClick={() => resetAnswer(qkey)}>Try again</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
