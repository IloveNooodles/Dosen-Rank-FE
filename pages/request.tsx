import { apiInstance } from "@/utils/apiInstance";
import { Center, Container, HStack, Text, VStack, Image, Spacer, Radio, RadioGroup, Input, Textarea, Button, useToast, Show, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import dynamic from "next/dynamic";
import React from "react";
import useSWR, { Fetcher } from "swr";
import { Response, SelectOption, University, FacultyMajor, Major } from "@/interfaces";
import TextInput from "../components/TextInput";
import { useRouter } from "next/router";
import LoadingAnimation from "@/components/LoadingAnimation";

const SelectInput = dynamic(() => import("../components/SelectInput"), { ssr: false });

const fetcherUniversity: Fetcher<Response<University[]>, string> = (url) =>
  apiInstance({}).get(url).then((res) => res.data);

const fetcherFacultyMajor: Fetcher<Response<FacultyMajor[]>, string> = (url) =>
  apiInstance({}).get(url).then((res) => res.data);

function useUniversities() {
  const { data, isLoading, error } = useSWR(`/univ/`, fetcherUniversity);

  return {
    universities: data?.data,
    isLoadingUniversity: isLoading,
    isErrorUniversity: error,
  };
};

function useMajor(univName: string) {
  const { data, isLoading, error } = useSWR(`/search/faculty-major/${univName}`, fetcherFacultyMajor);

  return {
    majors: data?.data.map((facultyMajor) => facultyMajor.majors),
    isLoadingMajor: isLoading,
    isErrorMajor: error,
  };
}

const Request: React.FC<{}> = () => {
  const toast = useToast();
  const router = useRouter();

  const [value, setValue] = React.useState('');
  const [sks, setSks] = React.useState(1);
  const [description, setDescription] = React.useState('');
  const initialValues = {
    requestType: "",
    title: "",
    code: "",
    institution: "",
    sks: 1,
    major: 0,
  }

  const { universities, isLoadingUniversity, isErrorUniversity } = useUniversities();
  if (isLoadingUniversity) return <LoadingAnimation/>;

  const universityOption: Array<SelectOption> | undefined = universities?.map(
    ({ id, name }) => ({ label: name, value: id.toString() })
  );

  return (
    <Container>
      <Center minH="calc(100vh - 5.5rem - 6.9rem)">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            try {
              const data = JSON.stringify({
                request_type: value,
                title: values.title,
                content: {
                  description: description,
                  code: values.code,
                  institution: parseInt(values.institution),
                  sks: sks,
                  major: 0,
                },
              });
              const response = await apiInstance({isAuthorized: true}).post("/requests/", data);
              if (response.status >= 200 && response.status < 300) {
                toast({
                  title: 'Request berhasil dikirimkan',
                  status: 'success',
                  duration: 3000,
                  position: 'top',
                })
                router.push("/");
              }
            } catch (error) {
              if (axios.isAxiosError(error)) {
                toast({
                  title: 'Request gagal dikirimkan',
                  description: 'Silahkan coba kembali',
                  status: 'error',
                  duration: 3000,
                  position: 'top'
                })
                router.push("/");
              }
            }
          }}>
          <Form>
            <HStack w={"full"}>
                <VStack align={"left"} gap={3} w={{base: '30vh', md: '70vh'}}>
                    <Text fontSize="2xl" fontWeight="bold" color={"biru.800"}>Konten tidak lengkap?</Text>
                    <VStack align={"left"}>
                        <Text fontWeight={"bold"}>Jenis</Text>
                        <RadioGroup onChange={setValue} value={value} size="sm">
                            <Radio value='UNIVERSITY' paddingRight={8}>Universitas</Radio>
                            <Radio value='COURSE' paddingRight={8}>Mata kuliah</Radio>
                            <Radio value='PROFESSOR' paddingRight={8}>Dosen</Radio>
                        </RadioGroup>
                    </VStack>
                    {value === 'COURSE' || value === 'PROFESSOR' ? (
                      <VStack align={"left"}>
                        <Text fontWeight={"bold"}>Universitas</Text>
                        <SelectInput
                          id="institution"
                          name="institution"
                          placeholder="Pilih universitas"
                          options={universityOption || []}
                        />
                      </VStack>
                    ) : null}
                    {value === 'COURSE' ? (
                      <>
                        <VStack align={"left"}>
                          <Text fontWeight={"bold"}>Kode Mata Kuliah</Text>
                          <TextInput id="code" name="code" placeholder="Kode konten" fontSize={{ base: '0.75rem', md: '0.9rem' }} backgroundColor={"white"} />
                        </VStack>
                        <VStack align={"left"}>
                          <Text fontWeight={"bold"}>Jumlah SKS</Text>
                          <NumberInput defaultValue={1} min={1} max={20} value={sks} onChange={(sks) => setSks(parseInt(sks))}>
                            <NumberInputField placeholder="Jumlah SKS" fontSize={{ base: '0.75rem', md: '0.9rem' }} backgroundColor={"white"} />
                            <NumberInputStepper>
                              <NumberIncrementStepper/>
                              <NumberDecrementStepper/>
                            </NumberInputStepper>
                          </NumberInput>
                        </VStack>
                      </>
                    ) : null}
                    <VStack align={"left"}>
                        <Text fontWeight={"bold"}>Nama</Text>
                        <TextInput id="title" name="title" placeholder="Nama konten" fontSize={{ base: '0.75rem', md: '0.9rem' }} backgroundColor={"white"} />
                    </VStack>
                    <VStack align={"left"}>
                        <Text fontWeight={"bold"}>Catatan</Text>
                        <Text fontSize={"sm"}>Tambahkan tautan atau informasi yang kamu ketahui agar admin dapat lebih cepat memproses request kamu!</Text>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Tulis catatan di sini..."
                            resize="none"
                            maxLength={500}
                            height="6rem"
                            fontSize={{ base: '0.75rem', md: '0.9rem'}}
                            backgroundColor={"white"}
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                        />
                    </VStack>
                    <Button type="submit" variant={"primary"} w="fit-content">Submit</Button>
                </VStack>
                <Show above="md">
                  <Spacer w={{base: '0vh', md: "20vh"}} />
                  <Image src="/puzzle.svg" alt="Decoration" w={{base: "0rem", md: "16rem"}} pointerEvents="none" userSelect="none" />
                </Show>
            </HStack>
          </Form>
        </Formik>
      </Center>
    </Container>
  );
};

export default Request;