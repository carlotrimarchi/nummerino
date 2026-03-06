import { describe, it, expect } from "vitest";
import {
	numberToText,
	getPlaceValues,
	getScale,
	scaledValuesToWords,
	groupByScale,
	unscaledValuesToWords,
} from "./numberToText";
import { ones, teens, tens } from "./data";

describe("getPlaceValues", () => {
	const cases: [number, number[]][] = [
		[0, [0]],
		[1, [1]],
		[2, [2]],
		[9, [9]],
		[10, [10]],
		[12, [2, 10]],
		[23, [3, 20]],
		[100, [100]],
		[1_000, [1_000]],
		[10_000, [10_000]],
		[19_000, [9_000, 10_000]],
		[100_000, [100_000]],
		[200_000, [200_000]],
		[1_000_000, [1_000_000]],
		[2_000_000, [2_000_000]],
		[1_000_000_000, [1_000_000_000]],
		[19_000_000, [9_000_000, 10_000_000]],
		[
			999_999_999,
			[
				9, 90, 900, 9_000, 90_000, 900_000, 9_000_000, 90_000_000,
				900_000_000,
			],
		],
		[100_000_001, [1, 100_000_000]],
		[190_000_000, [90_000_000, 100_000_000]],
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

describe("getScale", () => {
	const cases: [number, number][] = [
		[100, 100],
		[900, 100],
		[1_000, 1000],
		[2_000, 1000],
		[5_000, 1000],
		[10_000, 1000],
		[19_000, 1000],
		[20_000, 1000],
		[100_000, 1000],
		[100_000, 1000],
		[1_000_000, 1_000_000],
		[5_000_000, 1_000_000],
		[999_000_000, 1_000_000],
		[1_000_000_000, 1_000_000_000],
	];
	it.each(cases)("getScale(%i) returns %i", (input, expected) => {
		expect(getScale(input)).toBe(expected);
	});
});

describe("groupByScale", () => {
	const cases: [number[], [number, number[]][]][] = [
		[[10_000, 9_000], [[1_000, [10_000, 9_000]]]],
		[[100_000, 10_000, 9_000], [[1_000, [100_000, 10_000, 9_000]]]],
		[
			[1_000_000, 500_000],
			[
				[1_000_000, [1_000_000]],
				[1_000, [500_000]],
			],
		],
	];

	it.each(cases)("groupByScale(%o) returns %o", (input, expected) => {
		expect(groupByScale(input)).toEqual(expected);
	});
});

describe("scaledValuesToWords", () => {
	const cases: [[number, number[]][], string][] = [
		[[[1_000, [2_000]]], "zwei tausend"],
		[[[1_000, [10_000, 9_000]]], "neunzehn tausend"],
		[[[1_000, [20_000, 9_000]]], "neun und zwanzig tausend"],
		[
			[[1_000, [100_000, 20_000, 9_000]]],
			"ein hundert neun und zwanzig tausend",
		],
		[[[1_000_000, [1_000_000]]], "eine million"],
		[[[1_000_000, [2_000_000]]], "zwei millionen"],
		[[[1_000_000_000, [1_000_000_000]]], "eine milliarde"],
		[[[1_000_000_000, [3_000_000_000]]], "drei milliarden"],
	];
	it.each(cases)("converts %o to %s", (input, expected) => {
		expect(scaledValuesToWords(input)).toBe(expected);
	});
});

describe("unscaledValuesToWords", () => {
	const cases: [number[], string][] = [
		[[1], "ein"],
		[[2], "zwei"],
		[[10], "zehn"],
		[[12], "zwölf"],
		[[19], "neunzehn"],
		[[20], "zwanzig"],
		[[3, 20], "drei und zwanzig"],
		[[3, 30], "drei und dreißig"],
		[[9, 90], "neun und neunzig"],
	];

	it.each(cases)("converts %i to %s", (input, expected) => {
		expect(unscaledValuesToWords(input)).toBe(expected);
	});
});

describe("numberToText", () => {
	describe("single digit numbers", () => {
		it("converts 0 to null (special case)", () => {
			expect(numberToText(0)).toBe("null");
		});
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
			[1_001_000, "eine million ein tausend"],
			[2_000_000, "zwei millionen"],
			[2_500_000, "zwei millionen fünf hundert tausend"],
			[3_000_000_000, "drei milliarden"],
		];

		it.each(cases)("converts %i to %s", (input, expected) => {
			expect(numberToText(input)).toBe(expected);
		});
	});
});
