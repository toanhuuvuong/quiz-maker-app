import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicSpinner } from 'src/components/atoms/spiner';
import { Page } from 'src/constants';
import { StatusLoad } from 'src/constants/enums';
import {
  quizAnswerSelected,
  selectQuizzes,
} from 'src/redux/features/quiz/quiz-slice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

function QuizContents() {
  // Router
  const navigate = useNavigate();

  // Redux
  const dispatch = useAppDispatch();
  const quizzes = useAppSelector(selectQuizzes);
  const quizzesLoading = useAppSelector((state) => state.quiz.status);
  const allAnswered = useAppSelector((state) => state.quiz.allAnswered);

  // Event handlers
  function handleAnswerBtnClick(questionId: string, answerId: string) {
    dispatch(quizAnswerSelected(questionId, answerId));
  }

  function handleSubmitBtnClick() {
    navigate(Page.QUIZ_RESULTS.PATH);
  }

  const getAnswerBtnClassName = useCallback(
    (answerBtnId: string, userAnswer?: string) => {
      return `quiz-answer ${answerBtnId === userAnswer ? 'correct' : 'normal'}`;
    },
    []
  );

  return (
    <div className="quiz-contents">
      {quizzesLoading === StatusLoad.LOADING ? (
        <BasicSpinner />
      ) : quizzesLoading === StatusLoad.FAILED ? (
        <div className="quiz-error">
          Something went wrong, please try again!
        </div>
      ) : (
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
                          quiz.userAnswer
                        )}
                        onClick={() =>
                          handleAnswerBtnClick(quiz.question, answerId)
                        }
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
      )}
      {allAnswered && (
        <button id="submitBtn" onClick={handleSubmitBtnClick}>
          Submit
        </button>
      )}
    </div>
  );
}

export default QuizContents;
