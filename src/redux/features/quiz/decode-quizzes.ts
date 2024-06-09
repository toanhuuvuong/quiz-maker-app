import { EncodeType } from 'src/constants/enums';
import { Quiz } from 'src/types';
import Base64Util from 'src/utils/base64-util';

function decodeQuizzes(encodeType: EncodeType, quizzes?: Quiz[]) {
  if (!quizzes) {
    return [];
  }

  // Clone quizzes
  const decodedQuizzes = quizzes.map((quiz) => ({
    ...quiz,
    incorrect_answers: [...quiz.incorrect_answers],
  }));

  // Decode quizzes
  for (const quiz of decodedQuizzes) {
    decodeQuiz(encodeType, quiz);
  }

  return decodedQuizzes;
}

function decodeQuiz(encodeType: EncodeType, quiz: Quiz) {
  switch (encodeType) {
    case EncodeType.URL_LEGACY:
      // TODO: Implement decode for encode type URL_LEGACY
      break;
    case EncodeType.URL_3986:
      // TODO: Implement decode for encode type URL_3986
      break;
    case EncodeType.BASE64:
      quiz.question = Base64Util.decodedString(quiz.question);
      quiz.category = Base64Util.decodedString(quiz.category);
      quiz.difficulty = Base64Util.decodedString(quiz.difficulty);
      quiz.type = Base64Util.decodedString(quiz.type);
      quiz.correct_answer = Base64Util.decodedString(quiz.correct_answer);
      quiz.incorrect_answers = quiz.incorrect_answers.map((incorrect_answer) =>
        Base64Util.decodedString(incorrect_answer)
      );
      break;
    default:
      break;
  }
}

export default decodeQuizzes;
