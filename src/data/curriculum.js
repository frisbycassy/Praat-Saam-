// The full Grade 4 Afrikaans FAL year, structured to match the CAPS Annual
// Teaching Plan: 4 terms, each split into the themes/weeks a teacher would
// actually work through. `hasLesson: true` marks themes that already have a
// real interactive lesson wired up in `src/data/lessons`. The rest are
// placeholders so the map for the whole year is visible, and new lessons
// can be filled in later without changing this shape.

export const terms = [
  {
    id: "kwartaal-1",
    number: 1,
    title: "Kwartaal 1",
    subtitle: "Inligting & Verhale",
    englishSubtitle: "Information & Stories",
    themes: [
      {
        id: "term1-inligtingstekste",
        title: "Inligtingstekste",
        englishTitle: "Information Texts",
        weeks: "Week 1-2",
        skillFocus: ["Lees en Kyk", "Skryf en Aanbied"],
        hasLesson: true,
      },
      {
        id: "term1-kortverhale",
        title: "Kortverhale",
        englishTitle: "Short Stories",
        weeks: "Week 3-4",
        skillFocus: ["Lees en Kyk"],
        hasLesson: false,
      },
      {
        id: "term1-verhalende-skryfwerk",
        title: "Verhalende Skryfwerk",
        englishTitle: "Narrative Writing",
        weeks: "Week 5-6",
        skillFocus: ["Skryf en Aanbied"],
        hasLesson: false,
      },
      {
        id: "term1-instruksies",
        title: "Instruksies (Resepte)",
        englishTitle: "Instructions (Recipes)",
        weeks: "Week 7-8",
        skillFocus: ["Lees en Kyk", "Taalstrukture"],
        hasLesson: false,
      },
      {
        id: "term1-visuele-geletterdheid",
        title: "Visuele Geletterdheid",
        englishTitle: "Visual Literacy (Posters)",
        weeks: "Week 9-10",
        skillFocus: ["Lees en Kyk"],
        hasLesson: false,
      },
    ],
  },
  {
    id: "kwartaal-2",
    number: 2,
    title: "Kwartaal 2",
    subtitle: "Gedigte, Weer & Gesprekke",
    englishSubtitle: "Poetry, Weather & Dialogue",
    themes: [
      {
        id: "term2-gedigte",
        title: "Gedigte",
        englishTitle: "Poetry",
        weeks: "Week 1-2",
        skillFocus: ["Lees en Kyk", "Luister en Praat"],
        hasLesson: false,
      },
      {
        id: "term2-weerberigte",
        title: "Weerberigte",
        englishTitle: "Weather Reports",
        weeks: "Week 3-4",
        skillFocus: ["Skryf en Aanbied", "Taalstrukture"],
        hasLesson: false,
      },
      {
        id: "term2-gesprekke",
        title: "Gesprekke",
        englishTitle: "Dialogue",
        weeks: "Week 5-6",
        skillFocus: ["Luister en Praat", "Skryf en Aanbied"],
        hasLesson: false,
      },
      {
        id: "term2-instruksies-veiligheid",
        title: "Instruksies (Veiligheid)",
        englishTitle: "Instructions (Safety)",
        weeks: "Week 7-8",
        skillFocus: ["Lees en Kyk"],
        hasLesson: false,
      },
    ],
  },
  {
    id: "kwartaal-3",
    number: 3,
    title: "Kwartaal 3",
    subtitle: "Volksverhale & Kreatiewe Projek",
    englishSubtitle: "Folklore & Creative Project",
    themes: [
      {
        id: "term3-volksverhale",
        title: "Volksverhale",
        englishTitle: "Folklore (Myths & Legends)",
        weeks: "Week 1-2",
        skillFocus: ["Lees en Kyk", "Luister en Praat"],
        hasLesson: false,
      },
      {
        id: "term3-projek-navorsing",
        title: "Kreatiewe Projek: Navorsing",
        englishTitle: "Creative Project: Research",
        weeks: "Week 3-4",
        skillFocus: ["Skryf en Aanbied"],
        hasLesson: false,
      },
      {
        id: "term3-projek-skryfwerk",
        title: "Kreatiewe Projek: Skryfwerk",
        englishTitle: "Creative Project: Writing",
        weeks: "Week 5-6",
        skillFocus: ["Skryf en Aanbied"],
        hasLesson: false,
      },
      {
        id: "term3-gedigte-gevorderd",
        title: "Gedigte (Gevorderd)",
        englishTitle: "Poetry (Advanced)",
        weeks: "Week 7-8",
        skillFocus: ["Lees en Kyk", "Taalstrukture"],
        hasLesson: false,
      },
      {
        id: "term3-advertensies",
        title: "Advertensies",
        englishTitle: "Advertisements",
        weeks: "Week 9-10",
        skillFocus: ["Lees en Kyk", "Skryf en Aanbied"],
        hasLesson: false,
      },
    ],
  },
  {
    id: "kwartaal-4",
    number: 4,
    title: "Kwartaal 4",
    subtitle: "Drama, Nuus & Eksamens",
    englishSubtitle: "Drama, News & Exam Prep",
    themes: [
      {
        id: "term4-kortverhale",
        title: "Kortverhale",
        englishTitle: "Short Stories",
        weeks: "Week 1-2",
        skillFocus: ["Lees en Kyk", "Skryf en Aanbied"],
        hasLesson: false,
      },
      {
        id: "term4-drama",
        title: "Drama",
        englishTitle: "Drama",
        weeks: "Week 3-4",
        skillFocus: ["Skryf en Aanbied", "Taalstrukture"],
        hasLesson: false,
      },
      {
        id: "term4-nuusberigte",
        title: "Nuusberigte",
        englishTitle: "News Reports",
        weeks: "Week 5-6",
        skillFocus: ["Lees en Kyk", "Skryf en Aanbied"],
        hasLesson: false,
      },
      {
        id: "term4-mondeling",
        title: "Mondelinge Voorbereiding",
        englishTitle: "Oral Preparation",
        weeks: "Week 7-8",
        skillFocus: ["Luister en Praat"],
        hasLesson: false,
      },
    ],
  },
];

export function findTerm(termId) {
  return terms.find((term) => term.id === termId);
}

export function findTheme(themeId) {
  for (const term of terms) {
    const theme = term.themes.find((item) => item.id === themeId);
    if (theme) return { theme, term };
  }
  return null;
}
