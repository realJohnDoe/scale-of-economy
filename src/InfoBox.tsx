import React from "react";
import { type CircleData } from "./data"; // Import CircleData type

interface InfoBoxProps {
  circle: CircleData;
  isSelected: boolean;
}

// Helper function from Circle.tsx, could be moved to a shared file later
function formatToTwoSignificantDigits(
  num: number,
  isCurrency: boolean = false
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

const InfoBox: React.FC<InfoBoxProps> = ({ circle, isSelected }) => {
  const { numberOfPersons, yearlyTurnOver, sources } = circle;
  const fadeClass = `transition-opacity duration-500 ease-in-out ${
    isSelected ? "opacity-100" : "opacity-0"
  }`;

  const dailyTurnover = yearlyTurnOver / 365;
  const formattedDailyTurnover = formatToTwoSignificantDigits(
    dailyTurnover,
    true
  );
  const formattedPersons = formatToTwoSignificantDigits(numberOfPersons);

  const dailyTurnoverPerPerson = yearlyTurnOver / numberOfPersons / 365; // Corrected to daily
  const formattedDailyTurnoverPerPerson = formatToTwoSignificantDigits(
    dailyTurnoverPerPerson,
    true
  );

  return (
    <div
      className={`text-primary text-lg font-bold text-center w-max mt-4 ${fadeClass}`}
    >
      <div className="text-2xl">{formattedPersons},</div>
      <div>with a daily turnover of</div>
      <div className="text-2xl">
        {formattedDailyTurnover}
        {numberOfPersons > 1 && (
          <span className="text-lg ml-2">
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
