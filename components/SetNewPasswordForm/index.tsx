import {
    VStack,
    Button,
    Text,
    Box,
    FormControl,
    FormLabel,
    Input
} from "@chakra-ui/react";
import React, {useState} from "react";
import Link from "next/link";


const SetNewPasswordForm: React.FC = () => {
    return (
        <Box>
            <VStack>
                <Text fontWeight="semibold" align="center" fontSize="2xl">
                    Setting Password Baru
                </Text>
                <Text fontSize={"sm"} color="biru.900">
                    Password baru kamu harus berbeda dengan password kamu sebelumnya.
                </Text>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type='password'/>
                    <FormLabel>Konfirmasi Password</FormLabel>
                    <Input type='password'/>
                    <Button
                        mt={4}
                        colorScheme='teal'
                        type='submit'
                        width="24rem"
                    >
                        Submit
                    </Button>
                </FormControl>
                <Text fontSize={"xs"} fontWeight={"400"}>
                    ⬅︎ Kembali ke {" "}
                    <Link href="/login">
                        <Text as="span" color="biru.600" fontWeight="bold">
                            login
                        </Text>
                    </Link>
                </Text>
            </VStack>
        </Box>
    );
};

export default SetNewPasswordForm;
