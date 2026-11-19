import React from "react";
import { type CircleData } from "./data"; // Import CircleData type
import type { OrderBy } from "./geometry";
import { formatToTwoSignificantDigits } from "./format";

interface InfoBoxProps {
  circle: CircleData;
  isSelected: boolean;
  highlightedNumber: OrderBy;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  circle,
  isSelected,
  highlightedNumber,
}) => {
  const {
    numberOfPersons,
    turnOverPredicate,
    yearlyTurnOver,
    context,
    sources,
  } = circle;
  const fadeClass = `transition-opacity duration-500 ease-in-out ${
    isSelected ? "opacity-100" : "opacity-0"
  }`;

  const dailyTurnover = yearlyTurnOver / 365;
  const formattedDailyTurnover = formatToTwoSignificantDigits(
    dailyTurnover,
    true,
  );
  const formattedPersons = formatToTwoSignificantDigits(numberOfPersons);

  const dailyTurnoverPerPerson = yearlyTurnOver / numberOfPersons / 365; // Corrected to daily
  const formattedDailyTurnoverPerPerson = formatToTwoSignificantDigits(
    dailyTurnoverPerPerson,
    true,
  );

  const effectiveHighlightedNumber =
    numberOfPersons === 1 && highlightedNumber === "turnoverPerPerson"
      ? "yearlyTurnOver"
      : highlightedNumber;

  const size = (key: InfoBoxProps["highlightedNumber"]) =>
    `
    transition-all duration-500 ease-in-out
    ${
      key === effectiveHighlightedNumber
        ? "text-2xl landscape:text-lg landscape:lg:text-2xl"
        : "text-lg landscape:text-sm landscape:lg:text-lg"
    }
    `;

  return (
    <div
      className={`font-bold text-center w-max mt-4 ${fadeClass}`}
    >
      {/* Number of persons */}
      <div className={size("numberOfPersons")}>{formattedPersons},</div>

      {/* Turnover Predicate or default text */}
      <div className="text-lg landscape:text-sm landscape:lg:text-lg">
        {turnOverPredicate ?? "with a daily turnover of"}
      </div>

      {/* Turnover amount */}
      <div className={size("yearlyTurnOver")}>
        {formattedDailyTurnover}
        {numberOfPersons > 1 && (
          <span className={size("turnoverPerPerson")}>
            {" "}
            ({formattedDailyTurnoverPerPerson}/person)
          </span>
        )}

        {/* Add colon or comma depending on context */}
        {"."}
      </div>

      {/* Context text, if available */}
      {context && (
        <div
          className={`text-lg landscape:text-sm landscape:lg:text-lg px-2 mt-4 w-[min(90vw,24rem)] landscape:w-80 h-full 
      md:w-110 landscape:md:w-110`}
        >
          {context}.
        </div>
      )}

      {sources && sources.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 pointer-events-auto">
          [
          {sources.map((source, index) => (
            <React.Fragment key={index}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline" // Link color will be inherited from parent
              >
                {source.name}
              </a>
              {index < sources.length - 1 && ", "}
            </React.Fragment>
          ))}
          ]
        </div>
      )}
    </div>
  );
};

export default InfoBox;
