import { memo } from 'react';
import QuizAnswer, {
  AnswerType,
} from 'src/components/atoms/quiz-answer/quiz-answer';
import { Quiz } from 'src/types';
import './quiz-question.css';

type Props = {
  quiz: Quiz;
  getAnswerType: (answerId: string, quiz: Quiz) => AnswerType;
  handleAnswerBtnClick?: (answerId: string, quiz: Quiz) => void;
};

const QuizQuestion = memo(function ({
  quiz,
  getAnswerType,
  handleAnswerBtnClick,
}: Props) {
  return (
    <li key={quiz.question} className="quiz-question">
      <p
        className="quiz-question-content"
        dangerouslySetInnerHTML={{ __html: quiz.question }}
      />
      <div className="quiz-answers">
        {Object.keys(quiz.answers).map((answerId) => (
          <QuizAnswer
            key={answerId}
            content={quiz.answers[answerId]}
            type={getAnswerType(answerId, quiz)}
            onClick={() => {
              if (handleAnswerBtnClick) {
                handleAnswerBtnClick(answerId, quiz);
              }
            }}
          />
        ))}
      </div>
    </li>
  );
});

export default QuizQuestion;
