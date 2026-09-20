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
      {
        af: "Wat beteken 'ek' in Engels?",
        en: "What does 'ek' mean in English?",
        options: ["you", "I", "he"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'jy' in Engels?",
        en: "What does 'jy' mean in English?",
        options: ["you", "she", "they"],
        correctIndex: 0,
      },
      {
        af: "Wat is die naam van die boetie?",
        en: "What is the little brother's name?",
        options: ["Jan", "Pieter", "Piet"],
        correctIndex: 1,
      },
      {
        af: "Wat doen hulle elke dag?",
        en: "What do they do every day?",
        options: ["speel saam", "eet saam", "slaap"],
        correctIndex: 0,
      },
      {
        af: "Watter woord is NIE 'n voornaamwoord nie?",
        en: "Which word is NOT a pronoun?",
        options: ["hy", "boetie", "sy"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'hy' in Engels?",
        en: "What does 'hy' mean in English?",
        options: ["she", "he", "they"],
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
