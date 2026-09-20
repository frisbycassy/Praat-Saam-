import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { getLevelForPoints, getNextLevel } from "../data/levels";
import { badges } from "../data/badges";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import ProgressBar from "../components/ProgressBar";
import BadgeIcon from "../components/BadgeIcon";
import Button from "../components/Button";
import styles from "./Dashboard.module.css";

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
        af={`Hallo, ${user.name}!`}
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
        <div className={styles.badgeRow}>
          {badges.map((badge) => (
            <BadgeIcon key={badge.id} badge={badge} unlocked={progress.badges.includes(badge.id)} />
          ))}
        </div>
      </Card>

      <Card className={styles.ctaCard}>
        <BilingualText
          as="h3"
          af="Gereed om te leer?"
          en="Ready to learn?"
        />
        <Link to="/kwartale">
          <Button>Gaan na die Kwartale (Go to the Terms)</Button>
        </Link>
      </Card>
    </div>
  );
}

export default Dashboard;
