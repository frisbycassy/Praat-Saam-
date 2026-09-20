// Every topic has 5 badges, one per lesson slot, using
// src/assets/badge-sprite.png (8 rows - one per topic - by 5 columns:
// V, IV, III, II, then a star for the 5th/final lesson). Finishing a
// topic's lesson N unlocks that topic's badge N. Simple, direct, no
// points thresholds involved.
import { topics } from "./topics";

export const badges = topics.flatMap((topic) =>
  Array.from({ length: 5 }, (_, lessonIndex) => ({
    id: `${topic.id}:${lessonIndex}`,
    topicId: topic.id,
    lessonIndex,
    spriteRow: topic.spriteRow,
    spriteCol: lessonIndex,
    title: `${topic.title} - Les ${lessonIndex + 1}`,
    englishTitle: `${topic.englishTitle} - Lesson ${lessonIndex + 1}`,
  })),
);

export function findBadge(badgeId) {
  return badges.find((badge) => badge.id === badgeId) || null;
}

export function badgesForTopic(topicId) {
  return badges.filter((badge) => badge.topicId === topicId);
}
