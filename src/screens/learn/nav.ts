import { navTo } from '../../state';
import { BESPOKE } from '../../content';
import { getLearn } from '../../content/learnStore';
import type { Course, Lesson, Module } from '../../content/types';

/** Open a course: bespoke design screens where they exist, the course template otherwise. */
export function openCourse(id: string) {
  if (BESPOKE[id]) navTo(BESPOKE[id]); else navTo('l2', id);
}

export const flatLessons = (c: Course): { module: Module; lesson: Lesson; index: number }[] =>
  c.modules.flatMap(m => m.lessons.map(l => ({ module: m, lesson: l }))).map((x, index) => ({ ...x, index }));

/** First lesson not yet completed. */
export function nextLesson(c: Course) {
  const done = new Set(getLearn().done[c.id] || []);
  return flatLessons(c).find(x => !done.has(x.lesson.id));
}
