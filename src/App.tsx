import React from "react";

// --- Types ---
type CircleData = {
  id: number;
  name: string;
  numberOfPersons: number;
  yearlyTurnOver: number; // Explicitly declared
};

// --- Constants ---
const circlesData: CircleData[] = [
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
    numberOfPersons: 2000000,
    yearlyTurnOver: 700000000000,
  },
  {
    id: 8,
    name: "Germany",
    numberOfPersons: 80000000,
    yearlyTurnOver: 5000000000000,
  },
  {
    id: 9,
    name: "Bosch",
    numberOfPersons: 400000,
    yearlyTurnOver: 90000000000,
  },
  {
    id: 10,
    name: "China",
    numberOfPersons: 1000000000,
    yearlyTurnOver: 40000000000000,
  },
  {
    id: 11,
    name: "India",
    numberOfPersons: 1000000000,
    yearlyTurnOver: 20000000000000,
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
    numberOfPersons: 2000000,
    yearlyTurnOver: 600000000000,
  },
  {
    id: 16,
    name: "State Grid Corporation of China",
    numberOfPersons: 1000000,
    yearlyTurnOver: 500000000000,
  },
  {
    id: 17,
    name: "Africa",
    numberOfPersons: 1000000000,
    yearlyTurnOver: 3000000000000,
  },
];

// --- Helper Functions ---
function formatToOneSignificantDigit(
  num: number,
  isCurrency: boolean = false
): string {
  const prefix = isCurrency ? "$" : "";
  if (num === 0) return prefix + "0";

  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  const power = Math.floor(Math.log10(absNum));
  const factor = 10 ** power;
  const rounded = Math.round(absNum / factor) * factor;

  if (rounded >= 1.0e12) return prefix + sign + rounded / 1.0e12 + " trillion";
  if (rounded >= 1.0e9) return prefix + sign + rounded / 1.0e9 + " billion";
  if (rounded >= 1.0e6) return prefix + sign + rounded / 1.0e6 + " million";
  if (rounded >= 1.0e3) return prefix + sign + rounded / 1.0e3 + " thousand";

  return prefix + sign + rounded;
}

// --- Pure Geometric Calculation Function ---
function calculatePositions(
  areas: number[],
  selectedIndex: number,
  targetDiameter: number,
  fixedDist: number
): number[] {
  if (selectedIndex < 0 || selectedIndex >= areas.length) return [];

  const anchorArea = areas[selectedIndex];

  const getDisplayDiameter = (area: number) => {
    return targetDiameter * Math.sqrt(area / anchorArea);
  };

  const calculateDeltaX = (d1: number, d2: number): number => {
    const r1 = d1 / 2;
    const r2 = d2 / 2;
    const fixedDistance = fixedDist; // Use passed in fixedDist
    const hypotenuse = r1 + fixedDistance + r2;
    const vertical = Math.abs(r1 - r2);
    return Math.sqrt(hypotenuse ** 2 - vertical ** 2);
  };

  const displayDiameters = areas.map(getDisplayDiameter);
  const selectedCircleDisplayRadius = targetDiameter / 2;

  const sortedIndices = [...areas.keys()].sort((a, b) => areas[a] - areas[b]);
  const anchorSortedIndex = sortedIndices.indexOf(selectedIndex);

  const posXValues: number[] = new Array(areas.length);
  posXValues[selectedIndex] = 0; // posX is in units of selected radius
  let currentPosRem = 0;

  // Right side of anchor in sorted list
  for (let i = anchorSortedIndex + 1; i < sortedIndices.length; i++) {
    const prevSortedIdx = sortedIndices[i - 1];
    const currentSortedIdx = sortedIndices[i];
    currentPosRem += calculateDeltaX(
      displayDiameters[prevSortedIdx],
      displayDiameters[currentSortedIdx]
    );
    posXValues[currentSortedIdx] = currentPosRem / selectedCircleDisplayRadius;
  }

  // Left side of anchor in sorted list
  currentPosRem = 0;
  for (let i = anchorSortedIndex - 1; i >= 0; i--) {
    const prevSortedIdx = sortedIndices[i + 1];
    const currentSortedIdx = sortedIndices[i];
    currentPosRem -= calculateDeltaX(
      displayDiameters[currentSortedIdx],
      displayDiameters[prevSortedIdx]
    );
    posXValues[currentSortedIdx] = currentPosRem / selectedCircleDisplayRadius;
  }

  return posXValues;
}

// --- The React Component ---
function App() {
  const [selectedId, setSelectedId] = React.useState(2);

  const targetDiameter = 20; // rem
  const fixedDistance = 3; // rem

  const areas = circlesData.map((c) => c.numberOfPersons);
  const selectedIndex = circlesData.findIndex((c) => c.id === selectedId);

  const posXValues = calculatePositions(
    areas,
    selectedIndex,
    targetDiameter,
    fixedDistance
  );

  const anchorPersons =
    circlesData.find((c) => c.id === selectedId)?.numberOfPersons || 1;
  const getDisplayDiameter = (persons: number) =>
    targetDiameter * Math.sqrt(persons / anchorPersons);

  return (
    <div className="relative w-screen h-screen">
      {circlesData.map((circle, index) => {
        const posX = posXValues[index];
        if (posX === undefined) return null;

        const diameter = getDisplayDiameter(circle.numberOfPersons);
        const selectedCircleRadius = targetDiameter / 2;

        const wrapperStyle = {
          left: `calc(50% + ${posX * selectedCircleRadius}rem)`,
          transition: "left 0.5s ease-in-out",
        };

        const scaleFactor = diameter / targetDiameter;
        const innerStyle = {
          width: `${targetDiameter}rem`,
          height: `${targetDiameter}rem`,
          transform: `scale(${scaleFactor})`,
          transition: "transform 0.5s ease-in-out",
        };

        const isSelected = circle.id === selectedId;
        const bgColor = isSelected ? "bg-yellow-400" : "bg-gray-500";

        // Calculate daily turnover
        const dailyTurnover = circle.yearlyTurnOver / 365;
        const formattedDailyTurnover = formatToOneSignificantDigit(
          dailyTurnover,
          true
        );
        const formattedPersons = formatToOneSignificantDigit(
          circle.numberOfPersons
        );

        return (
          <div
            key={circle.id}
            onClick={() => setSelectedId(circle.id)}
            style={wrapperStyle}
            className="absolute bottom-[10vh] -translate-x-1/2 cursor-pointer"
          >
            <div
              style={innerStyle}
              className={`${bgColor} rounded-full flex justify-center items-center text-black font-bold p-2 text-center origin-bottom`}
            >
              <div className="flex flex-col items-center">
                <span
                  style={{
                    fontSize: `1.5rem`,
                    lineHeight: "1",
                  }}
                >
                  {circle.name}
                </span>
                <span
                  style={{
                    fontSize: `0.75rem`,
                    lineHeight: "1",
                  }}
                >
                  Persons: {formattedPersons}
                </span>
                <span
                  style={{
                    fontSize: `0.75rem`,
                    lineHeight: "1",
                  }}
                >
                  Daily Turnover: {formattedDailyTurnover}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
