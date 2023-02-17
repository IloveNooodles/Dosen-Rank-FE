import { Container, VStack, Text } from "@chakra-ui/react";
import RegisterForm from "@/components/RegisterForm";
import { RegisterProps } from "@/interfaces";
import { apiInstance } from "@/utils/apiInstance";

export async function getStaticProps() {
  const response = await apiInstance({}).get('/univ')
  const universities = response.data.data

  return {
    props: {
      universities
    }
  }
}

const Register: React.FC<RegisterProps> = ({universities}) => (
  <Container centerContent>
    <VStack h="full" justify="center" maxW="sm">
      <Text fontWeight="semibold" pb={6} align="center" fontSize="2xl">
        Buat akun sebagai mahasiswa
      </Text>
      <RegisterForm universities={universities}/>
    </VStack>
  </Container>
);

export default Register;
