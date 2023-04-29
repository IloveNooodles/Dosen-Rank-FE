import React, {useState} from 'react';
import {Box, Center, Container, Text, VStack} from "@chakra-ui/react";
import EnterEmailForm from "@/components/EnterEmailForm";
import CheckYourEmail from "@/components/CheckYourEmail";
import Head from "next/head";

const ResetPassword: React.FC<{}> = () => { // Ubah nama function menjadi ResetPassword dan tambahkan huruf kapital pada awal nama function
    const [step, setStep] = useState(1);

    return (
        <Container centerContent h="calc(100vh - 5.5rem - 6.9rem)" w="calc(100vw - 10rem)">
            <Head>
                <title>Lupa Password</title>
                <meta
                    name="description"
                    content="Cari Dosen is application that can helps you rate universities, professor, and courses"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Box pt={"2rem"}>
                <VStack position="relative" h="full" justify="start" maxW="sm" >
                    {step === 1 && <EnterEmailForm handleNextStep={setStep} />}
                    {step === 2 && <CheckYourEmail/>}
                </VStack>
            </Box>
        </Container>
    );
};

export default ResetPassword;