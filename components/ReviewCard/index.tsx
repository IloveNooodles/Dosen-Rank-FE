'use client';

import React, { useState } from 'react';
import {Card, CardBody, CardFooter, CardHeader} from "@chakra-ui/card";
import {Box, Button, CSSReset, Flex, HStack, Link, Show, Text, VStack} from "@chakra-ui/react";
import StarRating from "react-svg-star-rating";
import styles from "@/styles/ReviewCard.module.scss";
import Image from "next/image";
import RedWarningIcon from "@/public/ic-warning.svg";

export interface ReviewCardProps{
    reviewFor: 'university' | 'course' | 'courses';
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
    activeButton?: 'none' | 'like' | 'dislike';
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
}) => {

    const [likeCountState, setLikeCountState] = useState(likeCount);
    const [dislikeCountState, setDislikeCountState] = useState(dislikeCount);
    const [activeButtonState, setActiveButtonState] = useState('none');
    const [expanded, setExpanded] = useState(false);
    const [numberOfLines, setNumberOfLines] = useState(3);
    const handleLike = () => {
        if (activeButtonState === 'none') {
            setLikeCountState(likeCountState + 1);
            setActiveButtonState('like');
        }
        else if (activeButtonState === 'like') {
            setLikeCountState(likeCountState - 1);
            setActiveButtonState('none');
        }
        else if (activeButtonState === 'dislike') {
            setLikeCountState(likeCountState + 1);
            setDislikeCountState(dislikeCountState - 1);
            setActiveButtonState('like');
        }
    };

    const handleDislike = () => {
        if (activeButtonState === 'none') {
            setDislikeCountState(dislikeCountState + 1);
            setActiveButtonState('dislike');
        }
        else if (activeButtonState === 'dislike') {
            setDislikeCountState(dislikeCountState - 1);
            setActiveButtonState('none');
        }
        else if (activeButtonState === 'like') {
            setLikeCountState(likeCountState - 1);
            setDislikeCountState(dislikeCountState + 1);
            setActiveButtonState('dislike');
        }
    }

    function handleExpand() {
        setExpanded(true);
        setNumberOfLines(999);
    }

    return (
        <Card my={{base: 2}} maxW="70rem" h="auto">
            <CardHeader pb={{base: "0rem", md:"1rem"}}>
                <HStack justifyContent={"space-between"}>
                    <HStack>
                        <Text fontSize={{base: '1rem', md: '1.25rem'}} fontWeight="bold" color={"biru.900"}>M. Fikri Ranjabi</Text>
                        {reviewFor === "courses" && <Show above={"md"}>
                            <Box w="auto" h="auto" bg="biru.900" borderRadius={"1.5rem"} px={"1rem"} py={"0.5rem"} >
                                <Text fontSize="1rem" fontWeight="semibold" color={"biru.50"}>Matematika Diskrit</Text>
                            </Box>
                        </Show>}
                    </HStack>
                    <HStack>
                        <Button onClick={handleLike} borderRadius={"1.5rem"} px={"1rem"} colorScheme={`${activeButtonState === 'like' ? "cyan": "gray"}`}>
                            <Text color={"gray.900"}>👍 {likeCountState}</Text>
                        </Button>
                        <Button onClick={handleDislike} borderRadius={"1.5rem"} px={"1rem"} colorScheme={(activeButtonState === "dislike") ? "red" : "gray"}>
                            <Text color={"gray.900"}>👎 {dislikeCountState}</Text>
                        </Button>
                    </HStack>
                </HStack>
            </CardHeader>
            <CardBody pt={0} pb={0}>
                <VStack alignItems={"start"}>
                    <Text fontSize={{ base: '0.75rem', md: '1rem'}} fontWeight={"400"} noOfLines={{base: numberOfLines, md: 999}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin semper odio eu nibh placerat rutrum. Etiam non scelerisque mi. Nulla tincidunt volutpat erat in elementum. In blandit lectus et nisl tincidunt auctor vulputate imperdiet felis. Duis porta turpis vel lorem vulputate, vel posuere dolor rutrum. In sed lobortis urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ut varius nunc, eu eleifend dolor.
                    </Text>
                    <Show below={"md"}>
                        {!expanded ? (
                        <Link onClick={handleExpand}>
                            <Text mt="-0.5rem" color={"biru.800"} fontWeight={"semibold"} fontSize={"0.75rem"}>see more</Text>
                        </Link>) : null}
                    </Show>
                    <HStack gap={{base: 2, md: 20}} paddingLeft={{base: '0.75rem', md: '2rem'}}>
                        <VStack>
                            <Text fontSize={"1.5rem"} fontWeight={"bold"} color={"biru.600"}>4.5</Text>
                            <Text fontSize={{base: '0.75rem', md: '1rem'}} fontWeight={"400"} color={"gray.900"} mt={0} pt={0}>Overall</Text>
                        </VStack>
                            <Flex flexDir={"column"} gap={{base: 1.5, md: 2}}>
                                <HStack gap={{base: 0, md: 7}}>
                                    <Text fontSize={{base: '0.75rem', md: '1rem'}} fontWeight={"400"} color={"grey.900"} width={{base: '8rem', md: '11rem'}} >Komunikasi</Text>
                                    <StarRating isReadOnly initialRating={3.5} unit="half" size={16} containerClassName={styles.star}/>
                                </HStack>
                                <HStack gap={{base: 0, md: 7}} >
                                    <Text fontSize={{base: '0.75rem', md: '1rem'}} fontWeight={"400"} color={"grey.900"} width={{base: '8rem', md: '11rem'}}>Transparansi Penilaian</Text>
                                    <StarRating isReadOnly initialRating={3.5} unit="half" size={16} containerClassName={styles.star}/>
                                </HStack>
                                <HStack gap={{base: 0, md: 7}} >
                                    <Text fontSize={{base: '0.75rem', md: '1rem'}} fontWeight={"400"} color={"grey.900"} width={{base: '8rem', md: '11rem'}}>Gaya Mengajar</Text>
                                    <StarRating isReadOnly initialRating={3.5} unit="half" size={16} containerClassName={styles.star}/>
                                </HStack>
                                <HStack gap={{base: 0, md: 7}}>
                                    <Text fontSize={{base: '0.75rem', md: '1rem'}} fontWeight={"400"} color={"grey.900"} width={{base: '8rem', md: '11rem'}}>Konten Pengajar</Text>
                                    <StarRating isReadOnly initialRating={3.5} unit="half" size={16} containerClassName={styles.star}/>
                                </HStack>
                            </Flex>
                        <VStack>
                        </VStack>
                    </HStack>
                </VStack>
            </CardBody>
            <CardFooter>
                <HStack justifyContent={"space-between"} w={"100%"}>
                    <Text fontSize={"0.75rem"} fontWeight={"400"} color={"gray.500"} pt={0}>12 Februari 2023</Text>
                    <Link display={"flex"} gap={"0.5rem"} href="index">
                        <Image src={RedWarningIcon} alt={"red warning icon"} />
                        <Text fontSize={"0.75rem"} fontWeight={"400"} color={"red.500"} pt={0}>Laporkan Ulasan</Text>
                    </Link>
                </HStack>
            </CardFooter>
        </Card>
    );
};
export default ReviewCard;