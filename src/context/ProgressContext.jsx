import { createContext, useContext, useEffect, useState } from "react";
import { PASS_THRESHOLD } from "../utils/lessonAccess";

// TEMPORARY: progress is saved to local storage on this one device/browser
// for now, the same way AuthContext works. Once Supabase is connected,
// these functions will read/write to the database instead, so every page
// using useProgress() can stay the same.
const STORAGE_KEY = "praatsaam-progress";

const defaultProgress = {
  points: 0, // overall total, drives the general Vlak/Level system
  completedLessons: [], // "topicId:lessonIndex" strings
  badges: [], // "topicId:lessonIndex" strings, one per earned badge
  lessonScores: {}, // "topicId:lessonIndex" -> best correctCount achieved
  streak: { count: 0, lastActiveDate: null },
};

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((new Date(b) - new Date(a)) / msPerDay);
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultProgress, ...JSON.parse(stored) } : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  function markVisitToday() {
    setProgress((current) => {
      const today = todayString();
      const { lastActiveDate, count } = current.streak;
      if (lastActiveDate === today) return current;

      const gap = lastActiveDate ? daysBetween(lastActiveDate, today) : null;
      const nextCount = gap === 1 ? count + 1 : 1;

      return { ...current, streak: { count: nextCount, lastActiveDate: today } };
    });
  }

  // Runs once when a learner finishes a specific lesson within a topic.
  // Returns a summary (points earned, whether a new badge was unlocked)
  // so the results screen can celebrate it, while saving the update.
  function completeLesson(topicId, lessonIndex, correctCount) {
    const lessonKey = `${topicId}:${lessonIndex}`;
    const isFirstTimeCompleting = !progress.completedLessons.includes(lessonKey);
    const pointsEarned = correctCount; // 1 point per correct question

    const nextCompletedLessons = isFirstTimeCompleting
      ? [...progress.completedLessons, lessonKey]
      : progress.completedLessons;

    const bestScore = Math.max(progress.lessonScores[lessonKey] || 0, correctCount);
    const lessonScores = { ...progress.lessonScores, [lessonKey]: bestScore };

    const hasPassed = correctCount >= PASS_THRESHOLD;
    const newlyUnlockedBadge = hasPassed && !progress.badges.includes(lessonKey) ? lessonKey : null;
    const badges = newlyUnlockedBadge ? [...progress.badges, newlyUnlockedBadge] : progress.badges;

    setProgress({
      ...progress,
      points: progress.points + pointsEarned,
      completedLessons: nextCompletedLessons,
      badges,
      lessonScores,
    });

    return { pointsEarned, newlyUnlockedBadge };
  }

  return (
    <ProgressContext.Provider value={{ progress, markVisitToday, completeLesson }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider");
  return context;
}
