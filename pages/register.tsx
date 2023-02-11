import { Container, VStack, Text } from "@chakra-ui/react";
import RegisterForm from "@/components/RegisterForm";

const Register: React.FC<{}> = () => (
  <Container centerContent>
    <VStack h="full" justify="center" maxW="sm">
      <Text fontWeight="semibold" pb={6} align="center" fontSize="2xl">
        Buat akun sebagai mahasiswa
      </Text>
      <RegisterForm/>
    </VStack>
  </Container>
);

export default Register;
