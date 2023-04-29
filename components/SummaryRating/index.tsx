import { dm_sans } from "@/fonts";
import { SummaryRatingProps } from "@/interfaces";
import { Flex, Spacer, Icon, VStack, SimpleGrid, Text, useDisclosure, HStack, Show } from "@chakra-ui/react";
import { DM_Sans } from "@next/font/google";
import Link from "next/link";
import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import ReportModal from "../ReportModal";
import RatingItem from "./RatingItem";

const SummaryRating: React.FC<{
  title: string;
  pagePath: string;
  overallRating: number,
  summaryRatings: SummaryRatingProps[];
  reportFor: string;
  reportedId: number;
  sksCourse: number;
  institutionName: string;
  facultyName: string;
  majorName: string;
}> = ({ title, pagePath, overallRating, summaryRatings, reportFor, reportedId, sksCourse, institutionName, facultyName, majorName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
    {/* title */}
      <Flex>
      <ReportModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} reportFor={reportFor} reportedId={reportedId} />
      <VStack align={"left"}>
        { reportFor == "COURSE" || reportFor == "PROFESSOR" ? (
        <>
          <Text
            fontWeight={"bold"}
            fontSize={{ base: "0.6rem", sm: "0.8rem", md: "1.1rem" }}
            ml={{ base: 0, sm: 2, lg: 4 }}
          >
            {institutionName?.toLocaleUpperCase() || "Institut"}
          </Text>
        </>
        ) : null}
        <HStack alignContent={"center"} gap={3}>
          <Text
            data-cy={'summary-rating-title'}
            textAlign={"left"}
            fontSize={{ base: "xl", sm: "2xl", md: "5xl" }}
            fontWeight="bold"
            align={{ base: "center", sm: "left" }}
            color="biru.800"
            ml={{ base: 0, sm: 2, lg: 4 }}
          >
            {title?.toLocaleUpperCase()}
          </Text>
          { reportFor == "COURSE" ? (
            <Text
              fontSize={{ base: "sm", sm: "md", md: "xl" }}
              fontWeight="normal"
              align={{ base: "center", sm: "left" }}
              color="biru.800"
              backgroundColor="biru.50"
              ml={{ base: 4, sm: 6, lg: 8 }}
              px={4}
              py={1}
              borderRadius="3xl"
            >
              {sksCourse ? `${sksCourse} SKS` : null}
            </Text>
            ) : null
          }
        </HStack>
      </VStack>
      <Spacer />
      <Icon
        marginTop={{ base: 0, sm: 2, lg: 4 }}
        as={FiAlertTriangle}
        boxSize={{ base: 3, sm: 4, md: 6 }}
        color="gray.200"
        onClick={onOpen}
        _hover={{ cursor: "pointer", color: "red.500" }}
        aria-label={""}      />
    </Flex>
    { reportFor == "COURSE" || reportFor == "PROFESSOR" ? (
      <Show above="md">
        <HStack
          alignItems="left"
          color={"gray.400"}
          ml={{ base: 0, sm: 2, lg: 4 }}>
          <Text fontWeight={"medium"} fontSize={{ base: "0.6rem", sm: "0.8rem", md: "1.1rem" }}>{facultyName}</Text>
          <Text fontWeight={"thin"} fontSize={{ base: "0.6rem", sm: "0.8rem", md: "1.1rem" }}>{majorName}</Text>
        </HStack>
      </Show>
      ) : null}
    {/* action button */}
    <Flex direction="row">
      {pagePath.includes("universities")? (
        <Link href={`/search/${pagePath.split('/')[2]}`}>
          <Text
            as="u"
            fontSize={{ base: "sm", sm: "lg" }}
            mr="4"
            ml={{ sm: 2, lg: 4 }}
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
      <VStack mx={{ base: 6, sm: 8, md: 8 }}>
        <Text fontSize={{ base: "xl", sm: "lg", md: "3xl" }}>Overall</Text>
        <Text
          fontSize={{ base: "4xl", md: "5xl" }}
          color="biru.800"
          fontWeight="semibold"
          data-cy={'summary-rating-overall'}
        >
          {overallRating?.toFixed(1) || 0}
        </Text>
      </VStack>
      <SimpleGrid
        w="full"
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 2, sm: 4, md: 8 }}
        marginX={{ base: 4, sm: 10, md: 4, lg: 0 }}
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
