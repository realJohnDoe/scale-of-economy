import React from "react";
import icon from "./icon.svg";

type DropdownProps = {
  orderBy: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson";
  setOrderBy: (
    orderBy: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson"
  ) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

function Dropdown({
  orderBy,
  setOrderBy,
  isMenuOpen,
  setIsMenuOpen,
}: DropdownProps) {
  const [hoveredOption, setHoveredOption] = React.useState<
    "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson" | null
  >(null);

  const getOptionClassName = (
    option: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson"
  ) => {
    if (hoveredOption) {
      return hoveredOption === option ? "bg-gray-600" : "";
    }
    return orderBy === option ? "bg-gray-600" : "";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="bg-gray-700 text-white rounded p-2"
      >
        <img src={icon} alt="order by" className="w-6 h-6" />
      </button>
      {isMenuOpen && (
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-gray-700 text-white rounded p-2 w-48"
          onMouseLeave={() => setHoveredOption(null)}
        >
          <div className="font-bold mb-2">Circle Size by...</div>
          <div
            onClick={() => {
              setOrderBy("yearlyTurnOver");
              setIsMenuOpen(false);
            }}
            onMouseEnter={() => setHoveredOption("yearlyTurnOver")}
            className={`cursor-pointer p-1 ${getOptionClassName(
              "yearlyTurnOver"
            )}`}
          >
            Yearly Turnover
          </div>
          <div
            onClick={() => {
              setOrderBy("numberOfPersons");
              setIsMenuOpen(false);
            }}
            onMouseEnter={() => setHoveredOption("numberOfPersons")}
            className={`cursor-pointer p-1 ${getOptionClassName(
              "numberOfPersons"
            )}`}
          >
            Number of Persons
          </div>
          <div
            onClick={() => {
              setOrderBy("turnoverPerPerson");
              setIsMenuOpen(false);
            }}
            onMouseEnter={() => setHoveredOption("turnoverPerPerson")}
            className={`cursor-pointer p-1 ${getOptionClassName(
              "turnoverPerPerson"
            )}`}
          >
            Turnover per Person
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
