import React from "react";
import { circlesData } from "./data";
import Circle from "./Circle";
import InfoBox from "./InfoBox";
import Overlay from "./Overlay";

// --- The React Component ---
function App() {
  const [selectedId, setSelectedId] = React.useState(1);
  const [orderBy, setOrderBy] = React.useState<
    "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson"
  >("yearlyTurnOver");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [paddingX, setPaddingX] = React.useState(0);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const sortedCircles = React.useMemo(() => {
    const sortedData = [...circlesData];
    sortedData.sort((a, b) => {
      switch (orderBy) {
        case "numberOfPersons":
          return a.numberOfPersons - b.numberOfPersons;
        case "yearlyTurnOver":
          return a.yearlyTurnOver - b.yearlyTurnOver;
        case "turnoverPerPerson":
          const turnoverA = a.numberOfPersons
            ? a.yearlyTurnOver / a.numberOfPersons
            : 0;
          const turnoverB = b.numberOfPersons
            ? b.yearlyTurnOver / b.numberOfPersons
            : 0;
          return turnoverA - turnoverB;
        default:
          return 0;
      }
    });
    return sortedData;
  }, [orderBy]);

  const targetDiameter = 20; // rem
  const targetDiameterPx = targetDiameter * 16; // assuming 1rem = 16px

  const selectNextCircle = () => {
    const currentIndex = sortedCircles.findIndex((c) => c.id === selectedId);
    if (currentIndex < sortedCircles.length - 1) {
      setSelectedId(sortedCircles[currentIndex + 1].id);
    }
  };

  const selectPreviousCircle = () => {
    const currentIndex = sortedCircles.findIndex((c) => c.id === selectedId);
    if (currentIndex > 0) {
      setSelectedId(sortedCircles[currentIndex - 1].id);
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
  }, [selectedId, sortedCircles]);

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      scrollContainer.scrollBy({
        left: event.deltaY,
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
          {sortedCircles.map((circle) => {
            const scaleFactor = 1;
            const isSelected = circle.id === selectedId;

            return (
              <div
                key={circle.id}
                className="relative flex flex-col items-center justify-center space-y-4 shrink-0 snap-center"
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
