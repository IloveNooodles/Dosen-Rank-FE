import { SummaryRatingContainerProps } from "@/interfaces";
import { Flex, VStack, SimpleGrid, Text } from "@chakra-ui/react";
import RatingItem from "./RatingItem";

const SummaryRatingContainer: React.FC<SummaryRatingContainerProps> = ({
  overallRating, summaryRatings,
}) => {
  // for rating grid and overall rating
  return (
    <Flex
      my={{ base: 4, sm: 8, md: 16, lg: 20 }}
      justifyContent={{ base: "center", md: "space-evenly" }}
      alignItems="center"
    >
      <VStack mx={{ base: 3, sm: 4, md: 12 }}>
        <Text
          fontSize={{ base: "2xl", md: "5xl" }}
          color="biru.800"
          fontWeight="semibold"
        >
          {overallRating.toFixed(1)}
        </Text>
        <Text fontSize={{ base: "md", sm: "lg", md: "3xl" }}>Overall</Text>
      </VStack>
      <SimpleGrid
        w="full"
        columns={{ base: 1, sm: 2 }}
        spacing={{ base: 2, sm: 6, md: 8 }}
        marginX={{ base: 4, lg: 0 }}
        maxW="xl"
      >
        {summaryRatings.map((rating) => (
          <RatingItem
            key={summaryRatings.indexOf(rating)}
            name={rating.name}
            value={rating.value}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default SummaryRatingContainer;
