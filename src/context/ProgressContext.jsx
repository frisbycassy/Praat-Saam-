import { createContext, useContext, useEffect, useState } from "react";
import { PASS_THRESHOLD } from "../utils/lessonAccess";
import { topics } from "../data/topics";
import { lessonCountForTopic } from "../data/lessons";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabaseClient";

const totalWrittenLessons = topics.reduce((sum, topic) => sum + lessonCountForTopic(topic.id), 0);

// Progress now lives in Supabase, keyed to the signed-in user, so it
// follows a learner to any device instead of staying on one browser.
const defaultProgress = {
  points: 0,
  completedLessons: [], // "topicId:lessonIndex" strings
  badges: [], // "topicId:lessonIndex" strings, one per earned badge
  lessonScores: {}, // "topicId:lessonIndex" -> best correctCount achieved
  streak: { count: 0, lastActiveDate: null },
  // Lessons a learner still owes: +1 for every day that passes, -1 for
  // every lesson finished, never below 0. Missed days stack up.
  due: { owed: 0, lastDate: null },
};

function toAppProgress(row) {
  if (!row) return defaultProgress;
  return {
    points: row.points ?? 0,
    completedLessons: row.completed_lessons ?? [],
    badges: row.badges ?? [],
    lessonScores: row.lesson_scores ?? {},
    streak: { count: row.streak_count ?? 0, lastActiveDate: row.streak_last_date ?? null },
    due: { owed: row.due_owed ?? 0, lastDate: row.due_last_date ?? null },
  };
}

function toDbProgress(userId, progress) {
  return {
    user_id: userId,
    points: progress.points,
    completed_lessons: progress.completedLessons,
    badges: progress.badges,
    lesson_scores: progress.lessonScores,
    streak_count: progress.streak.count,
    streak_last_date: progress.streak.lastActiveDate,
    due_owed: progress.due.owed,
    due_last_date: progress.due.lastDate,
  };
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

// The learner's own calendar day (not UTC), so a new day starts at their
// local midnight.
function localDateString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function isWeekday(date) {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

// Adds one owed lesson for each school day (Monday to Friday) since the
// last check. Weekends add nothing. The first time, today counts if it's
// a weekday.
function rollDueForward(due) {
  const today = localDateString();
  if (due.lastDate === today) return due;

  const todayDate = new Date(`${today}T00:00:00`);
  if (!due.lastDate) {
    return { owed: due.owed + (isWeekday(todayDate) ? 1 : 0), lastDate: today };
  }

  let added = 0;
  const day = new Date(`${due.lastDate}T00:00:00`);
  day.setDate(day.getDate() + 1);
  while (day <= todayDate) {
    if (isWeekday(day)) added++;
    day.setDate(day.getDate() + 1);
  }
  return { owed: due.owed + added, lastDate: today };
}

function daysBetween(a, b) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((new Date(b) - new Date(a)) / msPerDay);
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(defaultProgress);
  // Guards markVisitToday/completeLesson from running against the default
  // (empty) progress before the real row has been fetched from Supabase -
  // without this, an early write could overwrite a returning user's saved
  // points/badges with zeros.
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!user) {
      setProgress(defaultProgress);
      setIsReady(false);
      return;
    }

    let active = true;
    setIsReady(false);
    async function loadProgress() {
      const { data, error } = await supabase
        .from("progress")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (!active) return;
      let loaded = error ? defaultProgress : toAppProgress(data);
      if (!error && user.role === "learner") {
        const due = rollDueForward(loaded.due);
        if (due !== loaded.due) {
          loaded = { ...loaded, due };
          supabase
            .from("progress")
            .update({ due_owed: due.owed, due_last_date: due.lastDate })
            .eq("user_id", user.id)
            .then(({ error: dueError }) => {
              if (dueError) console.warn("Could not save due lessons.", dueError);
            });
        }
      }
      setProgress(loaded);
      setIsReady(true);
    }
    loadProgress();

    return () => {
      active = false;
    };
  }, [user]);

  async function persist(nextProgress) {
    if (!user) return;
    const { error } = await supabase
      .from("progress")
      .update(toDbProgress(user.id, nextProgress))
      .eq("user_id", user.id);
    if (error) console.warn("Could not save progress to Supabase.", error);
  }

  function markVisitToday() {
    if (!isReady) return;
    const today = todayString();
    const { lastActiveDate, count } = progress.streak;
    if (lastActiveDate === today) return;

    const gap = lastActiveDate ? daysBetween(lastActiveDate, today) : null;
    const nextCount = gap === 1 ? count + 1 : 1;

    const next = { ...progress, streak: { count: nextCount, lastActiveDate: today } };
    setProgress(next);
    persist(next);
  }

  // Runs once when a learner finishes a specific lesson within a topic.
  // Returns a summary (points earned, whether a new badge was unlocked)
  // so the results screen can celebrate it, while saving the update.
  function completeLesson(topicId, lessonIndex, correctCount) {
    if (!isReady) return { pointsEarned: 0, newlyUnlockedBadge: null };
    const lessonKey = `${topicId}:${lessonIndex}`;
    const isFirstTimeCompleting = !progress.completedLessons.includes(lessonKey);

    const nextCompletedLessons = isFirstTimeCompleting
      ? [...progress.completedLessons, lessonKey]
      : progress.completedLessons;

    // Points count each lesson's BEST score once, not every attempt - so
    // redoing a lesson only adds points if it actually improves on the
    // previous best (retrying with a lower score adds nothing).
    const previousBest = progress.lessonScores[lessonKey] || 0;
    const bestScore = Math.max(previousBest, correctCount);
    const pointsEarned = bestScore - previousBest;
    const lessonScores = { ...progress.lessonScores, [lessonKey]: bestScore };

    const hasPassed = correctCount >= PASS_THRESHOLD;
    const newlyUnlockedBadge = hasPassed && !progress.badges.includes(lessonKey) ? lessonKey : null;
    const badges = newlyUnlockedBadge ? [...progress.badges, newlyUnlockedBadge] : progress.badges;

    // Only a pass on a lesson not passed before pays off a due lesson. Once
    // every lesson is passed there's nothing new left, so any pass counts.
    const allLessonsPassed = badges.length >= totalWrittenLessons;
    const paysOffDue = hasPassed && (newlyUnlockedBadge !== null || allLessonsPassed);

    const next = {
      ...progress,
      points: progress.points + pointsEarned,
      completedLessons: nextCompletedLessons,
      badges,
      lessonScores,
      due: paysOffDue
        ? { ...progress.due, owed: Math.max(0, progress.due.owed - 1) }
        : progress.due,
    };
    setProgress(next);
    persist(next);

    return { pointsEarned, newlyUnlockedBadge };
  }

  return (
    <ProgressContext.Provider value={{ progress, isReady, markVisitToday, completeLesson }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider");
  return context;
}
