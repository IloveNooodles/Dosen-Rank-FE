import { Container, VStack, Text } from "@chakra-ui/react";
import LoginForm from "@/components/LoginForm";
import Wrapper from "@/components/Wrapper";
import NavigationBar from "@/components/NavigationBar";
import Link from "next/link";

const Login: React.FC<{}> = () => (
    <Container centerContent h="calc(100vh - 5.5rem - 6.9rem)">
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

