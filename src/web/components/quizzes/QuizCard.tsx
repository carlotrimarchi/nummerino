import "./Quizzes.css";
import { Link } from "react-router";

type QuizCardProps = {
  to: string;
  title: string;
  image: React.ComponentType;
  inactive?: boolean;
};

export function QuizCard({ to, title, image: Image, inactive }: QuizCardProps) {
  const card = (
    <div className="quiz-card">
      <div className="quiz-image">
        <Image />
      </div>
      <p className="quiz-title">{title}</p>
      {inactive && <p className="quiz-badge">Coming soon</p>}
    </div>
  );

  return inactive ? (
    <div className="quiz-card-inactive">{card}</div>
  ) : (
    <Link to={to}>{card}</Link>
  );
}
