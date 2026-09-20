import styles from "./Card.module.css";

// A plain content box. Pass onClick to make it a clickable card, and
// locked to show/disable it as "not available yet".
function Card({ children, onClick, locked = false, className = "" }) {
  const classes = [
    styles.card,
    onClick ? styles.interactive : "",
    locked ? styles.locked : "",
    className,
  ].join(" ");

  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick} disabled={locked}>
        {children}
      </button>
    );
  }

  return <div className={classes}>{children}</div>;
}

export default Card;
