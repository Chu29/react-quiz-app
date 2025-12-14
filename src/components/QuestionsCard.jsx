import { useNavigate, useParams } from "react-router";
import { useQuizStore } from "../store/quizStore";
import { useEffect } from "react";

export default function QuestionsCard() {
  const navigate = useNavigate();
  const { category } = useParams();

  const {
    questions,
    currentIndex,
    isLoading,
    error,
    startQuiz,
    selectAnswer,
    resetQuiz,
    countDownTimer,
    timer,
    selectedAnswer,
  } = useQuizStore();

  const isQuizEnd = currentIndex >= questions.length;
  const currentQuestion = questions[currentIndex];

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const timerProgress = (timer / 30) * 100;

  useEffect(() => {
    if (category) startQuiz(category);
  }, [category, startQuiz]);

  useEffect(() => {
    const interval = setInterval(() => countDownTimer(), 1000);
    return () => clearInterval(interval);
  }, [countDownTimer]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-16 h-16 border-8 border-white/30 border-t-amber-400 rounded-full animate-spin" />
        <p className="text-2xl text-white font-semibold">
          Loading your quiz...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="backdrop-blur-lg bg-red-500/20 border border-red-300/50 rounded-2xl p-8 text-center">
          <p className="text-2xl text-white font-bold">
            Oops! Something went wrong
          </p>
          <p className="text-white mt-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 via-pink-500 to-amber-500 dark:from-purple-900 dark:via-pink-900 dark:to-amber-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {isQuizEnd ? (
          <div className="backdrop-blur-xl bg-white/20 dark:bg-black/40 border border-white/30 rounded-3xl shadow-2xl p-12 text-center max-w-lg w-full animate-fade-in">
            <div className="text-8xl mb-6">🏆</div>
            <h2 className="text-5xl font-extrabold text-white mb-4">
              Quiz Complete!
            </h2>
            <p className="text-2xl text-white/90 mb-8">
              You answered all {questions.length} questions.
            </p>
            <button
              onClick={() => navigate("/quiz-page/results-page")}
              className="px-10 py-5 bg-linear-to-r from-green-500 to-emerald-600 text-white text-2xl font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              View Results
            </button>
          </div>
        ) : (
          <div className="w-full max-w-3xl">
            <div className="mb-8 flex justify-between items-center text-white">
              <span className="text-xl font-semibold">
                Question {currentIndex + 1} / {questions.length}
              </span>
              <div className="flex-1 mx-6 h-4 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-amber-400 to-pink-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
              {category.toUpperCase().replaceAll(/_/g, " ")}
            </h1>

            <div className="backdrop-blur-xl bg-white/20 dark:bg-black/40 border border-white/30 rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="relative w-32 h-32 mx-auto mb-10">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke={timer <= 10 ? "#ef4444" : "#10b981"}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 56 * (1 - timerProgress / 100)
                    }`}
                    className="transition-all duration-1000 ease-linear drop-shadow-lg"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`text-4xl font-bold text-white ${
                      timer <= 10 ? "animate-pulse" : ""
                    }`}
                  >
                    {timer}
                  </span>
                </div>
              </div>

              <h3
                className="text-2xl md:text-3xl font-bold text-white text-center mb-10 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(option)}
                    disabled={!!selectedAnswer}
                    className={`
                      p-6 rounded-2xl text-lg md:text-xl font-medium text-white text-left
                      backdrop-blur-md border-2 transition-all duration-300
                      ${
                        selectedAnswer === option
                          ? "bg-white/30 border-white shadow-lg scale-105"
                          : "bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/60 hover:scale-102"
                      }
                      ${selectedAnswer && "cursor-not-allowed"}
                    `}
                  >
                    <span dangerouslySetInnerHTML={{ __html: option }} />
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  resetQuiz();
                  startQuiz(category);
                }}
                className="mt-10 mx-auto block px-8 py-3 bg-red-500/70 hover:bg-red-600 text-white font-semibold rounded-xl transition-all hover:scale-105"
              >
                Restart Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
