import { Quiz } from './quiz-slice';

function shuffleQuizzesAnswers(quizzes: { [key: string]: Quiz }) {
  for (const quiz of Object.values(quizzes)) {
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
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

export default shuffleQuizzesAnswers;
