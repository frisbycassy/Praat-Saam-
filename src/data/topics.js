// The site is organized around grammar/language-structure topics. Each
// topic has up to 5 lessons; finishing lesson N unlocks that topic's
// badge N, rendered as an original SVG shield (see BadgeIcon) tinted
// with that topic's colors - muted for lesson 1, vivid for lesson 5.
import { levelColors } from "../utils/colors";

export const topics = [
  {
    id: "naamwoorde",
    title: "Naamwoorde",
    englishTitle: "Nouns",
    icon: "Package",
    colors: levelColors("#8fa3b3", "#17b6e0", 5),
  },
  {
    id: "werkwoorde",
    title: "Werkwoorde",
    englishTitle: "Verbs",
    icon: "Zap",
    colors: levelColors("#b3927a", "#ff8a3d", 5),
  },
  {
    id: "byvoeglike-naamwoorde",
    title: "Byvoeglike Naamwoorde",
    englishTitle: "Adjectives",
    icon: "Palette",
    colors: levelColors("#b3849e", "#ff5fa8", 5),
  },
  {
    id: "bywoorde",
    title: "Bywoorde",
    englishTitle: "Adverbs",
    icon: "Gauge",
    colors: levelColors("#86b3a0", "#1fd7a0", 5),
  },
  {
    id: "voornaamwoorde",
    title: "Voornaamwoorde",
    englishTitle: "Pronouns",
    icon: "UserRound",
    colors: levelColors("#9f8fb3", "#8a4dff", 5),
  },
  {
    id: "voorsetsels",
    title: "Voorsetsels",
    englishTitle: "Prepositions",
    icon: "MapPin",
    colors: levelColors("#b3a469", "#e0a800", 5),
  },
  {
    id: "voegwoorde",
    title: "Voegwoorde",
    englishTitle: "Conjunctions",
    icon: "Link",
    colors: levelColors("#b38686", "#ff4d4d", 5),
  },
  {
    id: "tydsvorme",
    title: "Tydsvorme",
    englishTitle: "Tenses",
    icon: "Clock",
    colors: levelColors("#8690b3", "#4d6aff", 5),
  },
];

export function findTopic(topicId) {
  return topics.find((topic) => topic.id === topicId) || null;
}
