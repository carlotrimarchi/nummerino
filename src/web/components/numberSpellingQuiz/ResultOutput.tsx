import { useState } from "react";
import { Button } from "@/web/components/ui/button";

type ResultOutputProps = {
  isAnswerCorrect: boolean | null;
  solution: string;
};

export function ResultOutput({ isAnswerCorrect, solution }: ResultOutputProps) {
  const [showSolution, setShowSolution] = useState(false);

  const resultText =
    isAnswerCorrect === true
      ? "Correct!"
      : isAnswerCorrect === false
        ? "Wrong"
        : "-";

  return (
    <>
      <div className="flex gap-3 justify-between">
        <label htmlFor="answer-result" className="text-muted-foreground">
          Result
        </label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowSolution((value) => !value)}
        >
          {showSolution ? "Hide solution" : "Show solution"}
        </Button>
      </div>
      <output
        id="answer-result"
        className={`text-2xl ${isAnswerCorrect === null ? "text-muted-foreground" : ""}`}
      >
        {resultText}
      </output>
      {showSolution && (
        <div className="text-muted-foreground" lang="de">
          {solution}
        </div>
      )}
    </>
  );
}
