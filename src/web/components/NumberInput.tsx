import { useState } from "react";
import { numberToText } from "../../core/numberToText/numberToText.js";
import { Button } from "@/web/components/ui/button";
import { Input } from "@/web/components/ui/input";

type NumberInputProps = {
  setConversionResult: React.Dispatch<React.SetStateAction<{
    number: number | null;
    spelled: string | null;
  }>>;
}

export default function NumberInput({setConversionResult}: NumberInputProps) {
	const [value, setValue] = useState<string>("");

	function handleSubmit(event: React.SubmitEvent) {
		event.preventDefault();
		if (!value) return;
		const numberValue = Number(value);
		const newOutput = {
			number: numberValue,
			spelled: numberToText(numberValue).joined,
		};
		setConversionResult(newOutput);
		setValue("");
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setValue(event.target.value);
		const numberValue = event.target.value
			? Number(event.target.value)
			: null;
		const newOutput = { number: numberValue, spelled: null };
		setConversionResult(newOutput);
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-3">
			<div className="flex flex-col gap-1">
				<label htmlFor="number-input" className="text-sm text-zinc-400">
					Enter a number
				</label>
				<Input
					id="number-input"
					value={value}
					onChange={handleChange}
					placeholder="e.g. 21, 37, 42, 1000, 999999..."
				/>
			</div>
			<Button
				type="submit"
				size="lg"
				className="text-lg bg-yellow-300 hover:bg-yellow-200 text-black self-start"
			>
				Spell it out
			</Button>
		</form>
	);
}
