import { findLesson } from "../data/lessons";

// A learner must score at least this many of a lesson's 10 questions
// correct before the next lesson in that topic unlocks.
export const PASS_THRESHOLD = 8;

export function isLessonPassed(progress, topicId, lessonIndex) {
  const key = `${topicId}:${lessonIndex}`;
  return (progress.lessonScores[key] || 0) >= PASS_THRESHOLD;
}

// Teachers can preview any lesson slot regardless of content or prior
// scores. Learners need the lesson to be written, and - other than
// lesson 1 - need to have passed the lesson before it.
export function canAccessLesson(progress, topicId, lessonIndex, isTeacher) {
  if (isTeacher) return true;
  if (!findLesson(topicId, lessonIndex)) return false;
  if (lessonIndex === 0) return true;
  return isLessonPassed(progress, topicId, lessonIndex - 1);
}
