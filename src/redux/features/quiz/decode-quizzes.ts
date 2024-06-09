import Base64Util from 'src/utils/base64-util';
import { Quiz } from './quiz-slice';

function decodeQuizzes(quizzes?: Quiz[]) {
  if (!quizzes) {
    return [];
  }
  const decodedQuizzes = quizzes.map((quizz) => ({
    ...quizz,
    incorrect_answers: [...quizz.incorrect_answers],
  }));
  for (const quiz of decodedQuizzes) {
    quiz.question = Base64Util.decodedString(quiz.question);
    quiz.category = Base64Util.decodedString(quiz.category);
    quiz.difficulty = Base64Util.decodedString(quiz.difficulty);
    quiz.type = Base64Util.decodedString(quiz.type);
    quiz.correct_answer = Base64Util.decodedString(quiz.correct_answer);
    quiz.incorrect_answers = quiz.incorrect_answers.map((incorrect_answer) =>
      Base64Util.decodedString(incorrect_answer)
    );
  }
  return decodedQuizzes;
}

export default decodeQuizzes;
