// src/geometry.ts
import { type CircleData } from "./data"; // Import CircleData type

export const ITEM_SPACING_FACTOR = 1.15

type TransformationParams = {
  scale: number;
  scalingOffset: number;
};

const calculateDeltaX = (d1: number, d2: number): number => {
  const r1 = d1 / 2;
  const r2 = d2 / 2;
  const hypotenuse = r1 + r2 + Math.min(r1, r2) * (ITEM_SPACING_FACTOR - 1);
  const vertical = Math.abs(r1 - r2);
  const deltaX = Math.sqrt(hypotenuse ** 2 - vertical ** 2);
  return deltaX;
};

function getCircleValue(
  circle: CircleData,
  sortBy: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson",
): number {
  switch (sortBy) {
    case "numberOfPersons":
      return circle.numberOfPersons;
    case "yearlyTurnOver":
      return circle.yearlyTurnOver;
    case "turnoverPerPerson":
      return circle.numberOfPersons
        ? circle.yearlyTurnOver / circle.numberOfPersons
        : 0;
  }
}

/**
 * Calculates the translateX offsets for each circle to animate them from their original
 * unsorted position to their new sorted position.
 *
 * @param circles The original, unsorted array of CircleData.
 * @param circleDistanceInPx The base distance between the center of circles in 'px' units.
 * @param sortBy The property to sort the circles by.
 * @returns A Map where each key is a circle's ID and its value is the calculated translateX (in pixels)
 *          needed to move it to its sorted position.
 */
export function getSortingOffsets(
  circles: CircleData[],
  sortBy: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson",
): Map<number, TransformationParams> {
  const sortedCircles = getSortedCircles(circles, sortBy);

  const translateXOffsets = new Map<number, TransformationParams>();
  let cumulativeScalingOffset = 0;
  let previousDiameter = 0; // Diameter of the previously processed circle in the sorted list

  sortedCircles.forEach((circle, index) => {
    const scale = Math.sqrt(getCircleValue(circle, sortBy));

    if (index > 0) {
      // The circles are placed such that their edges touch, plus a small gap (0.1 * minRadius)
      cumulativeScalingOffset += calculateDeltaX(previousDiameter, scale);
    }

    translateXOffsets.set(circle.id, {
      scale: scale,
      scalingOffset: cumulativeScalingOffset,
    });

    previousDiameter = scale;
  });

  return translateXOffsets;
}

export function getSortedCircles(
  circles: CircleData[],
  sortBy: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson",
): CircleData[] {
  const sortedCircles = [...circles]; // Create a shallow copy to sort

  sortedCircles.sort((a, b) => {
    const valueA = getCircleValue(a, sortBy);
    const valueB = getCircleValue(b, sortBy);
    return valueA - valueB;
  });

  return sortedCircles;
}