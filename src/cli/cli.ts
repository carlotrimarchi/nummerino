#!/usr/bin/env node

import { numberToText } from "../core/numberToText/numberToText.js";

const args = process.argv.slice(2);
const splitted = args.includes("--splitted");
const input = args.find((a) => !a.startsWith("--"));
const number = Number(input);

if (!input || isNaN(number)) {
	console.error("Usage: nummerino <number> [--splitted]");
	process.exit(1);
}

const result = numberToText(number);
console.log(splitted ? result.splitted : result.joined);
