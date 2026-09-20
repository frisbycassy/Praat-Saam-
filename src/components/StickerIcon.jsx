import spriteSheet from "../assets/sticker-sprite.png";
import { TOPIC_ICONS } from "../utils/topicIcons";
import styles from "./StickerIcon.module.css";

const SPRITE_COLUMNS = 6;
const SPRITE_ROWS = 5;

// Topics with real artwork (sticker.spriteRow is a number) show a sliced
// cell from the hand-drawn sprite sheet, faded/greyscaled when locked.
// Topics without artwork yet fall back to a plain icon + color badge.
function StickerIcon({ sticker, unlocked, label }) {
  const hasArtwork = sticker.spriteRow !== null && sticker.spriteRow !== undefined;

  const circleStyle = hasArtwork
    ? {
        backgroundImage: `url(${spriteSheet})`,
        backgroundSize: `${SPRITE_COLUMNS * 100}% ${SPRITE_ROWS * 100}%`,
        backgroundPosition: `${(sticker.colIndex / (SPRITE_COLUMNS - 1)) * 100}% ${(sticker.spriteRow / (SPRITE_ROWS - 1)) * 100}%`,
      }
    : { backgroundColor: unlocked ? sticker.color : undefined };

  const Icon = TOPIC_ICONS[sticker.icon] || TOPIC_ICONS.Medal;

  return (
    <div className={`${styles.sticker} ${unlocked ? "" : styles.locked}`}>
      <div
        className={`${styles.iconCircle} ${hasArtwork ? "" : styles.plainIconCircle} ${unlocked ? "" : styles.locked}`}
        style={circleStyle}
      >
        {!hasArtwork && <Icon size={28} color="white" aria-hidden="true" />}
      </div>
      <span className={styles.title}>{label ?? (unlocked ? sticker.title : "?")}</span>
    </div>
  );
}

export default StickerIcon;
