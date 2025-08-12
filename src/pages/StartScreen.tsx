import { useState, useEffect } from "react";
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
  const [filtro, setFiltro] = useState<"todas" | "erradas" | "respondidas" | "nao_respondidas">("todas");

  const [totals, setTotals] = useState<Record<string, number>>({});

  // Carrega o total de questões por disciplina
  useEffect(() => {
    const loadTotals = async () => {
      const data: Record<string, number> = {};
      for (const m of materias) {
        try {
          const questions = await loadQuestionsBySubject(m.value, 9999);
          data[m.value] = questions.length;
        } catch {
          data[m.value] = 0;
        }
      }
      setTotals(data);
    };
    loadTotals();
  }, []);

  const isFormValid = materia !== "" && amount > 0;

  const handleStart = async (mode: "quiz" | "flashcard") => {
    if (!isFormValid || loading) return;

    setLoading(true);
    setError("");
    onSelectMode(mode);

    try {
      let questions = await loadQuestionsBySubject(materia, 9999);

      questions = questions.filter((q) => {
        if (filtro === "erradas") return q.attempted && q.lastAnsweredCorrectly === false;
        if (filtro === "respondidas") return q.attempted;
        if (filtro === "nao_respondidas") return !q.attempted;
        return true;
      });

      questions = questions.sort((a, b) => {
        const getScore = (q: Question) => {
          if (!q.attempted) return 0;
          if (q.lastAnsweredCorrectly === false) return 1;
          return 2;
        };
        return getScore(a) - getScore(b);
      });

      questions = questions.slice(0, amount);

      if (!questions.length) throw new Error("Nenhuma questão encontrada com esse filtro.");

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
              {m.label} ({totals[m.value] ?? "..."})
            </option>
          ))}
        </Select>
      </Label>

      <Label>
        Filtro de questões:
        <Select value={filtro} onChange={(e) => setFiltro(e.target.value as any)}>
          <option value="todas">Todas</option>
          <option value="erradas">Somente erradas</option>
          <option value="respondidas">Somente respondidas</option>
          <option value="nao_respondidas">Somente não respondidas</option>
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
