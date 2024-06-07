import { Route } from 'react-router-dom';
import QuizMaker from 'src/components/pages/quiz/quiz-maker/quiz-maker';
import QuizResults from 'src/components/pages/quiz/quiz-results/quiz-results';
import { Page } from 'src/constants';

const QuizRouter = (
  <>
    <Route path={Page.QUIZ_MAKER.PATH} element={<QuizMaker />} />
    <Route path={Page.QUIZ_RESULTS.PATH} element={<QuizResults />} />
  </>
);

export default QuizRouter;
