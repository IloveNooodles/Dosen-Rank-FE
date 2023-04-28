import { Card } from '@chakra-ui/card';
import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export interface DosenCardProps {
  dosenName: string;
  urlDosen: string;
  faculty: string;
  major: string;
}
const DosenCard: React.FC<DosenCardProps> = (props) => {
  const { dosenName, urlDosen, faculty, major } = props;

  return (
    <Card
      minH={'4rem'}
      margin={'0.5rem'}
      justifyContent="center"
      _hover={{
        background: 'natural.100',
        color: 'teal.500',
      }}
      p={4}
    >
      <Link href={`/professors/${urlDosen}`}>
        <Text fontSize="1rem" fontWeight="400" textAlign="start" mb={1}>
          {dosenName}
        </Text>
        <Text fontSize='sm' color='gray.500'>{faculty}</Text>
        <Text fontSize='sm' color='gray.500'>{major}</Text>
      </Link>
    </Card>
  );
};

export default DosenCard;
