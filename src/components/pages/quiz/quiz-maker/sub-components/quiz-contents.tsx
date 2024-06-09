import { useNavigate } from 'react-router-dom';
import { BasicSpinner } from 'src/components/atoms/spiner';
import { Color, Page } from 'src/constants';
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

  return (
    <div className="quiz-contents">
      {quizzesLoading === StatusLoad.LOADING ? (
        <BasicSpinner />
      ) : quizzesLoading === StatusLoad.FAILED ? (
        <div>Error please re-create</div>
      ) : (
        <ul>
          {quizzes.map((quizz) => {
            return (
              <li key={quizz.question}>
                {quizz.question} <br />
                {Object.keys(quizz.answers).map((key) => {
                  return (
                    <button
                      style={{
                        backgroundColor:
                          quizz.userAnswer === key ? Color.GREEN : Color.WHITE,
                      }}
                      key={key}
                      onClick={() => handleAnswerBtnClick(quizz.question, key)}
                    >
                      {quizz.answers[key]}
                    </button>
                  );
                })}
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
