import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { inter } from "@/fonts";
import styles from "@/styles/Home.module.scss";
import { Box, Center, Container, Flex, HStack, VStack, Text, Input, InputGroup, InputRightElement, Icon, keyframes } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { Search2Icon } from "@chakra-ui/icons";
import { motion, isValidMotionProp } from 'framer-motion';

const Index: React.FC<{}> = () => (
  <Container>
    <Flex direction="column">
      <NavigationBar/>
      <Center minH="fit-content" h="calc(100vh - 88px - 110.4px)">
        <VStack>
          <HStack>
            <Text fontSize="48px" fontWeight="bold">
              Cari ulasan
            </Text>
            <Text fontSize="48px" fontWeight="bold" color="biru.800">
              dosen
            </Text>
          </HStack>
          <InputGroup>
            <Input
              placeholder="Cari universitas, mata kuliah, atau dosen..."
              _placeholder={{ color: 'netral.400', fontWeight: 'light' }}
              borderColor="netral.300"
              focusBorderColor="biru.800"
              borderRadius="24px"/>
            <InputRightElement children={<Search2Icon color="netral.400" />} />
          </InputGroup>
        </VStack>
      </Center>
      <Footer/>
    </Flex>
  </Container>
);

export default Index;