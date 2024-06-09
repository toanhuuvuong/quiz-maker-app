import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicTemplate from 'src/components/templates/basic-template/basic-template';
import { Color, Page } from 'src/constants';
import { selectQuizzes } from 'src/redux/features/quiz/quiz-slice';
import { useAppSelector } from 'src/redux/hooks';
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

  const countCorrectedAnswer = useMemo(() => {
    return quizzes.reduce((previousCount, quizz) => {
      const corrected = quizz.correct_answer === quizz.userAnswer;
      return previousCount + (corrected ? 1 : 0);
    }, 0);
  }, [quizzes]);

  return (
    <BasicTemplate pageTitle={Page.QUIZ_RESULTS.NAME}>
      <div className="quiz-results">
        <h1 className="result-heading">QUIZ RESULTS</h1>
        <div className="result-contents">
          <ul>
            {quizzes.map((quizz) => {
              return (
                <li key={quizz.question}>
                  {quizz.question} <br />
                  <div className="question-answers">
                    {Object.keys(quizz.answers).map((key) => {
                      return (
                        <button
                          style={{
                            backgroundColor:
                              quizz.correct_answer === key
                                ? Color.GREEN
                                : quizz.userAnswer === key &&
                                  quizz.correct_answer !== quizz.userAnswer
                                ? Color.RED
                                : Color.WHITE,
                          }}
                          key={key}
                        >
                          {quizz.answers[key]}
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
          <p
            style={{
              backgroundColor:
                countCorrectedAnswer < 2
                  ? Color.RED
                  : countCorrectedAnswer < 4
                  ? Color.YELLOW
                  : Color.GREEN,
              width: '200px',
              margin: 'inherit',
            }}
          >
            Your scored {countCorrectedAnswer} out of {quizzes.length}
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
