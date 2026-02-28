import { describe, it, expect } from "vitest";
import { numberToText, getPlaceValues } from "./numberToText";
import { ones, teens, tens, scales } from "./numberToText";

describe("getPlaceValues", () => {
	const cases: [number, number[]][] = [
		[1, [1]],
		[12, [2, 10]],
		[123, [3, 20, 100]],
		[1_234, [4, 30, 200, 1_000]],
		[12_345, [5, 40, 300, 2_000, 10_000]],
		[123_456, [6, 50, 400, 3_000, 20_000, 100_000]],
		[1_234_567, [7, 60, 500, 4_000, 30_000, 200_000, 1_000_000]],
		[
			12_345_678,
			[8, 70, 600, 5_000, 40_000, 300_000, 2_000_000, 10_000_000],
		],
	];
	it.each(cases)("gets %i → %j", (input, expected) => {
		expect(getPlaceValues(input as number)).toEqual(expected);
	});
});

describe("numberToText", () => {
	describe("single digit numbers", () => {
		it("converts 1 to eins (special case)", () => {
			expect(numberToText(1)).toBe("eins");
		});

		Object.entries(ones).forEach(([number, text]) => {
			// avoid testing 1, since it's being tested just above
			if (number === "1") return;
			it(`converts ${number} to ${text}`, () => {
				expect(numberToText(Number(number))).toBe(text);
			});
		});
	});

	describe("numbers from 10 to 19", () => {
		Object.entries(teens).forEach(([number, text]) => {
			it(`converts ${number} to ${text}`, () => {
				expect(numberToText(Number(number))).toBe(text);
			});
		});
	});

	describe("multiples of 10 greater than 10 (20, 30, ...)", () => {
		Object.entries(tens).forEach(([number, text]) => {
			it(`converts ${number} to ${text}`, () => {
				expect(numberToText(Number(number))).toBe(text);
			});
		});
	});

	describe("powers of 10 greater than 10 (100, 1000, ...)", () => {
		const cases: [number, string][] = [
			[100, "ein hundert"],
			[1_000, "ein tausend"],
			[1_000_000, "eine million"],
			[1_000_000, "eine million"],
			[1_000_000_000, "eine milliarde"],
			[1_000_000_000_000, "eine billion"],
		];
		it.each(cases)("converts %i to %s", (input, expected) => {
			expect(numberToText(input)).toBe(expected);
		});
	});

	describe("compound numbers", () => {
		const cases: [number, string][] = [
			[23, "drei und zwanzig"],
			[109, "ein hundert neun"],
			[119, "ein hundert neunzehn"],
			[123, "ein hundert drei und zwanzig"],
			[200, "zwei hundert"],
			[223, "zwei hundert drei und zwanzig"],
			[555, "fünf hundert fünf und fünfzig"],
			[741, "sieben hundert ein und vierzig"],
			[1234, "ein tausend zwei hundert vier und dreißig"],
			[2_000, "zwei tausend"],
			[10_000, "zehn tausend"],
			[19_000, "neunzehn tausend"],
			[2_000_000, "zwei million"],
			[3_000_000_000, "drei milliarde"],
		];

		it.each(cases)("converts %i to %s", (input, expected) => {
			expect(numberToText(input)).toBe(expected);
		});
	});
});
