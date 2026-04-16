import { useState } from "react";

import NumberInput from "./NumberInput.js";
import OutputDisplay from "./OutputDisplay.js";


export default function NumberToSpelling() {
	const [conversionResult, setConversionResult] = useState<{
		number: number | null;
		spelled: {joined: string, splitted: string} | null;
	}>({ number: null, spelled: null });

	return (
		<section>
			<h2 className="text-2xl font-bold mb-6">Number to German spelling converter</h2>
			<NumberInput setConversionResult={setConversionResult} />
			<div className="mt-8">
				<OutputDisplay conversionResult={conversionResult} />
			</div>
		</section>
	);
}
