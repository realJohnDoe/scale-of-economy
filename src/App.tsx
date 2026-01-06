import React from "react";
import { circlesData } from "./data";
import Circle from "./Circle";
import InfoBox from "./InfoBox";
import Overlay from "./Overlay";
import { getSortingOffsets } from "./geometry"; // Removed TARGET_DIAMETER_REM from import

// --- The React Component ---
function App() {
  const [selectedId, setSelectedId] = React.useState(1);
  const [orderBy, setOrderBy] = React.useState<
    "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson"
  >("yearlyTurnOver");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [paddingX, setPaddingX] = React.useState(0);
  const [itemSpacingPx, setItemSpacingPx] = React.useState(0); // New state for dynamic spacing

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const targetDiameter = 20; // rem
  const targetDiameterPx = targetDiameter * 16; // using REM_TO_PX from geometry.ts

  // Use the new getSortingOffsets function with dynamically measured itemSpacingPx
  const sortedCirclesWithOffsets = React.useMemo(() => {
    // If itemSpacingPx is 0 or no circles, return a simple array without offsets.
    // This also handles the initial state before itemSpacingPx is measured.
    if (itemSpacingPx === 0 || circlesData.length === 0) {
      return circlesData.map((circle) => ({ circle, offsetX: 0 }));
    }

    const offsetsMap = getSortingOffsets(circlesData, itemSpacingPx, orderBy);
    // Convert the Map to an array of objects that include the original circle data and its offset
    return circlesData.map((circle) => ({
      circle,
      offsetX: offsetsMap.get(circle.id) || 0, // Get the offset from the map
    }));
  }, [orderBy, itemSpacingPx, circlesData]); // Depend on itemSpacingPx and circlesData

  const selectNextCircle = () => {
    const currentIndex = sortedCirclesWithOffsets.findIndex(
      (item) => item.circle.id === selectedId
    );
    if (currentIndex < sortedCirclesWithOffsets.length - 1) {
      setSelectedId(sortedCirclesWithOffsets[currentIndex + 1].circle.id);
    }
  };

  const selectPreviousCircle = () => {
    const currentIndex = sortedCirclesWithOffsets.findIndex(
      (item) => item.circle.id === selectedId
    );
    if (currentIndex > 0) {
      setSelectedId(sortedCirclesWithOffsets[currentIndex - 1].circle.id);
    }
  };

  const isUserScrollingRef = React.useRef(false);
  const scrollEndTimeout = React.useRef<number | null>(null);

  // New useEffect to measure item spacing dynamically
  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer && circlesData.length > 1 && itemSpacingPx === 0) {
      // Find two adjacent circles to measure the distance
      // Assuming circles have IDs like "circle-1", "circle-2"
      const firstCircle = scrollContainer.querySelector('#circle-1') as HTMLElement;
      const secondCircle = scrollContainer.querySelector('#circle-2') as HTMLElement;

      console.log('--- Spacing Debug ---');
      console.log('targetDiameter:', targetDiameter);
      console.log('targetDiameterPx:', targetDiameterPx);


      if (firstCircle && secondCircle) {
        console.log('firstCircle.offsetLeft:', firstCircle.offsetLeft);
        console.log('secondCircle.offsetLeft:', secondCircle.offsetLeft);
        const measuredSpacing = secondCircle.offsetLeft - firstCircle.offsetLeft;
        console.log('measuredSpacing:', measuredSpacing);
        setItemSpacingPx(measuredSpacing);
        console.log('setItemSpacingPx called with:', measuredSpacing);
      } else {
        console.log('Could not find firstCircle or secondCircle to measure spacing.');
      }
      console.log('--- End Spacing Debug ---');
    }
  }, [circlesData, itemSpacingPx]); // Corrected dependency array

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
        const circleCenter = circle.offsetLeft + circle.offsetWidth / 2;
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
      const newPaddingX = (window.innerWidth - targetDiameterPx) / 2;
      setPaddingX(Math.max(0, newPaddingX)); // Ensure padding is not negative
    };

    calculatePadding(); // Calculate on mount
    window.addEventListener("resize", calculatePadding); // Recalculate on resize

    return () => {
      window.removeEventListener("resize", calculatePadding); // Cleanup
    };
  }, [targetDiameterPx]);

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
          className="flex flex-row items-center flex-1 space-x-8 snap-x snap-mandatory overflow-x-scroll"
          style={{
            paddingLeft: `${paddingX}px`,
            paddingRight: `${paddingX}px`,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {sortedCirclesWithOffsets.map((item) => {
            const { circle, offsetX } = item;
            const scaleFactor = 1; // scaleFactor will be calculated by getVisualTransforms later
            const isSelected = circle.id === selectedId;

            return (
              <div
                key={circle.id}
                id={`circle-${circle.id}`}
                className="relative flex flex-col items-center justify-center space-y-4 shrink-0 snap-center"
                style={{
                  transform: `translateX(${offsetX}px)`,
                  transition: 'transform 0.5s ease-in-out', // Smooth transition for reordering
                }}
              >
                {/* Container for the visual circle */}
                <div
                  className="origin-bottom transition-transform duration-500 ease-in-out"
                  style={{
                    width: `${targetDiameter}rem`,
                    height: `${targetDiameter}rem`,
                    transform: `scale(${scaleFactor})`,
                  }}
                >
                  <Circle circle={circle} isSelected={isSelected} />
                </div>
                {/* Container for the InfoBox */}
                <div>
                  <InfoBox circle={circle} isSelected={isSelected} />
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
