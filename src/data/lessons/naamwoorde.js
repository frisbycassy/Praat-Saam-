const lesson = {
  topicId: "naamwoorde",
  title: "Naamwoorde",
  englishTitle: "Nouns",
  vocabulary: [
    { af: "naamwoord", en: "noun" },
    { af: "meisie", en: "girl" },
    { af: "hond", en: "dog" },
    { af: "skool", en: "school" },
    { af: "boek", en: "book" },
    { af: "tafel", en: "table" },
  ],
  passage: {
    af: "Die meisie het 'n hond. Die hond hardloop na die skool. Op die tafel lê 'n boek.",
    en: "The girl has a dog. The dog runs to the school. A book lies on the table.",
  },
  questions: [
    {
      af: "Watter woord is 'n naamwoord?",
      en: "Which word is a noun?",
      options: ["hardloop", "hond", "na"],
      correctIndex: 1,
    },
    {
      af: "Naamwoorde is die name van mense, plekke of...",
      en: "Nouns are the names of people, places or...",
      options: ["dinge", "werkwoorde", "bywoorde"],
      correctIndex: 0,
    },
    {
      af: "Watter sin het 'n naamwoord?",
      en: "Which sentence has a noun?",
      options: ["Sy hardloop vinnig.", "Die hond blaf.", "Baie mooi!"],
      correctIndex: 1,
    },
    {
      af: "Wat beteken 'boek' in Engels?",
      en: "What does 'boek' mean in English?",
      options: ["table", "book", "school"],
      correctIndex: 1,
    },
  ],
};

export default lesson;
