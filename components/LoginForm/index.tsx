import {Account} from "@/interfaces";
import { VStack, Button, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import {useRouter} from "next/router";
import React, {useState} from "react";
import axios from "axios";
import TextInput from "../TextInput";
import {apiInstance} from "@/utils/apiInstance";
import { useAuth } from "@/contexts/AuthContext";

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    const {signIn} = useAuth()
    const toast = useToast();

    const initialValues: Account = {
        email: "",
        password: "",
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                const data = JSON.stringify({
                    email: values.email,
                    password: values.password,
                });

                try {
                    const response = await apiInstance({}).post("/users/login", data)
                    
                    if (response.status === 200) {
                        const accessToken = response.data.data.token
                        signIn(accessToken)
                        toast({
                            title: 'Login berhasil',
                            status: 'success',
                            duration: 3000,
                            position: 'top',
                          })
                        await router.push("/")
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        setErrorMessage(error.response?.data.error);
                    }
                }
            }}
            validationSchema={Yup.object({
                email: Yup.string().email("Invalid email address").required("Required"),
                password: Yup.string().required("Required"),
            })}
        >
            <Form>
                <VStack px={12} spacing={6}>
                    <TextInput id="email" name="email" type="email" placeholder="Email" />
                    <TextInput
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <Button type="submit" colorScheme="biru" w="full">
                        Masuk
                    </Button>
                </VStack>
                {errorMessage ? (
                    <Text marginX={12} paddingTop={2} fontSize="xs" textAlign="center" textColor="red">
                        email atau password salah
                    </Text>
                ) : null}
                <VStack spacing={6}>
                    <Text marginTop={2}>
                        Belum punya akun?{" "}
                        <Link href="/register">
                            <Text as="span" color="biru.600" fontWeight="bold">
                                daftar
                            </Text>
                        </Link>
                    </Text>
                </VStack>
            </Form>
        </Formik>
    );
};

export default LoginForm;
