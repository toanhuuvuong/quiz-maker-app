import { MouseEventHandler, memo } from 'react';
import './quiz-answer.css';

export enum AnswerType {
  NORMAL = 'normal',
  CORRECT = 'correct',
  WRONG = 'wrong',
}

type Props = {
  content: string;
  type?: AnswerType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const QuizAnswer = memo(function ({
  content,
  type = AnswerType.NORMAL,
  onClick,
}: Props) {
  return (
    <button className={`quiz-answer ${type}`} onClick={onClick}>
      {content}
    </button>
  );
});

export default QuizAnswer;
