import { Container, VStack, Text, Input, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";

const Register: React.FC<{}> = () => (
  <Container centerContent>
    <VStack h="full" justify="center" maxW="sm">
      <Text fontWeight="semibold" pb={6} align="center" fontSize="2xl">
        Buat akun sebagai mahasiswa
      </Text>
      <VStack px={12} spacing={6}>
        <Input placeholder="Nama" />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button colorScheme="biru" w="full">
          Daftar
        </Button>
        <Text fontSize="sm" align="center">
          Dengan mengklik daftar, kamu menyetujui Persyaratan dan Ketentuan
          Penggunaan CariDosen.
        </Text>
        <Text>
          Sudah punya akun?{" "}
          <Link href="/login">
            <Text as="span" color="biru.600" fontWeight="bold">
              masuk
            </Text>
          </Link>{" "}
        </Text>
      </VStack>
    </VStack>
  </Container>
);

export default Register;
