import MainCard from '@/components/MainCard';
import ReviewCard from '@/components/ReviewCard';
import ReviewModal from '@/components/ReviewModal';
import SummaryRating from '@/components/SummaryRating';
import { useAuth } from '@/contexts/AuthContext';
import { getAllUnivReview, getOverallUnivRating } from '@/services/reviews';
import { getUnivBySlug } from '@/services/universities';
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

const University: React.FC<{}> = () => {
  const { query } = useRouter();
  const { name } = query;

  const { university, isLoading: isLoadingUniv, error: errorUniv } = getUnivBySlug(name as string);
  const {
    univReview,
    isLoading: isLoadingReview,
    error: errorReview,
  } = getAllUnivReview(name as string);
  const {
    univRating,
    isLoading: isLoadingRating,
    error: errorRating,
  } = getOverallUnivRating(university?.id!!);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isAuthenticated } = useAuth();
  const { asPath } = useRouter();

  // TODO: style loading and error
  if (isLoadingReview || isLoadingRating || isLoadingUniv) {
    return <div>Loading...</div>;
  }

  if (errorReview || errorRating || errorUniv) {
    return <div>Error</div>;
  }

  return (
    <Container>
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
        <Flex direction="column" padding={{ base: 4, sm: 8 }} w="full">
          <SummaryRating
            title={university?.name!!}
            pagePath={asPath}
            overallRating={univRating?.overall_rating!!}
            summaryRatings={[
              {
                name: 'Reputasi Akademik',
                value: univRating?.overall_reputasi_akademik!!,
              },
              { name: 'Lingkungan', value: univRating?.overall_lingkungan!! },
              {
                name: 'Kemahasiswaan',
                value: univRating?.overall_kemahasiswaan!!,
              },
              { name: 'Fasilitas', value: univRating?.overall_fasilitas!! },
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
