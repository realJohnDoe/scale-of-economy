import React from "react";
import { circlesData } from "./data";
import Circle from "./Circle";
import InfoBox from "./InfoBox";
import Overlay from "./Overlay";
import { getSortingOffsets } from "./geometry";
import { type CircleData } from "./data"; // Import CircleData type

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

  const offsetsMap = React.useMemo(() => {
    return getSortingOffsets(circlesData, orderBy);
  }, [orderBy]);

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
  }, [selectedId, offsetsMap]); // Dependency updated

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
        const transformationParams = offsetsMap.get(circleId);
        const offsetX = transformationParams
          ? (transformationParams.oldIndexOffset +
              transformationParams.newIndexOffset) *
            itemSpacingPx
          : 0;
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
  }, [offsetsMap, itemSpacingPx]); // Dependency updated

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
          {circlesData.map((circle) => {
            const transformationParams = offsetsMap.get(circle.id);
            const oldIndexOffset = transformationParams?.oldIndexOffset ?? 0;
            const newIndexOffset = transformationParams?.newIndexOffset ?? 0;
            const scaleFactor = transformationParams?.scale ?? 1; // scaleFactor will be calculated by getVisualTransforms later
            const isSelected = circle.id === selectedId;

            return (
              <div
                key={circle.id}
                id={`circle-${circle.id}`}
                className="snap-center"
                style={{
                  width: `${CIRCLE_DIAMETER_REM}rem`,
                  flexShrink: 0,
                }}
              >
                <div
                  className="relative flex justify-center"
                  style={{
                    width: `${CIRCLE_DIAMETER_REM}rem`,
                    transform: `translateX(${
                      (oldIndexOffset + newIndexOffset) * itemSpacingPx
                    }px)`,
                  }}
                >
                  {/* Paint-only scale layer */}
                  <div className="flex flex-col items-center">
                    {/* Circle scales from bottom */}
                    <div
                      className="transition-transform duration-500 ease-in-out origin-bottom"
                      style={{
                        transform: `scale(${Math.min(scaleFactor, 2)})`,
                        width: `${CIRCLE_DIAMETER_REM}rem`,
                        height: `${CIRCLE_DIAMETER_REM}rem`,
                        willChange: "transform",
                      }}
                    >
                      <Circle circle={circle} isSelected={isSelected} />
                    </div>

                    {/* InfoBox scales from top */}
                    <div
                      className="transition-transform duration-500 ease-in-out origin-top"
                      style={{
                        transform: `scale(${Math.min(scaleFactor, 2)})`,
                        willChange: "transform",
                      }}
                    >
                      <InfoBox circle={circle} isSelected={isSelected} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
