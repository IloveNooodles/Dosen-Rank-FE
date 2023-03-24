import { Container, VStack, Text, CheckboxGroup, Checkbox, Input, HStack, Button, Textarea, Flex, Spacer, Modal, ModalOverlay, ModalContent, useDisclosure } from "@chakra-ui/react";
import React from "react";
import StarRating from "react-svg-star-rating";
import styles from "@/styles/ReviewCard.module.scss";
import { SelectOption, Tag } from "@/interfaces";
import { apiInstance } from "@/utils/apiInstance";
import dynamic from "next/dynamic";
import useSWR, { Fetcher } from 'swr';
import { useRouter } from "next/router";

const SelectInput = dynamic(() => import("../SelectInput"), { ssr: false });

const fetcher: Fetcher<Array<Tag>, string> = (url) =>
  apiInstance({}).get(url).then((res) => res.data);

function useProfessors(profId: number) {
  const { data, error } = useSWR(`/professor/course?id=${profId}`, fetcher);
  
  return {
    tags: data,
    isLoading: !error && !data,
    isError: error
  };
};

function useCourses(courseId: number) {
  const { data, error } = useSWR(`/courses/professor?id=${courseId}`, fetcher);

  return {
    tags: data,
    isLoading: !error && !data,
    isError: error
  };
}

export interface ReviewModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

    reviewFor: 'university' | 'course' | 'courses' | 'dosen';
    firstFieldName?: string;
    secondFieldName?: string;
    thirdFieldName?: string;
    fourthFieldName?: string;
    firstFieldRating?: number;
    secondFieldRating?: number;
    thirdFieldRating?: number;
    fourthFieldRating?: number;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
    isOpen,
    onOpen,
    onClose,

    reviewFor,
    firstFieldName,
    secondFieldName,
    thirdFieldName,
    fourthFieldName,
}) => {
    const [count, setCount] = React.useState(0);
    const [data, setData] = React.useState({
        tagId: null,
        firstFieldRating: 0,
        secondFieldRating: 0,
        thirdFieldRating: 0,
        fourthFieldRating: 0,
        detail: "",
    });

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

    // const { name } = useRouter().query;
    const { tags } = useCourses(2);
    // map tags to SelectOption
    const tagOption: SelectOption[] = tags?.map((tag) => ({
        value: tag.id.toString(),
        label: tag.name,
    })) || [];
    

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
            <ModalOverlay />
            <ModalContent borderRadius="12rem">
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
                                        options={tagOption} />
                                    <HStack>
                                        <Text>Tidak menemukan mata kuliah?</Text>
                                        <Text>Request mata kuliah</Text>
                                    </HStack>
                                </VStack>
                            </Flex>                 
                        ) : null}
                        {reviewFor.includes("courses") ? (
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
                                        options={tagOption} />
                                    <HStack>
                                        <Text>Tidak menemukan dosen?</Text>
                                        <Text>Request dosen</Text>
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
                            <HStack>
                                <VStack>
                                    <HStack>
                                        <Text>Param 1</Text>
                                        <StarRating unit="half" handleOnClick={handleOnClick1} size={25} containerClassName={styles.star} />
                                        <Text>{firstFieldRating}</Text>
                                    </HStack>
                                    <HStack>
                                        <Text>Param 2</Text>
                                        <StarRating unit="half" handleOnClick={handleOnClick2} size={25} containerClassName={styles.star} />
                                        <Text>{secondFieldRating}</Text>
                                    </HStack>
                                </VStack>
                                <Spacer/>
                                <VStack>
                                    <HStack>
                                        <Text>Param 3</Text>
                                        <StarRating unit="half" handleOnClick={handleOnClick3} size={25} containerClassName={styles.star} />
                                        <Text>{thirdFieldRating}</Text>
                                    </HStack>
                                    <HStack>
                                        <Text>Param 4</Text>
                                        <StarRating unit="half" handleOnClick={handleOnClick4} size={25} containerClassName={styles.star} />
                                        <Text>{fourthFieldRating}</Text>
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
            </ModalContent>
        </Modal>
    )
};

export default ReviewModal;