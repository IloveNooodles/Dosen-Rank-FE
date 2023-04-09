import { Response, UnivReview, OverallUnivRating, University } from '@/interfaces';
import { apiInstance } from '@/utils/apiInstance';
import useSWR, { Fetcher } from 'swr';

export const getUnivBySlug = (slug: string) => {
  const fetcher: Fetcher<Response<University>, string> = (url) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    slug ? `/univ/slug/${slug}` : null,
    fetcher, { shouldRetryOnError: false }
  );

  return {
    university: data?.data,
    isLoading: isLoading,
    error: error,
  };
};
