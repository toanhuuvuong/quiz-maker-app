import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getQuizzes, GetQuizzesParams } from 'src/apis/get-quizzes';
import { StatusLoad } from 'src/constants/enums';
import { RootState } from 'src/redux/store';
import shuffleQuizzesAnswers from './shuffle-quizzes-answers';
import decodeQuizzes from './decode-quizzes';

export type Quiz = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: {
    [key: string]: string;
  };
  userAnswer?: string;
};

const quizAdapter = createEntityAdapter({
  selectId: (quiz: Quiz) => quiz.question,
});

const initialState = quizAdapter.getInitialState({
  status: StatusLoad.IDLE,
  allAnswered: false,
});

// Slice
const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    quizAnswerSelected: {
      reducer(
        state,
        action: PayloadAction<{ question: string; userAnswer: string }>
      ) {
        // Update user answer
        const { question, userAnswer } = action.payload;
        state.entities[question].userAnswer = userAnswer;

        // Check if all questions have been answered
        const allAnswered = !Object.values(state.entities).some(
          (quizz) => !quizz.userAnswer
        );
        state.allAnswered = allAnswered;
      },
      prepare(question, userAnswer) {
        return {
          payload: { question, userAnswer },
        };
      },
    },
    quizReset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state, _) => {
        state.status = StatusLoad.LOADING;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        const decodedQuizzes = decodeQuizzes(action.payload);
        quizAdapter.setAll(state, decodedQuizzes);
        shuffleQuizzesAnswers(state.entities);
        state.status = StatusLoad.IDLE;
      })
      .addCase(fetchQuizzes.rejected, (state, _) => {
        state.status = StatusLoad.FAILED;
      });
  },
});

// Thunk functions
export const fetchQuizzes = createAsyncThunk(
  'quiz/fetchQuizzes',
  async (params: GetQuizzesParams) => getQuizzes(params)
);

// Action creators
export const { quizAnswerSelected, quizReset } = quizSlice.actions;

// Selectors
export const { selectAll: selectQuizzes, selectById: selectQuizzById } =
  quizAdapter.getSelectors<RootState>((state) => state.quiz);

export default quizSlice;
