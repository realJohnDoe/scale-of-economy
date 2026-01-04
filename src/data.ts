// --- Types ---
export type Source = {
  name: string;
  url: string;
};

export type CircleData = {
  id: number;
  name: string;
  numberOfPersons: number;
  yearlyTurnOver: number; // Explicitly declared
  predicate: "living in" | "living in the" | "working at" | "working at the" | null;
  imageFileName: string | null;
  sources: Source[];
};

// --- Constants ---
export const circlesData: CircleData[] = [
  {
    id: 1,
    name: "You",
    numberOfPersons: 1,
    yearlyTurnOver: 46800,
    predicate: null,
    imageFileName: "images/you.webp",
    sources: [],
  },
  {
    id: 2,
    name: "A typical Family",
    numberOfPersons: 4,
    yearlyTurnOver: 93600,
    predicate: "living in",
    imageFileName: "images/family.webp",
    sources: [],
  },
  {
    id: 3,
    name: "A typical circle of friends",
    numberOfPersons: 30,
    yearlyTurnOver: 1400000,
    predicate: null,
    imageFileName: "images/friends.webp",
    sources: [],
  },
  // {
  //   id: 4,
  //   name: "A typical Village",
  //   numberOfPersons: 200,
  //   yearlyTurnOver: 10000000,
  //   predicate: "living in",
  //   imageFileName: null,
  //   sources: [],
  // },
  // {
  //   id: 5,
  //   name: "Town",
  //   numberOfPersons: 10000,
  //   yearlyTurnOver: 400000000,
  //   predicate: "living in",
  //   imageFileName: null,
  //   sources: [],
  // },
  // {
  //   id: 6,
  //   name: "A typical City",
  //   numberOfPersons: 1000000,
  //   yearlyTurnOver: 40000000000,
  //   predicate: "living in",
  //   imageFileName: null,
  //   sources: [],
  // },
  {
    id: 7,
    name: "an average Walmart store",
    numberOfPersons: 195,
    yearlyTurnOver: 63200000,
    predicate: "working at",
    imageFileName: "images/walmart.webp",
    sources: [{
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Walmart"
    }],
  },
  {
    id: 8,
    name: "Germany",
    numberOfPersons: 83000000,
    yearlyTurnOver: 5000000000000,
    predicate: "living in",
    imageFileName: "images/germany.webp",
    sources: [],
  },
  {
    id: 9,
    name: "Bosch",
    numberOfPersons: 418000,
    yearlyTurnOver: 90000000000,
    predicate: "working at",
    imageFileName: "images/bosch.webp",
    sources: [],
  },
  {
    id: 10,
    name: "China",
    numberOfPersons: 1400000000,
    yearlyTurnOver: 19000000000000,
    predicate: "living in",
    imageFileName: "images/china.webp",
    sources: [],
  },
  {
    id: 11,
    name: "India",
    numberOfPersons: 1430000000,
    yearlyTurnOver: 4200000000000,
    predicate: "living in",
    imageFileName: "images/india.webp",
    sources: [],
  },
  {
    id: 12,
    name: "World",
    numberOfPersons: 8300000000,
    yearlyTurnOver: 117000000000000,
    predicate: "living in the",
    imageFileName: "images/world.webp",
    sources: [],
  },
  {
    id: 13,
    name: "Elon Musk",
    numberOfPersons: 1,
    yearlyTurnOver: 300000000000,
    predicate: null,
    imageFileName: "images/elon.webp",
    sources: [],
  },
  {
    id: 14,
    name: "USA",
    numberOfPersons: 340000000,
    yearlyTurnOver: 30600000000000,
    predicate: "living in the",
    imageFileName: "images/usa.webp",
    sources: [],
  },
  {
    id: 15,
    name: "Amazon",
    numberOfPersons: 1556000,
    yearlyTurnOver: 638000000000,
    predicate: "working at",
    imageFileName: "images/amazon.webp",
    sources: [],
  },
  {
    id: 16,
    name: "State Grid Corporation of China",
    numberOfPersons: 1361000,
    yearlyTurnOver: 546000000000,
    predicate: "working at the",
    imageFileName: "images/state-grid.webp",
    sources: [],
  },
  {
    id: 17,
    name: "Africa",
    numberOfPersons: 1390000000,
    yearlyTurnOver: 2820000000000,
    predicate: "living in",
    imageFileName: "images/africa.webp",
    sources: [],
  },
  {
    id: 18,
    name: "Stuttgart",
    numberOfPersons: 612000,
    yearlyTurnOver: 59000000000,
    predicate: "living in",
    imageFileName: "images/stuttgart.webp",
    sources: [],
  },
  {
    id: 19,
    name: "OpenAI",
    numberOfPersons: 3000,
    yearlyTurnOver: 3700000000,
    predicate: "working at",
    imageFileName: "images/open-ai.webp",
    sources: [],
  },
  {
    id: 20,
    name: "Malawi",
    predicate: "living in",
    numberOfPersons: 21240000,
    yearlyTurnOver: 13176000000,
    imageFileName: "images/malawi.webp",
    sources: [{
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Malawi"
    }]
  },
  {
    id: 22,
    name: "Ukraine",
    predicate: "living in",
    numberOfPersons: 32862000,
    yearlyTurnOver: 205000000000,
    imageFileName: "images/ukraine.webp",
    sources: [{
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Ukraine"
    }
    ]
  },
  {
    id: 23,
    name: "European Union",
    predicate: "living in the",
    numberOfPersons: 450000000,
    yearlyTurnOver: 21000000000000,
    imageFileName: "images/eu.webp",
    sources: [{
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/European_Union"
    }]
  },
  {
    id: 24,
    name: "The Lego Group",
    predicate: "working at the",
    numberOfPersons: 31282,
    yearlyTurnOver: 11670000000,
    imageFileName: "images/lego.webp",
    sources: [{
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/The_Lego_Group"
    }]
  },
  {
    id: 25,
    name: "an average Aldi store",
    predicate: "working at",
    numberOfPersons: 22,
    yearlyTurnOver: 8880000,
    imageFileName: "images/aldi.webp",
    sources: [{
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Aldi"
    }]
  },
  {
    id: 26,
    name: "an average Ikea store",
    predicate: "working at",
    numberOfPersons: 460,
    yearlyTurnOver: 92300000,
    imageFileName: "images/ikea.webp",
    sources: [{
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/IKEA"
    }, {
      name: "Ikea",
      url: "https://www.ikea.com/global/en/our-business/how-we-work/year-in-review-fy25/"
    }]
  },
  {
    id: 27,
    name: "Christiano Ronaldo",
    predicate: null,
    numberOfPersons: 1,
    yearlyTurnOver: 275000000,
    imageFileName: "images/ronaldo.webp",
    sources: [{
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Forbes_list_of_the_world%27s_highest-paid_athletes"
    }]
  }
];
