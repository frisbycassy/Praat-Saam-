// A real, working sample lesson for "Inligtingstekste" (Information Texts),
// the first theme of Term 1. This is the pattern every future lesson file
// should follow: a short bilingual reading passage, a vocabulary list, and
// a multiple-choice quiz. themeId must match the id used in curriculum.js.

const lesson = {
  themeId: "term1-inligtingstekste",
  title: "Die Plakkaat by die Skool",
  englishTitle: "The Poster at School",
  vocabulary: [
    { af: "plakkaat", en: "poster" },
    { af: "grafiek", en: "graph" },
    { af: "tabel", en: "table" },
    { af: "advertensie", en: "advertisement" },
    { af: "byskrif", en: "caption" },
    { af: "inligting", en: "information" },
  ],
  passage: {
    af: "Ons skool het 'n groot plakkaat by die hoofingang opgesit. Die plakkaat wys 'n grafiek van al die klasse se punte. Onder die grafiek is 'n kort byskrif wat verduidelik wat die syfers beteken.",
    en: "Our school put up a big poster at the main entrance. The poster shows a graph of all the classes' points. Below the graph is a short caption explaining what the numbers mean.",
  },
  questions: [
    {
      af: "Watter woord beteken 'poster' in Afrikaans?",
      en: "Which word means 'poster' in Afrikaans?",
      options: ["plakkaat", "grafiek", "tabel"],
      correctIndex: 0,
    },
    {
      af: "'n Grafiek wys...",
      en: "A graph shows...",
      options: [
        "prente van diere",
        "syfers en inligting",
        "name van kinders",
      ],
      correctIndex: 1,
    },
    {
      af: "Wat beteken 'byskrif' in Engels?",
      en: "What does 'byskrif' mean in English?",
      options: ["caption", "table", "advertisement"],
      correctIndex: 0,
    },
    {
      af: "Waar het die skool die plakkaat opgesit?",
      en: "Where did the school put up the poster?",
      options: [
        "by die biblioteek",
        "by die hoofingang",
        "in die klaskamer",
      ],
      correctIndex: 1,
    },
  ],
};

export default lesson;
