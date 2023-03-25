import { Container, Divider, Flex, HStack, Icon, Link, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import MainCard from "@/components/MainCard";
import SummaryRating from "@/components/SummaryRating";
import ReviewCard from "@/components/ReviewCard";
import ReviewModal from "@/components/ReviewModal";
import { apiInstance } from "@/utils/apiInstance";
import { FiEdit } from "react-icons/fi";
import { University, Course, Professor, Creator } from '@/interfaces';

export async function getServerSideProps(context: { query: { name: string; }; }) {
  const { name } = context.query;

  try {
    const profRes = await apiInstance({}).get(`/professor/slug/${name}`);
    const {id: profId, name: profName} = await profRes.data.data
  
    const reviewRes = await apiInstance({}).get(`/reviews/professor/?id=${profId}`);
    const reviews = await reviewRes.data.data

    const overallRatingRes = await apiInstance({}).get(`/reviews/professor/overall/${profId}`);
    const ratings = await overallRatingRes.data.data

    return { props: { title: profName, reviews, summaryRatings: ratings, summaryAverageRating: ratings.overall_rating, id: profId } };
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
  creator: Creator;
  professor: Professor;
  course: Course;
  upvote: number,
  downvote: number,
  content: string,
  created_at: string,
  updated_at: string,
  rating: ProfessorRating,
  average_rating: number
}

export interface ProfessorPageProps {
  title: string,
  reviews: ProfessorReview[],
  summaryRatings: OverallProfessorRating,
  summaryAverageRating: number,
  id: number,
}

const Professor: React.FC<ProfessorPageProps> = ({
  title,
  reviews,
  summaryRatings,
  summaryAverageRating,
  id,
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container>
      <ReviewModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} reviewFor="dosen" id={id} />
      <MainCard>
        <Flex direction="column" padding={{ base: 4, sm: 8 }} w="full">
          <SummaryRating title={title} pagePath="professors" overallRating={summaryAverageRating} summaryRatings={ratings} />
          <Divider/>
          <Flex direction="row">
            <Text my={6}>{reviews.length} Ulasan</Text>
            <Spacer/>
            <HStack>
              <Link display={"flex"} gap={"0.5rem"} alignItems="center" onClick={onOpen}>
                <Icon as={ FiEdit } color="biru.700" w="1.2rem" h="1.2rem" />
                <Text fontSize={"1rem"} fontWeight={"500"} color={"biru.700"} pt={0}>Tulis ulasan</Text>
              </Link>
            </HStack>
          </Flex>
          {reviews.map((review) => {
            const {
              id,
              creator,
              professor,
              course,
              upvote,
              downvote,
              content,
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
                reviewerName={creator.name}
                courseName={course.name}
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
