import { Container, VStack, Text, CheckboxGroup, Checkbox, Input, HStack, Button, Textarea, Flex, Spacer, Modal, ModalOverlay, ModalContent, useDisclosure } from "@chakra-ui/react";
import React from "react";

export interface ReportModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({isOpen, onOpen, onClose}) => {
    const [count, setCount] = React.useState(0);
    const [data, setData] = React.useState({
        inappropriateContent: false,
        violenceOrAbuse: false,
        copyright: false,
        harshWord: false,
        other: false,
        detail: "",
    });
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <VStack
                    backgroundColor={"white"}
                    borderRadius={14}
                    padding={8}>
                    <Text
                        fontSize={{ base: '1rem', md: '1.3rem'}}
                        fontFamily="heading"
                        fontWeight="bold"
                        color="biru.900">
                            Laporkan
                    </Text>
                    <VStack
                        width="full">
                        <VStack align="left"
                            width="full">
                            <Text
                                fontSize={{ base: '0.8rem', md: '1rem'}}
                                fontWeight="bold">
                                    Ada isu apa?
                                </Text>
                            <CheckboxGroup>
                                <Checkbox onChange={ 
                                    (e) => setData(
                                        prevState => 
                                        ({...prevState, 
                                        inappropriateContent: e.target.checked})
                                        )}>
                                    <Text fontSize={{ base: '0.8rem', md: '1rem'}}>Konten tidak sesuai</Text>
                                </Checkbox>
                                <Checkbox onChange={ 
                                    (e) => setData(
                                        prevState => 
                                        ({...prevState, 
                                        violenceOrAbuse: e.target.checked})
                                        )}>
                                    <Text fontSize={{ base: '0.8rem', md: '1rem'}}>Konten mengandung kekerasan atau perundungan</Text>
                                </Checkbox>
                                <Checkbox onChange={ 
                                    (e) => setData(
                                        prevState => 
                                        ({...prevState, 
                                        copyright: e.target.checked})
                                        )}>
                                    <Text fontSize={{ base: '0.8rem', md: '1rem'}}>Konten melanggar hak cipta</Text>
                                </Checkbox>
                                <Checkbox onChange={ 
                                    (e) => setData(
                                        prevState => 
                                        ({...prevState, 
                                        harshWord: e.target.checked})
                                        )}>
                                    <Text fontSize={{ base: '0.8rem', md: '1rem'}}>Konten mengandung kata kasar</Text>
                                </Checkbox>
                                <Checkbox onChange={ 
                                    (e) => setData(
                                        prevState => 
                                        ({...prevState, 
                                        other: e.target.checked})
                                        )}>
                                    <Text fontSize={{ base: '0.8rem', md: '1rem'}}>Lainnya</Text>
                                </Checkbox>
                            </CheckboxGroup>
                        </VStack>
                        <Spacer/>
                        <VStack
                            width="full">
                            <Text
                                width="full"
                                align="left"
                                fontSize={{ base: '0.8rem', md: '1rem'}}
                                fontWeight="bold">
                                    Silakan berikan informasi lebih detail dan hal yang dapat kami perbaiki!
                                </Text>
                            <Textarea
                                id="reportTextArea"
                                placeholder="Halaman ini memiliki..."
                                resize="none"
                                maxLength={300}
                                fontSize={{ base: '0.75rem', md: '0.9rem'}}
                                onChange={e => {
                                    setCount(e.target.value.length)
                                    setData(
                                        prevState => 
                                        ({...prevState, 
                                        detail: e.target.value})
                                        )}} />
                            <Text
                                width="full"
                                fontSize={{ base: '0.6rem', md: '0.8rem'}}
                                align="right">
                                { count }/300
                            </Text>
                        </VStack>
                        <Spacer/>
                        <HStack width="full">
                            <Button onClick={onClose} variant="secondary" width="full">
                                Batal
                            </Button>
                            <Button variant="angry" width="full">
                                Laporkan
                            </Button>
                        </HStack>
                    </VStack>
                </VStack>
            </ModalContent>
        </Modal>
    )
};

export default ReportModal;