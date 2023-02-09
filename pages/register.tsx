import { Container, VStack, Text, Input, Button, Flex } from "@chakra-ui/react";

const Register: React.FC<{}> = () => (
  <Container maxW="container.xl" h="100vh" centerContent>
    <VStack
      h="full"
      justify="center"
      maxW="sm"
    >
      <Text fontWeight="semibold" pb={6} align="center" fontSize="2xl">Buat akun sebagai mahasiswa</Text>
      <VStack px={12} spacing={6}>
        <Input placeholder="Nama" />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button colorScheme="teal" w="full">Daftar</Button>
        <Text fontSize="sm" align="center">
          Dengan mengklik daftar, kamu menyetujui Persyaratan dan Ketentuan
          Penggunaan CariDosen.
        </Text>
        <Text>Sudah punya akun?<Text as="span" color="biru.2">masuk</Text> </Text>
      </VStack>
    </VStack>
  </Container>
);

export default Register;
