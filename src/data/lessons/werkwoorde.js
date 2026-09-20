const lesson = {
  topicId: "werkwoorde",
  title: "Werkwoorde",
  englishTitle: "Verbs",
  vocabulary: [
    { af: "werkwoord", en: "verb" },
    { af: "hardloop", en: "run" },
    { af: "eet", en: "eat" },
    { af: "speel", en: "play" },
    { af: "lees", en: "read" },
    { af: "slaap", en: "sleep" },
  ],
  passage: {
    af: "Elke oggend eet ek ontbyt. Daarna lees ek 'n boek en speel ek buite. Snags slaap ek vroeg.",
    en: "Every morning I eat breakfast. Afterwards I read a book and play outside. At night I sleep early.",
  },
  questions: [
    {
      af: "Watter woord is 'n werkwoord?",
      en: "Which word is a verb?",
      options: ["hardloop", "boek", "mooi"],
      correctIndex: 0,
    },
    {
      af: "'n Werkwoord wys 'n...",
      en: "A verb shows an...",
      options: ["aksie", "kleur", "plek"],
      correctIndex: 0,
    },
    {
      af: "Wat doen die kind in die oggend?",
      en: "What does the child do in the morning?",
      options: ["slaap", "eet ontbyt", "speel buite"],
      correctIndex: 1,
    },
    {
      af: "Wat beteken 'slaap' in Engels?",
      en: "What does 'slaap' mean in English?",
      options: ["play", "sleep", "read"],
      correctIndex: 1,
    },
  ],
};

export default lesson;
