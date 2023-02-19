import { Account, RegisterProps, SelectOption } from "@/interfaces";
import { VStack, Button, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import TextInput from "../TextInput";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";
import { apiInstance } from "@/utils/apiInstance";

const SelectInput = dynamic(() => import("../SelectInput"), { ssr: false });

const RegisterForm: React.FC<RegisterProps> = ({ universities }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast()

  const initialValues: Account = {
    name: "",
    email: "",
    password: "",
    university: "",
  };

  const universityOption: Array<SelectOption> = universities.map(
    ({ id, name }) => ({ label: name, value: id.toString() })
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
        university: Yup.string().required("Required")
      })}
      onSubmit={async (values) => {
        const data = JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          univID: parseInt(values.university!!),
        });

        try {
          const response = await apiInstance({}).post("/users/register", data)

          if (response.status === 201) {
            toast({
              title: 'Akun berhasil dibuat',
              description: 'Silahkan login untuk melanjutkan',
              status: 'success',
              duration: 3000,
              position: 'top',
            })
            router.push("/login")
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setErrorMessage(error.response?.data.error);
            toast({
              title: 'Akun gagal dibuat',
              description: 'Silahkan ulangi registrasi',
              status: 'error',
              duration: 3000,
              position: 'top'
            })
          }
        }
      }}
    >
      <Form>
        <VStack px={12} spacing={6}>
          <TextInput id="name" name="name" type="text" placeholder="Nama" />
          <SelectInput
            id="university"
            name="university"
            placeholder="Universitas"
            options={universityOption}
          />
          <TextInput id="email" name="email" type="email" placeholder="Email" />
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button type="submit" colorScheme="biru" w="full">
            Daftar
          </Button>
        </VStack>
        {errorMessage ? (
          <Text marginX={12} paddingTop={2} fontSize="xs">
            {errorMessage}
          </Text>
        ) : null}
        <VStack spacing={6}>
          <Text paddingTop={4} fontSize="sm" align="center">
            Dengan mengklik daftar, kamu menyetujui Persyaratan dan Ketentuan
            Penggunaan CariDosen.
          </Text>
          <Text>
            Sudah punya akun?{" "}
            <Link href="/login">
              <Text as="span" color="biru.600" fontWeight="bold">
                masuk
              </Text>
            </Link>
          </Text>
        </VStack>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
