import React from "react";

type DropdownProps = {
  orderBy: "numberOfPersons" | "yearlyTurnOver";
  setOrderBy: (orderBy: "numberOfPersons" | "yearlyTurnOver") => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

function Dropdown({
  orderBy,
  setOrderBy,
  isMenuOpen,
  setIsMenuOpen,
}: DropdownProps) {
  return (
    <div className="absolute top-4 left-4 z-10">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="bg-gray-700 text-white rounded p-2"
      >
        <img src="/src/icon.svg" alt="order by" className="w-6 h-6" />
      </button>
      {isMenuOpen && (
        <div className="absolute top-12 left-0 bg-gray-700 text-white rounded p-2">
          <div className="font-bold mb-2">Circle Size by...</div>
          <div
            onClick={() => {
              setOrderBy("numberOfPersons");
              setIsMenuOpen(false);
            }}
            className="cursor-pointer p-1 hover:bg-gray-600"
          >
            Number of Persons
          </div>
          <div
            onClick={() => {
              setOrderBy("yearlyTurnOver");
              setIsMenuOpen(false);
            }}
            className="cursor-pointer p-1 hover:bg-gray-600"
          >
            Yearly Turnover
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
