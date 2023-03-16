import { Container, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import MainCard from "@/components/MainCard";
import SummaryRating from "@/components/SummaryRating";
import ReviewCard from "@/components/ReviewCard";
import { apiInstance } from "@/utils/apiInstance";

export async function getServerSideProps(context: { query: { name: string; }; }) {
  const { name } = context.query;

  try {
    const univRes = await apiInstance({}).get(`/univ/${name}`);
    const {id: univId, name: univName} = await univRes.data.data
  
    const reviewRes = await apiInstance({}).get(`/reviews/univ/?id=${univId}`);
    const reviews = await reviewRes.data.data

    const overallRatingRes = await apiInstance({}).get(`/reviews/univ/overall/${univId}`);
    const {ratings, average_rating: averageRating} = await overallRatingRes.data.data

    return { props: { title: univName, reviews, summaryRatings: ratings, summaryAverageRating: averageRating } };
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
  summaryAverageRating: number
}

const University: React.FC<UniversityPageProps> = ({
  title,
  reviews,
  summaryRatings,
  summaryAverageRating,
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

  return (
    <Container>
      <MainCard>
        <Flex direction="column" padding={{ base: 4, sm: 8 }} w="full">
          <SummaryRating title={title} pagePath="universities" overallRating={summaryAverageRating} summaryRatings={ratings} />
          <Divider/>
          <Text my={6}>{reviews.length} Ulasan</Text>
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
