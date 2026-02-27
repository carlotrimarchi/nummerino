import { describe, it, expect } from "vitest";
import numberToText from "./numberToText";
import { ones } from "./numberToText";

describe("numberToText", () => {
	describe("ones", () => {
		Object.entries(ones).forEach(([number, text]) => {
			it(`converts ${number} to ${text}`, () => {
				expect(numberToText(Number(number))).toBe(text);
			});
		});
	});
});
