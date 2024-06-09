import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { opendbAxios } from 'src/configs/axios';
import { ExtractFnReturnType, QueryConfig } from 'src/configs/react-query';
import { ApiUrl, Page } from 'src/constants';
import { EncodeType } from 'src/constants/enums';
import { Quiz } from 'src/types';

type GetQuizzesResponse = {
  response_code: number;
  results: Quiz[];
};

export type GetQuizzesParams = {
  category: string;
  difficulty: string;
  amount: number;
  type: string;
  encode?: EncodeType;
};

export async function getQuizzes({
  category,
  difficulty,
  amount,
  type,
  encode,
}: GetQuizzesParams): Promise<Quiz[]> {
  return opendbAxios
    .get(ApiUrl.OPENDB.GET_QUIZZES, {
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
    queryKey: ['quizzes', ...Object.values(params)],
    queryFn: () => getQuizzes(params),
    onError: (_) => {
      navigate(Page.SYSTEM_ERROR.PATH);
    },
  });
}
