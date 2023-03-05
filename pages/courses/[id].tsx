import { Container, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import MainCard from "@/components/MainCard";
import { useRouter } from "next/router";
import { loadCourseDetail } from "@/lib/load-course-detail";
import { SummaryRatingProps } from "@/interfaces";
import SummaryRating from "@/components/SummaryRating";
import ReviewCard, { ReviewCardProps } from "@/components/ReviewCard";
import {apiInstance} from "@/utils/apiInstance";

export async function getServerSideProps(context: { query: { id: string; }; }) {
    const { id } = context.query;

    try {
        // const courseRes = await apiInstance({}).get(`/course/${id}`);
        // const courseId = courseRes.data.data.id;
        const courseId = 2;

        const reviewRes = await apiInstance({}).get(`/reviews/course/?id=${courseId}`);
        // const courseName = courseRes.data.data.name;
        const courseName = "Bahasa Arab"

        const reviews = reviewRes.data.data.reviews;
        const summaryRatings = reviewRes.data.data.ratings
        const summaryAverageRating = reviewRes.data.data.averageRating

        return { props: { title: courseName, reviews, summaryRatings, summaryAverageRating } };
    } catch (e) {
        console.error(e)
        console.log("error getServerSideProps")
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
}

export interface CourseRating {
    kesesuaianDenganSKS: number;
    kompetensi: number;
    kesulitan: number;
    ketersediaanSumber: number;
}

export interface CourseReview {
    id: number;
    creatorId: number;
    creatorName: string;
    professorId: number;
    professorName: string;
    courseId: number;
    courseName: string;
    institutionName: string;
    content: string;
    upvote: number;
    downvote: number;
    createdAt: string;
    updatedAt: string;
    rating: CourseRating;
    averageRating: number;
}

export interface CoursePageProps {
    title: string,
    reviews: CourseReview[],
    summaryRatings: CourseRating,
    summaryAverageRating: number
}
const Courses: React.FC<CoursePageProps> = ({
                                                       title,
                                                       reviews,
                                                       summaryRatings,
                                                       summaryAverageRating,
                                                   }) => {
    const ratings = [
        {name: 'Kesesuaian Dengan SKS',
            value: summaryRatings.kesesuaianDenganSKS},
        {name: 'Kompetensi yang diperoleh',
            value: summaryRatings.kompetensi},
        {name: 'Kesulitan',
            value: summaryRatings.kesulitan},
        {name: 'Ketersediaan Sumber Belajar',
            value: summaryRatings.ketersediaanSumber},
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
                            creatorName,
                            professorId,
                            professorName,
                            courseId,
                            courseName,
                            institutionName,
                            content,
                            upvote,
                            downvote,
                            createdAt,
                            updatedAt,
                            rating,
                            averageRating,
                        } = review;
                        return (
                            <ReviewCard
                                key={reviews.indexOf(review)}
                                reviewFor={"course"}
                                idReview={id}
                                reviewerName={creatorName}
                                firstFieldName='Kesesuaian Dengan SKS'
                                secondFieldName='Kompetensi yang diperoleh'
                                thirdFieldName='Kesulitan'
                                fourthFieldName='Ketersediaan Sumber Belajar'
                                firstFieldRating={rating.kesesuaianDenganSKS}
                                secondFieldRating={rating.kompetensi}
                                thirdFieldRating={rating.kesulitan}
                                fourthFieldRating={rating.ketersediaanSumber}
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

export default Courses;
