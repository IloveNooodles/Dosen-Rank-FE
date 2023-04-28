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
import React from 'react';
import MainCard from '@/components/MainCard';
import SummaryRating from '@/components/SummaryRating';
import ReviewCard from '@/components/ReviewCard';
import ReviewModal from '@/components/ReviewModal';
import { FiEdit } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useGetProfessorBySlug } from '@/services/professors';
import {
  useGetAllProfessorReview,
  useGetOverallProfessorRating,
} from '@/services/reviews';
import ErrorPage from '@/components/ErrorPage';
import LoadingAnimation from '@/components/LoadingAnimation';

const Professor: React.FC<{}> = () => {
  const { query } = useRouter();
  const { name } = query;

  const {
    professor,
    isLoading: isLoadingProfessor,
    error: errorProfessor,
  } = useGetProfessorBySlug(name as string);
  const {
    professorReview,
    isLoading: isLoadingReview,
    error: errorReview,
  } = useGetAllProfessorReview(name as string);
  const {
    professorRating,
    isLoading: isLoadingRating,
    error: errorRating,
  } = useGetOverallProfessorRating(professor?.id!!);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isAuthenticated } = useAuth();
  const { asPath } = useRouter();

  if (isLoadingReview || isLoadingRating || isLoadingProfessor) {
    return <LoadingAnimation />;
  }

  if (errorReview || errorProfessor || errorRating) {
    return <ErrorPage />;
  }

  return (
    <Container>
      {isAuthenticated() ? (
        <ReviewModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          reviewFor="dosen"
          slug={professor?.slug}
          id={professor?.id!!}
        />
      ) : null}
      <MainCard>
        <Flex direction="column" padding={{ base: 4, sm: 8 }} w="full">
          <SummaryRating
            title={professor?.name!!}
            pagePath={asPath}
            overallRating={professorRating?.overall_rating!!}
            summaryRatings={[
              {
                name: 'Gaya Mengajar',
                value: professorRating?.overall_gaya_mengajar || 0,
              },
              {
                name: 'Komunikasi',
                value: professorRating?.overall_komunikasi || 0,
              },
              {
                name: 'Konten Pengajar',
                value: professorRating?.overall_konten || 0,
              },
              {
                name: 'Transparansi Penilaian',
                value: professorRating?.overall_transparansi || 0,
              },
            ]}
            reportFor="PROFESSOR"
            reportedId={professor?.id!!}
            sksCourse={0}
          />
          <Divider />
          <Flex direction="row">
            <Text my={6}>{professorRating?.review_count} Ulasan</Text>
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
          {professorReview?.map((review) => (
            <ReviewCard
              key={professorReview.indexOf(review)}
              reviewFor={'dosen'}
              idReview={review.id}
              reviewerName={review.creator.name}
              courseName={review.course.name}
              overallRating={review.average_rating}
              firstFieldName="Gaya Mengajar"
              secondFieldName="Komunikasi"
              thirdFieldName="Konten Pengajar"
              fourthFieldName="Transparansi Penilaian"
              firstFieldRating={review.rating.gaya_mengajar}
              secondFieldRating={review.rating.komunikasi}
              thirdFieldRating={review.rating.konten}
              fourthFieldRating={review.rating.transparansi}
              reviewDate={review.created_at}
              reviewContent={review.content}
              likeCount={review.upvote}
              dislikeCount={review.downvote}
              reportFor="PROFESSOR_REVIEW"
              reportedId={review.id}
            />
          ))}
        </Flex>
      </MainCard>
    </Container>
  );
};

export default Professor;
