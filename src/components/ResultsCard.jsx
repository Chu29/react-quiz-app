import { useNavigate } from "react-router";
import { useQuizStore } from "../store/quizStore";

export default function ResultsCard() {
  const navigate = useNavigate();
  const { answers, questions, resetQuiz, category } = useQuizStore();

  console.log(category);

  const score = questions.reduce((acc, question) => {
    const userAns = answers.find((a) => a.questionId === question.id);
    return userAns && userAns.answer === question.correctAnswer ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  const getFeedback = () => {
    if (percentage === 100)
      return {
        msg: "Perfect Score! 🏆",
        emoji: "👑",
        color: "from-yellow-400 to-amber-600",
      };
    if (percentage >= 90)
      return {
        msg: "Quiz Master! 🌟",
        emoji: "🧠",
        color: "from-purple-500 to-pink-500",
      };
    if (percentage >= 70)
      return {
        msg: "Great Job! 🔥",
        emoji: "💪",
        color: "from-blue-500 to-cyan-500",
      };
    if (percentage >= 50)
      return {
        msg: "Solid Effort! 👍",
        emoji: "📈",
        color: "from-green-500 to-emerald-600",
      };
    return {
      msg: "Keep Learning! 💡",
      emoji: "🚀",
      color: "from-orange-500 to-red-500",
    };
  };

  const feedback = getFeedback();

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 via-pink-500 to-amber-500 dark:from-purple-900 dark:via-pink-900 dark:to-amber-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Hero Score Section */}
        <div className="backdrop-blur-xl bg-white/20 dark:bg-black/40 border border-white/30 rounded-3xl shadow-2xl p-10 md:p-16 text-center max-w-4xl w-full mb-12 animate-fade-in">
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-2xl">
            {feedback.msg}
          </h1>

          <div className="relative w-64 h-64 mx-auto my-10">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="20"
                fill="none"
              />
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="url(#gradient)"
                strokeWidth="20"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 110}`}
                strokeDashoffset={`${
                  2 * Math.PI * 110 * (1 - percentage / 100)
                }`}
                className="transition-all duration-1000 ease-out drop-shadow-lg"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl md:text-7xl font-extrabold text-white">
                {score}
                <span className="text-4xl">/{questions.length}</span>
              </span>
              <span className="text-3xl text-white/90 mt-2">{percentage}%</span>
            </div>
            <div className="text-3xl mb-6">{feedback.emoji}</div>
          </div>

          
        </div>

        <div className="w-full max-w-4xl space-y-6 mb-12">
          <h2 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
            Question Review
          </h2>

          {questions.map((question, index) => {
            const userAns = answers.find((a) => a.questionId === question.id);
            const isCorrect =
              userAns && userAns.answer === question.correctAnswer;

            return (
              <div
                key={question.id}
                className="backdrop-blur-lg bg-white/10 dark:bg-black/30 border border-white/20 rounded-2xl p-6 shadow-xl transition-all hover:scale-101 hover:bg-white/15"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">
                    {isCorrect ? "✅" : userAns ? "❌" : "⏭️"}
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-semibold text-white mb-3"
                      dangerouslySetInnerHTML={{
                        __html: `${index + 1}. ${question.question}`,
                      }}
                    />
                    <p className="text-white/90">
                      <span className="font-medium">Your Answer:</span>{" "}
                      <span
                        className={
                          isCorrect ? "text-green-300" : "text-red-300"
                        }
                      >
                        {userAns ? userAns.answer : "Skipped"}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-white/90 mt-2">
                        <span className="font-medium">Correct Answer:</span>{" "}
                        <span className="text-green-300">
                          {question.correctAnswer}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => {
              resetQuiz();
              navigate("/");
            }}
            className="px-12 py-6 bg-linear-to-r from-green-500 to-emerald-600 text-white text-2xl font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
