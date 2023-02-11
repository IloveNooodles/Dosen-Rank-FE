import { Container, VStack, Text, Input, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";

const Register: React.FC<{}> = () => (
    <Container centerContent>
        <VStack h="full" justify="center" maxW="sm">
            <Text fontWeight="semibold" pb={6} align="center" fontSize="2xl">
                Buat akun sebagai mahasiswa
            </Text>
            <VStack px={12} spacing={6}>
                <Input placeholder="Email" />
                <Input placeholder="Password" />
                <Button colorScheme="biru" w="full">
                    Masuk!
                </Button>
                <Text>
                    Belum punya akun?{" "}
                    <Link href="/register">
                        <Text as="span" color="biru.600" fontWeight="bold">
                            daftar
                        </Text>
                    </Link>{" "}
                </Text>
            </VStack>
        </VStack>
    </Container>
);

export default Register;
