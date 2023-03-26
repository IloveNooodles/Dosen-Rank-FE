import React from "react";
import {Card} from "@chakra-ui/card";
import {Text} from "@chakra-ui/react";

export interface MatkulCardProps {
    matkulName: string;
    matkulCode: string;
}

const MatkulCard: React.FC<MatkulCardProps> = ({ matkulName, matkulCode }) => {
    return (
        <Card width="17.5rem" height="4rem" justifyContent="center">
            <Text fontSize="0.75rem" fontWeight="700" textAlign="start" ml={4} color="#237495">
                {matkulCode}
            </Text>
            <Text fontSize="1rem" fontWeight="400" textAlign="start" ml={4}>
                {matkulName}
            </Text>
        </Card>
    );
};

export default MatkulCard;