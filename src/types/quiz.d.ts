export type AnswerOption = {
  text: string;
  rationale: string;
  isCorrect: boolean;
};

export interface Question {
  id: string;
  question: string;
  hint: string;
  subject?: string;
  answerOptions: {
    text: string;
    isCorrect: boolean;
    rationale: string;
  }[];
}

export type QuizData = {
  discipline: string;
  questions: Question[];
};

export type AnswerRecord = {
  question: string;
  selectedIndex: number;
  correctIndex: number;
  options: Question["answerOptions"];
};