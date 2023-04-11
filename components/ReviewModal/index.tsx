import { VStack, Text, HStack, Button, Textarea, Flex, Spacer, Modal, ModalOverlay, ModalContent, useToast, Link } from "@chakra-ui/react";
import React from "react";
import StarRating from "react-svg-star-rating";
import styles from "@/styles/ReviewCard.module.scss";
import { ProfessorResponse, SelectOption, Tag, Response, CourseResponse, NewReview } from "@/interfaces";
import { apiInstance } from "@/utils/apiInstance";
import dynamic from "next/dynamic";
import useSWR, { Fetcher, useSWRConfig } from 'swr';
import { Form, Formik } from "formik";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";


const SelectInput = dynamic(() => import("../SelectInput"), { ssr: false });

const fetcher: Fetcher<Response<ProfessorResponse[] | CourseResponse[]>, string> = (url) =>
  apiInstance({isAuthorized: true}).get(url).then((res) => res.data);

function useProfTags(id: number, reviewFor: string) {
  const { data, isLoading, error } = useSWR((reviewFor === 'course' && id) ? `/professor/course?id=${id}` : null , fetcher);
  
  return {
    tags: data?.data,
    isLoading: isLoading,
    isError: error
  };
};

function useCourseTags(id: number, reviewFor: string) {
    const { data, isLoading, error } = useSWR((reviewFor === 'dosen' && id) ? `/courses/professor?id=${id}` : null , fetcher);
    
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
    slug?: string;
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
    slug = '',
    reviewFor,
}) => {
    const { getUser } = useAuth();
    const user = getUser();
    const userId = user?.id;

    const toast = useToast();
    const [count, setCount] = React.useState(0);
    const [details, setDetails] = React.useState("");

    const { mutate } = useSWRConfig();

    const initialValues: NewReview = {
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

    const { tags: profTags, isLoading: isLoadingProf, isError: isErrorProf } = useProfTags(id, reviewFor);
    const { tags: courseTags, isLoading: isLoadingCourse, isError: isErrorCourse } = useCourseTags(id, reviewFor);
    
    const profTagOption: Array<SelectOption> | undefined = profTags?.map(
        ({ id, name }) => ({ value: id.toString(), label: name })
    );
    const courseTagOption: Array<SelectOption> | undefined = courseTags?.map(
        ({ id, name }) => ({ value: id.toString(), label: name })
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
            <ModalOverlay />
            <ModalContent borderRadius="12rem">
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values) => {
                        try {
                            if (reviewFor === "university") {
                                const data = JSON.stringify({
                                    creator_id: userId,
                                    univ_id: id,
                                    content: details,
                                    rating: {
                                        reputasi_akademik: firstFieldRating,
                                        lingkungan: secondFieldRating,
                                        kemahasiswaan: thirdFieldRating,
                                        fasilitas: fourthFieldRating,
                                    },
                                });
                                const response = await apiInstance({isAuthorized: true}).post(`/reviews/univ/`, data);
                                if (response.status >= 200 && response.status < 300) {
                                    toast({
                                      title: 'Review berhasil ditambahkan',
                                      status: 'success',
                                      duration: 3000,
                                      position: 'top',
                                    })
                                    mutate(`/reviews/univ/slug?slug=${slug}`);
                                    mutate(`/reviews/univ/overall/${id}`);
                                }
                            } else if (reviewFor === "course") {
                                const data = JSON.stringify({
                                    creator_id: userId,
                                    professor_id: parseInt(values.tag),
                                    course_id: id,
                                    content: details,
                                    rating: {
                                        kesesuaian_sks: firstFieldRating,
                                        kompetensi: secondFieldRating,
                                        kesulitan: thirdFieldRating,
                                        sumber_belajar: fourthFieldRating,
                                    },
                                });
                                const response = await apiInstance({isAuthorized: true}).post(`/reviews/course/`, data);
                                if (response.status >= 200 && response.status < 300) {
                                    toast({
                                      title: 'Review berhasil ditambahkan',
                                      status: 'success',
                                      duration: 3000,
                                      position: 'top',
                                    })
                                }
                            } else if (reviewFor === "dosen") {
                                const data = JSON.stringify({
                                    creator_id: userId,
                                    professor_id: id,
                                    course_id: parseInt(values.tag),
                                    content: details,
                                    rating: {
                                        gaya_mengajar: firstFieldRating,
                                        konten: secondFieldRating,
                                        komunikasi: thirdFieldRating,
                                        transparansi: fourthFieldRating,
                                    },
                                });
                                const response = await apiInstance({isAuthorized: true}).post(`/reviews/professor/`, data);
                                if (response.status >= 200 && response.status < 300) {
                                    toast({
                                      title: 'Review berhasil ditambahkan',
                                      status: 'success',
                                      duration: 3000,
                                      position: 'top',
                                    })
                                    mutate(`/reviews/professor/slug?slug=${slug}`);
                                    mutate(`/reviews/professor/overall/${id}`);
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
                                                id="tag" 
                                                name="tag" 
                                                placeholder="Pilih mata kuliah"
                                                options={profTagOption || courseTagOption || []} />
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
                                                id="tag" 
                                                name="tag" 
                                                placeholder="Pilih dosen"
                                                options={profTagOption || courseTagOption || []} />
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
                                        id="details"
                                        name="details"
                                        placeholder="Menurut saya..."
                                        resize="none"
                                        maxLength={500}
                                        height="10rem"
                                        fontSize={{ base: '0.75rem', md: '0.9rem'}}
                                        onChange={e => {
                                            setDetails(e.target.value)
                                            setCount(e.target.value.length) }}
                                    />
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
                                    <Button onClick={onClose} type="submit" variant="primary" width="full">
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