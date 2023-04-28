import React from "react";
import {Box, Button, Container, Modal, ModalContent, ModalOverlay, Show, Text, VStack} from "@chakra-ui/react";
import {Card} from "@chakra-ui/card";
import Image from "next/image";
import Link from "next/link";

export interface ConfirmRegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const ConfirmRegisterModal: React.FC<ConfirmRegisterModalProps> = ({isOpen, onClose}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <Card w={{sm:"15rem" , md:"37rem"}} h={{sm:"27rem" , md:"27rem"}}>
                    <VStack px={8}>
                        <Box pt={8}>
                            <Show above={"md"}>
                                <Image src={"/ic-mail-sent.svg"} alt={"decorative image"} width={200} height={200}/>
                            </Show>
                            <Show below={"md"}>
                                <Image src={"/ic-mail-sent.svg"} alt={"decorative image"} width={100} height={100}/>
                            </Show>
                        </Box>
                        <Text fontSize={{sm:"xl" , md:"2xl"}} fontWeight="bold" color={"biru.800"}>
                            Terima kasih telah mendaftar!
                        </Text>
                        <Text align={"center"} fontSize={"sm"}>
                            Kami telah mengirimkan email konfirmasi untuk mengaktifkan akun kamu.
                        </Text>
                        <Box pt={4} pb={4}>
                            <Link href={"/"}>
                                <Button size={"lg"} colorScheme={"biru"}>
                                    Kembali ke Beranda
                                </Button>
                            </Link>
                        </Box>
                    </VStack>
                </Card>
            </ModalContent>

        </Modal>
    );
};

export default ConfirmRegisterModal;