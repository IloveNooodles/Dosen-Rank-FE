import "@/styles/globals.scss";
import { ChakraProvider, Container, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "@/styles/theme";
import { AuthProvider } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import NavigationBar from "@/components/NavigationBar";
import Wrapper from "@/components/Wrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Container>
          <Wrapper>
            <NavigationBar />
            <Flex position="relative" direction="column" alignItems="center">
              <Component {...pageProps} />
            </Flex>
            <Footer />
          </Wrapper>
        </Container>
      </AuthProvider>
    </ChakraProvider>
  );
}
