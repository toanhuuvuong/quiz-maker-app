import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicTemplate from 'src/components/templates/basic-template/basic-template';
import { Page } from 'src/constants';
import { selectQuizzes } from 'src/redux/features/quiz/quiz-slice';
import { useAppSelector } from 'src/redux/hooks';
import '../quiz.css';
import './quiz-results.css';

function QuizResults() {
  // Router
  const navigate = useNavigate();

  // Redux
  const quizzes = useAppSelector(selectQuizzes);

  // Event handlers
  function handleRedirectBtnClick() {
    navigate(Page.QUIZ_MAKER.PATH);
  }

  const getAnswerBtnClassName = useCallback(
    (answerBtnId: string, userAnswer?: string, correctAnswer?: string) => {
      return `quiz-answer ${
        answerBtnId === correctAnswer
          ? 'correct'
          : answerBtnId === userAnswer && userAnswer !== correctAnswer
          ? 'wrong'
          : 'normal'
      }`;
    },
    []
  );

  const getScoreLabelClassName = useCallback((correctedAnswer: number) => {
    return `quiz-score ${
      correctedAnswer < 2 ? 'weak' : correctedAnswer < 4 ? 'average' : 'good'
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
            {quizzes.map((quiz) => {
              return (
                <li key={quiz.question}>
                  <p
                    className="quiz-question"
                    dangerouslySetInnerHTML={{ __html: quiz.question }}
                  />
                  <div className="quiz-answers">
                    {Object.keys(quiz.answers).map((answerId) => {
                      return (
                        <button
                          key={answerId}
                          className={getAnswerBtnClassName(
                            answerId,
                            quiz.userAnswer,
                            quiz.correct_answer
                          )}
                        >
                          {quiz.answers[answerId]}
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
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
