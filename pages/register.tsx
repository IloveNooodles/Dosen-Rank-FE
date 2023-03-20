import RegisterForm from '@/components/RegisterForm';
import { RegisterProps } from '@/interfaces';
import { apiInstance } from '@/utils/apiInstance';
import { Container, Text, VStack } from '@chakra-ui/react';

export async function getStaticProps() {
  const response = await apiInstance({})
    .get('/univ')
    .catch((err) => console.log(err));
  const universities = response!.data.data || [];

  return {
    props: {
      universities,
    },
  };
}

const Register: React.FC<RegisterProps> = ({ universities }) => (
  <Container centerContent h="calc(100vh - 5.5rem - 6.9rem)">
    <VStack position="relative" h="full" justify="center" maxW="sm">
      <Text fontWeight="semibold" pb={6} align="center" fontSize="2xl">
        Buat akun sebagai mahasiswa
      </Text>
      <RegisterForm universities={universities} />
    </VStack>
  </Container>
);

export default Register;
