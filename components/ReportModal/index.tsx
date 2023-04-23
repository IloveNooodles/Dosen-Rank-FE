import { Report } from "@/interfaces";
import { apiInstance } from "@/utils/apiInstance";
import { VStack, Text, HStack, Button, Textarea, Flex, Spacer, Modal, ModalOverlay, ModalContent, useToast, Radio, RadioGroup } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import React from "react";

export interface ReportModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

    reportedId: number;
    reportFor: string;
}

const ReportModal: React.FC<ReportModalProps> = ({isOpen, onOpen, onClose, reportedId, reportFor}) => {
    const [count, setCount] = React.useState(0);
    const [details, setDetails] = React.useState("");
    const [value, setValue] = React.useState('0');
    const initialValues: Report = {
        reportType: "",
        reportedId: 0,
        tag: 0,
    };
    const toast = useToast();

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius={"12rem"}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={async () => {
                        try {
                            const data = JSON.stringify({
                                report_type: reportFor,
                                reported_id: reportedId,
                                content: details,
                                tag: parseInt(value),
                            });
                            const response = await apiInstance({isAuthorized: true}).post(`/reports/`, data);
                            if (response.status >= 200 && response.status < 300) {
                                toast({
                                  title: 'Report berhasil dikirim',
                                  status: 'success',
                                  duration: 3000,
                                  position: 'top',
                                })
                            }
                        } catch (error) {
                            if (axios.isAxiosError(error)) {
                                toast({
                                  title: 'Report gagal dikirim',
                                  status: 'error',
                                  duration: 3000,
                                  position: 'top'
                                })
                            } 
                        }
                    }}>
                    <Form>
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
                                    <RadioGroup onChange={setValue} value={value}>
                                        <VStack alignItems={"start"}>
                                            <Radio value='1'>
                                                <Text fontSize={{ base: '0.8rem', md: '1rem'}}>Konten tidak sesuai</Text>
                                            </Radio>
                                            <Radio value='2'>
                                                <Text fontSize={{ base: '0.8rem', md: '1rem'}}>Konten mengandung kekerasan atau perundungan</Text>
                                            </Radio>
                                            <Radio value='3'>
                                                <Text fontSize={{ base: '0.8rem', md: '1rem'}}>Konten melanggar hak cipta</Text>
                                            </Radio>
                                            <Radio value='4'>
                                                <Text fontSize={{ base: '0.8rem', md: '1rem'}}>Konten mengandung kata kasar</Text>
                                            </Radio>
                                            <Radio value='5'>
                                                <Text fontSize={{ base: '0.8rem', md: '1rem'}}>Lainnya</Text>
                                            </Radio>
                                        </VStack>
                                    </RadioGroup>
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
                                        id="details"
                                        name="details"
                                        placeholder="Halaman ini memiliki..."
                                        resize="none"
                                        maxLength={300}
                                        fontSize={{ base: '0.75rem', md: '0.9rem'}}
                                        onChange={e => {
                                            setCount(e.target.value.length)
                                            setDetails(e.target.value) }}/>
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
                                    <Button onClick={onClose} variant="angry" type="submit" width="full">
                                        Laporkan
                                    </Button>
                                </HStack>
                            </VStack>
                        </VStack>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    )
};

export default ReportModal;