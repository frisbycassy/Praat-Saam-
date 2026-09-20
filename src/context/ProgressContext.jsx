import { createContext, useContext, useEffect, useState } from "react";
import { getNewlyUnlockedStickerIds } from "../data/stickers";

// TEMPORARY: progress is saved to local storage on this one device/browser
// for now, the same way AuthContext works. Once Supabase is connected,
// these functions will read/write to the database instead, so every page
// using useProgress() can stay the same.
const STORAGE_KEY = "praatsaam-progress";

const defaultProgress = {
  points: 0, // overall total, drives the general Vlak/Level system
  completedLessons: [], // topic ids finished at least once
  topicPoints: {}, // per-topic point buckets, drives that topic's sticker level
  stickers: [],
  lessonBadges: [],
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

  // Runs once when a learner finishes a topic's quiz. Returns a summary
  // (points earned, any newly unlocked stickers/badge) so the results
  // screen can celebrate them, while also saving the update to progress.
  function completeLesson(topicId, correctCount) {
    const isFirstTimeCompleting = !progress.completedLessons.includes(topicId);
    const completionBonus = 20;
    const pointsEarned = correctCount * 10 + (isFirstTimeCompleting ? completionBonus : 0);

    const nextPoints = progress.points + pointsEarned;
    const nextCompletedLessons = isFirstTimeCompleting
      ? [...progress.completedLessons, topicId]
      : progress.completedLessons;
    const nextTopicPoints = {
      ...progress.topicPoints,
      [topicId]: (progress.topicPoints[topicId] || 0) + pointsEarned,
    };

    const newlyUnlockedStickers = getNewlyUnlockedStickerIds(progress.stickers, nextTopicPoints);
    const stickers = [...progress.stickers, ...newlyUnlockedStickers];

    const newlyUnlockedLessonBadge = isFirstTimeCompleting ? `lesson-${topicId}` : null;
    const lessonBadges = newlyUnlockedLessonBadge
      ? [...progress.lessonBadges, newlyUnlockedLessonBadge]
      : progress.lessonBadges;

    setProgress({
      ...progress,
      points: nextPoints,
      completedLessons: nextCompletedLessons,
      topicPoints: nextTopicPoints,
      stickers,
      lessonBadges,
    });

    return { pointsEarned, newlyUnlockedStickers, newlyUnlockedLessonBadge };
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
