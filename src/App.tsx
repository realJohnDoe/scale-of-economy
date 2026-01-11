import React from "react";
import { circlesData } from "./data";
import Circle from "./Circle";
import InfoBox from "./InfoBox";
import { getSortingOffsets } from "./geometry";
import Dropdown from "./Dropdown";

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
        if (closestCircleId !== selectedId) {
          setSelectedId(closestCircleId);
        }
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

  const totalRailWidth =
    circlesData.length * itemSpacingPx - GAP_PX + paddingX * 2;

  return (
    <>
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="relative w-full h-full">
          {/* Title */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="text-3xl font-bold text-primary">
              How many people are...
            </div>
          </div>

          {/* Dropdown */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-auto">
            <Dropdown
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-20 bottom-20 z-0">
        <div className="w-[min(90vw,24rem)] h-full rounded-lg bg-gray-200" />
      </div>

      {/* --- Scrollable Content --- */}
      <div className="relative h-dvh overflow-hidden">
        {/* ===== Horizontal scroll container (owns scrollWidth) ===== */}
        <div
          ref={scrollContainerRef}
          className="relative h-full overflow-x-scroll overflow-y-hidden snap-x snap-mandatory"
          style={{
            paddingLeft: `${paddingX}px`,
            paddingRight: `${paddingX}px`,
          }}
        >
          {/* ===== Layout rail (geometry ONLY, no visuals) ===== */}
          <div
            className="flex"
            style={{
              gap: `${GAP_PX}px`,
            }}
          >
            {circlesData.map((circle) => (
              <div
                key={circle.id}
                id={`circle-${circle.id}`}
                className="snap-center"
                style={{
                  width: `${CIRCLE_DIAMETER_REM}rem`,
                  height: `${CIRCLE_DIAMETER_REM}rem`,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* ===== Global paint layer (visuals + transforms, clipped) ===== */}
          <div
            className="pointer-events-none absolute top-0 left-0 overflow-hidden"
            style={{
              width: `${totalRailWidth}px`,
              height: "100%", // fill scroll container vertically
            }}
          >
            {circlesData.map((circle, index) => {
              const selectedParams = offsetsMap.get(selectedId);
              const transformationParams = offsetsMap.get(circle.id);

              const offsetX =
                ((transformationParams?.oldIndexOffset ?? 0) +
                  (transformationParams?.newIndexOffset ?? 0)) *
                itemSpacingPx;

              const scaleFactor =
                (transformationParams?.scale ?? 1) /
                (selectedParams?.scale ?? 1);

              const scalingOffset =
                (transformationParams?.scalingOffset ?? 1) -
                (selectedParams?.scalingOffset ?? 1) * scaleFactor;

              const baseX = paddingX + index * itemSpacingPx;

              return (
                <div
                  key={circle.id}
                  className="absolute top-1/2"
                  style={{
                    left: baseX,
                    transform: `
                translate(0%, -50%)
                translateX(${offsetX}px)
              `,
                    willChange: "transform",
                    pointerEvents: circle.id === selectedId ? "auto" : "none",
                  }}
                >
                  <div className="flex flex-col items-center">
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
                      className="origin-top transition-transform duration-500 ease-in-out"
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
        </div>
      </div>
    </>
  );
}

export default App;
