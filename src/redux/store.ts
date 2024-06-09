import { configureStore } from '@reduxjs/toolkit';
import quizSlice from './features/quiz/quiz-slice';

const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
