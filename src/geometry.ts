// src/geometry.ts
import { type CircleData } from "./data"; // Import CircleData type

export const TARGET_DIAMETER_REM = 20;
export const REM_TO_PX = 16;
export const TARGET_DIAMETER_PX = TARGET_DIAMETER_REM * REM_TO_PX;

type TransformationParams = {
  oldIndexOffset: number;
  scale: number;
  scalingOffset: number;
  newIndexOffset: number;
};

const calculateDeltaX = (d1: number, d2: number): number => {
  const r1 = d1 / 2;
  const r2 = d2 / 2;
  const hypotenuse = r1 + r2 + Math.min(r1, r2) * 0.1;
  const vertical = Math.abs(r1 - r2);
  const deltaX = Math.sqrt(hypotenuse ** 2 - vertical ** 2);
  console.log(r1, r2, deltaX);
  return deltaX;
};

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

  const originalIdToIndex = new Map<number, number>();
  circles.forEach((circle, index) => {
    originalIdToIndex.set(circle.id, index);
  });

  const sortedIdToIndex = new Map<number, number>();
  sortedCircles.forEach((circle, index) => {
    sortedIdToIndex.set(circle.id, index);
  });

  const values = new Map<number, number>();
  let minValue = Infinity;

  circles.forEach((circle) => {
    let value: number;
    switch (sortBy) {
      case "numberOfPersons":
        value = circle.numberOfPersons;
        break;
      case "yearlyTurnOver":
        value = circle.yearlyTurnOver;
        break;
      case "turnoverPerPerson":
        value = circle.numberOfPersons
          ? circle.yearlyTurnOver / circle.numberOfPersons
          : 0;
        break;
    }
    values.set(circle.id, value);
    if (value < minValue) {
      minValue = value;
    }
  });

  const translateXOffsets = new Map<number, TransformationParams>();
  let cumulativeScalingOffset = 0;
  let previousDiameter = 0; // Diameter of the previously processed circle in the sorted list

  sortedCircles.forEach((circle, index) => {
    const oldIndex = originalIdToIndex.get(circle.id) as number;
    const newIndex = sortedIdToIndex.get(circle.id) as number;
    const value = values.get(circle.id) as number;

    const scale = Math.sqrt(value);

    if (index > 0) {
      // The circles are placed such that their edges touch, plus a small gap (0.1 * minRadius)
      cumulativeScalingOffset += calculateDeltaX(previousDiameter, scale);
    }

    translateXOffsets.set(circle.id, {
      oldIndexOffset: -oldIndex,
      scale: scale,
      scalingOffset: cumulativeScalingOffset,
      newIndexOffset: newIndex,
    });

    previousDiameter = scale;
  });

  console.log(translateXOffsets);

  return translateXOffsets;
}

export function getSortedCircles(
  circles: CircleData[],
  sortBy: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson",
): CircleData[] {
  const sortedCircles = [...circles]; // Create a shallow copy to sort

  sortedCircles.sort((a, b) => {
    switch (sortBy) {
      case "numberOfPersons":
        return a.numberOfPersons - b.numberOfPersons;
      case "yearlyTurnOver":
        return a.yearlyTurnOver - b.yearlyTurnOver;
      case "turnoverPerPerson":
        const turnoverA = a.numberOfPersons
          ? a.yearlyTurnOver / a.numberOfPersons
          : 0;
        const turnoverB = b.numberOfPersons
          ? b.yearlyTurnOver / b.numberOfPersons
          : 0;
        return turnoverA - turnoverB;
      default:
        return 0; // Should not happen with type checking
    }
  });

  return sortedCircles;
}