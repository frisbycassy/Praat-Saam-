// Voegwoorde (Conjunctions) - lesson 1 written; lessons 2-5 still to come.
const lessons = [
  {
    title: "Voegwoorde",
    englishTitle: "Conjunctions",
    vocabulary: [
      { af: "voegwoord", en: "conjunction" },
      { af: "en", en: "and" },
      { af: "maar", en: "but" },
      { af: "want", en: "because" },
      { af: "of", en: "or" },
      { af: "toe", en: "then" },
    ],
    passage: {
      af: "Ek wil speel, maar ek moet eers my huiswerk doen. Ek is moeg, want ek het vroeg opgestaan.",
      en: "I want to play, but I first have to do my homework. I am tired, because I woke up early.",
    },
    questions: [
      {
        af: "Watter woord is 'n voegwoord?",
        en: "Which word is a conjunction?",
        options: ["speel", "maar", "huiswerk"],
        correctIndex: 1,
      },
      {
        af: "'n Voegwoord verbind twee sinne of...",
        en: "A conjunction joins two sentences or...",
        options: ["woorde", "kleure", "syfers"],
        correctIndex: 0,
      },
      {
        af: "Hoekom is die kind moeg?",
        en: "Why is the child tired?",
        options: ["hy het gespeel", "hy het vroeg opgestaan", "hy het geëet"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'of' in Engels?",
        en: "What does 'of' mean in English?",
        options: ["and", "or", "but"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'maar' in Engels?",
        en: "What does 'maar' mean in English?",
        options: ["and", "but", "because"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'want' in Engels?",
        en: "What does 'want' mean in English?",
        options: ["because", "or", "then"],
        correctIndex: 0,
      },
      {
        af: "Wat moet die kind eers doen voor hy speel?",
        en: "What must the child do first before he plays?",
        options: ["slaap", "huiswerk doen", "eet"],
        correctIndex: 1,
      },
      {
        af: "Watter woord is NIE 'n voegwoord nie?",
        en: "Which word is NOT a conjunction?",
        options: ["en", "moeg", "maar"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'en' in Engels?",
        en: "What does 'en' mean in English?",
        options: ["or", "and", "but"],
        correctIndex: 1,
      },
      {
        af: "'n Voegwoord help ons om sinne...",
        en: "A conjunction helps us to... sentences",
        options: ["te verkort", "te verbind", "te vertaal"],
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
