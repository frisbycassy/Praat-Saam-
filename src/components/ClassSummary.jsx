import { Link } from "react-router-dom";
import { badges } from "../data/badges";
import { totalPossiblePoints } from "../data/lessons";
import { localDateString } from "../utils/schoolDay";
import { useLearners } from "../utils/useLearners";
import { getFullName } from "../utils/user";
import Card from "./Card";
import BilingualText from "./BilingualText";
import styles from "./ClassSummary.module.css";

// How many learners who are behind to list by name.
const MAX_BEHIND_LISTED = 5;

// A quick overview of the whole class for the teacher: who is up to date,
// who is behind on their tasks, and how the class is doing overall.
function ClassSummary() {
  const { learners, loading, error } = useLearners(true);

  if (loading) return <BilingualText af="Laai..." en="Loading..." />;
  if (error) return <BilingualText af={error} en="Could not load learners." />;

  const today = localDateString();
  const total = learners.length;
  const upToDate = learners.filter((learner) => learner.missedTasks === 0).length;
  const behind = learners
    .filter((learner) => learner.missedTasks > 0)
    .sort((a, b) => b.missedTasks - a.missedTasks);
  const activeToday = learners.filter((learner) => learner.lastActive === today).length;
  const averagePoints = total
    ? Math.round(learners.reduce((sum, learner) => sum + learner.points, 0) / total)
    : 0;
  const totalBadges = learners.reduce((sum, learner) => sum + learner.badgeCount, 0);

  const stats = [
    { value: total, af: "Leerders", en: "Learners" },
    { value: `${upToDate}/${total}`, af: "Op datum", en: "Up to date", tone: "good" },
    { value: behind.length, af: "Agter met take", en: "Behind on tasks", tone: behind.length ? "warn" : "" },
    { value: `${activeToday}/${total}`, af: "Aktief vandag", en: "Active today" },
    { value: `${averagePoints}/${totalPossiblePoints()}`, af: "Gemiddelde punte", en: "Average points" },
    { value: `${totalBadges}/${total * badges.length}`, af: "Kentekens verdien", en: "Badges earned" },
  ];

  return (
    <Card className={styles.card}>
      <BilingualText as="h3" af="Klasopsomming" en="Class Summary" />

      {total === 0 ? (
        <BilingualText
          af="Nog geen leerders het geregistreer nie."
          en="No learners have signed up yet."
        />
      ) : (
        <>
          <div className={styles.grid}>
            {stats.map((stat) => (
              <div key={stat.en} className={`${styles.stat} ${stat.tone ? styles[stat.tone] : ""}`}>
                <span className={styles.value}>{stat.value}</span>
                <BilingualText af={stat.af} en={stat.en} />
              </div>
            ))}
          </div>

          <BilingualText as="h4" af="Het 'n bietjie hulp nodig" en="Needs a nudge" />
          {behind.length === 0 ? (
            <BilingualText
              af="Almal is op datum met hul take!"
              en="Everyone is up to date with their tasks!"
            />
          ) : (
            <ul className={styles.behindList}>
              {behind.slice(0, MAX_BEHIND_LISTED).map((learner) => (
                <li key={learner.id}>
                  <span>{getFullName(learner) || learner.username}</span>
                  <span className={styles.missed}>
                    {learner.missedTasks} {learner.missedTasks === 1 ? "taak" : "take"} gemis
                    <span className={styles.en}>
                      {learner.missedTasks} {learner.missedTasks === 1 ? "task" : "tasks"} missed
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <Link to="/leerders" className={styles.link}>
        Sien alle leerders (See all learners) &rarr;
      </Link>
    </Card>
  );
}

export default ClassSummary;
