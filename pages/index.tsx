import { Box, Center, Container, Flex, HStack, VStack, Text, Input, InputGroup, InputRightElement, Image, Icon, keyframes } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import React from 'react';

const dynamicText = ["dosen", "matkul", "kampus"];

const Index: React.FC<{}> = () => {
  const [counter, setCounter] = React.useState<number>(0)
  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setCounter(counter => (counter + 1) % dynamicText.length)
    }, 2000)
    return () => {window.clearInterval(interval)}
  }, [counter])
  return (
    <Container>
          <Center minH="fit-content" h="calc(100vh - 5.5rem - 6.9rem)">
            <VStack width={{ base: "20rem", md: "33rem"}}>
              <HStack width="full" align="left">
                <Text fontSize={{ base: "2.1rem", md:"3.5rem"}} fontWeight="bold">
                  Cari ulasan
                </Text>
                <Text fontSize={{ base: "2.1rem", md: "3.5rem"}} fontWeight="bold" color="biru.800">
                  { dynamicText[counter] }
                </Text>
              </HStack>
              <InputGroup w={{ base: "20rem", md: "33rem"}}>
                <Input
                  placeholder="Cari universitas, mata kuliah, atau dosen..."
                  _placeholder={{ color: 'netral.400', fontWeight: 'light' }}
                  borderColor="netral.300"
                  fontSize={{ base: "0.7rem", md: "1rem"}}
                  focusBorderColor="biru.800"
                  borderRadius="1.5rem"
                  backgroundColor={"whiteAlpha.700"}
                  backgroundBlendMode="overlay" />
                <InputRightElement>
                  <Search2Icon color="netral.400" />
                </InputRightElement>
              </InputGroup>
            </VStack>
          </Center>
    </Container>
  );
}

export default Index;