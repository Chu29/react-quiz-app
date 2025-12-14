import {
  ClockIcon,
  TrophyIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import "../index.css";
import CategoryCard from "./CategoryCard";

// export function AppBar() {
//   const navigate = useNavigate();
//   return (
//     <header className="absolute top-0 left-10 z-10 flex justify-center items-center py-6 px-4">
//       <Link
//         className="cursor-pointer transition-transform hover:scale-105"
//         onClick={() => navigate("/")}
//         aria-label="Go to homepage"
//       >
//         <img
//           src="./quiz-icon.svg"
//           alt="Quiz Icon"
//           className="w-auto h-16 drop-shadow-md"
//         />{" "}
//       </Link>
//     </header>
//   );
// }

export default function Header() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 via-pink-500 to-amber-500 dark:from-purple-900 dark:via-pink-900 dark:to-amber-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>

      {/* <AppBar /> */}

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white drop-shadow-2xl text-center mb-8 animate-fade-in">
          The Trivia Game
        </h1>

        <div className="backdrop-blur-xl bg-white/20 dark:bg-black/30 border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl w-full">
          <p className="text-2xl md:text-3xl text-white dark:text-gray-100 text-center mb-10 font-semibold">
            Test your knowledge with 10 challenging questions!
          </p>

          <div className="space-y-8 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-100 text-center">
              Game Rules
            </h2>

            <ul className="space-y-6 text-lg md:text-xl text-white dark:text-gray-200">
              <li className="flex items-center gap-4">
                <QuestionMarkCircleIcon className="w-10 h-10 text-amber-300 shrink-0" />
                <span>
                  <strong className="text-amber-300">
                    10 Multiple Choice Questions:
                  </strong>{" "}
                  Select the best answer from the options.
                </span>
              </li>
              <li className="flex items-center gap-4">
                <ClockIcon className="w-10 h-10 text-amber-300 shrink-0" />
                <span>
                  <strong className="text-amber-300">
                    30 Seconds Per Question:
                  </strong>{" "}
                  Answer quickly or it'll skip!
                </span>
              </li>
              <li className="flex items-center gap-4">
                <TrophyIcon className="w-10 h-10 text-amber-300 shrink-0" />
                <span>
                  <strong className="text-amber-300">Instant Results:</strong>{" "}
                  See your score and review answers at the end.
                </span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center">
            <CategoryCard />{" "}
          </div>
        </div>
      </main>
    </div>
  );
}
