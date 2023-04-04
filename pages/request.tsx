import { apiInstance } from "@/utils/apiInstance";
import { Center, Container, HStack, Text, VStack, Image, Spacer, Radio, RadioGroup, Input, Textarea, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import dynamic from "next/dynamic";
import React from "react";
import useSWR, { Fetcher } from "swr";
import { Response, SelectOption, University } from "@/interfaces";

const SelectInput = dynamic(() => import("../components/SelectInput"), { ssr: false });

const fetcher: Fetcher<Response<University[]>, string> = (url) =>
  apiInstance({isAuthorized: true}).get(url).then((res) => res.data);

function useUniversities() {
  const { data, isLoading, error } = useSWR(`/univ/`, fetcher);

  return {
    universities: data?.data,
    isLoading: isLoading,
    isError: error,
  };
};

const Request: React.FC<{}> = () => {
  const toast = useToast();

  const [value, setValue] = React.useState('');
  const initialValues = {
    name: "",
    note: "",
    university: "",
    code: "",
  };

  const { universities, isLoading, isError } = useUniversities();
  if (isLoading) return <div>Loading...</div>;

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
              if (value === 'course') {
                const data = JSON.stringify({
                  type: value,
                  name: values.name,
                  note: values.note,
                  university: parseInt(values.university!!),
                  code: values.code,
                });
                // const response = await apiInstance({isAuthorized: true}).post("/request", data);
                // if (response.status >= 200 && response.status < 300) {
                //   toast({
                //     title: 'Request berhasil dikirimkan',
                //     status: 'success',
                //     duration: 3000,
                //     position: 'top',
                //   })
                // }
              } else if (value === 'professor') {
                const data = JSON.stringify({
                  type: value,
                  name: values.name,
                  note: values.note,
                  university: parseInt(values.university!!),
                });
                // const response = await apiInstance({isAuthorized: true}).post("/request", data);
                // if (response.status >= 200 && response.status < 300) {
                //   toast({
                //     title: 'Request berhasil dikirimkan',
                //     status: 'success',
                //     duration: 3000,
                //     position: 'top',
                //   })
                // }
              } else if (value === 'university') {
                const data = JSON.stringify({
                  type: value,
                  name: values.name,
                  note: values.note,
                });
                // const response = await apiInstance({isAuthorized: true}).post("/request", data);
                // if (response.status >= 200 && response.status < 300) {
                //   toast({
                //     title: 'Request berhasil dikirimkan',
                //     status: 'success',
                //     duration: 3000,
                //     position: 'top',
                //   })
                // }
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
                            <Radio value='university' paddingRight={8}>Universitas</Radio>
                            <Radio value='course' paddingRight={8}>Mata kuliah</Radio>
                            <Radio value='professor' paddingRight={8}>Dosen</Radio>
                        </RadioGroup>
                    </VStack>
                    {value === 'course' || value === 'professor' ? (
                      <VStack align={"left"}>
                        <Text fontWeight={"bold"}>Universitas</Text>
                        <SelectInput
                          id="university"
                          name="university"
                          placeholder="Pilih universitas"
                          options={universityOption || []}
                        />
                      </VStack>
                    ) : null}
                    {value === 'course' ? (
                      <VStack align={"left"}>
                        <Text fontWeight={"bold"}>Kode Mata Kuliah</Text>
                        <Input id="code" name="code" placeholder="Kode konten" fontSize={{ base: '0.75rem', md: '0.9rem' }} backgroundColor={"white"} />
                      </VStack>
                    ) : null}
                    <VStack align={"left"}>
                        <Text fontWeight={"bold"}>Nama</Text>
                        <Input id="name" name="name" placeholder="Nama konten" fontSize={{ base: '0.75rem', md: '0.9rem' }} backgroundColor={"white"} />
                    </VStack>
                    <VStack align={"left"}>
                        <Text fontWeight={"bold"}>Catatan</Text>
                        <Text fontSize={"sm"}>Tambahkan tautan atau informasi yang kamu ketahui agar admin dapat lebih cepat memproses request kamu!</Text>
                        <Textarea
                            id="note"
                            name="note"
                            placeholder="Tulis catatan di sini..."
                            resize="none"
                            maxLength={500}
                            height="6rem"
                            fontSize={{ base: '0.75rem', md: '0.9rem'}}
                            backgroundColor={"white"}
                        />
                    </VStack>
                    <Button variant={"primary"} w="fit-content">Submit</Button>
                </VStack>
                <Spacer w={{base: '0vh', md: "20vh"}} />
                <Image src="/puzzle.svg" alt="Decoration" w={{base: "0rem", md: "16rem"}} pointerEvents="none" userSelect="none" />
            </HStack>
          </Form>
        </Formik>
      </Center>
    </Container>
  );
};

export default Request;