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

interface CheckYourEmailProps {
}

const CheckYourEmail: React.FC<CheckYourEmailProps> = () => {
    return (
        <Box>
            <VStack>
                <Text fontWeight="semibold"  align="center" fontSize="2xl">
                    Cek email kamu
                </Text>
                <Text fontSize={"sm"} color="biru.900">
                    Kami telah mengirim link untuk reset password ke email kamu.
                </Text>
                {/* eslint-disable-next-line react/jsx-no-undef */}
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

export default CheckYourEmail;
