import MainCard from "@/components/MainCard";
import ReviewCard from "@/components/ReviewCard";
import ReviewModal from "@/components/ReviewModal";
import SummaryRating from "@/components/SummaryRating";
import { useAuth } from "@/contexts/AuthContext";
import { Creator } from "@/interfaces";
import { apiInstance } from "@/utils/apiInstance";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FiEdit } from "react-icons/fi";

export async function getServerSideProps(context: { query: { name: string } }) {
  const { name } = context.query;

  const univRes = await apiInstance({})
    .get(`/univ/slug/${name}`)
    .catch((e) => console.error(e));
  const { id: univId, name: univName } = await univRes?.data.data;

  const reviewRes = await apiInstance({})
    .get(`/reviews/univ/?id=${univId}`)
    .catch((e) => console.error(e));

  const reviews = await reviewRes?.data.data;

  const overallRatingRes = await apiInstance({})
    .get(`/reviews/univ/overall/${univId}`)
    .catch((e) => console.error(e));
  const ratings = await overallRatingRes?.data.data;

  return {
    props: {
      title: univName,
      reviews,
      summaryRatings: ratings || {
        review_count: 0,
        overall_rating: 0,
        overall_fasilitas: 0,
        overall_lingkungan: 0,
        overall_kemahasiswaan: 0,
        overall_reputasi_akademik: 0,
      },
      summaryAverageRating: ratings?.overall_rating || 0,
      id: univId,
    },
  };
}

export interface OverallUniversityRating {
  overall_reputasi_akademik: number;
  overall_lingkungan: number;
  overall_kemahasiswaan: number;
  overall_fasilitas: number;
}

export interface UniversityRating {
  reputasi_akademik: number;
  lingkungan: number;
  kemahasiswaan: number;
  fasilitas: number;
}

export interface UniversityReview {
  id: number;
  creator: Creator;
  univ_id: number;
  upvote: number;
  downvote: number;
  content: string;
  name: string;
  created_at: string;
  updated_at: string;
  rating: UniversityRating;
  average_rating: number;
}

export interface UniversityPageProps {
  title: string;
  reviews: UniversityReview[];
  summaryRatings: OverallUniversityRating;
  summaryAverageRating: number;
  id: number;
}

const University: React.FC<UniversityPageProps> = ({
  title,
  reviews,
  summaryRatings,
  summaryAverageRating,
  id,
}) => {
  const ratings = [
    { name: "Reputasi Akademik", value: summaryRatings.overall_reputasi_akademik },
    { name: "Lingkungan", value: summaryRatings.overall_lingkungan },
    { name: "Kemahasiswaan", value: summaryRatings.overall_kemahasiswaan },
    { name: "Fasilitas", value: summaryRatings.overall_fasilitas },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isAuthenticated } = useAuth();
  const {asPath} = useRouter();

  return (
    <Container>
      {isAuthenticated() ? <ReviewModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        reviewFor="university"
        id={id}
      /> : null}
      <MainCard>
        <Flex direction="column" padding={{ base: 4, sm: 8 }} w="full">
          <SummaryRating
            title={title}
            pagePath={asPath}
            overallRating={summaryAverageRating}
            summaryRatings={ratings}
            reportFor="UNIVERSITY"
            reportedId={id}
          />
          <Divider />
          <Flex direction="row">
            <Text my={6}>{reviews?.length} Ulasan</Text>
            <Spacer />
            {isAuthenticated() ? (
              <HStack>
                <Link
                  display={"flex"}
                  gap={"0.5rem"}
                  alignItems="center"
                  onClick={onOpen}
                >
                  <Icon as={FiEdit} color="biru.700" w="1.2rem" h="1.2rem" />
                  <Text
                    fontSize={"1rem"}
                    fontWeight={"500"}
                    color={"biru.700"}
                    pt={0}
                  >
                    Tulis ulasan
                  </Text>
                </Link>
              </HStack>
            ) : null}
          </Flex>
          {reviews?.map((review) => {
            const {
              id,
              upvote,
              downvote,
              content,
              creator,
              created_at,
              rating,
              average_rating,
            } = review;
            return (
              <ReviewCard
                key={reviews.indexOf(review)}
                reviewFor={"university"}
                idReview={id}
                reviewerName={creator.name}
                overallRating={average_rating}
                firstFieldName="Reputasi Akademik"
                secondFieldName="Lingkungan"
                thirdFieldName="Kemahasiswaan"
                fourthFieldName="Fasilitas"
                firstFieldRating={rating.reputasi_akademik}
                secondFieldRating={rating.lingkungan}
                thirdFieldRating={rating.kemahasiswaan}
                fourthFieldRating={rating.fasilitas}
                reviewDate={created_at}
                reviewContent={content}
                likeCount={upvote}
                dislikeCount={downvote}
                reportFor="UNIVERSITY_REVIEW"
                reportedId={id}
              />
            );
          })}
        </Flex>
      </MainCard>
    </Container>
  );
};

export default University;
