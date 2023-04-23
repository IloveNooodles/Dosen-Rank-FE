import ErrorPage from '@/components/ErrorPage';
import LoadingAnimation from '@/components/LoadingAnimation';
import MainCard from '@/components/MainCard';
import ReviewCard from '@/components/ReviewCard';
import ReviewModal from '@/components/ReviewModal';
import SummaryRating from '@/components/SummaryRating';
import { useAuth } from '@/contexts/AuthContext';
import {
  useGetAllUnivReview,
  useGetOverallUnivRating,
} from '@/services/reviews';
import { useGetUnivBySlug } from '@/services/universities';
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
import { BeatLoader } from 'react-spinners';

const University: React.FC<{}> = () => {
  const { query } = useRouter();
  const { name } = query;

  const {
    university,
    isLoading: isLoadingUniv,
    error: errorUniv,
  } = useGetUnivBySlug(name as string);
  const {
    univReview,
    isLoading: isLoadingReview,
    error: errorReview,
  } = useGetAllUnivReview(name as string);
  const {
    univRating,
    isLoading: isLoadingRating,
    error: errorRating,
  } = useGetOverallUnivRating(name as string);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isAuthenticated } = useAuth();
  const { asPath } = useRouter();

  // TODO: style error
  if (isLoadingReview || isLoadingRating || isLoadingUniv) {
    return <LoadingAnimation />;
  }

  if (errorReview || errorUniv || errorRating) {
    return <ErrorPage />;
  }

  return (
    <Container px="0">
      {isAuthenticated() ? (
        <ReviewModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          reviewFor="university"
          id={university?.id!!}
          slug={university?.slug!!}
        />
      ) : null}
      <MainCard>
        <Flex direction="column" padding={{ base: 4, sm: 4, md: 8 }} w="full">
          <SummaryRating
            title={university?.name!!}
            pagePath={asPath}
            overallRating={univRating?.overall_rating!!}
            summaryRatings={[
              {
                name: 'Reputasi Akademik',
                value: univRating?.overall_reputasi_akademik || 0,
              },
              {
                name: 'Lingkungan',
                value: univRating?.overall_lingkungan || 0,
              },
              {
                name: 'Kemahasiswaan',
                value: univRating?.overall_kemahasiswaan || 0,
              },
              { name: 'Fasilitas', value: univRating?.overall_fasilitas || 0 },
            ]}
            reportFor="UNIVERSITY"
            reportedId={university?.id!!}
          />
          <Divider />
          <Flex direction="row">
            <Text my={6}>{univReview?.length} Ulasan</Text>
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
          {univReview?.map((review) => (
            <ReviewCard
              key={univReview.indexOf(review)}
              reviewFor={'university'}
              idReview={review.id}
              reviewerName={review.creator.name}
              overallRating={review.average_rating}
              firstFieldName="Reputasi Akademik"
              secondFieldName="Lingkungan"
              thirdFieldName="Kemahasiswaan"
              fourthFieldName="Fasilitas"
              firstFieldRating={review.rating.reputasi_akademik}
              secondFieldRating={review.rating.lingkungan}
              thirdFieldRating={review.rating.kemahasiswaan}
              fourthFieldRating={review.rating.fasilitas}
              reviewDate={review.created_at}
              reviewContent={review.content}
              likeCount={review.upvote}
              dislikeCount={review.downvote}
              reportFor="UNIVERSITY_REVIEW"
              reportedId={review.id}
            />
          ))}
        </Flex>
      </MainCard>
    </Container>
  );
};

export default University;
