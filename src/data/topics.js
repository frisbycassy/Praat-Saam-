// The site is organized around grammar/language-structure topics rather
// than CAPS terms. Each topic is one focused lesson (vocabulary, a short
// passage, a quiz) plus a 6-level sticker category: answering questions
// correctly within a topic's lesson earns that topic points, and enough
// points unlocks the next level of that topic's sticker.
import { levelColors } from "../utils/colors";

// spriteRow points at a row in src/assets/sticker-sprite.png (0=Potion,
// 1=Star, 2=Bolt, 3=Heart, 4=Flame). Only 5 rows of real artwork exist,
// so the first 5 topics get that art; the rest fall back to a plain
// icon + color badge until more artwork exists.
export const topics = [
  {
    id: "naamwoorde",
    title: "Naamwoorde",
    englishTitle: "Nouns",
    icon: "Package",
    spriteRow: 0,
    thresholds: [20, 60, 120, 200, 300, 500],
    colors: levelColors("#8fa3b3", "#17b6e0"),
  },
  {
    id: "werkwoorde",
    title: "Werkwoorde",
    englishTitle: "Verbs",
    icon: "Zap",
    spriteRow: 1,
    thresholds: [20, 60, 120, 200, 300, 500],
    colors: levelColors("#b3927a", "#ff8a3d"),
  },
  {
    id: "byvoeglike-naamwoorde",
    title: "Byvoeglike Naamwoorde",
    englishTitle: "Adjectives",
    icon: "Palette",
    spriteRow: 2,
    thresholds: [20, 60, 120, 200, 300, 500],
    colors: levelColors("#b3849e", "#ff5fa8"),
  },
  {
    id: "bywoorde",
    title: "Bywoorde",
    englishTitle: "Adverbs",
    icon: "Gauge",
    spriteRow: 3,
    thresholds: [20, 60, 120, 200, 300, 500],
    colors: levelColors("#86b3a0", "#1fd7a0"),
  },
  {
    id: "voornaamwoorde",
    title: "Voornaamwoorde",
    englishTitle: "Pronouns",
    icon: "UserRound",
    spriteRow: 4,
    thresholds: [20, 60, 120, 200, 300, 500],
    colors: levelColors("#9f8fb3", "#8a4dff"),
  },
  {
    id: "voorsetsels",
    title: "Voorsetsels",
    englishTitle: "Prepositions",
    icon: "MapPin",
    spriteRow: null,
    thresholds: [20, 60, 120, 200, 300, 500],
    colors: levelColors("#b3a86e", "#ffd400"),
  },
  {
    id: "voegwoorde",
    title: "Voegwoorde",
    englishTitle: "Conjunctions",
    icon: "Link",
    spriteRow: null,
    thresholds: [20, 60, 120, 200, 300, 500],
    colors: levelColors("#b38686", "#ff4d4d"),
  },
  {
    id: "tydsvorme",
    title: "Tydsvorme",
    englishTitle: "Tenses",
    icon: "Clock",
    spriteRow: null,
    thresholds: [20, 60, 120, 200, 300, 500],
    colors: levelColors("#8690b3", "#4d6aff"),
  },
];

export function findTopic(topicId) {
  return topics.find((topic) => topic.id === topicId) || null;
}
