import React, {useState} from 'react';
import {Box, Center, Container, Text, VStack} from "@chakra-ui/react";
import EnterEmailForm from "@/components/EnterEmailForm";
import CheckYourEmail from "@/components/CheckYourEmail";

const ResetPassword: React.FC<{}> = () => { // Ubah nama function menjadi ResetPassword dan tambahkan huruf kapital pada awal nama function
    const [step, setStep] = useState(1);

    const handleNextStep = () => {
        setStep(step + 1);
    }

    return (
        <Container centerContent h="calc(100vh - 5.5rem - 6.9rem)" w="calc(100vw - 10rem)">
            <Box pt={"2rem"}>
                <VStack position="relative" h="full" justify="start" maxW="sm" >
                    {step === 1 && <EnterEmailForm onSubmit={handleNextStep} />}
                    {step === 2 && <CheckYourEmail/>}
                </VStack>
            </Box>
        </Container>
    );
};

export default ResetPassword;