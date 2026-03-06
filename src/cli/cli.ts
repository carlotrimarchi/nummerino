#!/usr/bin/env node

import { numberToText } from "../core/numberToText/numberToText.js";

const input = process.argv[2];
const number = Number(input);

if (!input || isNaN(number)) {
	console.error("Usage: nummerino <number>");
	process.exit(1);
}

console.log(numberToText(number));
