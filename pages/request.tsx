import { Center, Container, HStack, Text, VStack, Image, Spacer, Radio, RadioGroup, Input, Textarea, Button } from "@chakra-ui/react";

import React from "react";

const Request: React.FC<{}> = () => {
  const [value, setValue] = React.useState('1');
  return (
    <Container>
      <Center minH="fit-content" h="calc(100vh - 5.5rem - 6.9rem)">
        <HStack w={"full"}>
            <VStack align={"left"} gap={3} w="70vh">
                <Text fontSize="2xl" fontWeight="bold" color={"biru.800"}>Konten tidak lengkap?</Text>
                <VStack align={"left"}>
                    <Text fontWeight={"bold"}>Jenis</Text>
                    <RadioGroup onChange={setValue} value={value} size="sm">
                        <Radio value='university' paddingRight={8}>Universitas</Radio>
                        <Radio value='course' paddingRight={8}>Mata kuliah</Radio>
                        <Radio value='professor' paddingRight={8}>Dosen</Radio>
                    </RadioGroup>
                </VStack>
                <VStack align={"left"}>
                    <Text fontWeight={"bold"}>Nama</Text>
                    <Input placeholder="Nama konten" fontSize={{ base: '0.75rem', md: '0.9rem' }} backgroundColor={"white"} />
                </VStack>
                <VStack align={"left"}>
                    <Text fontWeight={"bold"}>Catatan</Text>
                    <Text fontSize={"sm"}>Tambahkan tautan atau informasi yang kamu ketahui agar admin dapat lebih cepat memproses request kamu!</Text>
                    <Textarea
                        id="requestTextArea"
                        placeholder="Tulis catatan di sini..."
                        resize="none"
                        maxLength={500}
                        height="6rem"
                        fontSize={{ base: '0.75rem', md: '0.9rem'}}
                        backgroundColor={"white"}
                     />
                </VStack>
                <Button variant={"primary"} w="fit-content">Submit</Button>
            </VStack>
            <Spacer />
            <Image src="/puzzle.svg" alt="Decoration" w="16rem" pointerEvents="none" userSelect="none" />
        </HStack>
      </Center>
    </Container>
  );
};

export default Request;