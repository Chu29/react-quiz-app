import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage}></Route>
        <Route path="/quiz-page/:category" Component={QuizPage}></Route>
        <Route path="/quiz-page/results-page" Component={ResultPage}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
