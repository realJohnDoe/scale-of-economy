import React from "react";
import { circlesData } from "./data";
import {
  getSortedCircles,
  getSortingOffsets,
  ITEM_SPACING_FACTOR,
} from "./geometry";
import AppHeader from "./AppHeader"; // Import AppHeader
import { ScrollSpace } from "./ScrollSpace";
import CirclesLayer from "./CirclesLayer";

// --- Constants ---
const REM_TO_PX = 16;

// --- The React Component ---
function App() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const floatingIndexRef = React.useRef(0);

  const programmaticChangeRef = React.useRef(false);
  const [orderBy, setOrderBy] = React.useState<
    "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson"
  >("yearlyTurnOver");
  // Removed itemSpacingPx state and its useEffect for dynamic measurement

  // Use the new getSortingOffsets function with dynamically measured itemSpacingPx

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

  // Compute circle size in pixels for scroll space
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [itemDistance, setItemDistance] = React.useState(() => {
    if (!containerRef.current) return ITEM_SPACING_FACTOR * 16 * REM_TO_PX; // fallback
    const style = getComputedStyle(containerRef.current);
    const circlePx = style.getPropertyValue("--circle");
    const px = circlePx.includes("rem")
      ? parseFloat(circlePx) * REM_TO_PX * ITEM_SPACING_FACTOR
      : parseFloat(circlePx);
    return px;
  });

  React.useLayoutEffect(() => {
    const updateItemDistance = () => {
      if (containerRef.current) {
        const style = getComputedStyle(containerRef.current);
        const circlePx = style.getPropertyValue("--circle");
        const px = circlePx.includes("rem")
          ? parseFloat(circlePx) * REM_TO_PX * ITEM_SPACING_FACTOR
          : parseFloat(circlePx);

        setItemDistance((prev) => (prev !== px ? px : prev));
      }
    };

    updateItemDistance(); // initial measurement
    const handleResize = () => {
      updateItemDistance();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative [--circle:16rem] md:[--circle:18rem] lg:[--circle:20rem]"
      >
        <AppHeader orderBy={orderBy} setOrderBy={handleOrderChange} />
        <div className="relative h-dvh overflow-x-auto overflow-y-hidden">
          <ScrollSpace
            numItems={circlesData.length}
            itemDistance={itemDistance}
            floatingIndexRef={floatingIndexRef}
            scrollToIndex={
              programmaticChangeRef.current ? selectedIndex : undefined
            }
            onIndexChange={(index) => {
              setSelectedIndex(index); // integer only
            }}
          />
        </div>
        <CirclesLayer
          floatingIndexRef={floatingIndexRef}
          selectedIndex={selectedIndex} // optional, for “isSelected” logic
          offsetsMap={offsetsMap}
          sortedCircles={sortedCircles}
        />
      </div>
    </>
  );
}

export default App;
