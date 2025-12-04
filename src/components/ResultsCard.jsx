import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";

export default function ResultsCard() {
  const navigate = useNavigate();
  const { answers, questions } = useQuizStore();
  const questionAnswer = questions.map((qtn) => qtn.correctAnswer);
  const userAnswer = answers.map((ans) => ans.answer);
  let score = 0;

  for (let i = 0; i < questionAnswer.length; i++) {
    if (questionAnswer[i] === userAnswer[i]) {
      score += 1;
    }
  }

  return (
    <div>
      <div className="mt-20 flex flex-col gap-4 items-center max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-[#FDFBD4]">Your Results</h2>
        <p
          className={
            score > 5
              ? "bg-linear-to-r from-green-500 to-green-700 h-32 w-full p-10 rounded-2xl"
              : "bg-linear-to-r from-red-500 to-red-700 h-32 w-full p-10 rounded-2xl"
          }
        >
          {score >= 5 ? (
            <span>Success 🎉 </span>
          ) : (
            <span>You can do better 😂 </span>
          )}
          <br />
          You scored {score} out of {questions.length} (
          {(score / questions.length) * 100} %)
        </p>
      </div>
      <div className="max-w-6xl mx-auto">
        {questions.map((question, index) => {
          const userAnswer = answers.find(
            (ans) => ans.questionId === question.id
          );
          const isCorrect =
            userAnswer && userAnswer.answer === question.correctAnswer;
          return (
            <div key={question.id} className="border-b p-4">
              <h3 className="font-semibold">
                {index + 1}. {question.question}
              </h3>
              <p className="flex gap-1">
                Your Answer:
                <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                  {userAnswer ? userAnswer.answer : "No Answer"}
                </span>
              </p>
              {!isCorrect && (
                <p className="flex gap-1">
                  Correct Answer:
                  <span className="text-green-600">
                    {question.correctAnswer}
                  </span>
                </p>
              )}
            </div>
          );
        })}
      </div>
      <button
        className="text-2xl bg-linear-to-r from-green-500 to-green-700 p-2 rounded-lg hover:bg-green-800 mt-4 cursor-pointer block mx-auto"
        onClick={() => {
          navigate("/");
        }}
      >
        Play Again
      </button>
    </div>
  );
}
