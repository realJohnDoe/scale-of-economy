import React from "react";
import { circlesData } from "./data";
import Circle from "./Circle";
import InfoBox from "./InfoBox";
import Overlay from "./Overlay";
import { getSortingOffsets } from "./geometry"; // Removed TARGET_DIAMETER_REM from import

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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [paddingX, setPaddingX] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  // Removed itemSpacingPx state and its useEffect for dynamic measurement

  // Use the new getSortingOffsets function with dynamically measured itemSpacingPx
  const itemSpacingPx = CIRCLE_DIAMETER_PX + GAP_PX; // Derived from constants

  // Use the new getSortingOffsets function with dynamically measured itemSpacingPx
  const sortedCirclesWithOffsets = React.useMemo(() => {
    // If no circles, return a simple array without offsets.
    if (circlesData.length === 0) {
      return circlesData.map((circle) => ({ circle, offsetX: 0 }));
    }

    const offsetsMap = getSortingOffsets(circlesData, itemSpacingPx, orderBy);
    // Convert the Map to an array of objects that include the original circle data and its offset
    return circlesData.map((circle) => ({
      circle,
      offsetX: offsetsMap.get(circle.id) || 0, // Get the offset from the map
    }));
  }, [orderBy, circlesData, itemSpacingPx]); // Depend on itemSpacingPx (now a const) and circlesData

  const isUserScrollingRef = React.useRef(false);
  const scrollEndTimeout = React.useRef<number | null>(null);

  React.useEffect(() => {
    const circleElement = document.getElementById(`circle-${selectedId}`);
    if (circleElement && !isUserScrollingRef.current) {
      circleElement.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [selectedId, sortedCirclesWithOffsets]); // Dependency updated

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      isUserScrollingRef.current = true; // User is scrolling

      if (scrollEndTimeout.current) {
        clearTimeout(scrollEndTimeout.current);
      }
      scrollEndTimeout.current = window.setTimeout(() => {
        isUserScrollingRef.current = false; // User has stopped scrolling
      }, 100); // Reset flag after a short delay

      const containerCenter =
        scrollContainer.scrollLeft + scrollContainer.offsetWidth / 2;
      let closestCircleId: number | null = null;
      let minDistance = Infinity;

      const circles = scrollContainer.querySelectorAll('[id^="circle-"]');
      circles.forEach((circleElement) => {
        const circle = circleElement as HTMLElement;
        const circleId = parseInt(circle.id.split("circle-")[1], 10);
        const offsetX =
          sortedCirclesWithOffsets.find((item) => item.circle.id === circleId)
            ?.offsetX ?? 0;
        const circleCenter =
          circle.offsetLeft + offsetX + circle.offsetWidth / 2;
        const distance = Math.abs(containerCenter - circleCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestCircleId = parseInt(circle.id.split("circle-")[1], 10);
        }
      });

      if (closestCircleId !== null) {
        setSelectedId((prevId) => {
          if (prevId === (closestCircleId as number)) return prevId;
          return closestCircleId as number;
        });
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      if (scrollEndTimeout.current) {
        clearTimeout(scrollEndTimeout.current);
      }
    };
  }, [sortedCirclesWithOffsets]); // Dependency updated

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

  React.useEffect(() => {
    const calculatePadding = () => {
      const newPaddingX = (window.innerWidth - CIRCLE_DIAMETER_PX) / 2;
      setPaddingX(Math.max(0, newPaddingX)); // Ensure padding is not negative
    };

    calculatePadding(); // Calculate on mount
    window.addEventListener("resize", calculatePadding); // Recalculate on resize

    return () => {
      window.removeEventListener("resize", calculatePadding); // Cleanup
    };
  }, []);

  return (
    <>
      <Overlay
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* --- Scrollable Content --- */}
      <div className="flex min-h-dvh">
        <div
          ref={scrollContainerRef}
          className="flex items-center snap-x snap-mandatory overflow-x-scroll"
          style={{
            paddingLeft: `${paddingX}px`,
            paddingRight: `${paddingX}px`,
            gap: `${GAP_PX}px`,
          }}
        >
          {sortedCirclesWithOffsets.map((item) => {
            const { circle, offsetX } = item;
            const scaleFactor = 1; // scaleFactor will be calculated by getVisualTransforms later
            const isSelected = circle.id === selectedId;

            return (
              <div
                key={circle.id}
                id={`circle-${circle.id}`}
                className="snap-center relative flex flex-col items-center"
                style={{
                  width: `${CIRCLE_DIAMETER_REM}rem`,
                  transform: `translateX(${offsetX}px)`,
                  transition: "transform 0.5s ease-in-out", // Smooth transition for reordering
                }}
              >
                {/* Container for the visual circle */}
                <div
                  className="origin-bottom transition-transform duration-500 ease-in-out"
                  style={{
                    width: `${CIRCLE_DIAMETER_REM}rem`,
                    height: `${CIRCLE_DIAMETER_REM}rem`,
                    transform: `scale(${scaleFactor})`,
                  }}
                >
                  <Circle circle={circle} isSelected={isSelected} />
                </div>
                {/* InfoBox is now inside the same flex container */}
                <InfoBox circle={circle} isSelected={isSelected} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
