import { describe, it, expect } from "vitest";
import numberToText from "./numberToText";
import { ones, teens, tens, scales } from "./numberToText";

describe("numberToText", () => {
	describe("ones", () => {
		Object.entries(ones).forEach(([number, text]) => {
			it(`converts ${number} to ${text}`, () => {
				expect(numberToText(Number(number))).toBe(text);
			});
		});
	});

	describe("teens", () => {
		Object.entries(teens).forEach(([number, text]) => {
			it(`converts ${number} to ${text}`, () => {
				expect(numberToText(Number(number))).toBe(text);
			});
		});
	});

	describe("tens", () => {
		Object.entries(tens).forEach(([number, text]) => {
			it(`converts ${number} to ${text}`, () => {
				expect(numberToText(Number(number))).toBe(text);
			});
		});
	});

	describe("scales", () => {
		Object.entries(scales).forEach(([number, text]) => {
			it(`converts ${number} to ${text}`, () => {
				expect(numberToText(Number(number))).toBe(text);
			});
		});
	});
});
