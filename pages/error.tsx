import { Center, Container, HStack, Text, VStack, Image, Spacer, Radio, RadioGroup, Input, Textarea, Button } from "@chakra-ui/react";
import router from "next/router";

import React from "react";

const Error: React.FC<{}> = () => {
  return (
    <Container>
      <Center minH="fit-content" h="calc(100vh - 5.5rem - 6.9rem)">
        <HStack w={"full"}>
            <VStack align={"left"} gap={4} w="70vh">
                <VStack align="left" gap={1}>
                    <Text fontSize="2xl" fontWeight="bold" color={"biru.800"}>Cari apa, hayo?</Text>
                    <Text>Halaman yang dituju tidak ada, nih! :<span>&#40;</span></Text>
                </VStack>
                <Button variant={"primary"} w="fit-content" onClick={() => router.push('/')}>Kembali</Button>
            </VStack>
            <Spacer />
            <Image src="/bird.svg" alt="Decoration" w="16rem" pointerEvents="none" userSelect="none" />
        </HStack>
      </Center>
    </Container>
  );
};

export default Error;