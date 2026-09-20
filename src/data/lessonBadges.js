// One collectible badge per topic lesson, earned the first time that
// topic's lesson is completed. Separate from the 6-level sticker
// categories in stickers.js (which reward points earned within a
// topic) - this rewards simply finishing a topic's lesson at all.
import { topics } from "./topics";

export const lessonBadges = topics.map((topic) => ({
  id: `lesson-${topic.id}`,
  topicId: topic.id,
  title: topic.title,
  englishTitle: topic.englishTitle,
  icon: topic.icon,
  color: topic.colors[5],
  description: `Voltooi die "${topic.title}" les.`,
  englishDescription: `Complete the "${topic.englishTitle}" lesson.`,
}));

export function findLessonBadge(badgeId) {
  return lessonBadges.find((badge) => badge.id === badgeId) || null;
}
