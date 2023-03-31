import React from "react";
import {Box, Button, Container, Modal, ModalContent, ModalOverlay, Text, VStack} from "@chakra-ui/react";
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
                <Card w={"37rem"} h={"27rem"}>
                    <VStack px={8}>
                        <Box pt={8}>
                            <Image src={"/ic-mail-sent.svg"} alt={"decorative image"} width={200} height={200}/>
                        </Box>
                        <Text fontSize="2xl" fontWeight="bold" color={"biru.800"}>
                            Terima kasih telah mendaftar!
                        </Text>
                        <Text align={"center"} fontSize={"sm"}>
                            Kami telah mengirimkan email konfirmasi ke [email] untuk mengaktifkan akun kamu.
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