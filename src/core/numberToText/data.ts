export const ones: Record<number, string> = {
	1: "ein",
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

export const scales: Record<number, { singular: string; plural: string; feminine: boolean }> = {
  100: { singular: "hundert", plural: "hundert", feminine: false },
  1_000: { singular: "tausend", plural: "tausend", feminine: false },
  1_000_000: { singular: "million", plural: "millionen", feminine: true },
  1_000_000_000: { singular: "milliarde", plural: "milliarden", feminine: true },
  1_000_000_000_000: { singular: "billion", plural: "billionen", feminine: true },
};

export const scaleWords = ["hundert", "tausend", "million", "milliarde", "billion"];

export const numberGroups = [ones, teens, tens, scales];