import { ones, teens, tens, scales, numberGroups } from "./data";

/**
 * 
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
		// `% 10` extracts the last digit, `* place` gives it its positional value
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
 * 
 * Returns the scale for a given number.
 * 
 * The function is used only on numbers `>= 100`.
 * 
 * The scale of a number is the largest scale value (hundert, 
 * tausend, million…) that is less than or equal to the number
 * 
 * The scale will be used later to express the number as a 
 * multiplier of that scale. 
 * E.g. `300_000` has scale `1_000` and multiplier `300`. 
 * In turn, `300` has scale `100` and multiplier `3`.
 * 
 * @param number - The number whose scale we want to get
 * @returns the scale of the number
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

export function smallValuesToWords(values: number[]): string {
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

export function largeValuesToWords(
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


export function numberToText(number: number): string {
	if (number === 0) return "null";
	if (number === 1) return "eins";

	const placeValues = getPlaceValues(number);
	const valuesWithScale = placeValues.filter((value) => value >= 100);
	const valuesWithoutScale = placeValues.filter((value) => value < 100);

	const groupedValuesWithScale = groupByScale(valuesWithScale);

	const withScaleWords = largeValuesToWords(groupedValuesWithScale);
	const withoutScaleWords = smallValuesToWords(valuesWithoutScale);

	if (withScaleWords && withoutScaleWords) {
		return withScaleWords + " " + withoutScaleWords;
	} else if (withoutScaleWords) {
		return withoutScaleWords;
	} else {
		return withScaleWords;
	}
}
