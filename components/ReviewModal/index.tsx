import { VStack, Text, HStack, Button, Textarea, Flex, Spacer, Modal, ModalOverlay, ModalContent, useToast, useDisclosure, Link } from "@chakra-ui/react";
import React from "react";
import StarRating from "react-svg-star-rating";
import styles from "@/styles/ReviewCard.module.scss";
import { ProfessorResponse, SelectOption, Tag, Response, CourseResponse, Review } from "@/interfaces";
import { apiInstance } from "@/utils/apiInstance";
import dynamic from "next/dynamic";
import useSWR, { Fetcher } from 'swr';
import router, { useRouter } from "next/router";
import { Form, Formik } from "formik";
import axios from "axios";

const SelectInput = dynamic(() => import("../SelectInput"), { ssr: false });

const fetcher: Fetcher<Response<ProfessorResponse[] | CourseResponse[]>, string> = (url) =>
  apiInstance({}).get(url).then((res) => res.data);

function useTags(id: number, reviewFor: string) {
  const { data, isLoading, error } = useSWR((reviewFor === 'courses') ? `/professor/course?id=${id}` : `/courses/professor?id=${id}` , fetcher);
  
  return {
    tags: data?.data,
    isLoading: isLoading,
    isError: error
  };
};

export interface ReviewModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    id: number;

    reviewFor: 'university' | 'course' | 'dosen';
    firstFieldRating?: number;
    secondFieldRating?: number;
    thirdFieldRating?: number;
    fourthFieldRating?: number;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
    isOpen,
    onOpen,
    onClose,
    id,

    reviewFor,
}) => {
    const toast = useToast();
    const [count, setCount] = React.useState(0);
    const [data, setData] = React.useState({
        tagId: null,
        firstFieldRating: 0,
        secondFieldRating: 0,
        thirdFieldRating: 0,
        fourthFieldRating: 0,
        detail: "",
    });

    const initialValues: Review = {
        tag: "",
        firstFieldRating: 0,
        secondFieldRating: 0,
        thirdFieldRating: 0,
        fourthFieldRating: 0,
        details: "",
    };

    const [firstFieldRating, setFirstFieldRating] = React.useState(0);
    const handleOnClick1 = (firstFieldRating: number) => {
        setFirstFieldRating(firstFieldRating);
    };
    const [secondFieldRating, setSecondFieldRating] = React.useState(0);
    const handleOnClick2 = (secondFieldRating: number) => {
        setSecondFieldRating(secondFieldRating);
    };
    const [thirdFieldRating, setThirdFieldRating] = React.useState(0);
    const handleOnClick3 = (thirdFieldRating: number) => {
        setThirdFieldRating(thirdFieldRating);
    };
    const [fourthFieldRating, setFourthFieldRating] = React.useState(0);
    const handleOnClick4 = (fourthFieldRating: number) => {
        setFourthFieldRating(fourthFieldRating);
    };

    const { tags, isLoading, isError } = useTags(id, reviewFor);
    if (isLoading) {
        return <div>Loading...</div>;
    } 
    const tagOption: Array<SelectOption> | undefined = tags?.map(
        ({ id, name }) => ({ value: id.toString(), label: name })
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
            <ModalOverlay />
            <ModalContent borderRadius="12rem">
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values) => {
                        const data = JSON.stringify({
                            tag: values.tag,
                            firstFieldRating: values.firstFieldRating,
                            secondFieldRating: values.secondFieldRating,
                            thirdFieldRating: values.thirdFieldRating,
                            fourthFieldRating: values.fourthFieldRating,
                            details: values.details,
                        });

                        try {
                            if (reviewFor === "university") {
                                const response = await apiInstance({}).post(`/reviews/univ`, data);
                                if (response.status === 201) {
                                    toast({
                                      title: 'Review berhasil ditambahkan',
                                      status: 'success',
                                      duration: 3000,
                                      position: 'top',
                                    })
                                }
                            } else if (reviewFor === "course") {
                                const response = await apiInstance({}).post(`/reviews/course`, data);
                                if (response.status === 201) {
                                    toast({
                                      title: 'Review berhasil ditambahkan',
                                      status: 'success',
                                      duration: 3000,
                                      position: 'top',
                                    })
                                }
                            } else if (reviewFor === "dosen") {
                                const response = await apiInstance({}).post(`/reviews/professor`, data);
                                if (response.status === 201) {
                                    toast({
                                      title: 'Review berhasil ditambahkan',
                                      status: 'success',
                                      duration: 3000,
                                      position: 'top',
                                    })
                                }
                            }
                        } catch (error) {
                            if (axios.isAxiosError(error)) {
                                toast({
                                  title: 'Review gagal ditambahkan',
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
                                    Tulis ulasanmu!
                            </Text>
                            <Spacer/>
                            <VStack
                                width="full"
                                gap={1}>
                                {reviewFor.includes("dosen") ? (
                                    <Flex dir="row" width="full" alignItems="center">
                                        <Text
                                            fontSize={{ base: '0.8rem', md: '1rem'}}
                                            fontWeight="bold">
                                                Mata Kuliah
                                        </Text> 
                                        <Spacer/>
                                        <VStack>
                                            <SelectInput
                                                id="course" 
                                                name="course" 
                                                placeholder="Pilih mata kuliah"
                                                options={tagOption || []} />
                                            <HStack>
                                                <Text fontSize={"sm"}>Tidak menemukan mata kuliah?</Text>
                                                <Link href='/request' fontSize={"sm"} fontWeight="bold" color={"biru.700"}>Request mata kuliah</Link>
                                            </HStack>
                                        </VStack>
                                    </Flex>                 
                                ) : null}
                                {reviewFor.includes("course") ? (
                                    <Flex dir="row" width="full" alignItems="center">
                                        <Text
                                            fontSize={{ base: '0.8rem', md: '1rem'}}
                                            fontWeight="bold">
                                                Dosen
                                        </Text> 
                                        <Spacer/>
                                        <VStack>
                                            <SelectInput
                                                id="dosen" 
                                                name="dosen" 
                                                placeholder="Pilih dosen"
                                                options={tagOption || []} />
                                            <HStack>
                                                <Text fontSize={"sm"}>Tidak menemukan dosen?</Text>
                                                <Link href='/request' fontSize={"sm"} fontWeight="bold" color={"biru.700"}>Request dosen</Link>
                                            </HStack>
                                        </VStack>
                                    </Flex>                 
                                ) : null}
                                <Spacer/>
                                <VStack align="left"
                                    width="full">
                                    <Text
                                        fontSize={{ base: '0.8rem', md: '1rem'}}
                                        fontWeight="bold">
                                            Parameter
                                    </Text>
                                    <HStack fontSize={"sm"}>
                                        <VStack alignItems={"left"}>
                                            <HStack>
                                                {reviewFor.includes("dosen") ? (
                                                    <Text>Gaya mengajar</Text>
                                                ): null}
                                                {reviewFor.includes("course") ? (
                                                    <Text>Kesesuaian dengan SKS</Text>
                                                ): null}
                                                {reviewFor.includes("university") ? (
                                                    <Text>Reputasi akademik</Text>
                                                ): null}
                                                <Spacer/>
                                                <StarRating unit="half" handleOnClick={handleOnClick1} size={25} containerClassName={styles.star} />
                                                <Text w="1.5rem">{firstFieldRating}</Text>
                                            </HStack>
                                            <HStack>
                                                {reviewFor.includes("dosen") ? (
                                                    <Text>Konten pengajar</Text>
                                                ): null}
                                                {reviewFor.includes("course") ? (
                                                    <Text>Kompetensi yang didapat</Text>
                                                ): null}
                                                {reviewFor.includes("university") ? (
                                                    <Text>Lingkungan</Text>
                                                ): null}
                                                <Spacer/>
                                                <StarRating unit="half" handleOnClick={handleOnClick2} size={25} containerClassName={styles.star} />
                                                <Text w="1.5rem">{secondFieldRating}</Text>
                                            </HStack>
                                        </VStack>
                                        <Spacer/>
                                        <VStack alignItems={"left"}>
                                            <HStack>
                                                {reviewFor.includes("dosen") ? (
                                                    <Text>Komunikasi</Text>
                                                ): null}
                                                {reviewFor.includes("course") ? (
                                                    <Text>Kesulitan</Text>
                                                ): null}
                                                {reviewFor.includes("university") ? (
                                                    <Text>Kemahasiswaan</Text>
                                                ): null}
                                                <Spacer/>
                                                <StarRating unit="half" handleOnClick={handleOnClick3} size={25} containerClassName={styles.star} />
                                                <Text w="1.5rem">{thirdFieldRating}</Text>
                                            </HStack>
                                            <HStack>
                                                {reviewFor.includes("dosen") ? (
                                                    <Text>Transparansi penilaian</Text>
                                                ): null}
                                                {reviewFor.includes("course") ? (
                                                    <Text>Ketersediaan sumber belajar</Text>
                                                ): null}
                                                {reviewFor.includes("university") ? (
                                                    <Text>Fasilitas</Text>
                                                ): null}
                                                <Spacer/>
                                                <StarRating unit="half" handleOnClick={handleOnClick4} size={25} containerClassName={styles.star} />
                                                <Text w="1.5rem">{fourthFieldRating}</Text>
                                            </HStack>
                                        </VStack>
                                    </HStack>
                                </VStack>
                                <Spacer/>
                                <VStack
                                    width="full">
                                    <Text
                                        width="full"
                                        align="left"
                                        fontSize={{ base: '0.8rem', md: '1rem'}}
                                        fontWeight="bold">
                                            Silakan ulas lebih detail!
                                    </Text>
                                    <Textarea
                                        id="reviewTextArea"
                                        placeholder="Menurut saya..."
                                        resize="none"
                                        maxLength={500}
                                        height="10rem"
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
                                        { count }/500
                                    </Text>
                                </VStack>
                                <Spacer/>
                                <HStack width="full">
                                    <Button onClick={onClose} variant="secondary" width="full">
                                        Batal
                                    </Button>
                                    <Button variant="primary" width="full">
                                        Publish
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

export default ReviewModal;