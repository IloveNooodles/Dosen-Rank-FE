import { dm_sans } from "@/fonts";
import { useRouter } from 'next/router';
import { Box, Container, Text, Flex, Button, HStack, Spacer } from "@chakra-ui/react"
import { useAuth } from "@/contexts/AuthContext";

const NavigationBar: React.FC<{}> = () => {
    const router = useRouter()
    const {getUser, isAuthenticated, signOut} = useAuth()
    const user = getUser()

    return (
        <Container py="1.5rem" px={{ base: "0.75rem", md: "2.5rem"}} h="auto">
            <Flex align="center">
                <Text fontFamily="heading" fontSize="lg" color="biru.900" fontWeight="bold">
                    CariDosen
                </Text>
                <Spacer/>
                <HStack spacing="1rem">
                    {isAuthenticated() ? <Text>Halo {user.name}</Text> : null}
                    {router.pathname === '/login' || isAuthenticated() ? null : <Button variant="secondary" onClick={() => router.push('/login')}>
                        Masuk
                    </Button>}
                    {router.pathname === '/register' || isAuthenticated() ? null : <Button variant="primary" onClick={() => router.push('/register')}>
                        Daftar
                    </Button>}
                    {isAuthenticated() ? <Button variant="secondary" onClick={() => signOut()}>
                        Keluar
                    </Button> : null}
                </HStack>
            </Flex>
        </Container>
    )
};

export default NavigationBar;