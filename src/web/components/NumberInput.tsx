import {useState} from "react";
import { numberToText } from "../../core/numberToText/numberToText.js";

export default function NumberInput() {
	const [value, setValue] = useState<string>("");
	const [output, setOutput] = useState<string>("");

	function handleSubmit(event: React.SubmitEvent) {
		event.preventDefault();
		setOutput(numberToText(Number(value)));
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input id="numberInput" value={value} onChange={(e) => setValue(e.target.value)} />
				<button>Convert</button>
			</form>
			<p id="output">{output}</p>
		</>
	);
}
