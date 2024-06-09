import { useEffect } from 'react';
import { useGetTriviaCategories } from 'src/apis/get-trivia-categories';
import BasicTemplate from 'src/components/templates/basic-template/basic-template';
import { Page } from 'src/constants';
import { quizReset } from 'src/redux/features/quiz/quiz-slice';
import { useAppDispatch } from 'src/redux/hooks';
import './quiz-maker.css';
import { QuizContents, QuizFilters } from './sub-components';

function QuizMaker() {
  // Redux
  const dispatch = useAppDispatch();

  // React query hooks
  const { data: categories, isLoading: categoriesLoading } =
    useGetTriviaCategories();

  // Effects
  useEffect(() => {
    dispatch(quizReset());
  }, [dispatch]);

  return (
    <BasicTemplate
      pageTitle={Page.QUIZ_MAKER.NAME}
      isLoading={categoriesLoading}
    >
      <div className="quiz-maker">
        <h1 className="quiz-heading">QUIZ MAKER</h1>
        <QuizFilters categories={categories} />
        <QuizContents />
      </div>
    </BasicTemplate>
  );
}

export default QuizMaker;
