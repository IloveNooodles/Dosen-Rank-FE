import { Container, VStack, Text } from "@chakra-ui/react";
import LoginForm from "@/components/LoginForm";
import Wrapper from "@/components/Wrapper";
import NavigationBar from "@/components/NavigationBar";
import Link from "next/link";
import Head from 'next/head';


const Login: React.FC<{}> = () => (
    <Container centerContent h="calc(100vh - 5.5rem - 6.9rem)">
        <Head>
            <title>Masuk</title>
            <meta
                name="description"
                content="Cari Dosen is application that can helps you rate universities, professor, and courses"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
            <VStack position="relative" h="full" justify="center" maxW="sm">
                <Text fontWeight="semibold" pb={6} align="center" fontSize="2xl">
                    Masuk sebagai mahasiswa
                </Text>
                <LoginForm/>
                <Text align="center" fontSize="sm">
                    Lupa password?{" "}
                    <Link href={'/forgot-password'}>
                        <Text as="span" color="teal.500">
                            Klik disini
                        </Text>
                    </Link>
                </Text>
            </VStack>
    </Container>
);

export default Login;

