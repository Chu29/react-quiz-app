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
      <div className="mt-20 flex flex-col gap-4 items-center">
        <h2 className="text-4xl font-bold text-blue-700">Your Results</h2>
        <p>
          You scored {score} out of {questions.length}
        </p>
      </div>
      <div>
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
              <p>
                Your Answer:
                <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                  {userAnswer ? userAnswer.answer : "No Answer"}
                </span>
              </p>
              {!isCorrect && (
                <p>
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
        className="text-2xl bg-green-700 p-2 rounded-lg hover:bg-green-800 mt-4 cursor-pointer block mx-auto"
        onClick={() => {
          navigate("/");
        }}
      >
        Play Again
      </button>
    </div>
  );
}
