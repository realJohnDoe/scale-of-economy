import { describe, expect, it } from "vitest";
import type { CircleData } from "./data";
import { getSortedCircles, getSortingOffsets, type OrderBy } from "./geometry";

const circle = (id: number, numberOfPersons: number, yearlyTurnOver: number): CircleData => ({
  id,
  name: `c${id}`,
  groupPredicate: null,
  numberOfPersons,
  yearlyTurnOver,
  imageFileName: null,
  sources: [],
});

const circles = [circle(1, 5, 1000), circle(2, 1, 9000), circle(3, 100, 400)];
const orders: OrderBy[] = ["numberOfPersons", "yearlyTurnOver", "turnoverPerPerson"];

describe("getSortedCircles", () => {
  it("sorts ascending by each key without mutating the input", () => {
    expect(getSortedCircles(circles, "numberOfPersons").map((c) => c.id)).toEqual([2, 1, 3]);
    expect(getSortedCircles(circles, "yearlyTurnOver").map((c) => c.id)).toEqual([3, 1, 2]);
    expect(getSortedCircles(circles, "turnoverPerPerson").map((c) => c.id)).toEqual([3, 1, 2]);
    expect(circles.map((c) => c.id)).toEqual([1, 2, 3]);
  });
});

describe("getSortingOffsets", () => {
  it.each(orders)("starts at 0 and strictly increases when sorted by %s", (order) => {
    const offsets = getSortingOffsets(circles, order);
    const sorted = getSortedCircles(circles, order);
    const values = sorted.map((c) => offsets.get(c.id)!.scalingOffset);
    expect(values[0]).toBe(0);
    for (let i = 1; i < values.length; i++) expect(values[i]).toBeGreaterThan(values[i - 1]);
  });
});
