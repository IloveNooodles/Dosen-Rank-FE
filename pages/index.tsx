import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { inter } from "@/fonts";
import styles from "@/styles/Home.module.scss";
import { Box, Center, Container, Flex, HStack, VStack, Text, Input, InputGroup, InputRightElement, Image, Icon, keyframes } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { motion, isValidMotionProp } from 'framer-motion';
import React from 'react';

const dynamicText = ["dosen", "mata kuliah", "kampus"];

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
      <Box position="absolute" w="100%" h="100%" overflow="clip">
        <Image src="/graduation-cap-2.png" position="absolute" marginLeft="12%" marginTop="9%" w="11%" pointerEvents="none"/>
        <Image src="/graduation-cap-1.png" position="absolute" marginLeft="50%" marginTop="15%" w="45%" pointerEvents="none"/>
        <Image src="/halftone-dots.svg" position="absolute" marginLeft="30%" marginTop="-14%" w="24%" pointerEvents="none"/>
        <Image src="/halftone-dots.svg" position="absolute" marginLeft="24%" marginTop="39%" w="16%" pointerEvents="none"/>
      </Box>
      <Flex direction="column">
        <NavigationBar/>
        <Center minH="fit-content" h="calc(100vh - 88px - 110.4px)">
          <VStack>
            <HStack>
              <Text fontSize={{ base: "32px", md: "52px"}} fontWeight="bold">
                Cari ulasan
              </Text>
              <Text fontSize={{ base: "32px", md: "52px"}} fontWeight="bold" color="biru.800">
                { dynamicText[counter] }
              </Text>
            </HStack>
            <InputGroup w={{ base: "320px", md: "500px"}}>
              <Input
                placeholder="Cari universitas, mata kuliah, atau dosen..."
                _placeholder={{ color: 'netral.400', fontWeight: 'light' }}
                borderColor="netral.300"
                fontSize={{ base: "11px", md: "14px"}}
                focusBorderColor="biru.800"
                borderRadius="24px"
                backgroundColor={"whiteAlpha.700"}
                backgroundBlendMode="overlay" />
              <InputRightElement children={<Search2Icon color="netral.400" />} />
            </InputGroup>
          </VStack>
        </Center>
        <Footer/>
      </Flex>
    </Container>
  );
}

export default Index;