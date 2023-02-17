import { Container, VStack, Text } from "@chakra-ui/react";
import LoginForm from "@/components/LoginForm";
import Wrapper from "@/components/Wrapper";

const Login: React.FC<{}> = () => (
    <Container centerContent>
        <Wrapper>
            <VStack position="relative" h="full" justify="center" maxW="sm">
                <Text fontWeight="semibold" pb={6} align="center" fontSize="2xl">
                    Masuk sebagai mahasiswa
                </Text>
                <LoginForm/>
            </VStack>
        </Wrapper>
    </Container>
);

export default Login;

