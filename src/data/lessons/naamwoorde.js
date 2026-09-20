// Naamwoorde (Nouns) - 5 lessons, each one lesson slot for the topic's
// rank badges (V, IV, III, II, star). This topic is fully written as the
// working example; other topics currently only have lesson 1 written.
const lessons = [
  {
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
  },
  {
    title: "Eiename en Soortname",
    englishTitle: "Proper and Common Nouns",
    vocabulary: [
      { af: "eiename", en: "proper noun" },
      { af: "soortnaam", en: "common noun" },
      { af: "Suid-Afrika", en: "South Africa" },
      { af: "Kaapstad", en: "Cape Town" },
      { af: "stad", en: "city" },
      { af: "land", en: "country" },
    ],
    passage: {
      af: "Suid-Afrika is 'n land. Kaapstad is 'n stad in Suid-Afrika. Elke stad het 'n naam.",
      en: "South Africa is a country. Cape Town is a city in South Africa. Every city has a name.",
    },
    questions: [
      {
        af: "Watter woord is 'n eiename (begin met 'n hoofletter)?",
        en: "Which word is a proper noun (starts with a capital letter)?",
        options: ["stad", "Kaapstad", "land"],
        correctIndex: 1,
      },
      {
        af: "'n Eiename is die spesifieke naam van 'n...",
        en: "A proper noun is the specific name of a...",
        options: ["plek of persoon", "kleur", "geluid"],
        correctIndex: 0,
      },
      {
        af: "Waar is Kaapstad?",
        en: "Where is Cape Town?",
        options: ["in Engeland", "in Suid-Afrika", "in Amerika"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'land' in Engels?",
        en: "What does 'land' mean in English?",
        options: ["city", "country", "name"],
        correctIndex: 1,
      },
    ],
  },
  {
    title: "Enkelvoud en Meervoud",
    englishTitle: "Singular and Plural",
    vocabulary: [
      { af: "enkelvoud", en: "singular" },
      { af: "meervoud", en: "plural" },
      { af: "kat", en: "cat" },
      { af: "katte", en: "cats" },
      { af: "appel", en: "apple" },
      { af: "appels", en: "apples" },
    ],
    passage: {
      af: "Ek het een kat, maar my buurvrou het drie katte. Sy het ook baie appels in haar mandjie.",
      en: "I have one cat, but my neighbour has three cats. She also has many apples in her basket.",
    },
    questions: [
      {
        af: "Wat is die meervoud van 'kat'?",
        en: "What is the plural of 'kat'?",
        options: ["kat", "katte", "katjie"],
        correctIndex: 1,
      },
      {
        af: "Meervoud beteken daar is meer as...",
        en: "Plural means there is more than...",
        options: ["een", "tien", "niks"],
        correctIndex: 0,
      },
      {
        af: "Hoeveel katte het die buurvrou?",
        en: "How many cats does the neighbour have?",
        options: ["een", "twee", "drie"],
        correctIndex: 2,
      },
      {
        af: "Wat beteken 'appels' in Engels?",
        en: "What does 'appels' mean in English?",
        options: ["apple", "apples", "basket"],
        correctIndex: 1,
      },
    ],
  },
  {
    title: "Verkleinwoorde",
    englishTitle: "Diminutives",
    vocabulary: [
      { af: "verkleinwoord", en: "diminutive" },
      { af: "hondjie", en: "puppy" },
      { af: "huisie", en: "little house" },
      { af: "boompie", en: "little tree" },
      { af: "boekie", en: "little book" },
    ],
    passage: {
      af: "In die tuin staan 'n klein boompie langs 'n huisie. My hondjie speel met 'n boekie.",
      en: "In the garden stands a little tree next to a little house. My puppy plays with a little book.",
    },
    questions: [
      {
        af: "Watter woord is 'n verkleinwoord?",
        en: "Which word is a diminutive?",
        options: ["huis", "huisie", "tuin"],
        correctIndex: 1,
      },
      {
        af: "'n Verkleinwoord wys iets is...",
        en: "A diminutive shows something is...",
        options: ["klein", "groot", "oud"],
        correctIndex: 0,
      },
      {
        af: "Waar staan die boompie?",
        en: "Where does the little tree stand?",
        options: ["in die kombuis", "langs 'n huisie", "op die tafel"],
        correctIndex: 1,
      },
      {
        af: "Wat beteken 'hondjie' in Engels?",
        en: "What does 'hondjie' mean in English?",
        options: ["big dog", "puppy", "cat"],
        correctIndex: 1,
      },
    ],
  },
  {
    title: "Naamwoorde Hersiening",
    englishTitle: "Nouns Review",
    vocabulary: [
      { af: "hersiening", en: "review" },
      { af: "dier", en: "animal" },
      { af: "plek", en: "place" },
      { af: "ding", en: "thing" },
      { af: "persoon", en: "person" },
    ],
    passage: {
      af: "'n Naamwoord kan 'n persoon, 'n dier, 'n plek of 'n ding wees. Elke naamwoord het 'n naam.",
      en: "A noun can be a person, an animal, a place or a thing. Every noun has a name.",
    },
    questions: [
      {
        af: "Watter EEN van hierdie is NIE 'n naamwoord nie?",
        en: "Which ONE of these is NOT a noun?",
        options: ["hond", "spring", "stad"],
        correctIndex: 1,
      },
      {
        af: "'n Naamwoord kan 'n persoon, dier, plek of...",
        en: "A noun can be a person, animal, place or...",
        options: ["ding", "kleur alleen", "geluid alleen"],
        correctIndex: 0,
      },
      {
        af: "Wat is 'n voorbeeld van 'n dier?",
        en: "What is an example of an animal?",
        options: ["hond", "huis", "boek"],
        correctIndex: 0,
      },
      {
        af: "Wat beteken 'plek' in Engels?",
        en: "What does 'plek' mean in English?",
        options: ["thing", "place", "person"],
        correctIndex: 1,
      },
    ],
  },
];

export default lessons;
