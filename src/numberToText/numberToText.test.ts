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

	describe("numberToText", () => {
		describe("ones", () => {
			it("1", () => {
				expect(numberToText(1)).toBe("eins");
			});

			Object.entries(ones).forEach(([number, text]) => {
				if (number === "1") return;
				it(`converts ${number} to ${text}`, () => {
					expect(numberToText(Number(number))).toBe(text);
				});
			});
		});

		// describe("teens", () => {
		// 	Object.entries(teens).forEach(([number, text]) => {
		// 		it(`converts ${number} to ${text}`, () => {
		// 			expect(numberToText(Number(number))).toBe(text);
		// 		});
		// 	});
		// });

		// describe("tens", () => {
		// 	Object.entries(tens).forEach(([number, text]) => {
		// 		it(`converts ${number} to ${text}`, () => {
		// 			expect(numberToText(Number(number))).toBe(text);
		// 		});
		// 	});
		// });

		// describe("scales", () => {
		// 	Object.entries(scales).forEach(([number, text]) => {
		// 		it(`converts ${number} to ${text}`, () => {
		// 			expect(numberToText(Number(number))).toBe(text);
		// 		});
		// 	});
		// });

		// 	describe("10", () => {
		// 		it("10 to zehn", () => {
		// 			expect(numberToText(10)).toBe("zehn");
		// 		});
		// 	});

		// 	describe("20", () => {
		// 		it("20 to zwanzig", () => {
		// 			expect(numberToText(20)).toBe("zwanzig");
		// 		});
		// 	});
		// 	describe("23", () => {
		// 		it("23 to drei und zwanzig", () => {
		// 			expect(numberToText(23)).toBe("drei und zwanzig");
		// 		});
		// 	});
	});

	it("1", () => {
		expect(numberToText(1)).toBe("eins");
	});
	it("109 ", () => {
		expect(numberToText(109)).toBe("ein hundert neun");
	});
	it("119 ", () => {
		expect(numberToText(119)).toBe("ein hundert neunzehn");
	});
	it("123 ", () => {
		expect(numberToText(123)).toBe("ein hundert drei und zwanzig");
	});
	// it("223 ", () => {
	// 	expect(numberToText(223)).toBe("zwei hundert drei und zwanzig");
	// });
	// it("1234 ", () => {
	// 	expect(numberToText(1234)).toBe(
	// 		"ein tausend zwei hundert vier und dreißig",
	// 	);
	// });
	// it("555 ", () => {
	// 	expect(numberToText(555)).toBe("fünf hundert fünf und fünfzig");
	// });
	// it("741 ", () => {
	// 	expect(numberToText(741)).toBe("sieben hundert ein und vierzig");
	// });
});
