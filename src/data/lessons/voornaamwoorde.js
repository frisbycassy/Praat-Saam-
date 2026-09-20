// Voornaamwoorde (Pronouns) - lesson 1 written; lessons 2-5 still to come.
const lessons = [
  {
    title: "Voornaamwoorde",
    englishTitle: "Pronouns",
    vocabulary: [
      { af: "voornaamwoord", en: "pronoun" },
      { af: "ek", en: "I" },
      { af: "jy", en: "you" },
      { af: "hy", en: "he" },
      { af: "sy", en: "she" },
      { af: "hulle", en: "they" },
    ],
    passage: {
      af: "Ek het 'n boetie. Hy is jonger as ek. Sy naam is Pieter. Hulle speel saam elke dag.",
      en: "I have a little brother. He is younger than me. His name is Pieter. They play together every day.",
    },
    questions: [
      {
        af: "Watter woord is 'n voornaamwoord?",
        en: "Which word is a pronoun?",
        options: ["boetie", "hy", "naam"],
        correctIndex: 1,
      },
      {
        af: "'n Voornaamwoord staan in die plek van 'n...",
        en: "A pronoun stands in place of a...",
        options: ["naamwoord", "syfer", "kleur"],
        correctIndex: 0,
      },
      {
        af: "Wie is jonger in die storie?",
        en: "Who is younger in the story?",
        options: ["ek", "die boetie", "Pieter se pa"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'hulle' in Engels?",
        en: "What does 'hulle' mean in English?",
        options: ["we", "they", "you"],
        correctIndex: 1,
      },
    ],
  },
  null,
  null,
  null,
  null,
];

export default lessons;
