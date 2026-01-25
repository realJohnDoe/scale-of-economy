// --- Types ---
export type Source = {
  name: string;
  url: string;
};

export type CircleData = {
  id: number;
  name: string;
  groupPredicate:
  | "living in"
  | "living in the"
  | "working at"
  | "working at the"
  | "attending"
  | "associated with"
  | null;
  numberOfPersons: number;
  turnOverPredicate?: string;
  yearlyTurnOver: number;
  context?: string;
  imageFileName: string | null;
  sources: Source[];
};

const EARN_PREDICATE = "earning each day"
const STORE_PREDICATE = "bringing in each day"
const COUNTRY_PREDICATE = "generating each day"
const COMPANY_PREDICATE = "turning over each day"

// --- Constants ---
export const circlesData: CircleData[] = [
  {
    id: 1,
    name: "You",
    groupPredicate: null,
    numberOfPersons: 1,
    turnOverPredicate: EARN_PREDICATE,
    yearlyTurnOver: 69433,
    context: "Assuming you earn as much as an average German",
    imageFileName: "images/you.webp",
    sources: [
      {
        name: "Statista",
        url: "https://www.statista.com/statistics/416207/average-annual-wages-germany-y-on-y-in-euros/"
      }
    ],
  },
  {
    id: 2,
    name: "A typical Family",
    groupPredicate: "living in",
    numberOfPersons: 3,
    turnOverPredicate: EARN_PREDICATE,
    yearlyTurnOver: 138866,
    context: "Assuming two adults with an average German salary and one child",
    imageFileName: "images/family.webp",
    sources: [
      {
        name: "Statista",
        url: "https://www.statista.com/statistics/416207/average-annual-wages-germany-y-on-y-in-euros/"
      }
    ],
  },
  {
    id: 3,
    name: "A typical circle of friends",
    groupPredicate: null,
    numberOfPersons: 30,
    turnOverPredicate: EARN_PREDICATE,
    yearlyTurnOver: 1040000,
    context: "Assuming 15 working adults with an average German salary",
    imageFileName: "images/friends.webp",
    sources: [
      {
        name: "Statista",
        url: "https://www.statista.com/statistics/416207/average-annual-wages-germany-y-on-y-in-euros/"
      }
    ],
  },
  {
    id: 7,
    name: "an average Walmart store",
    groupPredicate: "working at",
    numberOfPersons: 195,
    turnOverPredicate: STORE_PREDICATE,
    yearlyTurnOver: 63200000,
    context: "Walmart is the world's largest company by revenue",
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
    groupPredicate: "living in",
    numberOfPersons: 83000000,
    turnOverPredicate: COUNTRY_PREDICATE,
    yearlyTurnOver: 5010000000000,
    context: "Germany is the country with the third-largest economy in the World and the home country of the author of this web site",
    imageFileName: "images/germany.webp",
    sources: [
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Germany"
      }
    ],
  },
  {
    id: 9,
    name: "Bosch",
    groupPredicate: "working at",
    numberOfPersons: 418000,
    turnOverPredicate: COMPANY_PREDICATE,
    yearlyTurnOver: 90300000000,
    context: "The author of this web site is working for Bosch",
    imageFileName: "images/bosch.webp",
    sources: [
      {
        name: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Bosch_(company)"
      }
    ],
  },
  {
    id: 10,
    name: "China",
    groupPredicate: "living in",
    numberOfPersons: 1400000000,
    turnOverPredicate: COUNTRY_PREDICATE,
    yearlyTurnOver: 19000000000000,
    context: "China is the the second-most populous country and the country with the second-biggest economy",
    imageFileName: "images/china.webp",
    sources: [],
  },
  {
    id: 11,
    name: "India",
    groupPredicate: "living in",
    numberOfPersons: 1430000000,
    turnOverPredicate: COUNTRY_PREDICATE,
    yearlyTurnOver: 4200000000000,
    context: "India is the most populous country and the country with the fifth-biggest economy",
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
