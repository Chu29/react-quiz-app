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
          <h1 className="text-4xl">Welcome to The Trivia Quiz!</h1>
          <CategoryCard />
        </main>
      </div>
    </>
  );
}
