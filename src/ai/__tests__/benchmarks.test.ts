import { describe, expect, it } from 'vitest';
import { BENCHMARKS, runBenchmarks } from '../benchmarks';
import { redact } from '../engine';

const ALL_CRITICAL = { offlabel: true, fabricated: true, superiority: true, 'ignored-ae': true, inducement: true };

describe('AI Doctor benchmark conversations', () => {
  const results = runBenchmarks(ALL_CRITICAL);
  BENCHMARKS.forEach((b, i) => {
    it(b.label, () => {
      expect(results[i].reasons, `${b.id}: total ${results[i].total}`).toEqual([]);
    });
  });
});

describe('patient identifier redaction', () => {
  it('removes phone numbers, record numbers, names and emails', () => {
    const r = redact('My patient named Mrs Sunita Rao, phone 98765 43210, MRN: AB-12345, email s.rao@mail.com');
    expect(r.redacted).toBe(true);
    expect(r.text).not.toMatch(/Sunita|98765|AB-12345|s\.rao/);
  });
});
