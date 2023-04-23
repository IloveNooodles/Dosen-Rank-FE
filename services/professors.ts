import { Response, ProfessorResponse } from '@/interfaces';
import { apiInstance } from '@/utils/apiInstance';
import useSWR, { Fetcher } from 'swr';

export const useGetProfessorBySlug = (slug: string) => {
  const fetcher: Fetcher<Response<ProfessorResponse>, string> = (url) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    slug ? `/professor/slug/${slug}` : null,
    fetcher
  );

  return {
    professor: data?.data,
    isLoading: isLoading,
    error: error,
  };
};
