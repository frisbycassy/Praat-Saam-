import { Navigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { badges } from "../data/badges";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import StreakFlame from "../components/StreakFlame";
import BilingualText from "../components/BilingualText";
import { getFullName, getDisplayName } from "../utils/user";
import { useLearners } from "../utils/useLearners";
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
  const { learners, loading, error } = useLearners(user?.role === "teacher");

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
