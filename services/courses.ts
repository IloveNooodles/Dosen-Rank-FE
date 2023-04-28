import { Response, CourseResponse } from '@/interfaces';
import { apiInstance } from '@/utils/apiInstance';
import useSWR, { Fetcher } from 'swr';

export const useGetCourseBySlug = (slug: string) => {
  const fetcher: Fetcher<Response<CourseResponse>, string> = (url) =>
    apiInstance({})
      .get(url)
      .then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    slug ? `/courses/slug/${slug}` : null,
    fetcher
  );

  return {
    course: data?.data,
    isLoading: isLoading,
    error: error,
  };
};
