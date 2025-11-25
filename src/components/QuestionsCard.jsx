import { useNavigate, useParams } from "react-router-dom";
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
  } = useQuizStore();
  const isQuizEnd = currentIndex >= questions.length;
  const currentQuestion = questions[currentIndex];
  useEffect(() => {
    if (category) {
      startQuiz(category);
    }
  }, [category, startQuiz]);

  useEffect(() => {
    const counter = setInterval(() => {
      countDownTimer();
    }, 1000);

    return () => clearInterval(counter);
  }, [countDownTimer]);

  if (isLoading) {
    return (
      <div className="mt-40 flex flex-col gap-8 items-center">
        <p className="h-10 w-10 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></p>
        <p>Loading quiz for {category}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="flex flex-col gap-8 items-center text-red-600">
        Failed to load quiz: {error}
      </p>
    );
  }

  return (
    <>
      {isQuizEnd ? (
        <div className="mt-20 flex flex-col gap-4 items-center">
          <h2 className="text-2xl font-bold text-green-700">Quiz Finished</h2>
          <p>You have answered all {questions.length} questions.</p>
          <button
            className="text-2xl bg-green-700 p-2 rounded-lg hover:bg-green-800 mt-4 cursor-pointer"
            onClick={() => {
              navigate("/quiz-page/results-page");
            }}
          >
            See Results
          </button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto p-4">
          <h1 className="text-xl font-semibold mb-6 capitalize text-center">
            Quiz on Category: {category.toUpperCase().replaceAll(/_/g, " ")}
          </h1>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-gray-600 mb-2 flex justify-between">
              Question {currentIndex + 1} of {questions.length}
              <span className={timer <= 5 ? "text-red-600" : "text-green-600"}>
                Timer: {timer}
              </span>
            </p>

            <h3 className="text-2xl font-bold mb-6 text-black">
              {currentQuestion.question}
            </h3>

            <div className="flex flex-col gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(option)}
                  className="p-4 border border-gray-300 rounded-lg text-left hover:bg-blue-50 transition duration-150 text-black"
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              className="mx-auto bg-red-500 mt-6 p-2 rounded-lg block hover:bg-red-600 cursor-pointer"
              onClick={() => {
                resetQuiz(), startQuiz(category);
              }}
            >
              Reset Quiz
            </button>
          </div>
        </div>
      )}
    </>
  );
}
