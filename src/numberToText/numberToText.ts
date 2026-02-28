import { ones, teens, tens, scales } from "./data";

export function numberToText(number: number): string {
	if (number === 1) return "eins";
	const placeValues = getPlaceValues(number).reverse();
	console.log("placeValues", placeValues);
	const result = [];

	const stop = placeValues.length > 2 ? 2 : 0;

	for (let i = 0; i < placeValues.length - stop; i++) {
		console.log("result", result);
		let value = placeValues[i];
		const magnitude = Math.pow(10, Math.floor(Math.log10(value)));

		if (magnitude >= 100) {
			value = value / magnitude;
			result.push(ones[value] + " " + scales[magnitude]);
		} else {
			for (const numberGroup of numberGroups) {
				if (value in numberGroup) {
					if (value === 1) {
						result.push(numberGroup[value] + "s");
					} else {
						result.push(numberGroup[value]);
					}
				}
			}
		}
	}

	if (placeValues.length > 2) {
		console.log("result", result);
		const last = placeValues.length - 1;
		const secondLast = placeValues.length - 2;
		if (placeValues[secondLast] === 0 && placeValues[last] < 20) {
			result.push(ones[placeValues[last]]);
		} else if (placeValues[secondLast] && placeValues[secondLast] < 20) {
			placeValues[secondLast] += placeValues[last];
			result.push(teens[placeValues[secondLast]]);
		} else {
			result.push(
				ones[placeValues[last]] +
					" und " +
					tens[placeValues[secondLast]],
			);
		}
	}
	console.log(result);
	// for (const numberGroup of numberGroups) {
	// 	if (number in numberGroup) {
	// 		return numberGroup[number];
	// 	}
	// }
	return result.join(" ");

	// .reduce((acc, value, i, array) => {
	// 	const split = value.split(" ");
	// 	if (i === array.length - 1) {
	// 	return acc;
	// 	}
	// 	if (i === array.length - 2) {
	// 		acc += array[array.length - 1] + " und " + value
	// 		return acc;
	// 	}

	// 	if (split[1] && scaleWords.includes(split[1])) {
	// 		acc += value + " ";
	// 	} else {
	// 		acc += value + " und "
	// 	}
	// 	return acc;
	// }, "");
}

export function getPlaceValues(number: number): number[] {
	const result = [];
	let place = 1;
	while (number > 0) {
		const digit = (number % 10) * place;
		result.push(digit);
		number = Math.floor(number / 10);
		place *= 10;
	}
	return result;
}
