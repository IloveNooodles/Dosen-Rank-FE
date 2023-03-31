import React from "react";
import {Box, Button, Container, Text, VStack} from "@chakra-ui/react";
import {Card} from "@chakra-ui/card";
import Image from "next/image";

const ConfirmRegisterModal: React.FC<{}> = () => {
    return (
        <Container>
            <Card w={"37rem"} h={"25rem"}>
                <VStack px={8}>
                    <Box pt={8}>
                        <Image src={"/ic-mail-sent.svg"} alt={"decorative image"} width={200} height={200}/>
                    </Box>
                    <Text fontSize="2xl" fontWeight="bold" color={"biru.800"}>
                        Terima kasih telah mendaftar!
                    </Text>
                    <Text align={"center"} fontSize={"sm"}>
                        Kami telah mengirimkan email konfirmasi ke [email] untuk mengaktifkan akun kamu.
                    </Text>
                    <Box pt={4}>
                        <Button size={"lg"} colorScheme={"biru"}>
                            Kembali ke Beranda
                        </Button>
                    </Box>
                </VStack>
            </Card>

        </Container>
    );
};

export default ConfirmRegisterModal;