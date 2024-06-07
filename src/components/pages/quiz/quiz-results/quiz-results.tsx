import BasicTemplate from 'src/components/templates/basic-template/basic-template';
import { Page } from 'src/constants';
import './quiz-results.css';

function QuizResults() {
  return (
    <BasicTemplate pageTitle={Page.QUIZ_RESULTS.NAME}>
      <div className="quiz-results">
        <h1 className="result-heading">QUIZ RESULTS</h1>
        <div className="result-contents">
          <ul>
            <li>Result Quiz 1</li>
            <li>Result Quiz 2</li>
            <li>Result Quiz 3</li>
            <li>Result Quiz 4</li>
            <li>Result Quiz 5</li>
          </ul>
          <button id="redirectBtn">Create a new quiz</button>
        </div>
      </div>
    </BasicTemplate>
  );
}

export default QuizResults;
