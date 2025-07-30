import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "../types/quiz";
import {
  Container,
  ProgressWrapper,
  ProgressBar,
  ProgressText,
  QuestionText,
  Hint,
  OptionList,
  OptionItem,
  RationaleBox,
  NextButton,
  ActionRow,
  SmallButton,
} from "../styles/QuizScreen.styles";

export type AnswerRecord = {
  question: string;
  selectedIndex: number;
  correctIndex: number;
  options: Question["answerOptions"];
};

type Props = {
  questions: Question[];
  onFinish: (score: number, userAnswers: AnswerRecord[]) => void;
  initialIndex?: number;
  initialScore?: number;
  initialAnswers?: AnswerRecord[];
};

const QuizScreen = ({
  questions,
  onFinish,
  initialIndex = 0,
  initialScore = 0,
  initialAnswers = [],
}: Props) => {
  const [current, setCurrent] = useState(initialIndex);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(initialScore);
  const [userAnswers, setUserAnswers] = useState<AnswerRecord[]>(initialAnswers);

  const question = questions[current];
  const total = questions.length;
  const progressPercent = Math.round(((current + 1) / total) * 100);

  const handleSelect = (index: number) => {
    if (selected !== null) return;

    const correctIndex = question.answerOptions.findIndex((opt) => opt.isCorrect);
    const isCorrect = question.answerOptions[index].isCorrect;

    if (isCorrect) setScore((prev) => prev + 1);

    const answerRecord: AnswerRecord = {
      question: question.question,
      selectedIndex: index,
      correctIndex,
      options: question.answerOptions,
    };

    const updatedAnswers = [...userAnswers];
    updatedAnswers[current] = answerRecord;

    setUserAnswers(updatedAnswers);
    setSelected(index);
    setTimeout(() => {
      document.getElementById("justificativa")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleNext = () => {
    if (current + 1 < total) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
    } else {
      onFinish(score, userAnswers);
    }
  };

  const getOptionBg = (index: number): string => {
    if (selected === null) return "#f0f0f0";
    const isCorrect = question.answerOptions[index].isCorrect;
    if (index === selected && isCorrect) return "#a2f0a2";
    if (index === selected && !isCorrect) return "#f8a2a2";
    if (isCorrect) return "#c1f5c1";
    return "#f0f0f0";
  };

  const getFeedbackMessage = (isCorrect: boolean): string =>
    isCorrect ? "✅ Boa! Resposta correta." : "❌ Ops! Não é essa. Veja a justificativa.";

  // Salvar progresso no localStorage
  useEffect(() => {
    const progress = {
      current,
      score,
      userAnswers,
      questions,
      mode: "quiz",
    };
    localStorage.setItem("quizProgress", JSON.stringify(progress));
  }, [current, score, userAnswers, questions]);

  // Selecionar resposta anterior (se existir)
  useEffect(() => {
    const existing = userAnswers[current];
    if (existing) {
      setSelected(existing.selectedIndex);
    } else {
      setSelected(null);
    }
  }, [current]);

  return (
    <Container
      key={current}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <ProgressWrapper>
        <ProgressBar
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4 }}
        />
      </ProgressWrapper>

      <ProgressText>
        Pergunta {current + 1} de {total} • {progressPercent}%
        <br />
        <span style={{ fontSize: 14, color: "#666" }}>
          Disciplina: {question.subject || "—"}
        </span>
      </ProgressText>

      <QuestionText>{question.question}</QuestionText>
      <Hint>💡 Dica: {question.hint}</Hint>

      <OptionList>
        <AnimatePresence>
          {question.answerOptions.map((option, index) => (
            <OptionItem
              as={motion.li}
              key={index}
              onClick={() => handleSelect(index)}
              tabIndex={0}
              role="button"
              aria-pressed={selected === index}
              aria-disabled={selected !== null}
              bg={getOptionBg(index)}
              disabled={selected !== null}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              {option.text}
            </OptionItem>
          ))}
        </AnimatePresence>
      </OptionList>

      <AnimatePresence>
        {selected !== null && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: 18,
                fontWeight: 500,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              {getFeedbackMessage(question.answerOptions[selected].isCorrect)}
            </motion.div>

            <RationaleBox
              id="justificativa"
              as={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <strong>Justificativa:</strong>
              <p>{question.answerOptions[selected].rationale}</p>
            </RationaleBox>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <NextButton onClick={handleNext}>
                {current + 1 === total ? "Finalizar Quiz" : "Próxima"}
              </NextButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ActionRow
        as={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SmallButton
          disabled={current === 0}
          onClick={() => {
            setCurrent((prev) => prev - 1);
          }}
        >
          ⬅ Voltar
        </SmallButton>

        <SmallButton
          onClick={() => {
            if (confirm("Tem certeza que deseja sair do quiz? Seu progresso será perdido.")) {
              localStorage.removeItem("quizProgress");
              window.location.reload();
            }
          }}
        >
          ❌ Sair do Quiz
        </SmallButton>
      </ActionRow>
    </Container>
  );
};

export default QuizScreen;
