import React from 'react';
import {Box, VStack, Text, Button} from "@chakra-ui/react";
import iconKacaPembesar from "@/public/ic-kaca-pembesar.svg";
import Image from "next/image";
import Link from "next/link";

const ContentNotFound: React.FC = () => {
    return (
        <VStack pt="0rem">
            <Image src={iconKacaPembesar} alt={"icon kaca pembesar"}/>
            <Text pt="1rem">Hasil Pencarian Tidak ditemukan</Text>
            <Box pt="1rem">
                <Link href="/request">
                    <Button colorScheme="teal" borderRadius="1.5rem">
                        Request Konten
                    </Button>
                </Link>
            </Box>
        </VStack>
    );
};

export default ContentNotFound;