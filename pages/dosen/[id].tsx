import { Container, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import MainCard from "@/components/MainCard";
import { useRouter } from "next/router";
import { SummaryRatingProps } from "@/interfaces";
import SummaryRating from "@/components/SummaryRating";
import ReviewCard, { ReviewCardProps } from "@/components/ReviewCard";
import { loadDosenDetail } from "@/lib/load-dosen-detail";

export async function getStaticPaths() {
    return {
        paths: [{ params: { id: "1" } }],
        fallback: false,
    };
}

export async function getStaticProps() {
    const dosenData = loadDosenDetail();

    const { title, summaryRatings } = dosenData;


    return {
        props: {
            title,
            summaryRatings
        },
    };
}

export interface DosenPageProps {
    title: string;
    summaryRatings: SummaryRatingProps[],
    reviews: ReviewCardProps
}

const Dosen: React.FC<DosenPageProps> = ({
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
                    <ReviewCard reviewFor={"dosen"} likeCount={999} dislikeCount={0}/>
                    <ReviewCard reviewFor={"dosen"} likeCount={999} dislikeCount={0}/>
                    <ReviewCard reviewFor={"dosen"} likeCount={999} dislikeCount={0}/>
                    <ReviewCard reviewFor={"dosen"} likeCount={999} dislikeCount={0}/>
                    <ReviewCard reviewFor={"dosen"} likeCount={999} dislikeCount={0}/>
                </Flex>
            </MainCard>
        </Container>
    );
};

export default Dosen;
