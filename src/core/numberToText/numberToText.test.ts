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
	describe("splitted (default)", () => {
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

	describe("joined", () => {
		const cases: [[number, number[]][], string][] = [
			[[[1_000, [2_000]]], "zweitausend"],
			[[[1_000, [10_000, 9_000]]], "neunzehntausend"],
			[[[1_000, [20_000, 9_000]]], "neunundzwanzigtausend"],
			[
				[[1_000, [100_000, 20_000, 9_000]]],
				"einhundertneunundzwanzigtausend",
			],
			[[[1_000_000, [1_000_000]]], "eine million"],
			[[[1_000_000, [2_000_000]]], "zwei millionen"],
		];
		it.each(cases)("converts %o to %s", (input, expected) => {
			expect(scaledValuesToWords(input, "joined")).toBe(expected);
		});
	});
});

describe("unscaledValuesToWords", () => {
	describe("splitted (default)", () => {
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
		it.each(cases)("converts %j to %s", (input, expected) => {
			expect(unscaledValuesToWords(input)).toBe(expected);
		});
	});

	describe("joined", () => {
		const cases: [number[], string][] = [
			[[1], "ein"],
			[[20], "zwanzig"],
			[[3, 20], "dreiundzwanzig"],
			[[3, 30], "dreiunddreißig"],
			[[9, 90], "neunundneunzig"],
		];
		it.each(cases)("converts %j to %s", (input, expected) => {
			expect(unscaledValuesToWords(input, "joined")).toBe(expected);
		});
	});
});

describe("numberToText", () => {
	it("converts 0 (special case)", () => {
		expect(numberToText(0)).toEqual({ joined: "null", splitted: "null" });
	});
	it("converts 1 (special case)", () => {
		expect(numberToText(1)).toEqual({ joined: "eins", splitted: "eins" });
	});

	describe("single digit numbers", () => {
		Object.entries(ones).forEach(([number, text]) => {
			if (number === "1") return;
			it(`converts ${number}`, () => {
				expect(numberToText(Number(number))).toEqual({ joined: text, splitted: text });
			});
		});
	});

	describe("numbers from 10 to 19", () => {
		Object.entries(teens).forEach(([number, text]) => {
			it(`converts ${number}`, () => {
				expect(numberToText(Number(number))).toEqual({ joined: text, splitted: text });
			});
		});
	});

	describe("multiples of 10 (20, 30, ...)", () => {
		Object.entries(tens).forEach(([number, text]) => {
			it(`converts ${number}`, () => {
				expect(numberToText(Number(number))).toEqual({ joined: text, splitted: text });
			});
		});
	});

	describe("compound numbers", () => {
		const cases: [number, { joined: string; splitted: string }][] = [
			[23, { joined: "dreiundzwanzig", splitted: "drei und zwanzig" }],
			[109, { joined: "einhundertneun", splitted: "ein hundert neun" }],
			[119, { joined: "einhundertneunzehn", splitted: "ein hundert neunzehn" }],
			[123, { joined: "einhundertdreiundzwanzig", splitted: "ein hundert drei und zwanzig" }],
			[200, { joined: "zweihundert", splitted: "zwei hundert" }],
			[223, { joined: "zweihundertdreiundzwanzig", splitted: "zwei hundert drei und zwanzig" }],
			[555, { joined: "fünfhundertfünfundfünfzig", splitted: "fünf hundert fünf und fünfzig" }],
			[741, { joined: "siebenhunderteinundvierzig", splitted: "sieben hundert ein und vierzig" }],
			[1_000, { joined: "eintausend", splitted: "ein tausend" }],
			[1_234, { joined: "eintausendzweihundertvierunddreißig", splitted: "ein tausend zwei hundert vier und dreißig" }],
			[2_000, { joined: "zweitausend", splitted: "zwei tausend" }],
			[10_000, { joined: "zehntausend", splitted: "zehn tausend" }],
			[19_000, { joined: "neunzehntausend", splitted: "neunzehn tausend" }],
			[500_000, { joined: "fünfhunderttausend", splitted: "fünf hundert tausend" }],
			[1_000_000, { joined: "eine million", splitted: "eine million" }],
			[1_001_000, { joined: "eine million eintausend", splitted: "eine million ein tausend" }],
			[2_000_000, { joined: "zwei millionen", splitted: "zwei millionen" }],
			[2_500_000, { joined: "zwei millionen fünfhunderttausend", splitted: "zwei millionen fünf hundert tausend" }],
			[1_000_023, { joined: "eine million dreiundzwanzig", splitted: "eine million drei und zwanzig" }],
			[1_000_000_023, { joined: "eine milliarde dreiundzwanzig", splitted: "eine milliarde drei und zwanzig" }],
			[1_000_000_000, { joined: "eine milliarde", splitted: "eine milliarde" }],
			[3_000_000_000, { joined: "drei milliarden", splitted: "drei milliarden" }],
			[1_000_000_000_000, { joined: "eine billion", splitted: "eine billion" }],
			[1_234_567, { joined: "eine million zweihundertvierunddreißigtausendfünfhundertsiebenundsechzig", splitted: "eine million zwei hundert vier und dreißig tausend fünf hundert sieben und sechzig" }],
		];

		it.each(cases)("converts %i", (input, expected) => {
			expect(numberToText(input)).toEqual(expected);
		});
	});
});
