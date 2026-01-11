import React from "react";

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

  const getOrderByText = (
    option: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson"
  ) => {
    switch (option) {
      case "numberOfPersons":
        return "Number of Persons";
      case "yearlyTurnOver":
        return "Total Daily Turnover";
      case "turnoverPerPerson":
        return "Turnover per Person";
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <span className="text-primary mr-2">Visualizing</span>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-gray-700 text-white rounded p-2"
        >
          {getOrderByText(orderBy)}
        </button>
      </div>
      {isMenuOpen && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 bg-gray-700 text-white rounded p-2 w-48 mb-2"
          onMouseLeave={() => setHoveredOption(null)}
        >
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
            {getOrderByText("yearlyTurnOver")}
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
            {getOrderByText("numberOfPersons")}
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
            {getOrderByText("turnoverPerPerson")}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
