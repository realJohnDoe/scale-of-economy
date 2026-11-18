import React from "react";
import { ORDER_LABELS, type OrderBy } from "./geometry";

type DropdownProps = {
  orderBy: OrderBy;
  setOrderBy: (
    orderBy: OrderBy
  ) => void;
};

function Dropdown({ orderBy, setOrderBy }: DropdownProps) {
  const [hoveredOption, setHoveredOption] = React.useState<
    OrderBy | null
  >(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const getOptionClassName = (
    option: OrderBy
  ) => {
    if (hoveredOption) {
      return hoveredOption === option ? "bg-gray-600" : "";
    }
    return orderBy === option ? "bg-gray-600" : "";
  };

  const getOrderByText = (option: OrderBy) => ORDER_LABELS[option];

  return (
    <div className="relative">
      <div className="flex items-center">
        <span className="mr-2">Visualizing</span>
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
