import {Account} from "@/interfaces";
import { VStack, Button, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {useState} from "react";
import axios from "axios";
import TextInput from "../TextInput";

const LoginForm: React.FC<{}> = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    const initialValues: Account = {
        nama: "",
        email: "",
        password: "",
        university: "",
    };

    const loginEndpoint = process.env.NEXT_PUBLIC_API_URL + "/users/login";

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                const data = JSON.stringify({
                    email: values.email,
                    password: values.password,
                });

                try {
                    const response = await axios.post(loginEndpoint, data);
                    console.log(response)
                    if (response.status === 201) {
                        router.push("/")
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
                    <Text marginX={12} paddingTop={2} fontSize="xs">
                        {errorMessage}
                    </Text>
                ) : null}
                <VStack spacing={6}>
                    <Text>
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
