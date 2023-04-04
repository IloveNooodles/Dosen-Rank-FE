import Footer from "@/components/Footer";
import NavigationBar from "@/components/NavigationBar";
import Wrapper from "@/components/Wrapper";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.scss";
import theme from "@/styles/theme";
import { ChakraProvider, Container, createStandaloneToast, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.css';


const { ToastContainer, toast } = createStandaloneToast()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Cari Dosen</title>
        <meta
          name="description"
          content="Cari Dosen is application that can helps you rate universities, professor, and courses"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <Container>
          <Wrapper>
          <ToastContainer />
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
