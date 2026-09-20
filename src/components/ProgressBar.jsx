import styles from "./ProgressBar.module.css";

// percent should be a number from 0 to 100.
function ProgressBar({ percent, leftLabel, rightLabel }) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div className={styles.wrap}>
      {(leftLabel || rightLabel) && (
        <div className={styles.labelRow}>
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={styles.fill} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
