import { NumberSpellingQuiz } from "../numberSpellingQuiz/NumberSpellingQuiz";
import SpellTheNumberImage from "./images/number-to-spell.svg?react";
import UnspellImage from "./images/unspell.svg?react";
import ZehnZigSSigImage from "./images/zehn-zig-ßig.svg?react";

export type Quiz = {
  title: string;
  path: string;
  image: React.ComponentType;
  component: React.ComponentType;
  active?: boolean;
};

export const quizzes: Quiz[] = [
  {
    title: "Spell the number",
    component: NumberSpellingQuiz,
    image: SpellTheNumberImage,
    path: "spell-the-number",
  },
  {
    title: "Unspell the spelling",
    component: () => null,
    image: UnspellImage,
    path: "unspell-the-number",
    active: false,
  },
  {
    title: "-zehn, -zig, or -ßig?",
    component: () => null,
    image: ZehnZigSSigImage,
    path: "zehn-zig-ssig",
    active: false,
  },
];
