import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { PageLayout } from "./components/PageLayout";
import { Home } from "./components/Home";
import NumberToSpelling from "@/web/components/numberToSpelling/NumberToSpelling.js";
import { Quizzes } from "@/web/components/quizzes/Quizzes";
import { QuizPage } from "@/web/components/quizzes/QuizPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<PageLayout />}>
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quizzes/:quizPath" element={<QuizPage />} />
        <Route path="/speller" element={<NumberToSpelling />} />
      </Route>
    </>,
  ),
);
