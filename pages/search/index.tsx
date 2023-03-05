import MainCard from "@/components/MainCard";
import { ReviewCardProps } from "@/components/ReviewCard";
import SearchBar from "@/components/SearchBar";
import SearchCard from "@/components/SearchCard";
import { SummaryRatingProps } from "@/interfaces";
import { Container, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export interface CoursePageProps {
  title: string;
  summaryRatings: SummaryRatingProps[];
  reviews: ReviewCardProps;
}

const Search: React.FC<CoursePageProps> = ({ title, summaryRatings }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text
        fontSize={{ base: "xl", sm: "3xl", md: "5xl" }}
        fontWeight="bold"
        align={{ base: "center", sm: "left" }}
        color="biru.800"
        ml={{ base: 0, sm: "4", md: "8" }}
      >
        Hasil Pencarian
      </Text>
      <SearchBar />
      {/* each card section for university, dosen, and mata kulah */}
      <MainCard>
        <Flex direction="column" padding={{ base: 4, sm: 8 }} w="full">
          <Text
            color="biru.800"
            fontSize={{ base: "1.5rem", md: "2rem" }}
            fontWeight="bold"
            marginRight={"auto"}
            marginLeft={"auto"}
          >
            Universitas
          </Text>
          <SearchCard
            searchResult={"Institut Teknologi Bandung"}
            slug="institut-teknologi-bandung"
            searchFor="university"
          />
        </Flex>
      </MainCard>
      {/* each card section for university, dosen, and mata kulah */}
      <MainCard>
        <Flex direction="column" padding={{ base: 4, sm: 8 }} w="full">
          <Text
            color="biru.800"
            fontSize={{ base: "1.5rem", md: "2rem" }}
            fontWeight="bold"
            marginRight={"auto"}
            marginLeft={"auto"}
          >
            Mata kuliah
          </Text>
          <SearchCard
            searchResult={"IF2120 Matematika Diskrit"}
            slug="1"
            searchFor="courses"
          />
        </Flex>
      </MainCard>
      {/* each card section for university, dosen, and mata kulah */}
      <MainCard>
        <Flex direction="column" padding={{ base: 4, sm: 8 }} w="full">
          <Text
            color="biru.800"
            fontSize={{ base: "1.5rem", md: "2rem" }}
            fontWeight="bold"
            marginRight={"auto"}
            marginLeft={"auto"}
          >
            Dosen
          </Text>
          <SearchCard
            searchResult={"Rinaldi Munir"}
            searchFor="professor"
            slug="1"
          />
        </Flex>
      </MainCard>
    </Container>
  );
};

export default Search;
