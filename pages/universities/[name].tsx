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
    const univId = univRes.data.data.id;
  
    const reviewRes = await apiInstance({}).get(`/reviews/univ/?id=${univId}`);
    const univName = univRes.data.data.name;
  
    const reviews = reviewRes.data.data.reviews;
    const summaryRatings = reviewRes.data.data.ratings
    const summaryAverageRating = reviewRes.data.data.averageRating

    return { props: { title: univName, reviews, summaryRatings, summaryAverageRating } };
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
  reputasiAkademik: number;
  lingkungan: number;
  kemahasiswaan: number;
  fasilitas: number;
}

export interface UniversityReview {
  id: number;
  creatorId: number;
  univId: number;
  upvote: number;
  downvote: number;
  content: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  rating: UniversityRating;
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
    value: summaryRatings.reputasiAkademik},
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
          <SummaryRating title={title} overallRating={summaryAverageRating} summaryRatings={ratings} />
          <Divider/>
          <Text my={6}>{reviews.length} Ulasan</Text>
          {reviews.map((review) => {
            const {
              id,
              creatorId,
              univId,
              upvote,
              downvote,
              content,
              name,
              createdAt,
              updatedAt,
              rating,
            } = review;
            return (
              <ReviewCard
                key={reviews.indexOf(review)}
                reviewFor={"university"}
                idReview={id}
                reviewerName={name}
                firstFieldName='Reputasi Akademik'
                secondFieldName='Lingkungan'
                thirdFieldName='Kemahasiswaan'
                fourthFieldName='Fasilitas'
                firstFieldRating={rating.reputasiAkademik}
                secondFieldRating={rating.lingkungan}
                thirdFieldRating={rating.kemahasiswaan}
                fourthFieldRating={rating.fasilitas}
                reviewDate={createdAt}
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
