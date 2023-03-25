import { Container, Divider, Flex, HStack, Icon, Link, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import MainCard from "@/components/MainCard";
import SummaryRating from "@/components/SummaryRating";
import ReviewCard from "@/components/ReviewCard";
import ReviewModal from "@/components/ReviewModal";
import { apiInstance } from "@/utils/apiInstance";
import { FiEdit } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";

export async function getServerSideProps(context: { query: { name: string; }; }) {
  const { name } = context.query;

  try {
    const univRes = await apiInstance({}).get(`/univ/${name}`);
    const {id: univId, name: univName} = await univRes.data.data
  
    const reviewRes = await apiInstance({}).get(`/reviews/univ/?id=${univId}`);
    const reviews = await reviewRes.data.data

    const overallRatingRes = await apiInstance({}).get(`/reviews/univ/overall/${univId}`);
    const {ratings, average_rating: averageRating} = await overallRatingRes.data.data

    return { props: { title: univName, reviews, summaryRatings: ratings, summaryAverageRating: averageRating, id: univId } };
  } catch (e) {
    console.error(e)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
}

export interface UniversityRating {
  reputasi_akademik: number,
  lingkungan: number,
  kemahasiswaan: number,
  fasilitas: number
}

export interface UniversityReview {
  id: number,
  creator_id: number,
  univ_id: number,
  upvote: number,
  downvote: number,
  content: string,
  name: string,
  created_at: string,
  updated_at: string,
  rating: UniversityRating,
  average_rating: number
}

export interface UniversityPageProps {
  title: string,
  reviews: UniversityReview[],
  summaryRatings: UniversityRating,
  summaryAverageRating: number,
  id: number,
}

const University: React.FC<UniversityPageProps> = ({
  title,
  reviews,
  summaryRatings,
  summaryAverageRating,
  id,
}) => {
  const ratings = [
    {name: 'Reputasi Akademik',
    value: summaryRatings.reputasi_akademik},
    {name: 'Lingkungan',
    value: summaryRatings.lingkungan},
    {name: 'Kemahasiswaan',
    value: summaryRatings.kemahasiswaan},
    {name: 'Fasilitas',
    value: summaryRatings.fasilitas},
  ]
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const { isAuthenticated } = useAuth();

  return (
    <Container>
      <ReviewModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} reviewFor="university" id={id} />
      <MainCard>
        <Flex direction="column" padding={{ base: 4, sm: 8 }} w="full">
          <SummaryRating title={title} pagePath="universities" overallRating={summaryAverageRating} summaryRatings={ratings} />
          <Divider/>
          <Flex direction="row">
            <Text my={6}>{reviews.length} Ulasan</Text>
            <Spacer/>
            {isAuthenticated() ? 
              <HStack>
                <Link display={"flex"} gap={"0.5rem"} alignItems="center" onClick={onOpen}>
                  <Icon as={ FiEdit } color="biru.700" w="1.2rem" h="1.2rem" />
                  <Text fontSize={"1rem"} fontWeight={"500"} color={"biru.700"} pt={0}>Tulis ulasan</Text>
                </Link>
              </HStack> : null}
          </Flex>
          {reviews.map((review) => {
            const {
              id,
              creator_id,
              univ_id,
              upvote,
              downvote,
              content,
              name,
              created_at,
              updated_at,
              rating,
              average_rating
            } = review;
            return (
              <ReviewCard
                key={reviews.indexOf(review)}
                reviewFor={"university"}
                idReview={id}
                reviewerName={name}
                overallRating={average_rating}
                firstFieldName='Reputasi Akademik'
                secondFieldName='Lingkungan'
                thirdFieldName='Kemahasiswaan'
                fourthFieldName='Fasilitas'
                firstFieldRating={rating.reputasi_akademik}
                secondFieldRating={rating.lingkungan}
                thirdFieldRating={rating.kemahasiswaan}
                fourthFieldRating={rating.fasilitas}
                reviewDate={created_at}
                reviewContent={content}
                likeCount={upvote}
                dislikeCount={downvote}
              />
            );
          })}
        </Flex>
      </MainCard>
    </Container>
  );
};

export default University;
