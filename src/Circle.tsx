import React from "react";
import { type CircleData } from "./data"; // Import CircleData type

interface CircleProps {
  circle: CircleData;
  isSelected: boolean;
}

const Circle: React.FC<CircleProps> = ({ circle, isSelected }) => {
  const { name, groupPredicate, imageFileName } = circle;
  const bgColor = isSelected ? "bg-yellow-400" : "bg-gray-400";

  const fadeClass = `transition-opacity duration-500 ease-in-out ${
    isSelected ? "opacity-100" : "opacity-0"
  }`;

  return (
    <div className="relative w-full h-full">
      {/* Top text container */}
      {groupPredicate || imageFileName ? (
        <div className="absolute bottom-full mb-3 text-primary font-bold text-center w-max left-1/2 -translate-x-1/2">
          {groupPredicate && (
            <div
              className={`${fadeClass} text-lg landscape:text-sm landscape:lg:lg`}
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
        className={`${bgColor} rounded-full flex justify-center items-center text-primary font-bold p-2 text-center w-full h-full transition-colors duration-500 ease-in-out relative overflow-hidden`}
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
      </div>
    </div>
  );
};

export default Circle;
