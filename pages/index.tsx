import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { inter } from "@/fonts";
import styles from "@/styles/Home.module.scss";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";

const Index: React.FC<{}> = () => (
  <Container>
    <Flex direction="column">
      <NavigationBar/>
      <Container>
        awkaowkao
      </Container>
      <Footer/>
    </Flex>
  </Container>
);

export default Index;