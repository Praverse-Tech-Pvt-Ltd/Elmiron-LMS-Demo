import { createElement, type ComponentType } from 'react';
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
import LearnHub from './learn/LearnHub';
import CoursePage from './learn/CoursePage';
import LessonPlayer from './learn/LessonPlayer';
import PathsPage from './learn/PathsPage';
import CasesPage from './learn/CasesPage';
import PracticeHub from './practice/PracticeHub';
import SessionSetup from './practice/SessionSetup';
import LiveSession from './practice/LiveSession';
import SessionFeedback from './practice/SessionFeedback';
import MyProgress from './practice/MyProgress';
import TeamPractice from './manager/TeamPractice';
import CurriculumAdmin from './admin/CurriculumAdmin';
import AiDoctorAdmin from './admin/AiDoctorAdmin';

type ScreenProps = { v: DemoValues; params: string[] };

export const SCREENS: Record<ScreenId, ComponentType<ScreenProps>> = {
  a1: ScreenA1, a2: ScreenA2, a3: ScreenA3, a4: ScreenA4, a5: ScreenA5, a6: ScreenA6, a6b: ScreenA6b, a6c: ScreenA6c,
  a7: ScreenA7, a7b: ScreenA7b, a8: ScreenA8, a9: ScreenA9, b1: ScreenB1, b2: ScreenB2,
  c1: ScreenC1, c2: ScreenC2, c3: ScreenC3, c4: ScreenC4, c5: ScreenC5,
  l1: LearnHub,
  l2: ({ params }) => createElement(CoursePage, { id: params[0] }),
  l3: ({ params }) => createElement(LessonPlayer, { courseId: params[0], lessonId: params[1] }),
  l4: PathsPage, l5: CasesPage,
  p1: PracticeHub, p2: SessionSetup, p3: LiveSession,
  p4: ({ params }) => createElement(SessionFeedback, { id: params[0] }),
  p5: MyProgress,
  b3: TeamPractice, c6: CurriculumAdmin, c7: AiDoctorAdmin,
};

/** New screens manage their own layout height; design screens use the design frame height. */
export const FLUID = new Set<ScreenId>(['l1', 'l2', 'l3', 'l4', 'l5', 'p1', 'p2', 'p3', 'p4', 'p5', 'b3', 'c6', 'c7']);

/** Design frame height per flow; the screens stretch to the viewport but never shrink below it. */
export const MIN_HEIGHT: Record<'a' | 'b' | 'c', number> = { a: 900, b: 840, c: 840 };
