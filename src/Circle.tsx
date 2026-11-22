import React from "react";
import { type CircleData } from "./data"; // Import CircleData type

interface CircleProps {
  circle: CircleData;
  isSelected: boolean;
}

const Circle: React.FC<CircleProps> = ({ circle, isSelected }) => {
  const { name, groupPredicate, imageFileName, trivia } = circle;
  const bgColor = isSelected ? "bg-yellow-400" : "bg-gray-400";

  // Trivia sits on top of the circle, so it never changes the layout around it.
  const [triviaOpen, setTriviaOpen] = React.useState(false);
  const [wasSelected, setWasSelected] = React.useState(isSelected);
  if (wasSelected !== isSelected) {
    // Close the trivia when scrolling away, so it starts closed next time.
    setWasSelected(isSelected);
    if (!isSelected) setTriviaOpen(false);
  }
  const showTrivia = triviaOpen && isSelected;

  const fadeClass = `transition-opacity duration-500 ease-in-out ${
    isSelected ? "opacity-100" : "opacity-0"
  }`;

  return (
    <div className="relative w-full h-full">
      {/* Top text container */}
      {groupPredicate || imageFileName ? (
        <div className="absolute bottom-full mb-3 font-bold text-center w-max left-1/2 -translate-x-1/2">
          {groupPredicate && (
            <div
              className={`${fadeClass} text-lg landscape:text-sm landscape:lg:text-lg`}
            >
              ...{groupPredicate}
            </div>
          )}
          {imageFileName && ( // Always show name if image, regardless of selection
            <div
              className={`text-2xl transition-colors landscape:text-base landscape:lg:text-2xl ${!isSelected && "text-gray-400"}`}
            >
              {!groupPredicate && "..."}
              {name}
              <span className={fadeClass}>?</span>
            </div>
          )}
        </div>
      ) : null}

      {/* The actual circle content */}
      <div
        className={`${bgColor} rounded-full flex justify-center items-center font-bold p-2 text-center w-full h-full transition-colors duration-500 ease-in-out relative overflow-hidden`}
      >
        {imageFileName ? (
          <img
            loading="lazy"
            src={imageFileName}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover rounded-full z-0"
          />
        ) : (
          <span className="text-2xl leading-none">
            {name}
            <span className={fadeClass}>?</span>
          </span>
        )}

        {trivia && (
          <div
            id={`trivia-${circle.id}`}
            aria-hidden={!showTrivia}
            className={`absolute inset-0 z-10 rounded-full bg-gray-900/85 text-white flex flex-col justify-center items-center p-[15%] transition-opacity duration-300 ease-in-out ${
              showTrivia ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-yellow-400 text-lg landscape:hidden landscape:lg:block landscape:lg:text-lg landscape:xl:text-xl">
              Did you know?
            </div>
            <div className="font-normal text-base leading-snug landscape:text-[0.625rem] landscape:leading-tight landscape:lg:text-base landscape:lg:leading-snug landscape:xl:text-xl">
              {trivia.text}.
            </div>
            <a
              href={trivia.source.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={showTrivia ? 0 : -1}
              className={`mt-2 text-sm text-gray-300 hover:underline landscape:mt-0.5 landscape:text-[0.5rem] landscape:lg:mt-2 landscape:lg:text-sm ${
                showTrivia ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              [{trivia.source.name}]
            </a>
          </div>
        )}
      </div>

      {/* Badge on the rim (at 45°) that flips the circle to its trivia */}
      {trivia && (
        <button
          type="button"
          onClick={() => setTriviaOpen((open) => !open)}
          aria-expanded={showTrivia}
          aria-controls={`trivia-${circle.id}`}
          aria-label={showTrivia ? "Hide trivia" : `Did you know? Trivia about ${name}`}
          tabIndex={isSelected ? 0 : -1}
          className={`absolute top-[14.6%] right-[14.6%] landscape:top-[6%] landscape:right-[6%] landscape:lg:top-[14.6%] landscape:lg:right-[14.6%] translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-yellow-400 text-gray-900 font-bold shadow-md ring-2 ring-white cursor-pointer flex items-center justify-center w-11 h-11 text-2xl landscape:w-7 landscape:h-7 landscape:text-base landscape:lg:w-11 landscape:lg:h-11 landscape:lg:text-2xl hover:bg-yellow-300 ${fadeClass} ${
            isSelected ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {showTrivia ? "×" : "?"}
        </button>
      )}
    </div>
  );
};

export default Circle;
