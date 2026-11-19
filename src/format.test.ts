import { describe, expect, it } from "vitest";
import { formatToTwoSignificantDigits as fmt } from "./format";

describe("formatToTwoSignificantDigits", () => {
  it("formats plain numbers", () => {
    expect(fmt(0)).toBe("0");
    expect(fmt(3)).toBe("3");
    expect(fmt(999)).toBe("1 thousand");
    expect(fmt(999999)).toBe("1 million");
    expect(fmt(1040000)).toBe("1 million");
    expect(fmt(2.5e12)).toBe("2.5 trillion");
  });

  it("formats currency with long suffixes", () => {
    expect(fmt(0, true)).toBe("$0");
    expect(fmt(0.5, true)).toBe("$0.5");
    expect(fmt(999999, true)).toBe("$1 million");
    expect(fmt(10136986.3, true)).toBe("$10 million");
    expect(fmt(2849.3, true)).toBe("$2.8 thousand");
    expect(fmt(2.5e12, true)).toBe("$2.5 trillion");
  });
});
