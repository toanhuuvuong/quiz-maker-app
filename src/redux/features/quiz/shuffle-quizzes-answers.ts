import { Quiz } from 'src/types';

function shuffleQuizzesAnswers(quizzes?: Quiz[]) {
  if (!quizzes) {
    return;
  }

  for (const quiz of quizzes) {
    // Shuffle array of answers
    const answers = [quiz.correct_answer, ...quiz.incorrect_answers];
    shuffle(answers);

    // Convert array of answers to entities
    quiz.answers = answers.reduce(
      (previousAnswers, answer) => ({ ...previousAnswers, [answer]: answer }),
      {}
    );
  }
}

// Fisher–Yates algorithm
function shuffle(array: string[]) {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

export default shuffleQuizzesAnswers;
