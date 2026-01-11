import React from "react";
import { circlesData } from "./data";
import Circle from "./Circle";
import InfoBox from "./InfoBox";
import { getSortedCircles, getSortingOffsets } from "./geometry";
import AppHeader from "./AppHeader"; // Import AppHeader
import { ScrollSpace } from "./ScrollSpace";

// --- Debounce Utility ---
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: number;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => resolve(func(...args)), waitFor);
    });
}

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
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
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

  const isScrolling = React.useRef(false);

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || isScrolling.current) return;

    const targetIndex = idToIndex.get(selectedId);
    if (targetIndex === undefined) return;

    const targetScroll = targetIndex * itemSpacingPx;
    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  }, [selectedId, orderBy]);

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = debounce(() => {
      isScrolling.current = true;
      const centeredIndex = Math.round(
        scrollContainer.scrollLeft / itemSpacingPx
      );
      const newSelectedId = sortedCircles[centeredIndex]?.id;

      if (newSelectedId && newSelectedId !== selectedId) {
        setSelectedId(newSelectedId);
      }

      // Reset the flag after a short delay to re-enable programmatic scrolling
      setTimeout(() => {
        isScrolling.current = false;
      }, 100);
    }, 50); // Debounce scroll events

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [sortedCircles, selectedId, itemSpacingPx]);

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      scrollContainer.scrollBy({
        left: event.deltaY * 0.5,
        behavior: "smooth",
      });
    };

    scrollContainer.addEventListener("wheel", handleWheel);

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

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
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {circlesData.map((circle, index) => {
          const selectedParams = offsetsMap.get(selectedId);
          const transformationParams = offsetsMap.get(circle.id);

          const scalingOffset =
            ((transformationParams?.scalingOffset ?? 1) -
              (selectedParams?.scalingOffset ?? 1)) /
            (selectedParams?.scale ?? 1);
          const offsetX =
            // ((transformationParams?.oldIndexOffset ?? 0) +
            // (selectedParams?.newIndexOffset ?? 0) +
            scalingOffset * itemSpacingPx;

          const scaleFactor =
            (transformationParams?.scale ?? 1) / (selectedParams?.scale ?? 1);

          console.log(scalingOffset);

          return (
            <div
              key={circle.id}
              className="absolute"
              style={{
                top: "60%",
                left: "50%",
                transform: `
                              translate(-50%, -100%)
                              translateX(${offsetX + scalingOffset}px)
                              `,
                willChange: "transform",
                pointerEvents: circle.id === selectedId ? "auto" : "none",
              }}
            >
              <div className="relative">
                {/* Circle */}
                <div
                  className="origin-bottom transition-transform duration-500 ease-in-out"
                  style={{
                    width: `${CIRCLE_DIAMETER_REM}rem`,
                    height: `${CIRCLE_DIAMETER_REM}rem`,
                    transform: `scale(${Math.min(scaleFactor, 5)})`,
                  }}
                >
                  <Circle
                    circle={circle}
                    isSelected={circle.id === selectedId}
                  />
                </div>

                {/* InfoBox */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-80 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `scale(${scaleFactor})`,
                  }}
                >
                  <InfoBox
                    circle={circle}
                    isSelected={circle.id === selectedId}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
