// Bywoorde (Adverbs) - lesson 1 written; lessons 2-5 still to come.
const lessons = [
  {
    title: "Bywoorde",
    englishTitle: "Adverbs",
    vocabulary: [
      { af: "bywoord", en: "adverb" },
      { af: "stadig", en: "slowly" },
      { af: "hard", en: "loudly" },
      { af: "gister", en: "yesterday" },
      { af: "buite", en: "outside" },
      { af: "weer", en: "again" },
    ],
    passage: {
      af: "Sy sing hard en dans vinnig. Gister het ons buite gespeel. Ek wil dit weer doen.",
      en: "She sings loudly and dances fast. Yesterday we played outside. I want to do it again.",
    },
    questions: [
      {
        af: "Watter woord is 'n bywoord?",
        en: "Which word is an adverb?",
        options: ["hond", "stadig", "tafel"],
        correctIndex: 1,
      },
      {
        af: "'n Bywoord vertel ons meer oor 'n...",
        en: "An adverb tells us more about a...",
        options: ["werkwoord", "naamwoord alleen", "kleur"],
        correctIndex: 0,
      },
      {
        af: "Wanneer het hulle buite gespeel?",
        en: "When did they play outside?",
        options: ["vandag", "gister", "môre"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'weer' in Engels (in hierdie sin)?",
        en: "What does 'weer' mean in English (in this sentence)?",
        options: ["weather", "again", "never"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'hard' in Engels (in hierdie sin)?",
        en: "What does 'hard' mean in English (in this sentence)?",
        options: ["soft", "loudly", "slowly"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'stadig' in Engels?",
        en: "What does 'stadig' mean in English?",
        options: ["fast", "slowly", "loudly"],
        correctIndex: 1,
      },
      {
        af: "Hoe sing sy?",
        en: "How does she sing?",
        options: ["stadig", "sag", "hard"],
        correctIndex: 2,
      },
      {
        af: "Waar het hulle gespeel?",
        en: "Where did they play?",
        options: ["binne", "buite", "by die skool"],
        correctIndex: 1,
      },
      {
        af: "Watter woord is NIE 'n bywoord nie?",
        en: "Which word is NOT an adverb?",
        options: ["stadig", "hond", "hard"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'buite' in Engels?",
        en: "What does 'buite' mean in English?",
        options: ["inside", "outside", "above"],
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
