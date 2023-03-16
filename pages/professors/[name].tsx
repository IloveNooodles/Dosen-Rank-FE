import { Container, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import MainCard from "@/components/MainCard";
import SummaryRating from "@/components/SummaryRating";
import ReviewCard from "@/components/ReviewCard";
import { apiInstance } from "@/utils/apiInstance";

export async function getServerSideProps(context: { query: { name: string; }; }) {
  const { name } = context.query;

  try {
    const profRes = await apiInstance({}).get(`/professor/${name}`);
    const {id: profId, name: profName} = await profRes.data.data
  
    const reviewRes = await apiInstance({}).get(`/reviews/professor/?id=${profId}`);
    const reviews = await reviewRes.data.data

    const overallRatingRes = await apiInstance({}).get(`/reviews/professor/overall/${profId}`);
    const ratings = await overallRatingRes.data.data

    return { props: { title: profName, reviews, summaryRatings: ratings, summaryAverageRating: ratings.overall_rating } };
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

export interface OverallProfessorRating {
  overall_konten: number,
  overall_komunikasi: number,
  overall_transparansi: number,
  overall_gaya_mengajar: number,
}

export interface ProfessorRating {
  konten: number,
  komunikasi: number,
  transparansi: number,
  gaya_mengajar: number,  
}

export interface ProfessorReview {
  id: number,
  creator_id: number,
  professor_id: number,
  course_id: number,
  upvote: number,
  downvote: number,
  content: string,
  creator_name: string,
  course_name: string,
  created_at: string,
  updated_at: string,
  rating: ProfessorRating,
  average_rating: number
}

export interface ProfessorPageProps {
  title: string,
  reviews: ProfessorReview[],
  summaryRatings: OverallProfessorRating,
  summaryAverageRating: number
}

const Professor: React.FC<ProfessorPageProps> = ({
  title,
  reviews,
  summaryRatings,
  summaryAverageRating,
}) => {
  const ratings = [
    {name: 'Gaya Mengajar',
    value: summaryRatings.overall_gaya_mengajar},
    {name: 'Komunikasi',
    value: summaryRatings.overall_komunikasi},
    {name: 'Konten Pengajar',
    value: summaryRatings.overall_konten},
    {name: 'Transparansi Penilaian',
    value: summaryRatings.overall_transparansi},
  ]

  return (
    <Container>
      <MainCard>
        <Flex direction="column" padding={{ base: 4, sm: 8 }} w="full">
          <SummaryRating title={title} pagePath="professors" overallRating={summaryAverageRating} summaryRatings={ratings} />
          <Divider/>
          <Text my={6}>{reviews.length} Ulasan</Text>
          {reviews.map((review) => {
            const {
              id,
              creator_id,
              professor_id,
              course_id,
              upvote,
              downvote,
              content,
              creator_name,
              course_name,
              created_at,
              updated_at,
              rating,
              average_rating
            } = review;
            return (
              <ReviewCard
                key={reviews.indexOf(review)}
                reviewFor={"dosen"}
                idReview={id}
                reviewerName={creator_name}
                courseName={course_name}
                overallRating={average_rating}
                firstFieldName='Gaya Mengajar'
                secondFieldName='Komunikasi'
                thirdFieldName='Konten Pengajar'
                fourthFieldName='Transparansi Penilaian'
                firstFieldRating={rating.gaya_mengajar}
                secondFieldRating={rating.komunikasi}
                thirdFieldRating={rating.konten}
                fourthFieldRating={rating.transparansi}
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

export default Professor;
