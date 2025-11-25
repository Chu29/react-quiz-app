import { useNavigate } from "react-router-dom";
import "../index.css";
import CategoryCard from "./CategoryCard";

export function AppBar() {
  const navigate = useNavigate();
  return (
    <header className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-6 mb-8 px-4 max-w-6xl mx-auto">
      <a
        className="cursor-pointer"
        onClick={() => navigate("/")}
        aria-label="Go to homepage"
      >
        <img src="../quiz-icon.svg" alt="Quiz Icon" className="w-auto h-16" />
      </a>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-amber-600 text-center">
        The Trivia Game
      </h1>

      <div className="hidden sm:block w-16"></div>
    </header>
  );
}

export default function Header() {
  return (
    <>
      <AppBar />
      <div className="flex justify-center items-center ">
        <main className="flex flex-col gap-8 items-center mt-4">
          <h1 className="text-xl">
            Test your knowledge with 10 challenging questions
          </h1>
          <div className="text-left flex flex-col ">
            <p className="text-3xl">Game Rules: </p>
            <p>
              <span className="font-semibold text-2xl text-amber-600">
                10 Multiple Choice Questions:
              </span>{" "}
              Select the best answer from the options provided
            </p>
            <p>
              <span className="font-semibold text-2xl text-amber-600">
                30 Seconds Per Question:
              </span>{" "}
              Answer before time runs out or the question will be skipped
            </p>
            <p>
              <span className="font-semibold text-2xl text-amber-600">
                Instant Results:
              </span>{" "}
              See your score and review all answers at the end
            </p>
          </div>
          <CategoryCard />
        </main>
      </div>
    </>
  );
}
