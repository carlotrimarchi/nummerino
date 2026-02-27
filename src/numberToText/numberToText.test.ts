import { describe, it, expect } from "vitest";
import numberToText from "./numberToText";

describe("numberToText", () => {
	it("converts 1 to eins", () => {
		expect(numberToText(1)).toBe("eins");
	});

	it("converts 2 to zwei", () => {
		expect(numberToText(2)).toBe("zwei");
	});

	it("converts 3 to drei", () => {
		expect(numberToText(3)).toBe("drei");
	});
});
