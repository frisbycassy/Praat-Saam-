import { findSticker } from "../data/stickers";
import BilingualText from "./BilingualText";
import StickerIcon from "./StickerIcon";
import styles from "./StickerCategoryRow.module.css";

// One topic (e.g. "Naamwoorde") shown as its 6 sticker levels in a row.
// Scrolls horizontally on narrow screens instead of overflowing the page.
function StickerCategoryRow({ topic, unlockedStickerIds }) {
  const levels = Array.from({ length: 6 }, (_, index) => index + 1);

  return (
    <div className={styles.row}>
      <BilingualText as="h4" af={topic.title} en={topic.englishTitle} />
      <div className={styles.levels}>
        {levels.map((level) => {
          const stickerId = `${topic.id}-${level}`;
          return (
            <StickerIcon
              key={stickerId}
              sticker={findSticker(stickerId)}
              unlocked={unlockedStickerIds.includes(stickerId)}
              label={`Vlak ${level}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default StickerCategoryRow;
