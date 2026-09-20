import { createContext, useContext, useEffect, useState } from "react";

// TEMPORARY: progress is saved to local storage on this one device/browser
// for now, the same way AuthContext works. Once Supabase is connected,
// these functions will read/write to the database instead, so every page
// using useProgress() can stay the same.
const STORAGE_KEY = "praatsaam-progress";

const defaultProgress = {
  points: 0,
  completedLessons: [],
  badges: [],
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

      const badges =
        nextCount >= 3 && !current.badges.includes("vlam-3")
          ? [...current.badges, "vlam-3"]
          : current.badges;

      return { ...current, badges, streak: { count: nextCount, lastActiveDate: today } };
    });
  }

  // Runs once when a learner finishes a quiz. Returns a summary (points
  // earned, any newly unlocked badges) so the results screen can
  // celebrate them, while also saving the update to progress.
  function completeLesson(themeId, correctCount, totalQuestions) {
    const isFirstTimeCompleting = !progress.completedLessons.includes(themeId);
    const completionBonus = 20;
    const pointsEarned = correctCount * 10 + (isFirstTimeCompleting ? completionBonus : 0);

    const badges = [...progress.badges];
    const newlyUnlockedBadges = [];
    if (isFirstTimeCompleting && !badges.includes("eerste-les")) {
      badges.push("eerste-les");
      newlyUnlockedBadges.push("eerste-les");
    }
    if (correctCount === totalQuestions && !badges.includes("volpunte")) {
      badges.push("volpunte");
      newlyUnlockedBadges.push("volpunte");
    }

    setProgress({
      ...progress,
      points: progress.points + pointsEarned,
      completedLessons: isFirstTimeCompleting
        ? [...progress.completedLessons, themeId]
        : progress.completedLessons,
      badges,
    });

    return { pointsEarned, newlyUnlockedBadges };
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
