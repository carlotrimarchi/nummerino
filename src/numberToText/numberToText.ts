export default function numberToText(number: number): string {
	if (number === 1) {
		return "eins";
	} else if (number === 2) {
		return "zwei";
	} else if (number === 3) {
		return "drei";
	}
	return "";
}
