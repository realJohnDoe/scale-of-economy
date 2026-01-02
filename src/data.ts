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
    yearlyTurnOver: 40000,
    predicate: null,
    imageFileName: "images/you.png",
    sources: [],
  },
  {
    id: 2,
    name: "A typical Family",
    numberOfPersons: 4,
    yearlyTurnOver: 90000,
    predicate: "living in",
    imageFileName: "images/family.png",
    sources: [],
  },
  {
    id: 3,
    name: "A typical circle of friends",
    numberOfPersons: 30,
    yearlyTurnOver: 1000000,
    predicate: null,
    imageFileName: null,
    sources: [],
  },
  {
    id: 4,
    name: "A typical Village",
    numberOfPersons: 200,
    yearlyTurnOver: 10000000,
    predicate: "living in",
    imageFileName: null,
    sources: [],
  },
  {
    id: 5,
    name: "Town",
    numberOfPersons: 10000,
    yearlyTurnOver: 400000000,
    predicate: "living in",
    imageFileName: null,
    sources: [],
  },
  {
    id: 6,
    name: "A typical City",
    numberOfPersons: 1000000,
    yearlyTurnOver: 40000000000,
    predicate: "living in",
    imageFileName: null,
    sources: [],
  },
  {
    id: 7,
    name: "Walmart",
    numberOfPersons: 2100000,
    yearlyTurnOver: 681000000000,
    predicate: "working at",
    imageFileName: "images/walmart.png",
    sources: [],
  },
  {
    id: 8,
    name: "Germany",
    numberOfPersons: 83000000,
    yearlyTurnOver: 5000000000000,
    predicate: "living in",
    imageFileName: "images/germany.png",
    sources: [],
  },
  {
    id: 9,
    name: "Bosch",
    numberOfPersons: 418000,
    yearlyTurnOver: 90000000000,
    predicate: "working at",
    imageFileName: "images/bosch.png",
    sources: [],
  },
  {
    id: 10,
    name: "China",
    numberOfPersons: 1400000000,
    yearlyTurnOver: 19000000000000,
    predicate: "living in",
    imageFileName: "images/china.png",
    sources: [],
  },
  {
    id: 11,
    name: "India",
    numberOfPersons: 1430000000,
    yearlyTurnOver: 4200000000000,
    predicate: "living in",
    imageFileName: "images/india.png",
    sources: [],
  },
  {
    id: 12,
    name: "World",
    numberOfPersons: 8300000000,
    yearlyTurnOver: 117000000000000,
    predicate: "living in the",
    imageFileName: "images/world.png",
    sources: [],
  },
  {
    id: 13,
    name: "Elon Musk",
    numberOfPersons: 1,
    yearlyTurnOver: 300000000000,
    predicate: null,
    imageFileName: null,
    sources: [],
  },
  {
    id: 14,
    name: "USA",
    numberOfPersons: 340000000,
    yearlyTurnOver: 30600000000000,
    predicate: "living in the",
    imageFileName: "images/usa.png",
    sources: [],
  },
  {
    id: 15,
    name: "Amazon",
    numberOfPersons: 1556000,
    yearlyTurnOver: 638000000000,
    predicate: "working at",
    imageFileName: "images/amazon.png",
    sources: [],
  },
  {
    id: 16,
    name: "State Grid Corporation of China",
    numberOfPersons: 1361000,
    yearlyTurnOver: 546000000000,
    predicate: "working at the",
    imageFileName: "images/state-grid.png",
    sources: [],
  },
  {
    id: 17,
    name: "Africa",
    numberOfPersons: 1390000000,
    yearlyTurnOver: 2820000000000,
    predicate: "living in",
    imageFileName: "images/africa.png",
    sources: [],
  },
  {
    id: 18,
    name: "Stuttgart",
    numberOfPersons: 612000,
    yearlyTurnOver: 59000000000,
    predicate: "living in",
    imageFileName: "images/stuttgart.png",
    sources: [],
  },
  {
    id: 19,
    name: "OpenAI",
    numberOfPersons: 3000,
    yearlyTurnOver: 3700000000,
    predicate: "working at",
    imageFileName: null,
    sources: [],
  },
  {
    id: 20,
    name: "Malawi",
    predicate: "living in",
    numberOfPersons: 21240000,
    yearlyTurnOver: 13176000000,
    imageFileName: "images/malawi.png",
    sources: [{
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Malawi"
    }]
  },
  {
    id: 21,
    name: "A typical Super Market",
    predicate: "working at",
    numberOfPersons: 20,
    yearlyTurnOver: 10000000,
    imageFileName: null,
    sources: []
  },
  {
    id: 22,
    name: "Ukraine",
    predicate: "living in",
    numberOfPersons: 32862000,
    yearlyTurnOver: 205000000000,
    imageFileName: "images/ukraine.png",
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
    imageFileName: "images/eu.png",
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
    imageFileName: null,
    sources: [{
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/The_Lego_Group"
    }]
  }
];
