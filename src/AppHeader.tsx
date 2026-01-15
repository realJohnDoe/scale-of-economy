import React from "react";
import Dropdown from "./Dropdown";

interface AppHeaderProps {
  orderBy: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson";
  setOrderBy: (
    value: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson"
  ) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ orderBy, setOrderBy }) => {
  return (
    <div>
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="relative w-full h-full">
          {/* Title */}
          <div className="absolute top-4 inset-x-0 z-10 flex justify-center">
            <div className="text-2xl font-bold text-primary w-96 text-center">
              How many people are...
            </div>
          </div>

          {/* Center Box */}
          <div className="absolute left-1/2 -translate-x-1/2 top-16 bottom-18 z-0">
            <div className="w-[min(90vw,24rem)] h-full rounded-lg bg-gray-200" />
          </div>

          {/* Dropdown */}
          <div className="absolute bottom-4 inset-x-0 flex z-10 pointer-events-auto justify-center">
            <Dropdown orderBy={orderBy} setOrderBy={setOrderBy} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
