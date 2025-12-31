import React from "react";
import { circlesData } from "./data";
import Dropdown from "./Dropdown";
import Circle from "./Circle";

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
  const [orderBy, setOrderBy] = React.useState<
    "numberOfPersons" | "yearlyTurnOver"
  >("numberOfPersons");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const targetDiameter = 20; // rem
  const fixedDistance = 3; // rem

  const areas = circlesData.map((c) => c[orderBy]);
  const selectedIndex = circlesData.findIndex((c) => c.id === selectedId);

  const posXValues = calculatePositions(
    areas,
    selectedIndex,
    targetDiameter,
    fixedDistance
  );

  const anchorValue =
    circlesData.find((c) => c.id === selectedId)?.[orderBy] || 1;
  const getDisplayDiameter = (value: number) =>
    targetDiameter * Math.sqrt(value / anchorValue);

  const overlayPadding = 4; // rem
  const overlayWidth = targetDiameter + overlayPadding;
  const overlayStyle: React.CSSProperties = {
    top: "1rem",
    bottom: "5vh",
    left: `calc(50% - ${overlayWidth / 2}rem)`,
    width: `${overlayWidth}rem`,
    zIndex: 0,
  };

  return (
    <>
      <div className="absolute top-8 left-1/2 text-white -translate-x-1/2 text-3xl font-bold z-10">
        How many people are...
      </div>
      <Dropdown
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {selectedId && (
        <div
          className="absolute rounded-lg bg-gray-700 bg-opacity-30"
          style={overlayStyle}
        ></div>
      )}

      <div className="relative w-screen h-screen">
        {circlesData.map((circle, index) => {
          const posX = posXValues[index];
          if (posX === undefined) return null;

          const diameter = getDisplayDiameter(circle[orderBy]);
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

          return (
            <div
              key={circle.id}
              onClick={() => setSelectedId(circle.id)}
              style={wrapperStyle}
              className="absolute bottom-[10vh] -translate-x-1/2 cursor-pointer"
            >
              <div style={innerStyle} className="origin-bottom">
                <Circle
                  name={circle.name}
                  numberOfPersons={circle.numberOfPersons}
                  yearlyTurnOver={circle.yearlyTurnOver}
                  isSelected={isSelected}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
