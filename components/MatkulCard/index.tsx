import { Card } from '@chakra-ui/card';
import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export interface MatkulCardProps {
  matkulName: string;
  matkulCode: string;
  matkulSlug: string;
  matkulSKS: number;
}

const MatkulCard: React.FC<MatkulCardProps> = (props) => {
  const { matkulName, matkulCode, matkulSlug, matkulSKS } = props;
  return (
    <Card
      minH="4rem"
      margin="0.5rem"
      justifyContent="center"
      _hover={{
        background: 'white',
        color: 'teal.500',
      }}
    >
      <Link href={`/courses/${matkulSlug}`}>
        <Text
          fontSize="0.75rem"
          fontWeight="700"
          textAlign="start"
          ml={4}
          color="#237495"
        >
          {matkulCode} - {matkulSKS} SKS
        </Text>
        <Text fontSize="1rem" fontWeight="400" textAlign="start" ml={4}>
          {matkulName}
        </Text>
      </Link>
    </Card>
  );
};

export default MatkulCard;
