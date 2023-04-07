import { SummaryRatingProps } from "@/interfaces";
import { Flex, Spacer, Icon, VStack, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineWarning } from "react-icons/ai";
import ReportModal from "../ReportModal";
import RatingItem from "./RatingItem";

const SummaryRating: React.FC<{
  title: string;
  pagePath: string;
  overallRating: number,
  summaryRatings: SummaryRatingProps[];
  reportFor: string;
  reportedId: number;
}> = ({ title, pagePath, overallRating, summaryRatings, reportFor, reportedId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
    {/* title */}
      <Flex alignItems="center">
      <ReportModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} reportFor={reportFor} reportedId={reportedId} />
      <Text
        fontSize={{ base: "xl", sm: "3xl", md: "5xl" }}
        fontWeight="bold"
        align={{ base: "center", sm: "left" }}
        color="biru.800"
        ml={{ base: 0, sm: "4", md: "8" }}
      >
        {title?.toLocaleUpperCase()}
      </Text>
      <Spacer />
      <Icon
        as={AiOutlineWarning}
        boxSize={{ base: 3, sm: 4, md: 6 }}
        color="gray.500"
        onClick={onOpen}
        _hover={{ cursor: "pointer", color: "red.600" }}
        aria-label={""}      />
    </Flex>
    {/* action button */}
    <Flex direction="row">
      {pagePath.includes("professors") ? (
        <Link href="/">
          <Text
            as="u"
            fontSize={{ base: "sm", sm: "lg" }}
            mr="4"
            ml={{ sm: "4", md: "8" }}
          >
            Lihat mata kuliah
          </Text>
        </Link>
      ) : null}
      {pagePath.includes("courses") ? (
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
      {pagePath.includes("universities")? (
        <Link href={`/search/${pagePath.split('/')[2]}`}>
          <Text
            as="u"
            fontSize={{ base: "sm", sm: "lg" }}
            mr="4"
            ml={{ sm: "4", md: "8" }}
          >
            Lihat dosen/mata kuliah
          </Text>
        </Link>
      ) : null}

    </Flex>
    {/* rating container */}
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
          {overallRating?.toFixed(1)}
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
    </>
  );
};

export default SummaryRating;
