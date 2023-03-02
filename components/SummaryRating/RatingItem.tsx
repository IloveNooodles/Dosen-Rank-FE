import { SummaryRatingProps } from "@/interfaces";
import { Flex, Text } from "@chakra-ui/react";

const RatingItem: React.FC<SummaryRatingProps> = ({ name, value }) => {
  return (
    <Flex justifyContent={{ base: "space-around", sm: "space-between" }}>
      <Text fontSize={{ sm: "xl", md: "2xl" }}>{name}</Text>
      <Text fontSize={{ sm: "xl", md: "2xl" }} fontWeight="bold">
        {value}
      </Text>
    </Flex>
  );
};

export default RatingItem;
