import { ones, teens, tens, scales, numberGroups } from "./data";

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

export function getPlaceValues(number: number): number[] {
	if (number === 0) return [0];

	const result = [];
	let place = 1;
	while (number > 0) {
		const digit = (number % 10) * place;
		if (digit !== 0) {
			result.push(digit);
		}
		number = Math.floor(number / 10);
		place *= 10;
	}
	return result;
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
