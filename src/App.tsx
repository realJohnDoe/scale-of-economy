import React from "react";

// --- Types ---
type CircleData = {
  id: number;
  name: string;
  numberOfPersons: number;
};

// --- Constants ---
const circlesData: CircleData[] = [
  { id: 1, name: "You", numberOfPersons: 1 },
  { id: 2, name: "Your Family", numberOfPersons: 4 },
  { id: 3, name: "Your Friends", numberOfPersons: 30 },
  { id: 4, name: "A Village", numberOfPersons: 200 },
];

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
    const hypotenuse = r1 + fixedDist + r2;
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

  const targetDiameter = 10; // rem
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

        const style = {
          width: `${diameter}rem`,
          height: `${diameter}rem`,
          left: `calc(50% + ${posX * selectedCircleRadius}rem)`,
          transition: "all 0.5s ease-in-out",
        };
        const fontSize = (1.5 * diameter) / targetDiameter;
        const isSelected = circle.id === selectedId;
        const bgColor = isSelected ? "bg-yellow-400" : "bg-gray-500";

        return (
          <div
            key={circle.id}
            onClick={() => setSelectedId(circle.id)}
            style={style}
            className={`${bgColor} rounded-full flex justify-center items-center text-black font-bold absolute bottom-[10vh] -translate-x-1/2 cursor-pointer p-2 text-center`}
          >
            <div className="flex flex-col items-center">
              <span
                style={{
                  fontSize: `${fontSize}rem`,
                  lineHeight: "1",
                  transition: "font-size 0.5s ease-in-out",
                }}
              >
                {circle.name}
              </span>
              <span
                style={{
                  fontSize: `${fontSize * 0.5}rem`,
                  lineHeight: "1",
                  transition: "font-size 0.5s ease-in-out",
                }}
              >
                {circle.numberOfPersons}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
