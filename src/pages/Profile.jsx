import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { getLevelForPoints } from "../data/levels";
import { badges } from "../data/badges";
import Card from "../components/Card";
import BilingualText from "../components/BilingualText";
import BadgeIcon from "../components/BadgeIcon";
import Avatar from "../components/Avatar";
import styles from "./Profile.module.css";

function Profile() {
  const { user } = useAuth();
  const { progress } = useProgress();
  const level = getLevelForPoints(progress.points);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Avatar name={user.name} size={64} />
        <BilingualText as="h1" af={user.name} en={user.email} />
      </div>

      <div className={styles.statsRow}>
        <Card className={styles.statCard}>
          <span className={styles.statValue}>{progress.points}</span>
          <BilingualText af="Punte" en="Points" />
        </Card>
        <Card className={styles.statCard}>
          <span className={styles.statValue}>{level.level}</span>
          <BilingualText af={level.title} en={level.englishTitle} />
        </Card>
        <Card className={styles.statCard}>
          <span className={styles.statValue}>{progress.streak.count}</span>
          <BilingualText af="Dae Vlam" en="Day Streak" />
        </Card>
      </div>

      <Card>
        <BilingualText as="h3" af="Al My Kentekens" en="All My Badges" />
        <div className={styles.badgeGrid}>
          {badges.map((badge) => (
            <BadgeIcon key={badge.id} badge={badge} unlocked={progress.badges.includes(badge.id)} />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Profile;
