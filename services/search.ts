import { apiInstance } from '@/utils/apiInstance';
import useSWR from 'swr';

export const useUnivSearch = (name?: string) => {
  const fetcher = (url: string) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, isLoading, error } = useSWR(
    name ? `/univ/?name=${name}` : `/univ/`,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
};
