import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { findBadge } from "../data/badges";
import { totalPossiblePoints } from "../data/lessons";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import ProgressBar from "../components/ProgressBar";
import BadgeIcon from "../components/BadgeIcon";
import Button from "../components/Button";
import ClassSummary from "../components/ClassSummary";
import styles from "./Dashboard.module.css";

// The card shows a single row (the CSS hides any that wrap); the profile page
// is where every badge can be seen.
const MAX_DASHBOARD_BADGES = 12;

function Dashboard() {
  const { user } = useAuth();
  const { progress, isReady, markVisitToday } = useProgress();
  const isTeacher = user.role === "teacher";

  useEffect(() => {
    if (isReady) markVisitToday();
    // Only needs to run once progress has loaded from Supabase.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const maxPoints = totalPossiblePoints();
  const percent = (progress.points / maxPoints) * 100;

  // Most recently earned first (badges are appended as they're unlocked).
  const unlockedBadges = [...progress.badges].reverse().map(findBadge).filter(Boolean);
  const shownBadges = unlockedBadges.slice(0, MAX_DASHBOARD_BADGES);

  return (
    <div className={styles.page}>
      <BilingualText
        as="h1"
        af={`Hallo, ${user.firstName || user.username}!`}
        en="Hello!"
      />

      {isTeacher ? (
        <ClassSummary />
      ) : (
        <>
          <Card className={styles.summaryCard}>
            <BilingualText as="h3" af="Punte" en="Points" />
            <ProgressBar percent={percent} leftLabel={`${progress.points} / ${maxPoints}`} />
          </Card>

          <Card className={styles.summaryCard}>
            <BilingualText as="h3" af="Ontsluite Kentekens" en="Unlocked Badges" />
            {shownBadges.length === 0 ? (
              <BilingualText
                af="Nog geen kentekens ontsluit nie. Voltooi 'n les om jou eerste kenteken te wen!"
                en="No badges unlocked yet. Finish a lesson to earn your first badge!"
              />
            ) : (
              <div className={styles.stickerRow}>
                {shownBadges.map((badge) => (
                  <BadgeIcon key={badge.id} badge={badge} unlocked />
                ))}
              </div>
            )}
            <Link to="/profiel" className={styles.stickerLink}>
              Sien al my kentekens (See all my badges) &rarr;
            </Link>
          </Card>
        </>
      )}

      <Card className={styles.ctaCard}>
        <BilingualText
          as="h3"
          af={isTeacher ? "Bekyk die lesse" : "Gereed om te leer?"}
          en={isTeacher ? "View the lessons" : "Ready to learn?"}
        />
        <Link to="/onderwerpe">
          <Button>Gaan na die Onderwerpe (Go to the Topics)</Button>
        </Link>
      </Card>
    </div>
  );
}

export default Dashboard;
