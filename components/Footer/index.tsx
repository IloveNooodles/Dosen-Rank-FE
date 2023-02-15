import { dm_sans } from "@/fonts";
import { useRouter } from 'next/router';
import { FiGithub, FiGitlab } from 'react-icons/fi';
import { Box, Container, Text, Flex, Button, HStack, Spacer, Icon, VStack, } from "@chakra-ui/react";
import Link from "next/link";

const Footer: React.FC<{}> = () => {
    const router = useRouter()
    return (
        <Container py="24px" px={{ base: "12px", md: "40px"}} h="auto">
            <VStack alignItems="start">
                <HStack gap="24px">
                    <Link href="https://github.com/IloveNooodles" target="_blank">
                        <Icon as={ FiGithub } color="biru.800" w="24px" h="24px" />
                    </Link>
                    <Link href="https://gitlab.informatika.org/if3250_2023_k01_06" target="_blank">
                        <Icon as={ FiGitlab } color="biru.800" w="24px" h="24px" />
                    </Link>
                </HStack>
                <Text color="biru.800" fontSize={{ base: "11px", md: "14px"}}>
                    made with love by FGFGF
                </Text>
            </VStack>
        </Container>
    )
};

export default Footer;