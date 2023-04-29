import RegisterForm from "@/components/RegisterForm";
import {RegisterProps} from "@/interfaces";
import {apiInstance} from "@/utils/apiInstance";
import {Container, Text, VStack, useDisclosure} from "@chakra-ui/react";
import ConfirmRegisterModal from "@/components/ConfirmRegisterModal";
import {useState} from "react";
import Head from 'next/head';


export async function getStaticProps() {
    const response = await apiInstance({})
        .get("/univ")
        .catch((err) => console.error(err));
    const universities = response!.data.data || [];

    return {
        props: {
            universities,
        },
    };
}

const Register: React.FC<RegisterProps> = ({universities}) => {
    const {onOpen, isOpen, onClose} = useDisclosure();
    const [isSuccess, setIsSuccess] = useState(false);
    return (
        <>
            <Head>
                <title>Daftar</title>
                <meta
                    name="description"
                    content="Cari Dosen is application that can helps you rate universities, professor, and courses"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <ConfirmRegisterModal isOpen={isOpen && isSuccess} onClose={onClose}/>
            <Container centerContent h="calc(100vh - 5.5rem - 6.9rem)">
                <VStack position="relative" h="full" justify="center" maxW="sm">
                    <Text fontWeight="semibold" pb={6} align="center" fontSize="2xl">
                        Buat akun sebagai mahasiswa
                    </Text>
                    <RegisterForm universities={universities} setSuccess={setIsSuccess} onClick={onOpen}/>
                </VStack>
            </Container>
        </>
    );
};

export default Register;
