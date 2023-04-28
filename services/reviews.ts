import {
  Response,
  UnivReview,
  ProfessorReview,
  OverallUnivRating,
  OverallProfessorRating,
  CourseReview,
  OverallCourseRating,
} from '@/interfaces';
import { apiInstance } from '@/utils/apiInstance';
import useSWR, { Fetcher } from 'swr';

export const useGetAllUnivReview = (slug: string) => {
  const fetcher: Fetcher<Response<UnivReview[]>, string> = (url) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    slug ? `/reviews/univ/slug?slug=${slug}` : null,
    fetcher,
    { shouldRetryOnError: false }
  );

  return {
    univReview: data?.data,
    isLoading: isLoading,
    error: error,
  };
};

export const useGetAllProfessorReview = (slug: string) => {
  const fetcher: Fetcher<Response<ProfessorReview[]>, string> = (url) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    slug ? `/reviews/professor/slug?slug=${slug}` : null,
    fetcher,
    { shouldRetryOnError: false }
  );

  return {
    professorReview: data?.data,
    isLoading: isLoading,
    error: error,
  };
};

export const useGetAllCourseReview = (slug: string) => {
  const fetcher: Fetcher<Response<CourseReview[]>, string> = (url) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    slug ? `/reviews/course/slug?slug=${slug}` : null,
    fetcher,
    { shouldRetryOnError: false }
  );

  return {
    courseReview: data?.data,
    isLoading: isLoading,
    error: error,
  };
};

export const useGetOverallUnivRating = (slug: string) => {
  const fetcher: Fetcher<Response<OverallUnivRating>, string> = (url) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    slug ? `/reviews/univ/overall/slug/${slug}` : null,
    fetcher,
    { shouldRetryOnError: false }
  );

  return {
    univRating: data?.data,
    isLoading: isLoading,
    error: error,
  };
};

export const useGetOverallProfessorRating = (id: number) => {
  const fetcher: Fetcher<Response<OverallProfessorRating>, string> = (url) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    id ? `/reviews/professor/overall/${id}` : null,
    fetcher,
    { shouldRetryOnError: false }
  );

  return {
    professorRating: data?.data,
    isLoading: isLoading,
    error: error,
  };
};

export const useGetOverallCourseRating = (id: number) => {
  const fetcher: Fetcher<Response<OverallCourseRating>, string> = (url) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    id ? `/reviews/course/overall/${id}` : null,
    fetcher,
    { shouldRetryOnError: false }
  );

  return {
    courseRating: data?.data,
    isLoading: isLoading,
    error: error,
  };
};
