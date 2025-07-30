import { useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Title,
  Label,
  Input,
  Select,
  Button,
  HelperText,
  ButtonGroup,
} from "../styles/StartScreen.styles";
import { materias } from "../constants/materias";
import { loadQuestionsBySubject } from "../utils/loadQuestions";
import type { Question } from "../types/quiz";
import UserDashboard from "../components/UserDashboard";

type Props = {
  onStart: (params: { questions: Question[] }) => void;
  onSelectMode: (mode: "quiz" | "flashcard") => void;
};

const StartScreen = ({ onStart, onSelectMode }: Props) => {
  const [amount, setAmount] = useState(10);
  const [materia, setMateria] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = materia !== "" && amount > 0;

  const handleStart = async (mode: "quiz" | "flashcard") => {
    if (!isFormValid || loading) return;

    setLoading(true);
    setError("");
    onSelectMode(mode);

    try {
      const questions = await loadQuestionsBySubject(materia, amount);
      if (!questions.length) throw new Error("Nenhuma questão encontrada.");
      onStart({ questions });
    } catch (err) {
      console.error("Erro ao carregar questões:", err);
      setError("Erro ao carregar questões. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>🎓 Quiz PMDF</Title>
      <UserDashboard />

      <Label>
        Disciplina:
        <Select
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
        >
          <option value="">Selecione...</option>
          {materias.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </Select>
      </Label>

      <Label>
        Número de Questões:
        <Input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </Label>

      {error && <HelperText style={{ color: "red" }}>{error}</HelperText>}
      {!materia && !error && (
        <HelperText>🔎 Escolha uma disciplina antes de começar</HelperText>
      )}

      <ButtonGroup>
        <Button
          onClick={() => handleStart("quiz")}
          disabled={!isFormValid || loading}
          aria-busy={loading}
        >
          {loading ? "Carregando..." : "Iniciar Quiz"}
        </Button>

        <Button
          onClick={() => handleStart("flashcard")}
          disabled={!isFormValid || loading}
          aria-busy={loading}
        >
          {loading ? "Carregando..." : "Iniciar Flashcards"}
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default StartScreen;
