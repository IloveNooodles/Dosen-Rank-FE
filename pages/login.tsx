import { Container, VStack, Text } from "@chakra-ui/react";
import LoginForm from "@/components/LoginForm";

const Login: React.FC<{}> = () => (
    <Container centerContent>
        <VStack h="full" justify="center" maxW="sm">
            <Text fontWeight="semibold" pb={6} align="center" fontSize="2xl">
                Masuk sebagai mahasiswa
            </Text>
            <LoginForm/>
        </VStack>
    </Container>
);

export default Login;

