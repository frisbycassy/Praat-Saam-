// Byvoeglike Naamwoorde (Adjectives) - lesson 1 written; lessons 2-5 still to come.
const lessons = [
  {
    title: "Byvoeglike Naamwoorde",
    englishTitle: "Adjectives",
    vocabulary: [
      { af: "byvoeglike naamwoord", en: "adjective" },
      { af: "groot", en: "big" },
      { af: "klein", en: "small" },
      { af: "mooi", en: "pretty" },
      { af: "vinnig", en: "fast" },
      { af: "geel", en: "yellow" },
    ],
    passage: {
      af: "Ons het 'n groot geel huis. My klein hondjie is baie vinnig. Die tuin is mooi.",
      en: "We have a big yellow house. My small puppy is very fast. The garden is pretty.",
    },
    questions: [
      {
        af: "Watter woord is 'n byvoeglike naamwoord?",
        en: "Which word is an adjective?",
        options: ["huis", "groot", "het"],
        correctIndex: 1,
      },
      {
        af: "'n Byvoeglike naamwoord beskryf 'n...",
        en: "An adjective describes a...",
        options: ["naamwoord", "werkwoord", "syfer"],
        correctIndex: 0,
      },
      {
        af: "Watter kleur is die huis in die storie?",
        en: "What colour is the house in the story?",
        options: ["rooi", "geel", "blou"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'vinnig' in Engels?",
        en: "What does 'vinnig' mean in English?",
        options: ["slow", "fast", "small"],
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
