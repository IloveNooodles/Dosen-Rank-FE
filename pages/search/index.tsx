"use strict";

import LoadingAnimation from "@/components/LoadingAnimation";
import { ReviewCardProps } from "@/components/ReviewCard";
import SearchBar from "@/components/SearchBar";
import SearchCard from "@/components/SearchCard";
import { SummaryRatingProps, University } from "@/interfaces";
import { apiInstance } from "@/utils/apiInstance";
import { Container, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";

export interface CoursePageProps {
  title: string;
  summaryRatings: SummaryRatingProps[];
  reviews: ReviewCardProps;
}

const fetcher = (url: string) =>
  apiInstance({})
    .get(url)
    .then((res) => res.data);

function useSearch(name?: string) {
  const { data, isLoading, error } = useSWR(
    name ? `/univ/?name=${name}` : `/univ/`,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
}

const Search: React.FC<CoursePageProps> = ({ title, summaryRatings }) => {
  const router = useRouter();
  const { name } = router.query;

  const { data, isLoading, error } = useSearch(name as string);

  if (isLoading) {
    return <LoadingAnimation/>;
  }

  if (error) {
    return <p>error</p>;
  }

  const univData = data?.data as Array<University>;

  return (
    <Container
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"calc(92vh - 108px)"}
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
        {univData?.map((univ: University) => {
          return (
            <SearchCard
              key={univ.id}
              searchResult={univ.name}
              slug={univ.slug}
              searchFor="university"
            />
          );
        })}
      </Flex>
    </Container>
  );
};

export default Search;
