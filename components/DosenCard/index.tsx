import React from 'react';
import {Card} from "@chakra-ui/card";
import {Text} from "@chakra-ui/react";
import Link from "next/link";

export interface DosenCardProps {
    dosenName: string;
    urlDosen: string;
}
const DosenCard: React.FC<DosenCardProps> = ({ dosenName, urlDosen }) => {
    return (
        <Link href={`/professors/${urlDosen}`}>
            <Card width="17.5rem" height="4rem" justifyContent="center" _hover={{
                background: "natural.100",
                color: "teal.500",
            }}>
                <Text fontSize="1rem" fontWeight="400" textAlign="start" ml={4}>
                    {dosenName}
                </Text>
            </Card>
        </Link>
    );
};

export default DosenCard;