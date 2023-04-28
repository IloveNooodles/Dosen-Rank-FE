import { Card } from '@chakra-ui/card';
import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export interface DosenCardProps {
  dosenName: string;
  urlDosen: string;
}
const DosenCard: React.FC<DosenCardProps> = (props) => {
  const { dosenName, urlDosen } = props;

  return (
    <Card
      minH={'4rem'}
      margin={'0.5rem'}
      justifyContent="center"
      _hover={{
        background: 'natural.100',
        color: 'teal.500',
      }}
    >
      <Link href={`/professors/${urlDosen}`}>
        <Text fontSize="1rem" fontWeight="400" textAlign="start" ml={4}>
          {dosenName}
        </Text>
      </Link>
    </Card>
  );
};

export default DosenCard;
