import { CoursePageProps } from "@/pages/courses/[id]";

export const loadCourseDetail = () => {
    let data: CoursePageProps = {
        title: "Matematika Diskrit",
        summaryRatings: [
            {
                name: "gaya hidup",
                value: 4.7,
            },
            {
                name: "gaya mengajar",
                value: 4.7,
            },
            {
                name: "gaya dorong",
                value: 4.7,
            },
            {
                name: "gaya ranjabi",
                value: 4.7,
            },
        ],
        reviews : {reviewFor: 'course',
            idReview: 1,
            reviewerName: 'Soekarno hatta',
            courseName: 'Grafika Komputer',
            overallRating: 3.2,
            firstFieldName: 'Reputasi Akademik',
            secondFieldName: 'Makanan',
            thirdFieldName: 'Lingkungan sosial',
            fourthFieldName: 'Lokasi',
            firstFieldRating: 4.5,
            secondFieldRating: 4.6,
            thirdFieldRating: 4.7,
            fourthFieldRating: 4.8,
            reviewDate: '03/02/2023',
            reviewContent: 'mantab',
            likeCount: 999,
            dislikeCount: 0,
            activeButton: 'like',
        }
    };
    return data;
};
