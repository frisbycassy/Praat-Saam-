import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { badges } from "../data/badges";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import StreakFlame from "../components/StreakFlame";
import BilingualText from "../components/BilingualText";
import { getFullName, getDisplayName } from "../utils/user";
import { liveStreak, rollDueForward } from "../utils/schoolDay";
import styles from "./Learners.module.css";

function formatDay(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("af-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function Learners() {
  const { user } = useAuth();
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role !== "teacher") return;

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

      const progressByUserId = Object.fromEntries((progressRows || []).map((row) => [row.user_id, row]));
      const merged = (profiles || []).map((profile) => {
        const progress = progressByUserId[profile.id];
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
          lastActive: progress?.streak_last_date ?? null,
          // Roll forward from the last check so learners who haven't logged in
          // recently still show the tasks they've missed since.
          missedTasks: rollDueForward({
            owed: progress?.due_owed ?? 0,
            lastDate: progress?.due_last_date ?? null,
          }).owed,
        };
      });
      setLearners(merged);
      setLoading(false);
    }
    load();

    return () => {
      active = false;
    };
  }, [user]);

  if (user?.role !== "teacher") return <Navigate to="/tuisblad" replace />;

  return (
    <div className={styles.page}>
      <BilingualText as="h1" af="Leerders" />
      <BilingualText af="Alle leerders wat toegang tot Praat Saam! het." />

      {loading && <p className={styles.note}>Laai...</p>}
      {error && <p className={styles.note}>{error}</p>}
      {!loading && !error && learners.length === 0 && (
        <p className={styles.note}>
          Nog geen leerders het geregistreer nie.
        </p>
      )}

      <div className={styles.grid}>
        {learners.map((learner) => (
          <Card key={learner.id} className={styles.learnerCard}>
            <Avatar name={getDisplayName(learner)} photoUrl={learner.photoUrl} size={56} />
            <div className={styles.info}>
              <BilingualText as="h3" af={getFullName(learner) || learner.username} en={learner.email} />
              <div className={styles.status}>
                {learner.missedTasks === 0 ? (
                  <span className={styles.upToDate}>
                    <span className={styles.tick}>
                      <Check size={12} strokeWidth={3.5} aria-hidden="true" />
                    </span>
                    Op datum
                  </span>
                ) : (
                  <span className={styles.missed}>
                    {learner.missedTasks} {learner.missedTasks === 1 ? "taak" : "take"} gemis
                  </span>
                )}
                <span className={styles.streak}>
                  <StreakFlame count={learner.streak} size={40} />
                </span>
                <span className={styles.lastActive}>
                  {learner.lastActive
                    ? `Laas aktief: ${formatDay(learner.lastActive)}`
                    : "Nog nie aktief nie"}
                </span>
              </div>
              <div className={styles.stats}>
                <span>{learner.points} punte</span>
                <span>
                  {learner.badgeCount}/{badges.length} kentekens
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Learners;
