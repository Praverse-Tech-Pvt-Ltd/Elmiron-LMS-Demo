import type { ComponentType } from 'react';
import type { DemoValues, ScreenId } from '../state';
import ScreenA1 from './generated/ScreenA1';
import ScreenA2 from './generated/ScreenA2';
import ScreenA3 from './generated/ScreenA3';
import ScreenA4 from './generated/ScreenA4';
import ScreenA5 from './generated/ScreenA5';
import ScreenA6 from './generated/ScreenA6';
import ScreenA6b from './generated/ScreenA6b';
import ScreenA6c from './generated/ScreenA6c';
import ScreenA7 from './generated/ScreenA7';
import ScreenA7b from './generated/ScreenA7b';
import ScreenA8 from './generated/ScreenA8';
import ScreenA9 from './generated/ScreenA9';
import ScreenB1 from './generated/ScreenB1';
import ScreenB2 from './generated/ScreenB2';
import ScreenC1 from './generated/ScreenC1';
import ScreenC2 from './generated/ScreenC2';
import ScreenC3 from './generated/ScreenC3';
import ScreenC4 from './generated/ScreenC4';
import ScreenC5 from './generated/ScreenC5';

export const SCREENS: Record<ScreenId, ComponentType<{ v: DemoValues }>> = {
  a1: ScreenA1, a2: ScreenA2, a3: ScreenA3, a4: ScreenA4, a5: ScreenA5, a6: ScreenA6, a6b: ScreenA6b, a6c: ScreenA6c,
  a7: ScreenA7, a7b: ScreenA7b, a8: ScreenA8, a9: ScreenA9, b1: ScreenB1, b2: ScreenB2,
  c1: ScreenC1, c2: ScreenC2, c3: ScreenC3, c4: ScreenC4, c5: ScreenC5,
};

/** Design frame height per flow; the screens stretch to the viewport but never shrink below it. */
export const MIN_HEIGHT: Record<'a' | 'b' | 'c', number> = { a: 900, b: 840, c: 840 };
