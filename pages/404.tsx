import { Center, Container, HStack, Text, VStack, Image, Spacer, Radio, RadioGroup, Input, Textarea, Button, Show } from "@chakra-ui/react";
import router from "next/router";
import Head from 'next/head';

import React from "react";

const Custom404: React.FC<{}> = () => {
  return (
    <Container>
        <Head>
            <title>404 - Halaman tidak ditemukan</title>
            <meta
                name="description"
                content="Cari Dosen is application that can helps you rate universities, professor, and courses"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
      <Center minH="fit-content" h="calc(100vh - 5.5rem - 6.9rem)">
        <HStack w={"full"}>
            <VStack align={"left"} gap={4} w="70vh">
                <VStack align="left" gap={1}>
                    <Text fontSize="2xl" fontWeight="bold" color={"biru.800"}>Cari apa, hayo?</Text>
                    <Text>Halaman yang dituju tidak ada, nih! :<span>&#40;</span></Text>
                </VStack>
                <Button variant={"primary"} w="fit-content" onClick={() => router.push('/')}>Kembali</Button>
            </VStack>
            <Show above="md">
              <Spacer />
              <Image src="/bird.svg" alt="Decoration" w="16rem" pointerEvents="none" userSelect="none" />
            </Show>
        </HStack>
      </Center>
    </Container>
  );
};

export default Custom404;