import React from "react";

// --- Types ---
type CircleData = {
  id: number;
  name: string;
  numberOfPersons: number;
};

type PositionedCircle = {
  id: number;
  name: string;
  numberOfPersons: number;
  posX: number; // in units of the selected circle's on-screen radius
  diameter: number; // final on-screen diameter in rem
};

// --- Constants ---
const circlesData: CircleData[] = [
  { id: 1, name: "You", numberOfPersons: 1 },
  { id: 2, name: "Your Family", numberOfPersons: 4 },
  { id: 3, name: "Your Friends", numberOfPersons: 30 },
  { id: 4, name: "A Village", numberOfPersons: 200 },
];
const targetSelectedDiameter = 10; // rem

// --- Helper Functions ---
function calculateDeltaX(r1: number, r2: number): number {
  const fixedDistance = 3; // rem
  const hypotenuse = r1 + fixedDistance + r2;
  const vertical = Math.abs(r1 - r2);
  return Math.sqrt(hypotenuse ** 2 - vertical ** 2);
}

// --- Main Calculation Function ---
function calculatePositions(
  circles: CircleData[],
  selectedId: number
): PositionedCircle[] {
  const anchorCircleData = circles.find((c) => c.id === selectedId);
  if (!anchorCircleData) {
    console.error("Selected circle not found in data!");
    return [];
  }

  const getDisplayDiameter = (persons: number) =>
    targetSelectedDiameter *
    Math.sqrt(persons / anchorCircleData.numberOfPersons);

  // Create an intermediate structure with on-screen diameters
  const circlesWithDiams = circles.map((c) => ({
    ...c,
    diameter: getDisplayDiameter(c.numberOfPersons),
  }));

  const selectedCircleDisplayRadius = targetSelectedDiameter / 2; // This is our unit for posX

  const sortedByPersons = [...circlesWithDiams].sort(
    (a, b) => a.numberOfPersons - b.numberOfPersons
  );
  const anchorIndex = sortedByPersons.findIndex((c) => c.id === selectedId);
  if (anchorIndex === -1) return [];

  const posXValues: { [id: number]: number } = { [selectedId]: 0 };
  let currentPosRem = 0;

  // Right of anchor
  for (let i = anchorIndex + 1; i < sortedByPersons.length; i++) {
    const r1 = sortedByPersons[i - 1].diameter / 2;
    const r2 = sortedByPersons[i].diameter / 2;
    currentPosRem += calculateDeltaX(r1, r2);
    posXValues[sortedByPersons[i].id] =
      currentPosRem / selectedCircleDisplayRadius;
  }

  // Left of anchor
  currentPosRem = 0;
  for (let i = anchorIndex - 1; i >= 0; i--) {
    const r1 = sortedByPersons[i].diameter / 2;
    const r2 = sortedByPersons[i + 1].diameter / 2;
    currentPosRem -= calculateDeltaX(r1, r2);
    posXValues[sortedByPersons[i].id] =
      currentPosRem / selectedCircleDisplayRadius;
  }

  return circles.map((c) => ({
    ...c,
    posX: posXValues[c.id],
    diameter: getDisplayDiameter(c.numberOfPersons),
  }));
}

// --- The React Component ---
function App() {
  const [selectedId, setSelectedId] = React.useState(2);

  const positionedCircles = calculatePositions(circlesData, selectedId);
  const selectedCircleRadius = targetSelectedDiameter / 2;

  return (
    <div className="relative w-screen h-screen">
      {positionedCircles.map((circle) => {
        if (circle.posX === undefined) return null;
        const style = {
          width: `${circle.diameter}rem`,
          height: `${circle.diameter}rem`,
          left: `calc(50% + ${circle.posX * selectedCircleRadius}rem)`,
          transition: "all 0.5s ease-in-out",
        };
        const fontSize =
          1.5 *
          Math.sqrt(
            circle.numberOfPersons /
              (circlesData.find((c) => c.id === selectedId)?.numberOfPersons ||
                1)
          );
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
              <span style={{ fontSize: `${fontSize}rem`, lineHeight: "1" }}>
                {circle.name}
              </span>
              <span
                style={{ fontSize: `${fontSize * 0.5}rem`, lineHeight: "1" }}
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
