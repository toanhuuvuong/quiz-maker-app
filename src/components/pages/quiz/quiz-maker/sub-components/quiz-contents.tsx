import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerType } from 'src/components/atoms/quiz-answer/quiz-answer';
import { BasicSpinner } from 'src/components/atoms/spiner';
import QuizQuestion from 'src/components/molecules/quiz-question/quiz-question';
import { Page } from 'src/constants';
import { StatusLoad } from 'src/constants/enums';
import {
  quizAnswerSelected,
  selectQuizzes,
} from 'src/redux/features/quiz/quiz-slice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Quiz } from 'src/types';

function QuizContents() {
  // Router
  const navigate = useNavigate();

  // Redux
  const dispatch = useAppDispatch();
  const quizzes = useAppSelector(selectQuizzes);
  const quizzesLoading = useAppSelector((state) => state.quiz.status);
  const allAnswered = useAppSelector((state) => state.quiz.allAnswered);

  // Event handlers
  const handleAnswerBtnClick = useCallback(
    (answerId: string, quiz: Quiz) => {
      dispatch(quizAnswerSelected(quiz.question, answerId));
    },
    [dispatch]
  );

  function handleSubmitBtnClick() {
    navigate(Page.QUIZ_RESULTS.PATH);
  }

  const getAnswerType = useCallback((answerId: string, quiz: Quiz) => {
    return answerId === quiz.userAnswer
      ? AnswerType.CORRECT
      : AnswerType.NORMAL;
  }, []);

  return (
    <div className="quiz-contents">
      {quizzesLoading === StatusLoad.LOADING ? (
        <BasicSpinner />
      ) : quizzesLoading === StatusLoad.FAILED ? (
        <div className="quiz-error">
          Something went wrong, please try again!
        </div>
      ) : (
        <>
          <ul className="quiz-questions">
            {quizzes.map((quiz) => (
              <QuizQuestion
                key={quiz.question}
                quiz={quiz}
                getAnswerType={getAnswerType}
                handleAnswerBtnClick={handleAnswerBtnClick}
              />
            ))}
          </ul>
          {allAnswered && (
            <button id="submitBtn" onClick={handleSubmitBtnClick}>
              Submit
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default QuizContents;
