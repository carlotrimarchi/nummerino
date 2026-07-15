import { generateRandomNumber } from "./utils";

describe("generateRandomNumber", () => {
  it("generates an integer", () => {
    const result = generateRandomNumber();
    expect(result).toBeTypeOf("number");
    expect(Number.isInteger(result)).toBe(true);
  });

  it("returns an integer within a given range", () => {
    const min = 0;
    const max = 10;
    const result = generateRandomNumber(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});
