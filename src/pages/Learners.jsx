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
import { liveStreak, localDateString, rollDueForward } from "../utils/schoolDay";
import styles from "./Learners.module.css";

function formatDay(dateString, locale) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

// One detail: Afrikaans on top, a smaller English translation underneath.
function Detail({ af, en, className }) {
  return (
    <span className={`${styles.cell} ${className || ""}`}>
      <span>{af}</span>
      <span className={styles.en}>{en}</span>
    </span>
  );
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
          joined: profile.created_at ? localDateString(new Date(profile.created_at)) : null,
          lastActive: progress?.streak_last_date ?? null,
          // Roll forward from the last check so learners who haven't logged in
          // recently still show the tasks they've missed since.
          // Counting starts on the day the learner joined.
          missedTasks: rollDueForward(
            {
              owed: progress?.due_owed ?? 0,
              lastDate: progress?.due_last_date ?? null,
            },
            localDateString(),
            profile.created_at ? localDateString(new Date(profile.created_at)) : null,
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
  }, [user]);

  if (user?.role !== "teacher") return <Navigate to="/tuisblad" replace />;

  return (
    <div className={styles.page}>
      <BilingualText as="h1" af="Leerders" />
      <BilingualText
        af="Alle leerders wat toegang tot Praat Saam! het."
        en="All the learners who have access to Praat Saam!"
      />

      {loading && <BilingualText af="Laai..." en="Loading..." />}
      {error && <BilingualText af={error} en="Could not load learners." />}
      {!loading && !error && learners.length === 0 && (
        <BilingualText
          af="Nog geen leerders het geregistreer nie."
          en="No learners have signed up yet."
        />
      )}

      <div className={styles.grid}>
        {learners.map((learner) => (
          <Card key={learner.id} className={styles.learnerCard}>
            <Avatar name={getDisplayName(learner)} photoUrl={learner.photoUrl} size={56} />
            <div className={styles.info}>
              <BilingualText as="h3" af={getFullName(learner) || learner.username} en={learner.email} />
            </div>
            <div className={styles.details}>
              {learner.missedTasks === 0 ? (
                <span className={`${styles.cell} ${styles.upToDate}`}>
                  <span className={styles.tick}>
                    <Check size={12} strokeWidth={3.5} aria-hidden="true" />
                  </span>
                  <span>
                    <span>Op datum</span>
                    <span className={styles.en}>Up to date</span>
                  </span>
                </span>
              ) : (
                <Detail
                  className={styles.missed}
                  af={`${learner.missedTasks} ${learner.missedTasks === 1 ? "taak" : "take"} gemis`}
                  en={`${learner.missedTasks} ${learner.missedTasks === 1 ? "task" : "tasks"} missed`}
                />
              )}
              <StreakFlame count={learner.streak} size={36} />
              <Detail
                className={styles.date}
                af={learner.joined ? `Aangesluit: ${formatDay(learner.joined, "af-ZA")}` : "Aangesluit: -"}
                en={learner.joined ? `Joined: ${formatDay(learner.joined, "en-ZA")}` : "Joined: -"}
              />
              <Detail
                className={styles.date}
                af={learner.lastActive ? `Laas aktief: ${formatDay(learner.lastActive, "af-ZA")}` : "Nog nie aktief nie"}
                en={learner.lastActive ? `Last active: ${formatDay(learner.lastActive, "en-ZA")}` : "Not active yet"}
              />
              <Detail
                className={styles.stat}
                af={`${learner.points} punte`}
                en={`${learner.points} ${learner.points === 1 ? "point" : "points"}`}
              />
              <Detail
                className={styles.stat}
                af={`${learner.badgeCount}/${badges.length} kentekens`}
                en={`${learner.badgeCount}/${badges.length} badges`}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Learners;
