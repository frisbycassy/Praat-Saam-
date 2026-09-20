const lesson = {
  topicId: "voorsetsels",
  title: "Voorsetsels",
  englishTitle: "Prepositions",
  vocabulary: [
    { af: "voorsetsel", en: "preposition" },
    { af: "in", en: "in" },
    { af: "op", en: "on" },
    { af: "onder", en: "under" },
    { af: "langs", en: "next to" },
    { af: "agter", en: "behind" },
  ],
  passage: {
    af: "Die kat sit op die stoel. Die bal rol onder die tafel. My tas staan langs die deur.",
    en: "The cat sits on the chair. The ball rolls under the table. My bag stands next to the door.",
  },
  questions: [
    {
      af: "Watter woord is 'n voorsetsel?",
      en: "Which word is a preposition?",
      options: ["kat", "onder", "rol"],
      correctIndex: 1,
    },
    {
      af: "'n Voorsetsel wys waar iets...",
      en: "A preposition shows where something...",
      options: ["is", "voel", "klink"],
      correctIndex: 0,
    },
    {
      af: "Waar rol die bal?",
      en: "Where does the ball roll?",
      options: ["op die stoel", "onder die tafel", "agter die deur"],
      correctIndex: 1,
    },
    {
      af: "Wat beteken 'langs' in Engels?",
      en: "What does 'langs' mean in English?",
      options: ["under", "next to", "behind"],
      correctIndex: 1,
    },
  ],
};

export default lesson;
