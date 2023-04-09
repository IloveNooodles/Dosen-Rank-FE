import { Response, UnivReview, ProfessorReview, OverallUnivRating, OverallProfessorRating } from '@/interfaces';
import { apiInstance } from '@/utils/apiInstance';
import useSWR, { Fetcher } from 'swr';

export const getAllUnivReview = (slug: string) => {
  const fetcher: Fetcher<Response<UnivReview[]>, string> = (url) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    slug ? `/reviews/univ/slug?slug=${slug}` : null,
    fetcher
  );

  return {
    univReview: data?.data,
    isLoading: isLoading,
    error: error,
  };
};

export const getAllProfessorReview = (slug: string) => {
  const fetcher: Fetcher<Response<ProfessorReview[]>, string> = (url) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    slug ? `/reviews/professor/slug?slug=${slug}` : null,
    fetcher
  );

  return {
    professorReview: data?.data,
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
    id ? `/reviews/univ/overall/${id}` : null,
    fetcher, { shouldRetryOnError: false }
  );

  return {
    univRating: data?.data,
    isLoading: isLoading,
    error: error,
  };
};

export const getOverallProfessorRating = (id: number) => {
  const fetcher: Fetcher<Response<OverallProfessorRating>, string> = (url) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    id ? `/reviews/professor/overall/${id}` : null,
    fetcher, { shouldRetryOnError: false }
  );

  return {
    professorRating: data?.data,
    isLoading: isLoading,
    error: error,
  };
};
