import { Response, UnivReview, OverallUnivRating } from '@/interfaces';
import { apiInstance } from '@/utils/apiInstance';
import useSWR, { Fetcher } from 'swr';

export const getAllUnivReview = (slug: string) => {
  const fetcher: Fetcher<Response<UnivReview[]>, string> = (url) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `/reviews/univ/slug?slug=${slug}`,
    fetcher
  );

  return {
    univReview: data?.data,
    isLoading: isLoading,
    error: error,
  };
};

export const getOverallUnivRating = (id: number) => {
  const fetcher: Fetcher<Response<OverallUnivRating>, string> = (url) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `/reviews/univ/overall/${id}`,
    fetcher
  );

  return {
    univRating: data?.data,
    isLoading: isLoading,
    error: error,
  };
};
