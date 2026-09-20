// The site is organized around grammar/language-structure topics. Each
// topic has up to 5 lessons; finishing lesson N unlocks that topic's
// rank badge N (V, IV, III, II, then a star for lesson 5) from
// src/assets/badge-sprite.png. spriteRow picks the topic's row there.
export const topics = [
  {
    id: "naamwoorde",
    title: "Naamwoorde",
    englishTitle: "Nouns",
    icon: "Package",
    color: "#7a2e12",
    spriteRow: 0,
  },
  {
    id: "werkwoorde",
    title: "Werkwoorde",
    englishTitle: "Verbs",
    icon: "Zap",
    color: "#b06a2e",
    spriteRow: 1,
  },
  {
    id: "byvoeglike-naamwoorde",
    title: "Byvoeglike Naamwoorde",
    englishTitle: "Adjectives",
    icon: "Palette",
    color: "#8a8f99",
    spriteRow: 2,
  },
  {
    id: "bywoorde",
    title: "Bywoorde",
    englishTitle: "Adverbs",
    icon: "Gauge",
    color: "#c9a02b",
    spriteRow: 3,
  },
  {
    id: "voornaamwoorde",
    title: "Voornaamwoorde",
    englishTitle: "Pronouns",
    icon: "UserRound",
    color: "#1f9c96",
    spriteRow: 4,
  },
  {
    id: "voorsetsels",
    title: "Voorsetsels",
    englishTitle: "Prepositions",
    icon: "MapPin",
    color: "#1f8f52",
    spriteRow: 5,
  },
  {
    id: "voegwoorde",
    title: "Voegwoorde",
    englishTitle: "Conjunctions",
    icon: "Link",
    color: "#8a7fd1",
    spriteRow: 6,
  },
  {
    id: "tydsvorme",
    title: "Tydsvorme",
    englishTitle: "Tenses",
    icon: "Clock",
    color: "#c22350",
    spriteRow: 7,
  },
];

export function findTopic(topicId) {
  return topics.find((topic) => topic.id === topicId) || null;
}
