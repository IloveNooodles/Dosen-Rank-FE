import { DosenPageProps } from "@/pages/dosen/[id]";

export const loadDosenDetail = () => {
    let data: DosenPageProps = {
        title: "Fikri Baldhie S.Kom., M.Kom.",
        summaryRatings: [
            {
                name: "Gaya mengajar",
                value: 4.7,
            },
            {
                name: "Konten pengajar",
                value: 4.7,
            },
            {
                name: "Komunikasi",
                value: 4.7,
            },
            {
                name: "Transparansi Penilaian",
                value: 4.7,
            },
        ],
        reviews : {reviewFor: 'dosen',
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
