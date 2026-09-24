import { createContext, useContext, useEffect, useState } from "react";
import { liveStreak } from "../utils/schoolDay";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabaseClient";

// Progress lives in Supabase, keyed to the signed-in user, so it follows a
// learner to any device. The website can only read it: points, badges,
// streaks and tasks are worked out by the database (record_visit and
// submit_lesson), which marks quiz answers against its own answer key, so
// nobody can give themselves points.
const defaultProgress = {
  points: 0,
  completedLessons: [], // "topicId:lessonIndex" strings
  badges: [], // "topicId:lessonIndex" strings, one per earned badge
  lessonScores: {}, // "topicId:lessonIndex" -> best correctCount achieved
  streak: { count: 0, lastActiveDate: null },
  // Lessons a learner still owes: +1 for every school day, -1 for every new
  // lesson passed, never below 0. Missed days stack up.
  due: { owed: 0, lastDate: null },
};

function toAppProgress(row) {
  if (!row) return defaultProgress;
  return {
    points: row.points ?? 0,
    completedLessons: row.completed_lessons ?? [],
    badges: row.badges ?? [],
    lessonScores: row.lesson_scores ?? {},
    // Show a streak that has lapsed as 0 right away, not only after the next visit.
    streak: {
      count: liveStreak(row.streak_count ?? 0, row.streak_last_date ?? null),
      lastActiveDate: row.streak_last_date ?? null,
    },
    due: { owed: row.due_owed ?? 0, lastDate: row.due_last_date ?? null },
  };
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(defaultProgress);
  // Guards pages from showing the empty default before the real row loads.
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
      // For learners, opening the app counts as today's visit: the database
      // updates the streak and adds any tasks owed since the last visit.
      const { data, error } =
        user.role === "learner"
          ? await supabase.rpc("record_visit")
          : await supabase.from("progress").select("*").eq("user_id", user.id).single();
      if (!active) return;
      if (error) console.warn("Could not load progress.", error);
      setProgress(error ? defaultProgress : toAppProgress(data));
      setIsReady(true);
    }
    loadProgress();

    return () => {
      active = false;
    };
  }, [user]);

  // Sends a learner's quiz answers (the chosen option index for each
  // question) to be marked. Resolves to a summary for the results screen:
  // { correctCount, pointsEarned, newlyUnlockedBadge }.
  async function completeLesson(topicId, lessonIndex, answers) {
    const { data, error } = await supabase.rpc("submit_lesson", {
      p_topic: topicId,
      p_lesson: lessonIndex,
      p_answers: answers,
    });
    if (error) throw error;
    setProgress(toAppProgress(data.progress));
    return {
      correctCount: data.correct_count,
      pointsEarned: data.points_earned,
      newlyUnlockedBadge: data.new_badge,
    };
  }

  return (
    <ProgressContext.Provider value={{ progress, isReady, completeLesson }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider");
  return context;
}
