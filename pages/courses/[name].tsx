import ErrorPage from '@/components/ErrorPage';
import LoadingAnimation from '@/components/LoadingAnimation';
import MainCard from '@/components/MainCard';
import ReviewCard from '@/components/ReviewCard';
import ReviewModal from '@/components/ReviewModal';
import SummaryRating from '@/components/SummaryRating';
import { useAuth } from '@/contexts/AuthContext';
import { useGetCourseBySlug } from '@/services/courses';
import {
  useGetAllCourseReview,
  useGetOverallCourseRating,
} from '@/services/reviews';
import {
  Container,
  Divider,
  Flex,
  HStack,
  Icon,
  Link,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FiEdit } from 'react-icons/fi';

const Courses: React.FC<{}> = () => {
  const { query } = useRouter();
  const { name } = query;

  const {
    course,
    isLoading: isLoadingCourse,
    error: errorCourse,
  } = useGetCourseBySlug(name as string);
  const {
    courseReview,
    isLoading: isLoadingReview,
    error: errorReview,
  } = useGetAllCourseReview(course?.course_id!!);
  const {
    courseRating,
    isLoading: isLoadingRating,
    error: errorRating,
  } = useGetOverallCourseRating(course?.id!!);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isAuthenticated } = useAuth();
  const { asPath } = useRouter();

  if (isLoadingReview || isLoadingRating || isLoadingCourse) {
    return <LoadingAnimation />;
  }

  if (errorReview || errorCourse || errorRating) {
    return <ErrorPage />;
  }

  return (
    <Container>
      {isAuthenticated() ? (
        <ReviewModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          reviewFor="course"
          slug={course?.slug}
          id={course?.id!!}
        />
      ) : null}
      <MainCard>
        <Flex direction="column" padding={{ base: 4, sm: 8 }} w="full">
          <SummaryRating
            title={course?.name!!}
            pagePath={asPath}
            overallRating={courseRating?.overall_rating!!}
            summaryRatings={[
              {
                name: 'Kesesuaian dengan SKS',
                value: courseRating?.overall_kesesuaian_sks || 0,
              },
              {
                name: 'Kompetensi yang Diperoleh',
                value: courseRating?.overall_kompetensi || 0,
              },
              {
                name: 'Kesulitan',
                value: courseRating?.overall_kesulitan || 0,
              },
              {
                name: 'Ketersediaan Sumber Belajar',
                value: courseRating?.overall_sumber_belajar || 0,
              },
            ]}
            reportFor="COURSE"
            reportedId={course?.id!!}
            sksCourse={course?.sks!!}
          />
          <Divider />
          <Flex direction="row">
            <HStack my={5}>
              <Text fontSize="2xl" paddingLeft={3} fontWeight={'bold'}>{courseRating?.review_count}</Text>
              <Text>ulasan</Text>
            </HStack>
            <Spacer />
            {isAuthenticated() ? (
              <HStack>
                <Link
                  display={'flex'}
                  gap={'0.5rem'}
                  alignItems="center"
                  onClick={onOpen}
                >
                  <Icon as={FiEdit} color="biru.700" w="1.2rem" h="1.2rem" />
                  <Text
                    fontSize={'1rem'}
                    fontWeight={'500'}
                    color={'biru.700'}
                    pt={0}
                  >
                    Tulis ulasan
                  </Text>
                </Link>
              </HStack>
            ) : null}
          </Flex>
          {courseReview?.map((review) => (
            <ReviewCard
              key={courseReview.indexOf(review)}
              reviewFor={'course'}
              idReview={review.id}
              reviewerName={review.creator.name}
              courseName={review.course.name}
              overallRating={review.average_rating}
              firstFieldName={'Kesesuaian dengan SKS'}
              secondFieldName={'Kompetensi yang Diperoleh'}
              thirdFieldName={'Kesulitan'}
              fourthFieldName={'Ketersediaan Sumber Belajar'}
              firstFieldRating={review.rating.kesesuaian_sks}
              secondFieldRating={review.rating.kompetensi}
              thirdFieldRating={review.rating.kesulitan}
              fourthFieldRating={review.rating.sumber_belajar}
              reviewDate={review.created_at}
              reviewContent={review.content}
              likeCount={review.upvote}
              dislikeCount={review.downvote}
              reportFor="COURSE_REVIEW"
              reportedId={review.id}
            />
          ))}
        </Flex>
      </MainCard>
    </Container>
  );
};

export default Courses;
