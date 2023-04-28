"use client";

import RedWarningIcon from "@/public/ic-warning.svg";
import styles from "@/styles/ReviewCard.module.scss";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Show,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import StarRating from "react-svg-star-rating";
import ReportModal from "../ReportModal";

export interface ReviewCardProps {
  reviewFor: "university" | "course" | "courses" | "dosen";
  idReview?: number;
  reviewerName?: string;
  courseName?: string;
  overallRating?: number;
  firstFieldName?: string;
  secondFieldName?: string;
  thirdFieldName?: string;
  fourthFieldName?: string;
  firstFieldRating?: number;
  secondFieldRating?: number;
  thirdFieldRating?: number;
  fourthFieldRating?: number;
  reviewDate?: string;
  reviewContent?: string;
  likeCount: number;
  dislikeCount: number;
  activeButton?: "none" | "like" | "dislike";
  reportFor: string;
  reportedId: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewFor,
  idReview,
  reviewerName,
  courseName,
  overallRating,
  firstFieldName,
  secondFieldName,
  thirdFieldName,
  fourthFieldName,
  firstFieldRating,
  secondFieldRating,
  thirdFieldRating,
  fourthFieldRating,
  reviewDate,
  reviewContent,
  likeCount,
  dislikeCount,
  activeButton,
  reportFor,
  reportedId
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const [dislikeCountState, setDislikeCountState] = useState(dislikeCount);
  const [activeButtonState, setActiveButtonState] = useState("none");
  const [expanded, setExpanded] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(3);
  const date = new Date(reviewDate!);

