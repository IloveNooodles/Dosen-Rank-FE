import SearchBar from '@/components/SearchBar';
import { Center, Container, HStack, Text, VStack } from '@chakra-ui/react';

import React from 'react';

const dynamicText = ['dosen', 'matkul', 'kampus'];

const Index: React.FC<{}> = () => {
  const [counter, setCounter] = React.useState<number>(0);
  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setCounter((counter) => (counter + 1) % dynamicText.length);
    }, 2000);
    return () => {
      window.clearInterval(interval);
    };
  }, [counter]);
  return (
    <Container>
      <Center minH="fit-content" h="calc(100vh - 5.5rem - 6.9rem)">
        <VStack width={{ base: '20rem', md: '33rem' }}>
          <HStack width="full" align="left">
            <Text fontSize={{ base: '2rem', md: '3.5rem' }} fontWeight="bold">
              Cari ulasan
            </Text>
            <Text
              fontSize={{ base: '2rem', md: '3.5rem' }}
              fontWeight="bold"
              color="biru.800"
            >
              {dynamicText[counter]}
            </Text>
          </HStack>
          <SearchBar />
        </VStack>
      </Center>
    </Container>
  );
};

export default Index;
