import { dm_sans } from "@/fonts";
import { useRouter } from 'next/router';
import { Box, Container, Text, Flex, Button, HStack, Spacer } from "@chakra-ui/react"
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from "@/contexts/AuthContext";

const NavigationBar: React.FC<{}> = () => {
    const router = useRouter()
    const {getUser, isAuthenticated, signOut} = useAuth()
    const user = getUser()

    return (
        <Container py="1.5rem" px={{ base: "0.75rem", md: "2.5rem"}} h="auto">
            <Flex align="center">
                <Button color="biru.900" fontSize="lg" fontFamily="heading" variant="text" onClick={() => router.push('/')}>
                    CariDosen
                </Button>
                <Spacer/>
                <HStack spacing="1rem">
                    {isAuthenticated() ? <Text fontWeight="regular" fontSize="16px">Halo, {user.name}!</Text> : null}
                    {router.pathname === '/' && !isAuthenticated() ? <Button variant="secondary" onClick={() => router.push('/login')}>
                        Masuk
                    </Button> : null }
                    {router.pathname === '/' && !isAuthenticated() ? <Button variant="primary" onClick={() => router.push('/register')}>
                        Daftar
                    </Button> : null }
                    {isAuthenticated() ? <Button leftIcon={<FiLogOut />} variant="text" fontWeight="normal" fontSize="16px" color={"red.500"} _hover={{color: "red.700"}} onClick={() => signOut()}>
                        Keluar
                    </Button> : null}
                </HStack>
            </Flex>
        </Container>
    )
};

export default NavigationBar;