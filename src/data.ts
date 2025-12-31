// --- Types ---
export type CircleData = {
  id: number;
  name: string;
  numberOfPersons: number;
  yearlyTurnOver: number; // Explicitly declared
};

// --- Constants ---
export const circlesData: CircleData[] = [
  { id: 1, name: "You", numberOfPersons: 1, yearlyTurnOver: 40000 },
  { id: 2, name: "Your Family", numberOfPersons: 4, yearlyTurnOver: 90000 },
  { id: 3, name: "Your Friends", numberOfPersons: 30, yearlyTurnOver: 1000000 },
  { id: 4, name: "A Village", numberOfPersons: 200, yearlyTurnOver: 10000000 },
  { id: 5, name: "Town", numberOfPersons: 10000, yearlyTurnOver: 400000000 },
  {
    id: 6,
    name: "City",
    numberOfPersons: 1000000,
    yearlyTurnOver: 40000000000,
  },
  {
    id: 7,
    name: "Walmart",
    numberOfPersons: 2100000,
    yearlyTurnOver: 681000000000,
  },
  {
    id: 8,
    name: "Germany",
    numberOfPersons: 83000000,
    yearlyTurnOver: 5000000000000,
  },
  {
    id: 9,
    name: "Bosch",
    numberOfPersons: 418000,
    yearlyTurnOver: 90000000000,
  },
  {
    id: 10,
    name: "China",
    numberOfPersons: 1400000000,
    yearlyTurnOver: 19000000000000,
  },
  {
    id: 11,
    name: "India",
    numberOfPersons: 1430000000,
    yearlyTurnOver: 4200000000000,
  },
  {
    id: 12,
    name: "World",
    numberOfPersons: 8000000000,
    yearlyTurnOver: 100000000000000,
  },
  {
    id: 13,
    name: "Elon Musk",
    numberOfPersons: 1,
    yearlyTurnOver: 300000000000,
  },
  {
    id: 14,
    name: "USA",
    numberOfPersons: 300000000,
    yearlyTurnOver: 30000000000000,
  },
  {
    id: 15,
    name: "Amazon",
    numberOfPersons: 1556000,
    yearlyTurnOver: 638000000000,
  },
  {
    id: 16,
    name: "State Grid Corporation of China",
    numberOfPersons: 1361000,
    yearlyTurnOver: 546000000000,
  },
  {
    id: 17,
    name: "Africa",
    numberOfPersons: 1000000000,
    yearlyTurnOver: 3000000000000,
  },
  {
    id: 18,
    name: "Stuttgart",
    numberOfPersons: 612000,
    yearlyTurnOver: 59000000000,
  },
  {
    id: 19,
    name: "OpenAI",
    numberOfPersons: 3000,
    yearlyTurnOver: 3700000000,
  },
];
