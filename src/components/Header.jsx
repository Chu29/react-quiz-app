import { useNavigate } from "react-router-dom";
import "../index.css";
import NavBar from "./NavBar";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center h-90">
        <main className="flex flex-col gap-8 items-center">
          <h1 className="text-4xl">Welcome to The Trivia Quiz!</h1>
          <p>10 Questions to test your Trivia Knowledge</p>
          <button
            onClick={() => navigate("/quiz")}
            type="button"
            className="bg-sky-500 px-8 py-4 rounded-lg hover:bg-sky-700 cursor-pointer"
          >
            Lets Start
          </button>
        </main>
      </div>
    </div>
  );
}
