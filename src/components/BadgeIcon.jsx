import { Star } from "lucide-react";
import { TOPIC_ICONS } from "../utils/topicIcons";
import styles from "./BadgeIcon.module.css";

// An original shield shape (not traced from any reference art) used for
// every badge. Drawn once as a path and reused at any size. Shorter and
// more compact than a heraldic shield so it reads as a badge, not a
// tall crest.
const SHIELD_PATH =
  "M50 3 C62 3 72 7 80 13 L80 40 C80 56 68 67 50 74 C32 67 20 56 20 40 L20 13 C28 7 38 3 50 3 Z";

// Renders one badge: a colored shield with the topic's icon, plus a
// small tier marker (the lesson number, or a star for the final lesson
// in a topic). Locked badges are shown grey and faded.
function BadgeIcon({ badge, unlocked, label, size = 64 }) {
  const Icon = TOPIC_ICONS[badge.icon] || TOPIC_ICONS.Medal;
  const isFinalLesson = badge.lessonIndex === 4;
  const fill = unlocked ? badge.color : "var(--color-locked)";
  const classes = [styles.badge, unlocked ? "" : styles.locked, isFinalLesson && unlocked ? styles.finalLesson : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className={styles.shieldWrap} style={{ width: size, height: size * 0.78 }}>
        <svg viewBox="0 0 100 78" className={styles.shieldSvg}>
          <path d={SHIELD_PATH} fill={fill} stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
        </svg>
        <Icon className={styles.icon} size={size * 0.42} color="white" aria-hidden="true" />
        <span className={styles.tier}>
          {isFinalLesson ? (
            <Star size={size * 0.16} fill="currentColor" aria-hidden="true" />
          ) : (
            badge.lessonIndex + 1
          )}
        </span>
      </div>
      <span className={styles.title}>{label ?? (unlocked ? badge.title : "?")}</span>
    </div>
  );
}

export default BadgeIcon;
