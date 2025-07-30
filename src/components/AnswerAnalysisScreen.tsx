// src/components/AnswerAnalysisScreen.tsx
import type { AnswerRecord } from "../types/quiz";
import {
  Container,
  Title,
  QuestionBlock,
  QuestionText,
  AnswerList,
  AnswerItem,
  Justification,
  BackButton,
  StatBox,
} from "../styles/AnalysisScreen.styles";

type Props = {
  userAnswers: AnswerRecord[];
  onBack: () => void;
};

const AnswerAnalysisScreen = ({ userAnswers, onBack }: Props) => {
  const total = userAnswers.length;
  const correct = userAnswers.filter(a => a.selectedIndex === a.correctIndex).length;
  const percent = Math.round((correct / total) * 100);

  return (
    <Container>
      <Title>📊 Análise da Sessão</Title>

      <StatBox>
        ✅ Acertos: <strong>{correct}</strong> <br />
        ❌ Erros: <strong>{total - correct}</strong> <br />
        📈 Aproveitamento: <strong>{percent}%</strong>
      </StatBox>

      {userAnswers.map((ans, idx) => (
        <QuestionBlock key={idx}>
          <QuestionText>{ans.question}</QuestionText>
          <AnswerList>
            {ans.options.map((opt, i) => {
              const isCorrect = i === ans.correctIndex;
              const isSelected = i === ans.selectedIndex;
              return (
                <AnswerItem
                  key={i}
                  isCorrect={isCorrect}
                  isSelected={isSelected}
                >
                  {opt.text}
                  {isCorrect && " ✅"}
                  {isSelected && !isCorrect && " ❌"}
                </AnswerItem>
              );
            })}
          </AnswerList>
          <Justification>
            <strong>Justificativa:</strong> {ans.options[ans.correctIndex].rationale}
          </Justification>
        </QuestionBlock>
      ))}

      <BackButton onClick={onBack}>🔙 Voltar</BackButton>
    </Container>
  );
};

export default AnswerAnalysisScreen;
