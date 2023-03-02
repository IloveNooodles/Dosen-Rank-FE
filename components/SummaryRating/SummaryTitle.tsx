import { Flex, Spacer, Icon, Text } from "@chakra-ui/react";
import { AiOutlineWarning } from "react-icons/ai";

const SummaryTitle: React.FC<{ univTitle: string }> = ({ univTitle }) => {
  return (
    <Flex alignItems="center">
      <Text
        fontSize={{ base: "xl", sm: "3xl", md: "5xl" }}
        fontWeight="bold"
        align={{ base: "center", sm: "left" }}
        color="biru.800"
        ml={{ base: 0, sm: "4", md: "8" }}
      >
        {univTitle?.toLocaleUpperCase()}
      </Text>
      <Spacer />
      <Icon
        as={AiOutlineWarning}
        boxSize={{ base: 3, sm: 4, md: 6 }}
        color="gray.500"
      />
    </Flex>
  );
};

export default SummaryTitle;
