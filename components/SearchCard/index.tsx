"use client";

import { Card, CardBody } from "@chakra-ui/card";
import { Text, VStack, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import ReportModal from "../ReportModal";

export interface SearchCardProps {
  searchResult?: string;
  slug: string;
  searchFor: "university" | "professor" | "courses";
}

const SearchCard: React.FC<SearchCardProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [numberOfLines, setNumberOfLines] = useState(3);

  const { searchResult, slug, searchFor } = props;

  const makeSlug = (slug: string) => {
    if (searchFor === "university") {
      return `/universities/${slug}`;
    }

    if (searchFor === "courses") {
      return `/courses/${slug}`;
    }

    return `/professors/${slug}`;
  };

  let realSlug = makeSlug(slug);

  return (
    <Link href={realSlug}>
      <Card
        my={{ base: 2 }}
        maxW="70rem"
        h="auto"
        padding={"2rem"}
        border="1px solid"
        borderColor={"gray.200"}
        _hover={{ backgroundColor: "gray.200" }}
        transition={"all 0.3s ease-in-out"}
      >
        <ReportModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        <CardBody pt={0} pb={0}>
          <VStack alignItems={"start"}>
            <Text
              fontSize={{ base: "0.75rem", md: "1rem" }}
              fontWeight={"400"}
              noOfLines={{ base: numberOfLines, md: 999 }}
            >
              {searchResult}
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Link>
  );
};
export default SearchCard;
