import React from 'react';
import {Box, VStack, Text, Button, HStack, Spacer, Flex, Container, Center, Show} from "@chakra-ui/react";
import Image from "next/image";
import successIcon from "../../public/ic-success.svg";

const Confirmation: React.FC<{}> = () => {
    return (
        <Container>
            <Center minH="fit-content" h="calc(100vh - 5.5rem - 6.9rem)">
                <Show below="md">
                    <Box mr={"1.5rem"}>
                        <Image src={successIcon} alt="Decoration" width={400}>
                        </Image>
                    </Box>
                </Show>
                <Flex justify={"space-between"} align={"center"} gap={20}>
                    <VStack>
                        <Box my={{sm: "1px", md: "20px"}}>
                            <Text fontSize="2xl" fontWeight="bold" color={"biru.800"}>
                                Selamat, akun kamu sudah terdaftar!
                            </Text>
                            <Text>
                                Ayo lihat review mata kuliah yang kamu ambil!
                            </Text>
                        </Box>
                        <Button borderRadius={"2rem"} colorScheme={"biru"}>
                            Lanjutkan ke Halaman Login
                        </Button>
                    </VStack>
                    <Show above="md">
                        <Box>
                            <Image src={successIcon} alt="Decoration" width={400}>
                            </Image>
                        </Box>
                    </Show>
                </Flex>
            </Center>
        </Container>
    );
};

export default Confirmation;