import { Star, Trophy, Flame, Lock } from "lucide-react";
import styles from "./BadgeIcon.module.css";

const ICONS = { Star, Trophy, Flame };

function BadgeIcon({ badge, unlocked }) {
  const Icon = unlocked ? ICONS[badge.icon] || Star : Lock;

  return (
    <div className={`${styles.badge} ${unlocked ? "" : styles.locked}`}>
      <div className={`${styles.iconCircle} ${unlocked ? "" : styles.locked}`}>
        <Icon size={28} aria-hidden="true" />
      </div>
      <span className={styles.title}>{unlocked ? badge.title : "?"}</span>
    </div>
  );
}

export default BadgeIcon;
