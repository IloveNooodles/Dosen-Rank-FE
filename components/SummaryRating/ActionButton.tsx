import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const SummaryActionButton: React.FC<{ pagePath: string }> = ({ pagePath }) => {
  return (
    <Flex direction="row">
      {pagePath.includes("dosen") || pagePath.includes("university") ? (
        <Link href="/">
          <Text
            as="u"
            fontSize={{ base: "sm", sm: "lg" }}
            mr="4"
            ml={{ sm: "4", md: "8" }}
          >
            Lihat dosen
          </Text>
        </Link>
      ) : null}
      {pagePath.includes("course") || pagePath.includes("university") ? (
        <Link href="/">
          <Text as="u" fontSize={{ base: "sm", sm: "lg" }}>
            Lihat mata kuliah
          </Text>
        </Link>
      ) : null}
    </Flex>
  );
};

export default SummaryActionButton;
