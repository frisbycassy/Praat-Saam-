import { findLesson } from "../data/lessons";
import { localDateString } from "./schoolDay";

// A learner must score at least this many of a lesson's 10 questions
// correct before the next lesson in that topic unlocks.
export const PASS_THRESHOLD = 8;

// Learners may pass at most this many NEW lessons a day (the database
// enforces it too). Retrying a lesson not yet passed doesn't use it up, and
// practising lessons already passed is always allowed.
export const DAILY_NEW_LESSON_LIMIT = 3;

export function newLessonsPassedToday(progress) {
  return progress.dailyNew.date === localDateString() ? progress.dailyNew.count : 0;
}

export function reachedDailyLimit(progress) {
  return newLessonsPassedToday(progress) >= DAILY_NEW_LESSON_LIMIT;
}

export function isLessonPassed(progress, topicId, lessonIndex) {
  const key = `${topicId}:${lessonIndex}`;
  return (progress.lessonScores[key] || 0) >= PASS_THRESHOLD;
}

// Whether a learner has unlocked a lesson in the topic's order: it must be
// written and - other than lesson 1 - the lesson before it passed.
function isUnlockedInOrder(progress, topicId, lessonIndex) {
  if (!findLesson(topicId, lessonIndex)) return false;
  if (lessonIndex === 0) return true;
  return isLessonPassed(progress, topicId, lessonIndex - 1);
}

// A lesson the learner has unlocked but can't start until tomorrow because
// they've already passed today's limit of new lessons.
export function isWaitingForTomorrow(progress, topicId, lessonIndex, isTeacher) {
  if (isTeacher) return false;
  return (
    isUnlockedInOrder(progress, topicId, lessonIndex) &&
    !isLessonPassed(progress, topicId, lessonIndex) &&
    reachedDailyLimit(progress)
  );
}

// Teachers can view any lesson slot regardless of content or prior scores.
// Learners need the lesson unlocked in order and, if it's new to them, to be
// under today's limit of new lessons.
export function canAccessLesson(progress, topicId, lessonIndex, isTeacher) {
  if (isTeacher) return true;
  if (!isUnlockedInOrder(progress, topicId, lessonIndex)) return false;
  return !isWaitingForTomorrow(progress, topicId, lessonIndex, isTeacher);
}