  const formatter = Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  });

  const formattedDate = formatter.format(date);

  const handleLike = () => {
    if (activeButtonState === "none") {
      setLikeCountState(likeCountState + 1);
      setActiveButtonState("like");
    } else if (activeButtonState === "like") {
      setLikeCountState(likeCountState - 1);
      setActiveButtonState("none");
    } else if (activeButtonState === "dislike") {
      setLikeCountState(likeCountState + 1);
      setDislikeCountState(dislikeCountState - 1);
      setActiveButtonState("like");
    }
  };

  const handleDislike = () => {
    if (activeButtonState === "none") {
      setDislikeCountState(dislikeCountState + 1);
      setActiveButtonState("dislike");
    } else if (activeButtonState === "dislike") {
      setDislikeCountState(dislikeCountState - 1);
      setActiveButtonState("none");
    } else if (activeButtonState === "like") {
      setLikeCountState(likeCountState - 1);
      setDislikeCountState(dislikeCountState + 1);
      setActiveButtonState("dislike");
    }
  };

  function handleExpand() {
    setExpanded(true);
    setNumberOfLines(999);
  }

  return (
    <Card my={{ base: 2 }} maxW="70rem" h="auto" data-cy={'review-card'}>
      <ReportModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} reportFor={reportFor} reportedId={reportedId} />
      <CardHeader pb={{ base: "0rem", md: "1rem" }}>
        <HStack justifyContent={"space-between"}>
          <HStack>
            <Text
              fontSize={{ base: "1rem", md: "1.25rem" }}
              fontWeight="bold"
              color={"biru.900"}
            >
              {reviewerName}
            </Text>
            {reviewFor === "courses" && (
              <Show above={"md"}>
                <Box
                  w="auto"
                  h="auto"
                  bg="biru.900"
                  borderRadius={"1.5rem"}
                  px={"1rem"}
                  py={"0.5rem"}
                >
                  <Text fontSize="1rem" fontWeight="semibold" color={"biru.50"}>
                    Matematika Diskrit
                  </Text>
                </Box>
              </Show>
            )}
          </HStack>
          <HStack>
            <Button
              onClick={handleLike}
              borderRadius={"1.5rem"}
              px={"1rem"}
              colorScheme={`${activeButtonState === "like" ? "cyan" : "gray"}`}
            >
              <Text color={"gray.900"}>👍 {likeCountState}</Text>
            </Button>
            <Button
              onClick={handleDislike}
              borderRadius={"1.5rem"}
              px={"1rem"}
              colorScheme={activeButtonState === "dislike" ? "red" : "gray"}
            >
              <Text color={"gray.900"}>👎 {dislikeCountState}</Text>
            </Button>
          </HStack>
        </HStack>
      </CardHeader>
      <CardBody pt={0} pb={0}>
        <VStack alignItems={"start"}>
          <Text
            fontSize={{ base: "0.75rem", md: "1rem" }}
            fontWeight={"400"}
            noOfLines={{ base: numberOfLines, md: 999 }}
          >
            {reviewContent}
          </Text>
          <Show below={"md"}>
            {!expanded ? (
              <Link onClick={handleExpand}>
                <Text
                  mt="-0.5rem"
                  color={"biru.800"}
                  fontWeight={"semibold"}
                  fontSize={"0.75rem"}
                >
                  see more
                </Text>
              </Link>
            ) : null}
          </Show>
          <HStack
            gap={{ base: 2, md: 20 }}
            paddingLeft={{ base: "0.75rem", md: "2rem" }}
          >
            <VStack>
              <Text fontSize={"1.5rem"} fontWeight={"bold"} color={"biru.600"}>
                {overallRating?.toFixed(1)}
              </Text>
              <Text
                fontSize={{ base: "0.75rem", md: "1rem" }}
                fontWeight={"400"}
                color={"gray.900"}
                mt={0}
                pt={0}
              >
                Overall
              </Text>
            </VStack>
            <Flex flexDir={"column"} gap={{ base: 1.5, md: 2 }}>
              <HStack gap={{ base: 0, md: 7 }}>
                <Text
                  fontSize={{ base: "0.75rem", md: "1rem" }}
                  fontWeight={"400"}
                  color={"grey.900"}
                  width={{ base: "8rem", md: "11rem" }}
                >
                  {firstFieldName}
                </Text>
                <StarRating
                  isReadOnly
                  initialRating={firstFieldRating}
                  unit="half"
                  size={16}
                  containerClassName={styles.star}
                />
              </HStack>
              <HStack gap={{ base: 0, md: 7 }}>
                <Text
                  fontSize={{ base: "0.75rem", md: "1rem" }}
                  fontWeight={"400"}
                  color={"grey.900"}
                  width={{ base: "8rem", md: "11rem" }}
                >
                  {secondFieldName}
                </Text>
                <StarRating
                  isReadOnly
                  initialRating={secondFieldRating}
                  unit="half"
                  size={16}
                  containerClassName={styles.star}
                />
              </HStack>
              <HStack gap={{ base: 0, md: 7 }}>
                <Text
                  fontSize={{ base: "0.75rem", md: "1rem" }}
                  fontWeight={"400"}
                  color={"grey.900"}
                  width={{ base: "8rem", md: "11rem" }}
                >
                  {thirdFieldName}
                </Text>
                <StarRating
                  isReadOnly
                  initialRating={thirdFieldRating}
                  unit="half"
                  size={16}
                  containerClassName={styles.star}
                />
              </HStack>
              <HStack gap={{ base: 0, md: 7 }}>
                <Text
                  fontSize={{ base: "0.75rem", md: "1rem" }}
                  fontWeight={"400"}
                  color={"grey.900"}
                  width={{ base: "8rem", md: "11rem" }}
                >
                  {fourthFieldName}
                </Text>
                <StarRating
                  isReadOnly
                  initialRating={fourthFieldRating}
                  unit="half"
                  size={16}
                  containerClassName={styles.star}
                />
              </HStack>
            </Flex>
            <VStack></VStack>
          </HStack>
        </VStack>
      </CardBody>
      <CardFooter>
        <HStack justifyContent={"space-between"} w={"100%"}>
          <Text
            fontSize={"0.75rem"}
            fontWeight={"400"}
            color={"gray.500"}
            pt={0}
          >
            {formattedDate}
          </Text>
          <Link display={"flex"} gap={"0.5rem"} onClick={onOpen}>
            <Image src={RedWarningIcon} alt={"red warning icon"} />
            <Text
              fontSize={"0.75rem"}
              fontWeight={"400"}
              color={"red.500"}
              pt={0}
            >
              Laporkan Ulasan
            </Text>
          </Link>
        </HStack>
      </CardFooter>
    </Card>
  );
};
export default ReviewCard;
