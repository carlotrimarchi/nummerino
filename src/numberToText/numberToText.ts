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
};

export const teens: Record<number, string> = {
	10: "zehn",
	11: "elf",
	12: "zwölf",
	13: "dreizehn",
	14: "vierzehn",
	15: "fünfzehn",
	16: "sechzehn",
	17: "siebzehn",
	18: "achtzehn",
	19: "neunzehn",
};

export const tens: Record<number, string> = {
	20: "zwanzig",
	30: "dreißig",
	40: "vierzig",
	50: "fünfzig",
	60: "sechzig",
	70: "siebzig",
	80: "achtzig",
	90: "neunzig",
};

export const scales: Record<number, string> = {
	100: "hundert",
	1_000: "tausend",
	1_000_000: "million",
	1_000_000_000: "milliarde",
	1_000_000_000_000: "billion",
}

const numberGroups = [ones, teens, tens, scales];

export default function numberToText(number: number): string {
	for (const numberGroup of numberGroups) {
		if (number in numberGroup) {
			return numberGroup[number];
		}
	}
	return "";
}
