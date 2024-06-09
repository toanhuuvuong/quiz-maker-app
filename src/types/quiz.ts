export type Quiz = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: {
    [key: string]: string;
  };
  userAnswer?: string;
};
