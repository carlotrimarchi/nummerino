export const ones: Record<number, string> = {
	1: "eins",
	2: "zwei",
	3: "drei",
	4: "vier",
	5: "fünf",
	6: "sechs",
	7: "sieben",
	8: "acht",
	9: "neun",
}

export default function numberToText(number: number): string {
	return ones[number];
}
