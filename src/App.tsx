import React from "react";
import { circlesData } from "./data";
import Dropdown from "./Dropdown";
import Circle from "./Circle";

// --- Pure Geometric Calculation Function ---
function calculatePositions(
  areas: number[],
  selectedIndex: number,
  targetDiameter: number
): number[] {
  if (selectedIndex < 0 || selectedIndex >= areas.length) return [];

  const anchorArea = areas[selectedIndex];

  const getDisplayDiameter = (area: number) => {
    return targetDiameter * Math.sqrt(area / anchorArea);
  };

  const calculateDeltaX = (d1: number, d2: number): number => {
    const r1 = d1 / 2;
    const r2 = d2 / 2;
    const fixedDistance = 2; // Use passed in fixedDist
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

  const areas = circlesData.map((c) => c[orderBy]);
  const selectedIndex = circlesData.findIndex((c) => c.id === selectedId);

  const posXValues = calculatePositions(areas, selectedIndex, targetDiameter);

  const anchorValue =
    circlesData.find((c) => c.id === selectedId)?.[orderBy] || 1;
  const getDisplayDiameter = (value: number) =>
    targetDiameter * Math.sqrt(value / anchorValue);

  const selectNextCircle = () => {
    const selectedPosX = posXValues[selectedIndex];
    const positionsToTheRight = posXValues
      .map((posX, index) => ({ posX, index }))
      .filter((p) => p.posX > selectedPosX);

    if (positionsToTheRight.length > 0) {
      const nextCircle = positionsToTheRight.reduce((prev, curr) =>
        prev.posX < curr.posX ? prev : curr
      );
      setSelectedId(circlesData[nextCircle.index].id);
    }
  };

  const selectPreviousCircle = () => {
    const selectedPosX = posXValues[selectedIndex];
    const positionsToTheLeft = posXValues
      .map((posX, index) => ({ posX, index }))
      .filter((p) => p.posX < selectedPosX);

    if (positionsToTheLeft.length > 0) {
      const prevCircle = positionsToTheLeft.reduce((prev, curr) =>
        prev.posX > curr.posX ? prev : curr
      );
      setSelectedId(circlesData[prevCircle.index].id);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        selectNextCircle();
      } else if (event.key === "ArrowLeft") {
        selectPreviousCircle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedId, posXValues]);

  const [touchStart, setTouchStart] = React.useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;

    if (touchStart - touchEnd > 50) {
      // Swiped left
      selectNextCircle();
    }

    if (touchStart - touchEnd < -50) {
      // Swiped right
      selectPreviousCircle();
    }
  };

  return (
    <>
      <div className="absolute top-8 left-1/2 text-primary -translate-x-1/2 text-3xl font-bold z-10">
        How many people are...
      </div>
      <Dropdown
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {selectedId && (
        <div className="absolute rounded-lg bg-gray-200 top-4 bottom-4 z-0 w-96 left-1/2 -translate-x-1/2"></div>
      )}

      <div
        className="relative w-screen h-screen"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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
              style={wrapperStyle}
              className="absolute bottom-[20vh] -translate-x-1/2"
            >
              <div style={innerStyle} className="origin-bottom">
                <Circle circle={circle} isSelected={isSelected} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
