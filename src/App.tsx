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
  area: number;
  posX: number; // in units of the selected circle's radius
};

// --- Constants ---
const circlesData: CircleData[] = [
  { id: 1, name: "Team A", numberOfPersons: 1 },
  { id: 2, name: "Team B", numberOfPersons: 2 },
  { id: 3, name: "Team C", numberOfPersons: 10 },
  { id: 4, name: "Team D", numberOfPersons: 50 },
];

// --- Helper Functions ---
function getRadius(area: number): number {
  const baseDiameter = 7; // rem
  return (baseDiameter * Math.sqrt(area)) / 2;
}

function calculateDeltaX(area1: number, area2: number): number {
  const fixedDistance = 3; // rem
  const r1 = getRadius(area1);
  const r2 = getRadius(area2);
  const hypotenuse = r1 + fixedDistance + r2;
  const vertical = Math.abs(r1 - r2);
  return Math.sqrt(hypotenuse ** 2 - vertical ** 2);
}

// --- Main Calculation Function ---
function calculatePositions(
  circles: CircleData[],
  selectedId: number
): PositionedCircle[] {
  const getArea = (c: CircleData) => c.numberOfPersons;

  const anchorCircle = circles.find((c) => c.id === selectedId);
  if (!anchorCircle) {
    console.error("Selected circle not found in data!");
    return [];
  }

  const selectedCircleRadius = getRadius(getArea(anchorCircle)); // This is our unit

  const sortedByArea = [...circles].sort((a, b) => getArea(a) - getArea(b));
  const anchorIndex = sortedByArea.findIndex((c) => c.id === selectedId);

  if (anchorIndex === -1) return [];

  const posXValues: { [id: number]: number } = { [selectedId]: 0 };
  let currentPosRem = 0;

  for (let i = anchorIndex + 1; i < sortedByArea.length; i++) {
    currentPosRem += calculateDeltaX(
      getArea(sortedByArea[i - 1]),
      getArea(sortedByArea[i])
    );
    posXValues[sortedByArea[i].id] = currentPosRem / selectedCircleRadius;
  }

  currentPosRem = 0;
  for (let i = anchorIndex - 1; i >= 0; i--) {
    currentPosRem -= calculateDeltaX(
      getArea(sortedByArea[i]),
      getArea(sortedByArea[i + 1])
    );
    posXValues[sortedByArea[i].id] = currentPosRem / selectedCircleRadius;
  }

  return circles.map((c) => ({
    id: c.id,
    name: c.name,
    area: getArea(c),
    posX: posXValues[c.id],
  }));
}

// --- The React Component ---
function App() {
  const [selectedId, setSelectedId] = React.useState(2); // Default selection

  const positionedCircles = calculatePositions(circlesData, selectedId);
  const selectedCircle = circlesData.find((c) => c.id === selectedId);
  const selectedCircleRadius = selectedCircle
    ? getRadius(selectedCircle.numberOfPersons)
    : 0;

  return (
    <div className="relative w-screen h-screen">
      {positionedCircles.map((circle) => {
        if (circle.posX === undefined) return null;
        const diameter = getRadius(circle.area) * 2;
        const style = {
          width: `${diameter}rem`,
          height: `${diameter}rem`,
          left: `calc(50% + ${circle.posX * selectedCircleRadius}rem)`,
          transition: 'all 0.5s ease-in-out',
        };
        const fontSize = 1.5 * Math.sqrt(circle.area);
        const isSelected = circle.id === selectedId;
        const bgColor = isSelected ? "bg-yellow-400" : "bg-gray-500";

        return (
          <div
            key={circle.id}
            onClick={() => setSelectedId(circle.id)}
            style={style}
            className={`${bgColor} rounded-full flex justify-center items-center text-black font-bold absolute bottom-[10vh] -translate-x-1/2 cursor-pointer p-2 text-center`}
          >
            <span style={{ fontSize: `${fontSize}rem`, lineHeight: "1" }}>
              {circle.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default App;
