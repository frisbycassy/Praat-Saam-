import badgeSprite from "../assets/badge-sprite.png";
import styles from "./BadgeIcon.module.css";

// src/assets/badge-sprite.png is 1000x1000: 8 rows (one per topic) x 5
// badges per row (lesson 1-5, shown as V/IV/III/II/star). The 5 badges
// aren't evenly centered in naive equal-width columns - these x-centers
// were measured directly from the artwork (pixel density analysis) -
// so each column has its own crop offset rather than a single formula.
const SPRITE_WIDTH = 1000;
const SPRITE_HEIGHT = 1000;
const CELL_HEIGHT = 125;
const CROP_WIDTH = 110;
const CROP_HEIGHT = 115;
const CROP_OFFSET_Y = 4;
const COLUMN_CENTERS_X = [146, 280, 416, 553, 688];

// Renders one cell of the badge sprite sheet, cropped to just the
// shield (excluding the chain-link connectors between badges). Locked
// badges show the same artwork faded and desaturated.
function BadgeIcon({ badge, unlocked, label, size = 64 }) {
  const scale = size / CROP_WIDTH;
  const bgX = COLUMN_CENTERS_X[badge.spriteCol] - CROP_WIDTH / 2;
  const bgY = badge.spriteRow * CELL_HEIGHT + CROP_OFFSET_Y;
  const height = size * (CROP_HEIGHT / CROP_WIDTH);

  const circleStyle = {
    width: size,
    height,
    backgroundImage: `url(${badgeSprite})`,
    backgroundSize: `${SPRITE_WIDTH * scale}px ${SPRITE_HEIGHT * scale}px`,
    backgroundPosition: `${-bgX * scale}px ${-bgY * scale}px`,
  };

  return (
    <div className={`${styles.badge} ${unlocked ? "" : styles.locked}`}>
      <div
        className={`${styles.iconCircle} ${unlocked ? "" : styles.locked}`}
        style={circleStyle}
        role="img"
        aria-label={unlocked ? badge.title : "Nog nie ontsluit nie (not yet unlocked)"}
      />
      <span className={styles.title}>{label ?? (unlocked ? badge.title : "?")}</span>
    </div>
  );
}

export default BadgeIcon;
