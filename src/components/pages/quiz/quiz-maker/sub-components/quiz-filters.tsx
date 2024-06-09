import { ChangeEvent, useState } from 'react';
import { EncodeType, QuizType } from 'src/constants/enums';
import { fetchQuizzes } from 'src/redux/features/quiz/quiz-slice';
import { useAppDispatch } from 'src/redux/hooks';
import { TriviaCategory } from 'src/types';

enum DifficultyLevel {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

type Props = {
  categories?: TriviaCategory[];
};

function QuizFilters({ categories }: Props) {
  // Redux
  const dispatch = useAppDispatch();

  // Local state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  // Event handlers
  function handleCategorySelectChange(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(e.target.value);
  }

  function handleDifficultySelectChange(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedDifficulty(e.target.value);
  }

  function handleCreateBtnClick() {
    if (selectedCategory && selectedDifficulty) {
      dispatch(
        fetchQuizzes({
          category: selectedCategory,
          difficulty: selectedDifficulty,
          amount: 5,
          type: QuizType.MULTIPLE,
          encode: EncodeType.BASE64,
        })
      );
    }
  }

  return (
    <div className="quiz-filters">
      <select
        id="categorySelect"
        value={selectedCategory}
        onChange={handleCategorySelectChange}
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        id="difficultySelect"
        value={selectedDifficulty}
        onChange={handleDifficultySelectChange}
      >
        <option value="" disabled>
          Select a difficulty
        </option>
        {Object.keys(DifficultyLevel).map((level) => {
          return (
            <option
              key={level}
              value={DifficultyLevel[level as keyof typeof DifficultyLevel]}
            >
              {level}
            </option>
          );
        })}
      </select>
      <button id="createBtn" onClick={handleCreateBtnClick}>
        Create
      </button>
    </div>
  );
}

export default QuizFilters;
