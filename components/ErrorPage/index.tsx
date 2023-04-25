import { Center, HStack, VStack, Text, Spacer, Image, Button, Show, Hide } from "@chakra-ui/react";
import router from "next/router";

const ErrorPage = () => {
  return (
    <Center minH="fit-content" h="calc(100vh - 5.5rem - 6.9rem)">
      <HStack w={"full"}>
          <VStack align={"left"} gap={4} w="70vh">
              <VStack align="left" gap={1}>
                  <Text fontSize="2xl" fontWeight="bold" color={"biru.800"}>Sorry, unexpected error</Text>
                  <Text>We are working on fixing the problem, be back soon</Text>
                  {/* <Text color={"red.700"}>{errorMessage}</Text> */}
              </VStack>
              <Button variant={"primary"} w="fit-content" onClick={() => router.push('/')}>Kembali</Button>
          </VStack>
          <Show above="md">
            <Spacer />
            <Image src="/error.svg" alt="Decoration" w="16rem" pointerEvents="none" userSelect="none" />
          </Show>
      </HStack>
    </Center>
  )
};

export default ErrorPage;
