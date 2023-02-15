import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { inter } from "@/fonts";
import styles from "@/styles/Home.module.scss";
import { Box, Center, Container, Flex, HStack, VStack, Text, Input, InputGroup, InputRightElement, Image, Icon, keyframes } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { motion, isValidMotionProp } from 'framer-motion';

const Index: React.FC<{}> = () => (
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
              dosen
            </Text>
          </HStack>
          <InputGroup>
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

export default Index;