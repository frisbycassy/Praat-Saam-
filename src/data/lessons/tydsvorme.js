// Tydsvorme (Tenses) - lesson 1 written; lessons 2-5 still to come.
const lessons = [
  {
    title: "Tydsvorme",
    englishTitle: "Tenses",
    vocabulary: [
      { af: "tydsvorm", en: "tense" },
      { af: "gister", en: "yesterday" },
      { af: "vandag", en: "today" },
      { af: "môre", en: "tomorrow" },
      { af: "was", en: "was" },
      { af: "sal", en: "will" },
    ],
    passage: {
      af: "Gister het ek gelees. Vandag speel ek buite. Môre sal ek swembad toe gaan.",
      en: "Yesterday I read. Today I play outside. Tomorrow I will go to the swimming pool.",
    },
    questions: [
      {
        af: "Watter woord wys die verlede tyd (past)?",
        en: "Which word shows the past tense?",
        options: ["speel", "het gelees", "sal gaan"],
        correctIndex: 1,
      },
      {
        af: "'n Tydsvorm vertel ons wanneer iets...",
        en: "A tense tells us when something...",
        options: ["gebeur", "lyk", "klink"],
        correctIndex: 0,
      },
      {
        af: "Wat gaan die kind môre doen?",
        en: "What is the child going to do tomorrow?",
        options: ["lees", "speel buite", "swembad toe gaan"],
        correctIndex: 2,
      },
      {
        af: "Wat beteken 'sal' in Engels (in hierdie sin)?",
        en: "What does 'sal' mean in English (in this sentence)?",
        options: ["did", "will", "is"],
        correctIndex: 1,
      },
      {
        af: "Wat het die kind gister gedoen?",
        en: "What did the child do yesterday?",
        options: ["gespeel", "gelees", "geswem"],
        correctIndex: 1,
      },
      {
        af: "Wat doen die kind vandag?",
        en: "What does the child do today?",
        options: ["lees", "speel buite", "swem"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'gister' in Engels?",
        en: "What does 'gister' mean in English?",
        options: ["today", "tomorrow", "yesterday"],
        correctIndex: 2,
      },
      {
        af: "Wat beteken 'môre' in Engels?",
        en: "What does 'môre' mean in English?",
        options: ["yesterday", "today", "tomorrow"],
        correctIndex: 2,
      },
      {
        af: "Watter woord wys die toekomende tyd (future)?",
        en: "Which word shows the future tense?",
        options: ["het gelees", "speel", "sal gaan"],
        correctIndex: 2,
      },
      {
        af: "Wat beteken 'vandag' in Engels?",
        en: "What does 'vandag' mean in English?",
        options: ["yesterday", "today", "tomorrow"],
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
