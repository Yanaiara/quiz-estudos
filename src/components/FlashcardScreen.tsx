import { useState } from "react";
import type { Question } from "../types/quiz";
import {
    Container,
    Card,
    Front,
    Back,
    ButtonRow,
    NavButton,
    FlippingCard,
} from "../styles/Flashcard.styles";

type Props = {
    questions: Question[];
    onBack: () => void;
};

const FlashcardScreen = ({ questions, onBack }: Props) => {
    const [current, setCurrent] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const question = questions[current];

    return (
        <Container>
            <Card flipped={flipped} onClick={() => setFlipped(!flipped)}>
                <FlippingCard flipped={flipped}>
                    <Front>
                        <h3>{question.question}</h3>
                        <p>💡 Dica: {question.hint}</p>
                    </Front>
                    <Back>
                        <h4>Resposta Correta:</h4>
                        <p>{question.answerOptions.find((a) => a.isCorrect)?.text}</p>
                        <h5>Justificativa:</h5>
                        <p>{question.answerOptions.find((a) => a.isCorrect)?.rationale}</p>
                    </Back>
                </FlippingCard>
            </Card>

            <ButtonRow>
                <NavButton onClick={() => setCurrent((c) => Math.max(0, c - 1))}>⬅ Anterior</NavButton>
                <NavButton onClick={onBack}>Sair</NavButton>
                <NavButton onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}>
                    Próximo ➡
                </NavButton>
            </ButtonRow>
        </Container>
    );
};

export default FlashcardScreen;
