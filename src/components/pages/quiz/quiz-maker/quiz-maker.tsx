import BasicTemplate from 'src/components/templates/basic-template/basic-template';
import { Page } from 'src/constants';
import './quiz-maker.css';

function QuizMaker() {
  return (
    <BasicTemplate pageTitle={Page.QUIZ_MAKER.NAME}>
      <div className="quiz-maker">
        <h1 className="quiz-heading">QUIZ MAKER</h1>
        <div className="quiz-filters">
          <select id="categorySelect">
            <option value={'categoryA'}>Category A</option>
            <option value={'categoryB'}>Category B</option>
            <option value={'categoryC'}>Category C</option>
          </select>
          <select id="difficultySelect">
            <option value={'easy'}>Easy</option>
            <option value={'medium'}>Medium</option>
            <option value={'hard'}>Hard</option>
          </select>
          <button id="createBtn">Create</button>
        </div>
        <div className="quiz-contents">
          <ul>
            <li>Quiz 1</li>
            <li>Quiz 2</li>
            <li>Quiz 3</li>
            <li>Quiz 4</li>
            <li>Quiz 5</li>
          </ul>
          <button id="submitBtn">Submit</button>
        </div>
      </div>
    </BasicTemplate>
  );
}

export default QuizMaker;
