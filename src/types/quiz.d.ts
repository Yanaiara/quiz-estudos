export type AnswerOption = {
  text: string;
  rationale: string;
  isCorrect: boolean;
};

export type Question = {
  question: string;
  hint: string;
  subject?: string;
  answerOptions: {
    text: string;
    rationale: string;
    isCorrect: boolean;
  }[];
  attempted?: boolean;
  timesAnswered?: number;
  lastAnsweredCorrectly?: boolean;
};

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