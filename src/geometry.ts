// src/geometry.ts
import { type CircleData } from "./data"; // Import CircleData type

export const TARGET_DIAMETER_REM = 20;
export const REM_TO_PX = 16;
export const TARGET_DIAMETER_PX = TARGET_DIAMETER_REM * REM_TO_PX;

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
  circleDistanceInPx: number,
  sortBy: "numberOfPersons" | "yearlyTurnOver" | "turnoverPerPerson"
): Map<number, number> { // Changed return type to Map<number, number>
  const sortedCircles = [...circles]; // Create a shallow copy to sort

  sortedCircles.sort((a, b) => {
    switch (sortBy) {
      case "numberOfPersons":
        return a.numberOfPersons - b.numberOfPersons;
      case "yearlyTurnOver":
        return a.yearlyTurnOver - b.yearlyTurnOver;
      case "turnoverPerPerson":
        const turnoverA = a.numberOfPersons ? a.yearlyTurnOver / a.numberOfPersons : 0;
        const turnoverB = b.numberOfPersons ? b.yearlyTurnOver / b.numberOfPersons : 0;
        return turnoverA - turnoverB;
      default:
        return 0; // Should not happen with type checking
    }
  });

  const originalIdToIndex = new Map<number, number>();
  circles.forEach((circle, index) => {
    originalIdToIndex.set(circle.id, index);
  });

  const sortedIdToIndex = new Map<number, number>();
  sortedCircles.forEach((circle, index) => {
    sortedIdToIndex.set(circle.id, index);
  });

  const translateXOffsets = new Map<number, number>();
  circles.forEach((circle) => {
    const oldIndex = originalIdToIndex.get(circle.id) as number; // Should always exist
    const newIndex = sortedIdToIndex.get(circle.id) as number; // Should always exist

    const deltaX = (newIndex - oldIndex) * circleDistanceInPx;
    translateXOffsets.set(circle.id, deltaX);
  });

  console.log(translateXOffsets)
  return translateXOffsets;
}
