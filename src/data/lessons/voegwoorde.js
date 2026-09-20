const lesson = {
  topicId: "voegwoorde",
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
  ],
};

export default lesson;
