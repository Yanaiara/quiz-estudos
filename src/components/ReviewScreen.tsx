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
} from "../styles/ReviewScreen.styles";

type ReviewScreenProps = {
    userAnswers: AnswerRecord[];
    onBack: () => void;
};

const ReviewScreen = ({ userAnswers, onBack }: ReviewScreenProps) => {
    const wrongAnswers = userAnswers.filter(
        (ans) => ans.selectedIndex !== ans.correctIndex
    );

    return (
        <Container>
            <Title>🔁 Revisão de Questões Erradas</Title>

            {wrongAnswers.length === 0 ? (
                <p>🎉 Você não errou nenhuma questão!</p>
            ) : (
                wrongAnswers.map((ans, idx) => (
                    <QuestionBlock key={idx}>
                        <QuestionText>{ans.question}</QuestionText>

                        <AnswerList>
                            {ans.options.map((opt, i) => {
                                const isSelected = i === ans.selectedIndex;
                                const isCorrect = i === ans.correctIndex;
                                return (
                                    <AnswerItem key={i} isCorrect={isCorrect} isSelected={isSelected}>
                                        {opt.text}
                                        {isCorrect && " ✅"}
                                        {isSelected && !isCorrect && " ❌"}
                                    </AnswerItem>
                                );
                            })}
                        </AnswerList>

                        <Justification>
                            <strong>Justificativa:</strong>{" "}
                            {ans.options[ans.correctIndex].rationale}
                        </Justification>
                    </QuestionBlock>
                ))
            )}

            <BackButton onClick={onBack}>Voltar ao Resultado</BackButton>
        </Container>
    );
};

export default ReviewScreen;