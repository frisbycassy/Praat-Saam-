import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { liveStreak, localDateString, rollDueForward } from "./schoolDay";

// Loads every learner with their progress, for the teacher's pages. Only
// teachers can read other learners' rows (RLS), so pass enabled=false for
// anyone else.
export function useLearners(enabled) {
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled) return;

    let active = true;
    async function load() {
      const [{ data: profiles, error: profilesError }, { data: progressRows, error: progressError }] =
        await Promise.all([
          supabase.from("profiles").select("*").eq("role", "learner").order("first_name"),
          supabase.from("progress").select("*"),
        ]);
      if (!active) return;
      if (profilesError || progressError) {
        setError("Kon nie leerders laai nie.");
        setLoading(false);
        return;
      }

      const today = localDateString();
      const progressByUserId = Object.fromEntries((progressRows || []).map((row) => [row.user_id, row]));
      const merged = (profiles || []).map((profile) => {
        const progress = progressByUserId[profile.id];
        const joined = profile.created_at ? localDateString(new Date(profile.created_at)) : null;
        return {
          id: profile.id,
          firstName: profile.first_name || "",
          lastName: profile.last_name || "",
          username: profile.username || "",
          email: profile.email,
          photoUrl: profile.photo_url || null,
          points: progress?.points ?? 0,
          badgeCount: (progress?.badges || []).length,
          streak: liveStreak(progress?.streak_count ?? 0, progress?.streak_last_date ?? null),
          joined,
          lastActive: progress?.streak_last_date ?? null,
          // Roll forward from the last check so learners who haven't logged in
          // recently still show the tasks they've missed since. Counting starts
          // on the day the learner joined.
          missedTasks: rollDueForward(
            {
              owed: progress?.due_owed ?? 0,
              lastDate: progress?.due_last_date ?? null,
            },
            today,
            joined,
          ).owed,
        };
      });
      setLearners(merged);
      setLoading(false);
    }
    load();

    return () => {
      active = false;
    };
  }, [enabled]);

  return { learners, loading, error };
}
