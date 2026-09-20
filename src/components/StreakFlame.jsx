import { Flame } from "lucide-react";
import styles from "./StreakFlame.module.css";

// The day-streak count shown inside a filled flame icon, Duolingo-style,
// instead of as separate icon + number.
function StreakFlame({ count, size = 28 }) {
  return (
    <span
      className={styles.wrap}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${count} dae vlam (day streak)`}
    >
      <Flame className={styles.icon} fill="currentColor" strokeWidth={1.5} />
      <span className={styles.count} style={{ fontSize: Math.max(9, size * 0.38) }}>
        {count}
      </span>
    </span>
  );
}

export default StreakFlame;
