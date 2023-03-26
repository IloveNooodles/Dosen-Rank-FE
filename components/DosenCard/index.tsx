import React from 'react';
import {Card} from "@chakra-ui/card";
import {Text} from "@chakra-ui/react";

export interface DosenCardProps {
    dosenName: string;
}
const DosenCard: React.FC<DosenCardProps> = ({ dosenName }) => {
    return (
        <Card width="17.5rem" height="4rem" justifyContent="center">
            <Text fontSize="1rem" fontWeight="400" textAlign="start" ml={4}>
                {dosenName}
            </Text>
        </Card>
    );
};

export default DosenCard;