import { dm_sans } from "@/fonts";
import { useRouter } from 'next/router';
import { Box, Container, Text, Flex, Button, HStack, Spacer } from "@chakra-ui/react"

const NavigationBar: React.FC<{}> = () => {
    const router = useRouter()
    return (
        <Container py="1.5rem" px={{ base: "0.75rem", md: "2.5rem"}} h="auto">
            <Flex align="center">
                <Text fontFamily="heading" fontSize="lg" color="biru.900" fontWeight="bold">
                    CariDosen
                </Text>
                <Spacer/>
                <HStack spacing="1rem">
                    <Button variant="secondary" onClick={() => router.push('/login')}>
                        Masuk
                    </Button>
                    <Button variant="primary" onClick={() => router.push('/register')}>
                        Daftar
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
};

export default NavigationBar;