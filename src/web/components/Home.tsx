import { Link } from "react-router";
import { QuizCard } from "./quizzes/QuizCard";
import SpellerImage from "./quizzes/images/speller.svg?react";
import SpellTheNumberImage from "./quizzes/images/number-to-spell.svg?react";

export function Home() {
  return (
    <>
      <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-xl">
          Struggling with German numbers? Have no fear, nummerino is here. Your
          personal assistant, coach, trainer, companion, friend even, for all
          your number needs and nightmares*.
        </p>
        <p className="text-sm text-zinc-400">* exclusively in German</p>
      </div>
        <div className="flex flex-col gap-4">
        <p className="text-lg">
          nummerino lets you learn and practice German numbers. Through a set of <Link to="/quizzes">quizzes</Link>, challenges, and mini-games you can develop fluency in forming numbers and get faster at recognising them.
        </p>
        <p className="text-lg">Right now there's only one quiz available, but more are coming soon.</p>
        <p className="text-lg">You can also try the <Link to="/speller">speller</Link> to see how a particular number is written out.</p>
        </div>
        <ul className="quiz-list quiz-list__compact">
          <li>
            <QuizCard
              to="/quizzes/spell-the-number"
              title="Spell the number"
              image={SpellTheNumberImage}
            />
          </li>
          <li>
            <QuizCard to="/speller" title="Speller" image={SpellerImage} />
          </li>
        </ul>
      </div>
    </>
  );
}
