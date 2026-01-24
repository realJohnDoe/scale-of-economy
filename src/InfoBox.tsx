import React from "react";
import { type CircleData } from "./data"; // Import CircleData type

interface InfoBoxProps {
  circle: CircleData;
  isSelected: boolean;
  highlightedNumber: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson";
}

// Helper function from Circle.tsx, could be moved to a shared file later
function formatToTwoSignificantDigits(
  num: number,
  isCurrency: boolean = false,
): string {
  const prefix = isCurrency ? "$" : "";
  if (num === 0) return prefix + "0";

  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  const options: Intl.NumberFormatOptions = {
    maximumSignificantDigits: 2,
    minimumSignificantDigits: 1,
  };

  let formatted = absNum.toLocaleString("en-US", options);
  let scaledNum = absNum;
  let suffix = "";

  if (absNum >= 1.0e12) {
    scaledNum = absNum / 1.0e12;
    suffix = " trillion";
  } else if (absNum >= 1.0e9) {
    scaledNum = absNum / 1.0e9;
    suffix = " billion";
  } else if (absNum >= 1.0e6) {
    scaledNum = absNum / 1.0e6;
    suffix = " million";
  } else if (absNum >= 1.0e3) {
    scaledNum = absNum / 1.0e3;
    suffix = " thousand";
  }

  formatted = scaledNum.toLocaleString("en-US", options);
  return prefix + sign + formatted + suffix;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  circle,
  isSelected,
  highlightedNumber,
}) => {
  const { numberOfPersons, yearlyTurnOver, sources } = circle;
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
      className={`text-primary font-bold text-center w-max mt-4 ${fadeClass}`}
    >
      <div className={size("numberOfPersons")}>{formattedPersons},</div>
      <div className="text-lg landscape:text-sm landscape:lg:text-lg">
        with a daily turnover of
      </div>
      <div className={size("yearlyTurnOver")}>
        {formattedDailyTurnover}
        {numberOfPersons > 1 && (
          <span className={size("turnoverPerPerson")}>
            {" "}
            ({formattedDailyTurnoverPerPerson}/person)
          </span>
        )}
      </div>

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
