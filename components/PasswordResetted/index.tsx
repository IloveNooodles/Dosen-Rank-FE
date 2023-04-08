import {
    VStack,
    Text,
    Box,
} from "@chakra-ui/react";
import React, {useState} from "react";
import Link from "next/link";
import iconSuccess from "@/public/ic-success.svg"
import Image from "next/image";
import {auto} from "@popperjs/core";

interface PasswordResettedProps {
}

const CheckYourEmail: React.FC<PasswordResettedProps> = () => {
    return (
        <Box>
            <VStack>
                <Text fontWeight="semibold"  align="center" fontSize="2xl">
                    Password Reset
                </Text>
                <Text fontSize={"sm"} color="biru.900">
                    Selamat password kamu berhasil diperbarui.
                </Text>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Image src="/ic-success.svg" alt="Decoration" width={300} height={300}/>
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
