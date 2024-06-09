import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { opendbAxios } from 'src/configs/axios';
import { ExtractFnReturnType, QueryConfig } from 'src/configs/react-query';
import { ApiUrl, Page } from 'src/constants';
import { TriviaCategory } from 'src/types';

type GetTriviaCategoriesResponse = {
  trivia_categories: TriviaCategory[];
};

export async function getTriviaCategories(): Promise<TriviaCategory[]> {
  return opendbAxios.get(ApiUrl.OPENDB.GET_CATEGORIES).then((response) => {
    const data = response.data as GetTriviaCategoriesResponse;
    return data.trivia_categories;
  });
}

type QueryFnType = typeof getTriviaCategories;

type QueryOptions = {
  config?: QueryConfig<QueryFnType>;
};

export function useGetTriviaCategories(queryOptions?: QueryOptions) {
  const navigate = useNavigate();
  const config = queryOptions?.config || {};

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['triviaCategories'],
    queryFn: getTriviaCategories,
    onError: (_) => {
      navigate(Page.SYSTEM_ERROR.PATH);
    },
  });
}
