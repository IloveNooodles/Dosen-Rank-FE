import { Container, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import MainCard from "@/components/MainCard";
import { useRouter } from "next/router";
import { loadUnivDetail } from "@/lib/load-univ-detail";
import { SummaryRatingProps } from "@/interfaces";
import SummaryRating from "@/components/SummaryRating";
import ReviewCard, { ReviewCardProps } from "@/components/ReviewCard";

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: false,
  };
}

export async function getStaticProps() {
  const univData = loadUnivDetail();

  const { title, summaryRatings } = univData;


  return {
    props: {
      title,
      summaryRatings
    },
  };
}

export interface UniversityPageProps {
  title: string;
  summaryRatings: SummaryRatingProps[],
  reviews: ReviewCardProps
}

const University: React.FC<UniversityPageProps> = ({
  title,
  summaryRatings,
}) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container>
      <MainCard>
        <Flex direction="column" padding={{ base: 4, sm: 8 }} w="full">
          <Divider />
          <SummaryRating title={title} summaryRatings={summaryRatings} />
          {/* placeholder */}
          <Divider/>
          <Text my={6}>82828 Ulasan</Text>
          <ReviewCard reviewFor={"university"} likeCount={999} dislikeCount={0}/>
          <ReviewCard reviewFor={"university"} likeCount={999} dislikeCount={0}/>
          <ReviewCard reviewFor={"university"} likeCount={999} dislikeCount={0}/>
          <ReviewCard reviewFor={"university"} likeCount={999} dislikeCount={0}/>
          <ReviewCard reviewFor={"university"} likeCount={999} dislikeCount={0}/>
        </Flex>
      </MainCard>
    </Container>
  );
};

export default University;
