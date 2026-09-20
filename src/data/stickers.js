// Every topic (see topics.js) has its own 6-level sticker category.
// Points earned answering that topic's quiz questions correctly go into
// a per-topic bucket (progress.topicPoints[topicId]); crossing a level's
// threshold unlocks that sticker. This is separate from the learner's
// overall point total, which drives the general Vlak/Level system.
import { topics } from "./topics";

// Flat list of every individual sticker (topic x level).
export const stickers = topics.flatMap((topic) =>
  topic.thresholds.map((threshold, index) => {
    const level = index + 1;
    return {
      id: `${topic.id}-${level}`,
      topicId: topic.id,
      level,
      icon: topic.icon,
      color: topic.colors[index],
      spriteRow: topic.spriteRow,
      colIndex: index,
      title: `${topic.title} - Vlak ${level}`,
      englishTitle: `${topic.englishTitle} - Level ${level}`,
      description: `Verdien ${threshold} punte in ${topic.title} om hierdie vlak te ontsluit.`,
      englishDescription: `Earn ${threshold} points in ${topic.englishTitle} to unlock this level.`,
      threshold,
    };
  }),
);

export function findSticker(stickerId) {
  return stickers.find((sticker) => sticker.id === stickerId) || null;
}

// Given the sticker ids a learner already has and their points-per-topic
// map, returns the ids of any stickers that should newly unlock.
export function getNewlyUnlockedStickerIds(currentStickerIds, topicPoints) {
  return stickers
    .filter(
      (sticker) =>
        !currentStickerIds.includes(sticker.id) &&
        (topicPoints[sticker.topicId] || 0) >= sticker.threshold,
    )
    .map((sticker) => sticker.id);
}

// The highest level (0-6) a learner has reached in one topic, used for
// compact summaries that show just one sticker per topic.
export function getCurrentLevelForTopic(topicId, unlockedStickerIds) {
  let highest = 0;
  for (let level = 1; level <= 6; level++) {
    if (unlockedStickerIds.includes(`${topicId}-${level}`)) highest = level;
  }
  return highest;
}
