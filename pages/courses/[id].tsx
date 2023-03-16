import {Box, Container, Divider, Flex, Text} from "@chakra-ui/react";
import React from "react";
import MainCard from "@/components/MainCard";
import SummaryRating from "@/components/SummaryRating";
import ReviewCard from "@/components/ReviewCard";
import {apiInstance} from "@/utils/apiInstance";

export async function getServerSideProps(context: { query: { id: string; }; }) {
    // const { id } = context.query;
    try {
        // const courseRes = await apiInstance({}).get(`/courses/${id}`);
        // const {id: courseId, name: courseName} = await courseRes.data.data
        const courseName = "Bahasa Arab"
        const courseId = 2;

        const reviewRes = await apiInstance({}).get(`/reviews/course?id=2`);
        const reviews = reviewRes.data.data;
        // const courseName = courseRes.data.data.name;

        const overallRatingRes = await apiInstance({}).get(`/reviews/course/overall/${courseId}`);
        const {review_count: reviewCount, overall_rating: overallRating, overall_kesesuaian_sks: overalKesesuaianSKS, overall_kompetensi: overallKompetensi, overall_kesulitan: overallKesulitan, overall_sumber_belajar: overalSumberBelajar} = await overallRatingRes.data.data

        return { props: { title: courseName, reviews, reviewCount, overallRating, overalKesesuaianSKS, overallKompetensi, overallKesulitan, overalSumberBelajar } };
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
    "kesesuaian_sks": number;
    kompetensi: number;
    kesulitan: number;
    "sumber_belajar": number;
}

export interface CourseReview {
    id: number;
    creator_id: number;
    creator_name:  string;
    professor_id: number;
    professor_name: string;
    course_id: number;
    course_name: string;
    institution_name: string;
    content: string;
    upvote: number;
    downvote: number;
    created_at: string;
    updated_at: string;
    rating: CourseRating;
    average_rating: number;
}

export interface CoursePageProps {
    title: string,
    reviews: CourseReview[],
    overallRating: number,
    reviewCount: number,
    overalKesesuaianSKS: number,
    overallKompetensi: number,
    overallKesulitan: number,
    overalSumberBelajar: number,
    summaryAverageRating: number
}

const Courses: React.FC<CoursePageProps> = ({
    title,
    reviews,
    overallRating,
    reviewCount,
    overalKesesuaianSKS,
    overallKompetensi,
    overallKesulitan,
    overalSumberBelajar,
    summaryAverageRating,
}) => {
    const ratings = [
        {name: 'Kesesuaian Dengan SKS',
            value: overalKesesuaianSKS},
        {name: 'Kompetensi yang diperoleh',
            value: overallKompetensi},
        {name: 'Kesulitan',
            value: overallKesulitan},
        {name: 'Ketersediaan Sumber Belajar',
            value: overalSumberBelajar},
    ]

    return (
        <Container>
            <MainCard>
                <Flex direction="column" padding={{ base: 4, sm: 8 }} w="full">
                    <SummaryRating title={title} pagePath="courses" overallRating={overallRating} summaryRatings={ratings} />
                    <Divider/>
                    <Text my={6}>{reviews.length} Ulasan</Text>
                    {reviews.map((review) => {
                        const {
                            id,
                            creator_id: creatorId,
                            creator_name: creatorName,
                            professor_id: professorId,
                            professor_name: professorName,
                            course_id: courseId,
                            course_name: courseName,
                            institution_name: institutionName,
                            content,
                            upvote,
                            downvote,
                            created_at: createdAt,
                            updated_at: updatedAt,
                            rating,
                            average_rating: averageRating,
                        } = review;
                        console.log(review)
                        return (
                            <ReviewCard
                                key={reviews.indexOf(review)}
                                reviewFor={"course"}
                                idReview={id}
                                reviewerName = {creatorName}
                                courseName={courseName}
                                overallRating={averageRating}
                                firstFieldName={"Kesesuaian Dengan SKS"}
                                secondFieldName={"Kompetensi yang diperoleh"}
                                thirdFieldName={"Kesulitan"}
                                fourthFieldName={"Ketersediaan Sumber Belajar"}
                                firstFieldRating={rating["kesesuaian_sks"]}
                                secondFieldRating={rating.kompetensi}
                                thirdFieldRating={rating.kesulitan}
                                fourthFieldRating={rating["sumber_belajar"]}
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