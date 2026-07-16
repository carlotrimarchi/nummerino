import { useState } from "react";

import {
  type NumberRange,
  RangeSelector,
} from "@/web/components/numberSpellingQuiz/RangeSelector.js";
import { AnswerForm } from "@/web/components/numberSpellingQuiz/AnswerForm.js";
import { ResultOutput } from "@/web/components/numberSpellingQuiz/ResultOutput";
import { generateRandomNumber } from "@/core/utils";
import { numberToText } from "@/core/numberToText/numberToText";
import { Button } from "@/web/components/ui/button";
import { OutputCard } from "@/web/components/outputCard/OutputCard";
import { EnteredValue } from "@/web/components/outputCard/EnteredValue";
import { SectionHeading } from "@/web/components/SectionHeading";
import type { SpelledOutNumber } from "@/core/numberToText/numberToText";

const DEFAULT_RANGE: NumberRange = { from: 0, to: 100 };

export function NumberSpellingQuiz() {
  const [range, setRange] = useState<NumberRange>(DEFAULT_RANGE);
  const [prevRange, setPrevRange] = useState(range);

  const [submittedAnswer, setSubmittedAnswer] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [numberToSpellOut, setNumberToSpellOut] = useState<number>(() =>
    generateRandomNumber(range.from, range.to),
  );
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const spelledOutNumber: SpelledOutNumber = numberToText(numberToSpellOut);

  if (range !== prevRange) {
    setPrevRange(range);
    setNumberToSpellOut(generateRandomNumber(range.from, range.to));
    setAnswer("");
    setIsAnswerCorrect(null);
  }

  function handleNextNumber() {
    setNumberToSpellOut(generateRandomNumber(range.from, range.to));
    setSubmittedAnswer("");
    setAnswer("");
    setIsAnswerCorrect(null);
  }

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!answer) return;

    if (answer === spelledOutNumber.joined) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
    setSubmittedAnswer(answer);
    setAnswer("");
  }

  return (
    <section className="flex flex-col gap-8">
      <SectionHeading>Number to German spelling quiz</SectionHeading>
      <div className="hidden sm:block">
        <RangeSelector onChange={setRange} />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          How do you spell this number in German?
        </p>
        <div className="text-4xl font-bold">{numberToSpellOut}</div>
      </div>

      <AnswerForm value={answer} onChange={setAnswer} onSubmit={handleSubmit} />

      <OutputCard
        top={
          <EnteredValue
            id="answer-output"
            label="Your answer"
            value={submittedAnswer}
          />
        }
        bottom={
          <ResultOutput
            isAnswerCorrect={isAnswerCorrect}
            solution={spelledOutNumber.joined}
          />
        }
      />

      <Button type="button" onClick={handleNextNumber}>
        Next number
      </Button>
    </section>
  );
}
