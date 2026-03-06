import { ones, teens, tens, scales } from "./data.js";

/**
 * Decomposes a number into its place values, from smallest 
 * to largest.
 * 
 * Digits with a value of zero are omitted, so the array length
 * does not necessarily correspond to the number of digits.
 * 
 * @param number - The number to decompose
 * @returns An array of place values
 * 
 * @example
 * getPlaceValues(0) // -> [0] (special case for zero)
 * getPlaceValues(1) // -> [1]
 * getPlaceValues(20) // -> [20] (units are omitted)
 * getPlaceValues(42) // -> [2, 40]
 * getPlaceValues(100) // -> [100] (tens and units are omitted)
 * getPlaceValues(101) // -> [1, 100] (tens are omitted)
 * getPlaceValues(123) // -> [3, 20, 100]
 */

export function getPlaceValues(number: number): number[] {
	if (number === 0) return [0];

	const result = [];
	let place = 1;
	while (number > 0) {
		// `% 10` extracts the last digit, `* place` gives it 
		// its positional value
		// e.g. for 123 at place 10: (12 % 10) * 10 = 20
		const digit = (number % 10) * place;
		if (digit !== 0) {
			result.push(digit);
		}
		// remove the last digit from `number`
		// e.g. 123 -> 12
		number = Math.floor(number / 10);
		place *= 10;
	}
	return result;
}

/**
 * Returns the scale for a given number.
 * 
 * The function is used only on numbers `>= 100`.
 * 
 * The scale of a number is the largest scale value (hundert, 
 * tausend, million…) that is less than or equal to the number.
 * 
 * The scale will be used later to express the number as a 
 * multiplier of that scale. 
 * E.g. `300_000` has scale `1_000` and multiplier `300`. 
 * In turn, `300` has scale `100` and multiplier `3`.
 * 
 * @param number - The number whose scale we want to get
 * @returns The scale of the number
 * 
 * @example
 * getScale(100) // -> 100
 * getScale(1_000) // -> 1_000
 * getScale(3_000) // -> 1_000
 * getScale(100_000) // -> 1_000
 * getScale(300_000) // -> 1_000
 * getScale(3_000_000) // -> 1_000_000
 */

export function getScale(number: number): number {
	return Number(
		Object.keys(scales)
			.map(Number)
			.sort((a, b) => b - a)
			.find((scale) => number >= scale),
	);
}

/**
 * Given an array of numbers >= 100, groups them by their scale
 * (100, 1_000, 1_000_000...) and returns an array of [scale, values]
 * pairs, sorted from largest to smallest scale.
 * 
 * @param values - Array of numbers `>= 100`
 * @returns Array of numbers grouped by scale
 * 
 * @example
 * groupByScale([3_000, 100_000]) // -> [[1_000, [3_000, 100_000]]]
 * groupByScale([3_000, 2_000_000]) // -> [[1_000_000, [2_000_000]], [1_000, [3_000]]]
 */

export function groupByScale(values: number[]): [number, number[]][] {
	const result = values.reduce(
		(acc, value) => {
			const scale = getScale(value);
			const existing = acc.find(([s]) => s === scale);

			if (existing) {
				existing[1].push(value);
			} else {
				acc.push([scale, [value]]);
			}
			return acc;
		},
		[] as [number, number[]][],
	);

	return result.sort((a, b) => b[0] - a[0]);
}

/**
 * Given an array of values grouped by scale, converts each group
 * to its German word representation and returns them joined by spaces.
 * 
 * Handles singular/plural and feminine forms for scale words
 * (e.g. "ein hundert", "eine million", "zwei millionen"). 
 * For compound multipliers, delegates to `numberToText` recursively.
 * 
 * @param groupedValues - Array of [scale, values] pairs, 
 * sorted from largest to smallest scale
 * @returns German words for the scaled values, joined by spaces
 * 
 * @example
 * scaledValuesToWords([[1_000, [2_000]]]) // -> "zwei tausend"
 * scaledValuesToWords([[1_000_000, [2_000_000]], [1_000, [3_000]]]) // -> "zwei millionen drei tausend"
 */

export function scaledValuesToWords(
	groupedValues: [number, number[]][],
): string {
	const words: string[] = [];

	for (const [scale, values] of groupedValues) {
		const sum = values.reduce((a, b) => a + b, 0);
		const multiplier = sum / scale;
		const isMultiplierSingular = multiplier === 1;
		const isScaleFeminine = scales[scale].feminine;
		const scaleWord = isMultiplierSingular ? scales[scale].singular : scales[scale].plural;
		let multiplierWord = "";
		if (isMultiplierSingular) {
			multiplierWord = isScaleFeminine ? "eine" : "ein";
		} else {
			multiplierWord = numberToText(multiplier);
		}
		words.push(`${multiplierWord} ${scaleWord}`);
	}

	return words.join(" ");
}

/**
 * Given an array of place values < 100, converts them into their
 * German word representation.
 *
 * @param values - Array of place values < 100, from smallest to largest
 * @returns German word or phrase for the given values
 *
 * @example
 * unscaledValuesToWords([1]) // -> "ein"
 * unscaledValuesToWords([9]) // -> "neun"
 * unscaledValuesToWords([10]) // -> "zehn"
 * unscaledValuesToWords([3, 20]) // -> "drei und zwanzig"
 * unscaledValuesToWords([9, 90]) // -> "neun und neunzig"
 */

export function unscaledValuesToWords(values: number[]): string {
	if (values.length === 0) return "";

	if (!values[1]) {
		return ones[values[0]] ?? teens[values[0]] ?? tens[values[0]];
	}

	const units = values[0];
	const tenths = values[1];

	if (tenths === 0) return ones[units];
	if (tenths < 20) return teens[tenths + units];

	return `${ones[units]} und ${tens[tenths]}`;
}

/**
 * Core of the app. Takes a number and orchestrates the full pipeline
 * to convert it into its German word representation.
 *
 * Handles special cases for 0 ("null") and 1 ("eins"). For larger numbers,
 * splits place values into scaled (>= 100) and unscaled (< 100) groups,
 * converts them separately and combines the results. Recurses on compound
 * multipliers via `scaledValuesToWords`.
 *
 * @param number - The number to convert
 * @returns German word representation of the number
 *
 * @example
 * numberToText(0) // -> "null"
 * numberToText(1) // -> "eins"
 * numberToText(23) // -> "drei und zwanzig"
 * numberToText(1_234) // -> "ein tausend zwei hundert vier und dreißig"
 * numberToText(1_000_000) // -> "eine million"
 */

export function numberToText(number: number): string {
	if (number === 0) return "null";
	if (number === 1) return "eins";

	const placeValues = getPlaceValues(number);
	const scaledValues = placeValues.filter((value) => value >= 100);
	const unscaledValues = placeValues.filter((value) => value < 100);

	const groupedScaledValues = groupByScale(scaledValues);

	const scaledWords = scaledValuesToWords(groupedScaledValues);
	const unscaledWords = unscaledValuesToWords(unscaledValues);

	if (scaledWords && unscaledWords) {
		return scaledWords + " " + unscaledWords;
	} else if (unscaledWords) {
		return unscaledWords;
	} else {
		return scaledWords;
	}
}
