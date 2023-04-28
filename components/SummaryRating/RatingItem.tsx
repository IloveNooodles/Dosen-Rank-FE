import { SummaryRatingProps } from "@/interfaces";
import { Flex, Text } from "@chakra-ui/react";

const RatingItem: React.FC<SummaryRatingProps> = ({ name, value }) => {
  return (
    <Flex justifyContent={{ base: "space-between", sm: "space-between" }}>
      <Text fontSize={{ sm: "md", md: "xl" }}>{name}</Text>
      <Text fontSize={{ sm: "md", md: "xl" }} fontWeight="bold">
        {value?.toFixed(1)}
      </Text>
    </Flex>
  );
};

export default RatingItem;
