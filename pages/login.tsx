import { Container, VStack, Text } from "@chakra-ui/react";
import LoginForm from "@/components/LoginForm";
import Wrapper from "@/components/Wrapper";
import NavigationBar from "@/components/NavigationBar";

const Login: React.FC<{}> = () => (
    <Container centerContent>
        <Wrapper>
        <NavigationBar/>
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

