import "./Navigation.css";
import { NavLink } from "react-router";

export function Navigation() {
  return (
    <nav className="main-nav">
      <ul className="flex gap-4 text-2xl">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/quizzes">Quizzes</NavLink>
        </li>
        <li>
          <NavLink to="/speller">Speller</NavLink>
        </li>
      </ul>
    </nav>
  );
}
