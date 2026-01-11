import React from "react";
import { circlesData } from "./data";
import Circle from "./Circle";
import InfoBox from "./InfoBox";
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
  const [selectedId, setSelectedId] = React.useState(1);
  const [orderBy, setOrderBy] = React.useState<
    "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson"
  >("yearlyTurnOver");
  // Removed itemSpacingPx state and its useEffect for dynamic measurement

  // Use the new getSortingOffsets function with dynamically measured itemSpacingPx
  const itemSpacingPx = CIRCLE_DIAMETER_PX + GAP_PX; // Derived from constants

  const offsetsMap = React.useMemo(() => {
    return getSortingOffsets(circlesData, orderBy);
  }, [orderBy]);

  const { sortedCircles, idToIndex } = React.useMemo(() => {
    const sorted = getSortedCircles(circlesData, orderBy);
    const map = new Map(sorted.map((c, i) => [c.id, i]));
    return { sortedCircles: sorted, idToIndex: map };
  }, [orderBy]);

  return (
    <>
      <AppHeader orderBy={orderBy} setOrderBy={setOrderBy} />
      <div className="relative h-dvh overflow-x-auto overflow-y-hidden">
        <ScrollSpace
          numItems={circlesData.length}
          itemDistance={itemSpacingPx}
          scrollToIndex={idToIndex.get(selectedId)}
          onIndexChange={(index) => {
            const id = sortedCircles[index]?.id;
            if (id && id !== selectedId) {
              setSelectedId(id);
            }
          }}
        />
      </div>
      <CirclesLayer
        selectedId={selectedId}
        itemSpacingPx={itemSpacingPx}
        offsetsMap={offsetsMap}
      />
    </>
  );
}

export default App;
