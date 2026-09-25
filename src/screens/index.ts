import { createElement, lazy, type ComponentType } from 'react';
import type { DemoValues, ScreenId } from '../state';

type ScreenProps = { v: DemoValues; params: string[] };

/* Every screen loads on demand. While a screen's code is on its way, App shows a
   skeleton of that role's layout (see ScreenSkeleton), so navigation never shows a blank page. */
// Development aid: add ?slowload to the URL to see the loading skeleton on a fast local server.
const slow = import.meta.env.DEV && typeof location !== 'undefined' && new URLSearchParams(location.search).has('slowload');
const delayed = <T,>(load: () => Promise<T>) => (slow ? () => new Promise<T>(r => setTimeout(() => r(load()), 1200)) : load);
const L = (load: () => Promise<{ default: ComponentType<ScreenProps> }>) => lazy(delayed(load));

const CoursePage = lazy(delayed(() => import('./learn/CoursePage')));
const LessonPlayer = lazy(delayed(() => import('./learn/LessonPlayer')));
const SessionFeedback = lazy(delayed(() => import('./practice/SessionFeedback')));

export const SCREENS: Record<ScreenId, ComponentType<ScreenProps>> = {
  a1: L(() => import('./generated/ScreenA1')), a2: L(() => import('./generated/ScreenA2')), a3: L(() => import('./generated/ScreenA3')),
  a4: L(() => import('./generated/ScreenA4')), a5: L(() => import('./generated/ScreenA5')), a6: L(() => import('./generated/ScreenA6')),
  a6b: L(() => import('./generated/ScreenA6b')), a6c: L(() => import('./generated/ScreenA6c')), a7: L(() => import('./generated/ScreenA7')),
  a7b: L(() => import('./generated/ScreenA7b')), a8: L(() => import('./generated/ScreenA8')), a9: L(() => import('./generated/ScreenA9')),
  b1: L(() => import('./generated/ScreenB1')), b2: L(() => import('./generated/ScreenB2')),
  c1: L(() => import('./generated/ScreenC1')), c2: L(() => import('./generated/ScreenC2')), c3: L(() => import('./generated/ScreenC3')),
  c4: L(() => import('./generated/ScreenC4')), c5: L(() => import('./generated/ScreenC5')),
  l1: L(() => import('./learn/LearnHub')),
  l2: ({ params }) => createElement(CoursePage, { id: params[0] }),
  l3: ({ params }) => createElement(LessonPlayer, { courseId: params[0], lessonId: params[1] }),
  l4: L(() => import('./learn/PathsPage')), l5: L(() => import('./learn/CasesPage')),
  p1: L(() => import('./practice/PracticeHub')), p2: L(() => import('./practice/SessionSetup')), p3: L(() => import('./practice/LiveSession')),
  p4: ({ params }) => createElement(SessionFeedback, { id: params[0] }),
  p5: L(() => import('./practice/MyProgress')),
  b3: L(() => import('./manager/TeamPractice')), c6: L(() => import('./admin/CurriculumAdmin')), c7: L(() => import('./admin/AiDoctorAdmin')),
};

/** Which role's shell a screen belongs to (for the loading skeleton). */
export const roleOf = (s: ScreenId): 'mr' | 'manager' | 'admin' => (s[0] === 'b' ? 'manager' : s[0] === 'c' ? 'admin' : 'mr');

/** Design frame height per flow; the screens stretch to the viewport but never shrink below it. */
export const MIN_HEIGHT: Record<'a' | 'b' | 'c', number> = { a: 900, b: 840, c: 840 };
