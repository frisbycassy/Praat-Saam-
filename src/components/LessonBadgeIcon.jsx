import { Medal } from "lucide-react";
import styles from "./StickerIcon.module.css";

// Visually similar to StickerIcon (same circle/locked treatment) but for
// lesson badges, which don't have custom artwork yet - a medal tinted
// with the badge's topic color instead of a sprite slice.
function LessonBadgeIcon({ badge, unlocked }) {
  const circleStyle = { backgroundColor: unlocked ? badge.color : undefined };

  return (
    <div className={`${styles.sticker} ${unlocked ? "" : styles.locked}`}>
      <div
        className={`${styles.iconCircle} ${styles.plainIconCircle} ${unlocked ? "" : styles.locked}`}
        style={circleStyle}
      >
        <Medal size={28} color="white" aria-hidden="true" />
      </div>
      <span className={styles.title}>{unlocked ? badge.title : "?"}</span>
    </div>
  );
}

export default LessonBadgeIcon;
