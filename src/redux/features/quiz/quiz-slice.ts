import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getQuizzes, GetQuizzesParams } from 'src/apis/get-quizzes';
import { StatusLoad } from 'src/constants/enums';
import { RootState } from 'src/redux/store';
import { Quiz } from 'src/types';
import decodeQuizzes from './decode-quizzes';
import shuffleQuizzesAnswers from './shuffle-quizzes-answers';

const quizAdapter = createEntityAdapter({
  selectId: (quiz: Quiz) => quiz.question,
});

// State
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
        action: PayloadAction<{ questionId: string; userAnswer: string }>
      ) {
        // Update user answer
        const { questionId, userAnswer } = action.payload;
        state.entities[questionId].userAnswer = userAnswer;

        // Check if all questions have been answered
        const allAnswered = !Object.values(state.entities).some(
          (quiz) => !quiz.userAnswer
        );
        state.allAnswered = allAnswered;
      },
      prepare(questionId, userAnswer) {
        return {
          payload: { questionId, userAnswer },
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
        // Decode and shuffle quizzes
        let { encodeType, quizzes } = action.payload;
        if (encodeType) {
          quizzes = decodeQuizzes(encodeType, quizzes);
        }
        shuffleQuizzesAnswers(quizzes);

        // Update state
        quizAdapter.setAll(state, quizzes);
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
  async (params: GetQuizzesParams) => {
    const quizzes = await getQuizzes(params);
    return {
      quizzes,
      encodeType: params.encode,
    };
  }
);

// Action creators
export const { quizAnswerSelected, quizReset } = quizSlice.actions;

// Selectors
export const { selectAll: selectQuizzes, selectById: selectQuizById } =
  quizAdapter.getSelectors<RootState>((state) => state.quiz);

export default quizSlice;
