import "./Quizzes.css";
import { QuizCard } from "./QuizCard";
import { quizzes } from "./quizzesData";

export function Quizzes() {
  return (
    <ul className="quiz-list">
      {quizzes.map((quiz) => (
        <li key={quiz.path}>
          <QuizCard
            to={quiz.path}
            title={quiz.title}
            image={quiz.image}
            inactive={quiz.active === false}
          />
        </li>
      ))}
    </ul>
  );
}
