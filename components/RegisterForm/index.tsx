import { Account } from "@/interfaces";
import { VStack, Button, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import MyTextInput from "../TextInput";
import * as Yup from "yup";

const RegisterForm: React.FC<{}> = () => {
  const initialValues: Account = { nama: "", email: "", password: "" };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
      validationSchema={Yup.object({
        nama: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        password: Yup.string()
          .email("Invalid email address")
          .required("Required"),
      })}
    >
      <Form>
        <VStack px={12} spacing={6}>
          <MyTextInput id="nama" name="nama" type="text" placeholder="Nama" />
          <MyTextInput
            id="email"
            name="email"
            type="text"
            placeholder="Email"
          />
          <MyTextInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button type="submit" colorScheme="biru" w="full">
            Daftar
          </Button>
          <Text fontSize="sm" align="center">
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
