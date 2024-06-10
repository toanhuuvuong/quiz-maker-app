import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerType } from 'src/components/atoms/quiz-answer/quiz-answer';
import QuizQuestion from 'src/components/molecules/quiz-question/quiz-question';
import BasicTemplate from 'src/components/templates/basic-template/basic-template';
import { Page } from 'src/constants';
import { selectQuizzes } from 'src/redux/features/quiz/quiz-slice';
import { useAppSelector } from 'src/redux/hooks';
import { Quiz } from 'src/types';
import '../quiz.css';
import './quiz-results.css';

enum ScoreType {
  GOOD = 'good',
  AVERAGE = 'average',
  WEAK = 'weak',
}

function QuizResults() {
  // Router
  const navigate = useNavigate();

  // Redux
  const quizzes = useAppSelector(selectQuizzes);

  // Event handlers
  function handleRedirectBtnClick() {
    navigate(Page.QUIZ_MAKER.PATH);
  }

  const getAnswerType = useCallback((answerId: string, quiz: Quiz) => {
    return answerId === quiz.correct_answer
      ? AnswerType.CORRECT
      : answerId === quiz.userAnswer && quiz.userAnswer !== quiz.correct_answer
      ? AnswerType.WRONG
      : AnswerType.NORMAL;
  }, []);

  const getScoreLabelClassName = useCallback((correctedAnswer: number) => {
    return `quiz-score ${
      correctedAnswer < 2
        ? ScoreType.WEAK
        : correctedAnswer < 4
        ? ScoreType.AVERAGE
        : ScoreType.GOOD
    }`;
  }, []);

  const correctedAnswerCount = useMemo(() => {
    return quizzes.reduce((previousCount, quiz) => {
      const corrected = quiz.userAnswer === quiz.correct_answer;
      return previousCount + (corrected ? 1 : 0);
    }, 0);
  }, [quizzes]);

  return (
    <BasicTemplate pageTitle={Page.QUIZ_RESULTS.NAME}>
      <div className="quiz-results">
        <h1 className="quiz-heading">QUIZ RESULTS</h1>
        <div className="quiz-contents">
          <ul className="quiz-questions">
            {quizzes.map((quiz) => (
              <QuizQuestion
                key={quiz.question}
                quiz={quiz}
                getAnswerType={getAnswerType}
              />
            ))}
          </ul>
          <p className={getScoreLabelClassName(correctedAnswerCount)}>
            Your scored {correctedAnswerCount} out of {quizzes.length}
          </p>
          <button id="redirectBtn" onClick={handleRedirectBtnClick}>
            Create a new quiz
          </button>
        </div>
      </div>
    </BasicTemplate>
  );
}

export default QuizResults;
