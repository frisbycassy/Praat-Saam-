import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { getLevelForPoints, getNextLevel } from "../data/levels";
import { badgesForTopic } from "../data/badges";
import { topics } from "../data/topics";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import ProgressBar from "../components/ProgressBar";
import BadgeIcon from "../components/BadgeIcon";
import Button from "../components/Button";
import styles from "./Dashboard.module.css";

function highestEarnedBadge(topicId, earnedBadgeIds) {
  const badges = badgesForTopic(topicId);
  let latest = null;
  for (const badge of badges) {
    if (earnedBadgeIds.includes(badge.id)) latest = badge;
  }
  return latest || badges[0];
}

function Dashboard() {
  const { user } = useAuth();
  const { progress, markVisitToday } = useProgress();

  useEffect(() => {
    markVisitToday();
    // Only needs to run once when the dashboard is first shown.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const level = getLevelForPoints(progress.points);
  const nextLevel = getNextLevel(progress.points);
  const pointsIntoLevel = progress.points - level.minPoints;
  const pointsForNextLevel = nextLevel ? nextLevel.minPoints - level.minPoints : null;
  const percent = nextLevel ? (pointsIntoLevel / pointsForNextLevel) * 100 : 100;

  return (
    <div className={styles.page}>
      <BilingualText
        as="h1"
        af={`Hallo, ${user.nickname || user.firstName || user.username}!`}
        en="Hello!"
      />

      <Card className={styles.summaryCard}>
        <BilingualText
          as="h3"
          af={`Vlak ${level.level}: ${level.title}`}
          en={level.englishTitle}
        />
        <ProgressBar
          percent={percent}
          leftLabel={`${progress.points} punte (points)`}
          rightLabel={nextLevel ? `${nextLevel.minPoints} vir Vlak ${nextLevel.level}` : "Top vlak!"}
        />
      </Card>

      <Card className={styles.summaryCard}>
        <BilingualText as="h3" af="My Kentekens" en="My Badges" />
        <div className={styles.stickerRow}>
          {topics.map((topic) => {
            const badge = highestEarnedBadge(topic.id, progress.badges);
            const isUnlocked = progress.badges.includes(badge.id);
            return (
              <BadgeIcon
                key={topic.id}
                badge={badge}
                unlocked={isUnlocked}
                label={topic.title}
              />
            );
          })}
        </div>
        <Link to="/profiel" className={styles.stickerLink}>
          Sien al my kentekens (See all my badges) &rarr;
        </Link>
      </Card>

      <Card className={styles.ctaCard}>
        <BilingualText
          as="h3"
          af="Gereed om te leer?"
          en="Ready to learn?"
        />
        <Link to="/onderwerpe">
          <Button>Gaan na die Onderwerpe (Go to the Topics)</Button>
        </Link>
      </Card>
    </div>
  );
}

export default Dashboard;
