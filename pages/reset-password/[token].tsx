import React from 'react';
import {Box, Center, Container, Text, VStack} from "@chakra-ui/react";
import EnterEmailForm from "@/components/EnterEmailForm";
import CheckYourEmail from "@/components/CheckYourEmail";

const resetPassword: React.FC<{}> = () => {
    return (
        <Container centerContent h="calc(100vh - 5.5rem - 6.9rem)" w="calc(100vw - 10rem)">
            <Box pt={"2rem"}>
                <VStack position="relative" h="full" justify="start" maxW="sm" >

                </VStack>
            </Box>
        </Container>
    );
};

export default resetPassword;