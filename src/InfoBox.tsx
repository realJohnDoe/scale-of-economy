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

  let formatted = absNum.toLocaleString(undefined, options);
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

  formatted = scaledNum.toLocaleString(undefined, options);
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

  return (
    <div className={`text-primary text-lg font-bold text-center w-max ${fadeClass}`}>
      <div className="text-2xl">{formattedPersons},</div>
      <div>with a daily turnover of</div>
      <div className="text-2xl">{formattedDailyTurnover}</div>
      
      {sources && sources.length > 0 && (
        <div className="mt-4 text-sm text-gray-600 text-right w-full">
          Sources:
          <ul className="list-disc pl-4 text-left">
            {sources.map((source, index) => (
              <li key={index}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InfoBox;