import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { opendbAxios } from 'src/configs/opendb-axios';
import { ExtractFnReturnType, QueryConfig } from 'src/configs/react-query';
import { Page } from 'src/constants';
import { Quiz } from 'src/redux/features/quiz/quiz-slice';

type GetQuizzesResponse = {
  response_code: number;
  results: Quiz[];
};

export type GetQuizzesParams = {
  category: string;
  difficulty: string;
  amount?: number;
  type?: string;
  encode?: string;
};

export async function getQuizzes({
  category,
  difficulty,
  amount = 5,
  type = 'multiple',
  encode = 'base64',
}: GetQuizzesParams): Promise<Quiz[]> {
  return opendbAxios
    .get('/api.php', {
      params: {
        amount,
        category,
        difficulty,
        type,
        encode,
      },
    })
    .then((response) => {
      const data = response.data as GetQuizzesResponse;
      if (data.response_code !== 0) {
        return [];
      }
      return data.results;
    });
}

type QueryFnType = typeof getQuizzes;

type QueryOptions = {
  params: GetQuizzesParams;
  config?: QueryConfig<QueryFnType>;
};

export function useGetQuizzes({ params, config = {} }: QueryOptions) {
  const navigate = useNavigate();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [
      'quizzes',
      params.category,
      params.difficulty,
      params.amount,
      params.type,
      params.encode,
    ],
    queryFn: () => getQuizzes(params),
    onError: (_) => {
      navigate(Page.SYSTEM_ERROR.PATH);
    },
  });
}
