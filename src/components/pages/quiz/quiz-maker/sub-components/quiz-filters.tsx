import { ChangeEvent, useState } from 'react';
import { TriviaCategory } from 'src/apis/get-trivia-categories';
import { fetchQuizzes } from 'src/redux/features/quiz/quiz-slice';
import { useAppDispatch } from 'src/redux/hooks';

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
          const levelKey = level as keyof typeof DifficultyLevel;
          return (
            <option key={levelKey} value={DifficultyLevel[levelKey]}>
              {levelKey}
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
