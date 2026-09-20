import { badgesForTopic } from "../data/badges";
import BilingualText from "./BilingualText";
import BadgeIcon from "./BadgeIcon";
import styles from "./TopicBadgeRow.module.css";

// One topic's 5 lesson badges shown in a row. Scrolls horizontally on
// narrow screens instead of overflowing the page.
function TopicBadgeRow({ topic, unlockedBadgeIds }) {
  const badges = badgesForTopic(topic.id);

  return (
    <div className={styles.row}>
      <BilingualText as="h4" af={topic.title} en={topic.englishTitle} />
      <div className={styles.badges}>
        {badges.map((badge) => (
          <BadgeIcon
            key={badge.id}
            badge={badge}
            unlocked={unlockedBadgeIds.includes(badge.id)}
            label={`Les ${badge.lessonIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default TopicBadgeRow;
