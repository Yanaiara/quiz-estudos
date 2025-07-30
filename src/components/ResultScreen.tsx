import {
    ActionButton,
    ButtonGroup,
    Container,
    Message,
    ReviewButton,
    Score,
} from "../styles/ResultScreen.styles";
import type { AnswerRecord } from "../types/quiz";

type Props = {
    score: number;
    total: number;
    userAnswers: AnswerRecord[];
    onRestart: () => void;
    onReview: () => void;
    onAnalysis: () => void;
};


const ResultScreen = ({ score, total, userAnswers, onRestart, onReview, onAnalysis }: Props) => {
    const percent = Math.round((score / total) * 100);

    const getMessage = () => {
        if (percent === 100) return "💯 Parabéns! Você acertou tudo!";
        if (percent >= 80) return "🎯 Muito bom! Faltou pouco!";
        if (percent >= 50) return "👍 Bom esforço! Continue praticando.";
        return "📚 Que tal revisar o conteúdo e tentar de novo?";
    };

    const hasErrors = userAnswers.some(
        (ans) => ans.selectedIndex !== ans.correctIndex
    );

    return (
        <Container>
            <h1>Resultado</h1>
            <Score>
                Você acertou <strong>{score}</strong> de <strong>{total}</strong> perguntas (
                <strong>{percent}%</strong>)
            </Score>
            <Message>{getMessage()}</Message>

            <ButtonGroup>
                <ActionButton onClick={onRestart}>🔁 Voltar ao início</ActionButton>
                {hasErrors && (
                    <ReviewButton onClick={onReview}>🔍 Revisar questões erradas</ReviewButton>
                )}
            </ButtonGroup>
            <ActionButton onClick={onAnalysis}>📊 Analisar respostas</ActionButton>

        </Container>
    );
};

export default ResultScreen;
