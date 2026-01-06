import React from "react";
import { circlesData } from "./data";
import Dropdown from "./Dropdown";
import Circle from "./Circle";
import InfoBox from "./InfoBox";

// --- The React Component ---
function App() {
  const [selectedId, setSelectedId] = React.useState(1);
  const [orderBy, setOrderBy] = React.useState<
    "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson"
  >("yearlyTurnOver");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const targetDiameter = 20; // rem

  const selectNextCircle = () => {
    const currentIndex = circlesData.findIndex((c) => c.id === selectedId);
    if (currentIndex < circlesData.length - 1) {
      setSelectedId(circlesData[currentIndex + 1].id);
    }
  };

  const selectPreviousCircle = () => {
    const currentIndex = circlesData.findIndex((c) => c.id === selectedId);
    if (currentIndex > 0) {
      setSelectedId(circlesData[currentIndex - 1].id);
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
  }, [selectedId]);


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
    <div className="flex flex-col items-center min-h-dvh">
      <div className="text-3xl font-bold text-primary my-4">
        How many people are...
      </div>

      <div
        className="flex flex-row items-center w-full flex-1 space-x-8 px-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {circlesData.map((circle) => {
          const scaleFactor = 1;
          const isSelected = circle.id === selectedId;

          return (
            <div
              key={circle.id}
              className="relative flex flex-col items-center justify-center space-y-4" 
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
      <div className="my-4">
        <Dropdown
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </div>
  );
}

export default App;
