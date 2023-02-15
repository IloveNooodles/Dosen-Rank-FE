import { Container, VStack, Text } from "@chakra-ui/react";
import RegisterForm from "@/components/RegisterForm";
import axios from "axios";
import { RegisterProps } from "@/interfaces";

export async function getStaticProps() {
  const universitiesEndpoint = process.env.NEXT_PUBLIC_BASE_URL + "/univ"
  const response = await axios.get(universitiesEndpoint);
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
