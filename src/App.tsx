import React from "react";
import { circlesData } from "./data";
import { getSortedCircles, getSortingOffsets } from "./geometry";
import AppHeader from "./AppHeader"; // Import AppHeader
import { ScrollSpace } from "./ScrollSpace";
import CirclesLayer from "./CirclesLayer";

// --- Constants ---
const REM_TO_PX = 16;
const CIRCLE_DIAMETER_REM = 20;
const CIRCLE_DIAMETER_PX = CIRCLE_DIAMETER_REM * REM_TO_PX;
const GAP_PX = 50; // Hardcoded gap between circles (e.g., equivalent to space-x-8)

// --- The React Component ---
function App() {
  const [selectedIndex, setSelectedIndex] = React.useState(0); // floating index in sortedCircles
  const programmaticChangeRef = React.useRef(false);
  const [orderBy, setOrderBy] = React.useState<
    "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson"
  >("yearlyTurnOver");
  // Removed itemSpacingPx state and its useEffect for dynamic measurement

  // Use the new getSortingOffsets function with dynamically measured itemSpacingPx
  const itemSpacingPx = CIRCLE_DIAMETER_PX + GAP_PX; // Derived from constants

  const offsetsMap = React.useMemo(() => {
    return getSortingOffsets(circlesData, orderBy);
  }, [orderBy]);

  const { sortedCircles } = React.useMemo(() => {
    const sorted = getSortedCircles(circlesData, orderBy);
    return { sortedCircles: sorted };
  }, [orderBy]);

  const handleOrderChange = (value: typeof orderBy) => {
    programmaticChangeRef.current = true;

    // Find the circleId that is currently selected
    const currentCircleId = sortedCircles[selectedIndex]?.id;

    setOrderBy(value);

    // After order changes, compute the new index that matches the same circleId
    const newIndex = getSortedCircles(circlesData, value).findIndex(
      (c) => c.id === currentCircleId
    );

    // Update selectedIndex to match the same circle
    if (newIndex !== -1) {
      setSelectedIndex(newIndex);
    }
  };

  React.useEffect(() => {
    programmaticChangeRef.current = false;
  }, [selectedIndex]);

  return (
    <>
      <AppHeader orderBy={orderBy} setOrderBy={handleOrderChange} />
      <div className="relative h-dvh overflow-x-auto overflow-y-hidden">
        <ScrollSpace
          numItems={circlesData.length}
          itemDistance={itemSpacingPx}
          scrollToIndex={
            programmaticChangeRef.current ? selectedIndex : undefined
          }
          onIndexChange={(index) => {
            setSelectedIndex(index); // now a float
          }}
        />
      </div>
      <CirclesLayer
        selectedIndex={selectedIndex}
        itemSpacingPx={itemSpacingPx}
        offsetsMap={offsetsMap}
        sortedCircles={sortedCircles}
      />
    </>
  );
}

export default App;
