import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { opendbAxios } from 'src/configs/opendb-axios';
import { ExtractFnReturnType, QueryConfig } from 'src/configs/react-query';
import { Page } from 'src/constants';

export type TriviaCategory = {
  id: number;
  name: string;
};

type GetTriviaCategoriesResponse = {
  trivia_categories: TriviaCategory[];
};

export function getTriviaCategories(): Promise<TriviaCategory[]> {
  return opendbAxios.get('/api_category.php').then((response) => {
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
