import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StartScreen from "./pages/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";
import ReviewScreen from "./components/ReviewScreen";
import UserDashboard from "./components/UserDashboard";
import AnswerAnalysisScreen from "./components/AnswerAnalysisScreen";
import FlashcardScreen from "./components/FlashcardScreen";
import type { AnswerRecord, Question } from "./types/quiz";

const App = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [resultData, setResultData] = useState<{
    score: number;
    total: number;
    userAnswers: AnswerRecord[];
  } | null>(null);
  const [reviewing, setReviewing] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [mode, setMode] = useState<"quiz" | "flashcard">("quiz");
  const [restoredIndex, setRestoredIndex] = useState<number | null>(null);
  const [restoredScore, setRestoredScore] = useState<number>(0);
  const [restoredAnswers, setRestoredAnswers] = useState<AnswerRecord[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("quizProgress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.questions && parsed.current !== undefined) {
          setMode(parsed.mode || "quiz");
          setQuestions(parsed.questions);
          setRestoredIndex(parsed.current);
          setRestoredScore(parsed.score || 0);
          setRestoredAnswers(parsed.userAnswers || []);
        }
      } catch (err) {
        console.warn("Falha ao restaurar progresso:", err);
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/quiz"
          element={
            analyzing && resultData ? (
              <AnswerAnalysisScreen
                userAnswers={resultData.userAnswers}
                onBack={() => setAnalyzing(false)}
              />
            ) : reviewing && resultData ? (
              <ReviewScreen
                userAnswers={resultData.userAnswers}
                onBack={() => setReviewing(false)}
              />
            ) : resultData ? (
              <ResultScreen
                score={resultData.score}
                total={resultData.total}
                userAnswers={resultData.userAnswers}
                onRestart={() => {
                  setResultData(null);
                  setReviewing(false);
                  setAnalyzing(false);
                  setRestoredIndex(null);
                  localStorage.removeItem("quizProgress");
                }}
                onReview={() => setReviewing(true)}
                onAnalysis={() => setAnalyzing(true)}
              />
            ) : questions ? (
              mode === "quiz" ? (
                <QuizScreen
                  questions={questions}
                  onFinish={(score, userAnswers) => {
                    setQuestions(null);
                    setResultData({ score, total: questions.length, userAnswers });
                    localStorage.removeItem("quizProgress");
                  }}
                  {...(restoredIndex !== null && {
                    initialIndex: restoredIndex,
                    initialScore: restoredScore,
                    initialAnswers: restoredAnswers,
                  })}
                />
              ) : (
                <FlashcardScreen
                  questions={questions}
                  onBack={() => {
                    setQuestions(null);
                    setMode("quiz");
                  }}
                />
              )
            ) : (
              <>
                <UserDashboard />
                <StartScreen
                  onStart={({ questions }) => setQuestions(questions)}
                  onSelectMode={setMode}
                />
              </>
            )
          }
        />
        <Route path="*" element={<Navigate to="/quiz" />} />
      </Routes>
    </Router>
  );
};

export default App;
