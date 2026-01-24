// --- Types ---
export type Source = {
  name: string;
  url: string;
};

export type CircleData = {
  id: number;
  name: string;
  numberOfPersons: number;
  yearlyTurnOver: number;
  groupPredicate:
  | "living in"
  | "living in the"
  | "working at"
  | "working at the"
  | "attending"
  | "associated with"
  | null;
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
    groupPredicate: null,
    imageFileName: "images/you.webp",
    sources: [],
  },
  {
    id: 2,
    name: "A typical Family",
    numberOfPersons: 4,
    yearlyTurnOver: 93600,
    groupPredicate: "living in",
    imageFileName: "images/family.webp",
    sources: [],
  },
  {
    id: 3,
    name: "A typical circle of friends",
    numberOfPersons: 30,
    yearlyTurnOver: 1400000,
    groupPredicate: null,
    imageFileName: "images/friends.webp",
    sources: [],
  },
  {
    id: 7,
    name: "an average Walmart store",
    numberOfPersons: 195,
    yearlyTurnOver: 63200000,
    groupPredicate: "working at",
    imageFileName: "images/walmart.webp",
    sources: [
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Walmart",
      },
    ],
  },
  {
    id: 8,
    name: "Germany",
    numberOfPersons: 83000000,
    yearlyTurnOver: 5000000000000,
    groupPredicate: "living in",
    imageFileName: "images/germany.webp",
    sources: [],
  },
  {
    id: 9,
    name: "Bosch",
    numberOfPersons: 418000,
    yearlyTurnOver: 90000000000,
    groupPredicate: "working at",
    imageFileName: "images/bosch.webp",
    sources: [],
  },
  {
    id: 10,
    name: "China",
    numberOfPersons: 1400000000,
    yearlyTurnOver: 19000000000000,
    groupPredicate: "living in",
    imageFileName: "images/china.webp",
    sources: [],
  },
  {
    id: 11,
    name: "India",
    numberOfPersons: 1430000000,
    yearlyTurnOver: 4200000000000,
    groupPredicate: "living in",
    imageFileName: "images/india.webp",
    sources: [],
  },
  {
    id: 12,
    name: "World",
    numberOfPersons: 8300000000,
    yearlyTurnOver: 117000000000000,
    groupPredicate: "living in the",
    imageFileName: "images/world.webp",
    sources: [],
  },
  {
    id: 13,
    name: "Elon Musk",
    numberOfPersons: 1,
    yearlyTurnOver: 300000000000,
    groupPredicate: null,
    imageFileName: "images/elon.webp",
    sources: [],
  },
  {
    id: 14,
    name: "USA",
    numberOfPersons: 340000000,
    yearlyTurnOver: 30600000000000,
    groupPredicate: "living in the",
    imageFileName: "images/usa.webp",
    sources: [],
  },
  {
    id: 15,
    name: "Amazon",
    numberOfPersons: 1556000,
    yearlyTurnOver: 638000000000,
    groupPredicate: "working at",
    imageFileName: "images/amazon.webp",
    sources: [],
  },
  {
    id: 16,
    name: "State Grid Corporation of China",
    numberOfPersons: 1361000,
    yearlyTurnOver: 546000000000,
    groupPredicate: "working at the",
    imageFileName: "images/state-grid.webp",
    sources: [],
  },
  {
    id: 17,
    name: "Africa",
    numberOfPersons: 1390000000,
    yearlyTurnOver: 2820000000000,
    groupPredicate: "living in",
    imageFileName: "images/africa.webp",
    sources: [],
  },
  {
    id: 18,
    name: "Stuttgart",
    numberOfPersons: 612000,
    yearlyTurnOver: 59000000000,
    groupPredicate: "living in",
    imageFileName: "images/stuttgart.webp",
    sources: [],
  },
  {
    id: 19,
    name: "OpenAI",
    numberOfPersons: 3000,
    yearlyTurnOver: 3700000000,
    groupPredicate: "working at",
    imageFileName: "images/open-ai.webp",
    sources: [],
  },
  {
    id: 20,
    name: "Malawi",
    groupPredicate: "living in",
    numberOfPersons: 21240000,
    yearlyTurnOver: 13176000000,
    imageFileName: "images/malawi.webp",
    sources: [
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Malawi",
      },
    ],
  },
  {
    id: 22,
    name: "Ukraine",
    groupPredicate: "living in",
    numberOfPersons: 32862000,
    yearlyTurnOver: 205000000000,
    imageFileName: "images/ukraine.webp",
    sources: [
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Ukraine",
      },
    ],
  },
  {
    id: 23,
    name: "European Union",
    groupPredicate: "living in the",
    numberOfPersons: 450000000,
    yearlyTurnOver: 21000000000000,
    imageFileName: "images/eu.webp",
    sources: [
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/European_Union",
      },
    ],
  },
  {
    id: 24,
    name: "The Lego Group",
    groupPredicate: "working at the",
    numberOfPersons: 31282,
    yearlyTurnOver: 11670000000,
    imageFileName: "images/lego.webp",
    sources: [
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/The_Lego_Group",
      },
    ],
  },
  {
    id: 25,
    name: "an average Aldi store",
    groupPredicate: "working at",
    numberOfPersons: 22,
    yearlyTurnOver: 8880000,
    imageFileName: "images/aldi.webp",
    sources: [
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Aldi",
      },
    ],
  },
  {
    id: 26,
    name: "an average Ikea store",
    groupPredicate: "working at",
    numberOfPersons: 460,
    yearlyTurnOver: 92300000,
    imageFileName: "images/ikea.webp",
    sources: [
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/IKEA",
      },
      {
        name: "Ikea",
        url: "https://www.ikea.com/global/en/our-business/how-we-work/year-in-review-fy25/",
      },
    ],
  },
  {
    id: 27,
    name: "Christiano Ronaldo",
    groupPredicate: null,
    numberOfPersons: 1,
    yearlyTurnOver: 275000000,
    imageFileName: "images/ronaldo.webp",
    sources: [
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Forbes_list_of_the_world%27s_highest-paid_athletes",
      },
    ],
  },
  {
    id: 28,
    name: "an average Taylor Swift concert",
    groupPredicate: "attending",
    numberOfPersons: 67785,
    yearlyTurnOver: 5089468750,
    imageFileName: "images/taylor-swift.webp",
    sources: [
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/List_of_highest-grossing_concert_tours",
      },
    ],
  },
  {
    id: 29,
    name: "Extreme Poverty",
    groupPredicate: "living in",
    numberOfPersons: 710000000,
    yearlyTurnOver: 492385000000,
    imageFileName: "images/extreme-poverty.webp",
    sources: [
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Extreme_poverty",
      },
    ],
  },
  {
    id: 30,
    name: "NASA",
    groupPredicate: "working at",
    numberOfPersons: 17960,
    yearlyTurnOver: 25400000000,
    imageFileName: "images/nasa.webp",
    sources: [
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/NASA",
      },
    ],
  },
  {
    id: 31,
    name: "Stanford University",
    groupPredicate: "associated with",
    numberOfPersons: 38200,
    yearlyTurnOver: 8900000000,
    imageFileName: "images/stanford.webp",
    sources: [
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Harvard_University",
      },
    ],
  },
];
