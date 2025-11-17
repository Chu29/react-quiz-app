import { useNavigate } from "react-router-dom";
import '../index.css'

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <header className="flex justify-around items-center mt-10">
      <a className="cursor-pointer" onClick={() => navigate("/")}>
        <img src="./quiz-icon.svg" alt="" className="fill-amber-700 h-30" />
      </a>
      <h1 className="text-6xl">The Trivia Quiz</h1>
    </header>
  );
}
