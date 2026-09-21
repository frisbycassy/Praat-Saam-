import { createContext, useContext, useEffect, useState } from "react";
import { PASS_THRESHOLD } from "../utils/lessonAccess";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabaseClient";

// Progress now lives in Supabase, keyed to the signed-in user, so it
// follows a learner to any device instead of staying on one browser.
const defaultProgress = {
  points: 0,
  completedLessons: [], // "topicId:lessonIndex" strings
  badges: [], // "topicId:lessonIndex" strings, one per earned badge
  lessonScores: {}, // "topicId:lessonIndex" -> best correctCount achieved
  streak: { count: 0, lastActiveDate: null },
};

function toAppProgress(row) {
  if (!row) return defaultProgress;
  return {
    points: row.points ?? 0,
    completedLessons: row.completed_lessons ?? [],
    badges: row.badges ?? [],
    lessonScores: row.lesson_scores ?? {},
    streak: { count: row.streak_count ?? 0, lastActiveDate: row.streak_last_date ?? null },
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
  };
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
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
      setProgress(error ? defaultProgress : toAppProgress(data));
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

    const next = {
      ...progress,
      points: progress.points + pointsEarned,
      completedLessons: nextCompletedLessons,
      badges,
      lessonScores,
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
