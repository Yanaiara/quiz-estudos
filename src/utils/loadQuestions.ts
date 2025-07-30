import type { Question } from "../types/quiz";

export const loadQuestionsBySubject = async (
    subject: string,
    amount: number
): Promise<Question[]> => {
    const data = await import(`../data/${subject}.json`);
    const allQuestions: Question[] = data.questions;
    return allQuestions.sort(() => Math.random() - 0.5).slice(0, amount);
};
