// Every topic has 5 badges, one per lesson slot, rendered as an
// original SVG shield (see BadgeIcon) using that topic's icon and its
// level color (muted for lesson 1, vivid for lesson 5). Finishing a
// topic's lesson N unlocks that topic's badge N - simple and direct,
// no points thresholds involved.
import { topics } from "./topics";

export const badges = topics.flatMap((topic) =>
  Array.from({ length: 5 }, (_, lessonIndex) => ({
    id: `${topic.id}:${lessonIndex}`,
    topicId: topic.id,
    lessonIndex,
    icon: topic.icon,
    color: topic.colors[lessonIndex],
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
