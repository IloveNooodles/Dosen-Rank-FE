import React, {useEffect} from 'react';
import {Box, VStack, Text, Button, HStack, Spacer, Flex, Container, Center, Show, useToast} from "@chakra-ui/react";
import Image from "next/image";
import successIcon from "../../public/ic-success.svg";
import Link from "next/link";
import { useRouter } from 'next/router';
import {apiInstance} from "@/utils/apiInstance";
import axios from "axios";
import Head from 'next/head';


const Confirmation: React.FC<{}> = () => {
    const router = useRouter();
    const { token, email } = router.query;
    const toast = useToast()

    useEffect(() => {
        const postData = async () => {
            try {
                if (token && email){
                    await apiInstance({}).post(`/users/verify-email?token=${token}&email=${email}`);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast({
                        title: error.response?.data.message,
                        description: error.response?.data.error,
                        status: 'error',
                        duration: 3000,
                        position: 'top',
                    })
                }
            }
        };
        postData();
    }, [token, email]);

    return (
        <Container>
            <Head>
                <title>Verifikasi Email</title>
                <meta
                    name="description"
                    content="Cari Dosen is application that can helps you rate universities, professor, and courses"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
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
                        <Link href={"/login"}>
                            <Button borderRadius={"2rem"} colorScheme={"biru"}>
                                Lanjutkan ke Halaman Login
                            </Button>
                        </Link>
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