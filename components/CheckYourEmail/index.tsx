import {
    VStack,
    Text,
    Box,

} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const CheckYourEmail: React.FC<{}> = () => {
    return (
        <Box>
            <VStack>
                <Text fontWeight="semibold"  align="center" fontSize="2xl">
                    Cek email kamu
                </Text>
                <Text fontSize={"sm"} color="biru.900" textAlign={"center"}>
                    Kami telah mengirim link untuk reset password ke email kamu.
                </Text>
                <Box py={18}>
                    <Image src={"/ic-paper-plane.svg"} alt={"decoration"} width={200} height={200}></Image>
                </Box>

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
