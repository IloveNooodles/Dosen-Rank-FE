'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import {Card, CardBody, CardFooter, CardHeader} from "@chakra-ui/card";
import {Box, Button, HStack, Text, VStack} from "@chakra-ui/react";

interface ReviewCardProps{
    reviewFor?: 'university' | 'course' | 'lecturer';
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
    likeCount?: number;
    dislikeCount?: number;
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
    dislikeCount
}) => {
    return (
        <Card maxW="70rem" h="auto">
            <CardHeader>
                <HStack justifyContent={"space-between"}>
                    <HStack>
                        <Text fontSize="1.25rem" fontWeight="bold" color={"biru.900"}>M. Fikri Ranjabi</Text>
                        <Box w="auto" h="auto" bg="biru.900" borderRadius={"1.5rem"} px={"1rem"} py={"0.5rem"}>
                            <Text fontSize="1rem" fontWeight="semibold" color={"biru.50"}>Matematika Diskrit</Text>
                        </Box>
                    </HStack>
                    <HStack>
                        <Button borderRadius={"1.5rem"} px={"1rem"} color={"gray.500"}>
                            <Text color={"gray.900"}>👍 69</Text>
                        </Button>
                        <Button borderRadius={"1.5rem"} px={"1rem"} color={"gray.500"}>
                            <Text color={"gray.900"}>👎 -9</Text>
                        </Button>
                    </HStack>
                </HStack>
            </CardHeader>
            <CardBody pt={0} pb={0}>
                <VStack alignItems={"start"}>
                    <Text fontSize={"1rem"} fontWeight={"400"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin semper odio eu nibh placerat rutrum. Etiam non scelerisque mi. Nulla tincidunt volutpat erat in elementum. In blandit lectus et nisl tincidunt auctor vulputate imperdiet felis. Duis porta turpis vel lorem vulputate, vel posuere dolor rutrum. In sed lobortis urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam ut varius nunc, eu eleifend dolor.
                    </Text>
                    <HStack gap={7}>
                        <VStack>
                            <Text fontSize={"1.5rem"} fontWeight={"bold"} color={"biru.600"}>4.5</Text>
                            <Text fontSize={"1rem"} fontWeight={"400"} color={"gray.900"} mt={0}>Overall</Text>
                        </VStack>
                        <VStack >
                            <Text fontSize={"1rem"} fontWeight={"400"} color={"grey.900"} align={"start"}>Komunikasi</Text>
                            <Text fontSize={"1rem"} fontWeight={"400"} color={"grey.900"}>Transparansi Penilaian</Text>
                            <Text fontSize={"1rem"} fontWeight={"400"} color={"grey.900"}>Gaya Mengajar</Text>
                            <Text fontSize={"1rem"} fontWeight={"400"} color={"grey.900"}>Konten Pengajar</Text>
                        </VStack>
                        <VStack>
                            <Text>⭐️⭐️⭐️⭐️⭐️</Text>
                            <Text>⭐️⭐️⭐️⭐️⭐️</Text>
                            <Text>⭐️⭐️⭐️⭐️⭐️</Text>
                            <Text>⭐️⭐️⭐️⭐️⭐️</Text>
                        </VStack>
                    </HStack>
                </VStack>
            </CardBody>
            <CardFooter>
                <Text fontSize={"0.75rem"} fontWeight={"400"} color={"gray.500"} pt={0}>12 Februari 2023</Text>
            </CardFooter>
        </Card>
    );
};
export default ReviewCard;