import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { getLevelForPoints } from "../data/levels";
import { badgesForTopic } from "../data/badges";
import { topics } from "../data/topics";
import { totalPossiblePoints } from "../data/lessons";
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
  const { progress, isReady, markVisitToday } = useProgress();

  useEffect(() => {
    if (isReady) markVisitToday();
    // Only needs to run once progress has loaded from Supabase.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const level = getLevelForPoints(progress.points);
  const maxPoints = totalPossiblePoints();
  const percent = (progress.points / maxPoints) * 100;

  const unlockedTopics = topics.filter((topic) =>
    badgesForTopic(topic.id).some((badge) => progress.badges.includes(badge.id)),
  );

  return (
    <div className={styles.page}>
      <BilingualText
        as="h1"
        af={`Hallo, ${user.firstName || user.username}!`}
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
          leftLabel={`${progress.points} / ${maxPoints} punte (points)`}
        />
      </Card>

      <Card className={styles.summaryCard}>
        <BilingualText as="h3" af="Ontsluite Kentekens" en="Unlocked Badges" />
        {unlockedTopics.length === 0 ? (
          <BilingualText
            af="Nog geen kentekens ontsluit nie. Voltooi 'n les om jou eerste kenteken te wen!"
            en="No badges unlocked yet. Finish a lesson to earn your first badge!"
          />
        ) : (
          <div className={styles.stickerRow}>
            {unlockedTopics.map((topic) => {
              const badge = highestEarnedBadge(topic.id, progress.badges);
              return (
                <BadgeIcon key={topic.id} badge={badge} unlocked label={topic.title} />
              );
            })}
          </div>
        )}
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
