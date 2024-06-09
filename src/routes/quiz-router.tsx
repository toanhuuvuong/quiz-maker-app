import { Route } from 'react-router-dom';
import { QuizMaker, QuizResults } from 'src/components/pages/quiz';
import { Page } from 'src/constants';

const QuizRouter = (
  <>
    <Route path={Page.QUIZ_MAKER.PATH} element={<QuizMaker />} />
    <Route path={Page.QUIZ_RESULTS.PATH} element={<QuizResults />} />
  </>
);

export default QuizRouter;
