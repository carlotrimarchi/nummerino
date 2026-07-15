import {useParams, Navigate} from "react-router";
import {quizzes} from "./quizzesData";

export function QuizPage() {
  const {quizPath} = useParams();
  const quiz = quizzes.find(q => q.path === quizPath && q.active !== false);

  if (!quiz) return <Navigate to="/quizzes" replace />;

   const Component = quiz.component;
   return <Component />;
}
