import { numberToText } from "./numberToText/numberToText";

const input = process.argv[2];
const number = Number(input);

if (!input || isNaN(number)) {
	console.error("Usage: npm run cli -- <number>");
	process.exit(1);
}

console.log(numberToText(number));
