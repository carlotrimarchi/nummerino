import { useState } from "react";
import { numberToText } from "@/core/numberToText/numberToText.js";
import type { SpelledOutNumber } from "@/core/numberToText/numberToText.js";

import SpellingForm from "@/web/components/numberToSpelling/SpellingForm.js";
import { SpellingOutput } from "@/web/components/numberToSpelling/SpellingOutput";
import { OutputCard } from "@/web/components/outputCard/OutputCard";
import { EnteredValue } from "@/web/components/outputCard/EnteredValue";
import { SectionHeading } from "@/web/components/SectionHeading";

export default function NumberToSpelling() {
  const [inputValue, setInputValue] = useState("");
  const [numberToSpell, setNumberToSpell] = useState<number | null>(null);
  const [spelledOutNumber, setSpelledOutNumber] =
    useState<SpelledOutNumber | null>(null);

  function handleInputChange(newValue: string) {
    setInputValue(newValue);
    setNumberToSpell(newValue ? Number(newValue) : null);
    setSpelledOutNumber(null);
  }

  function handleSubmit() {
    if (!inputValue) return;
    const numberValue = Number(inputValue);
    setNumberToSpell(numberValue);
    setSpelledOutNumber(numberToText(numberValue));
    setInputValue("");
  }

  return (
    <section className="flex flex-col gap-8">
      <SectionHeading>Number to German spelling converter</SectionHeading>
      <SpellingForm
        value={inputValue}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <OutputCard
        top={
          <EnteredValue
            id="input-number"
            label="Your input"
            value={numberToSpell}
          />
        }
        bottom={<SpellingOutput spelledOutNumber={spelledOutNumber} />}
      />
    </section>
  );
}
