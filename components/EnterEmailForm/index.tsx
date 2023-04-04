import {
    VStack,
    Button,
    Text,
    FormLabel,
    useToast,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import {Formik} from "formik";
import {Account} from "@/interfaces";
import * as Yup from "yup";
import {apiInstance} from "@/utils/apiInstance";
import {useRouter} from "next/router";
import axios from "axios";
import TextInput from "@/components/TextInput";

interface EnterEmailFormProps {
    onSubmit: () => void;
}

const EnterEmailForm: React.FC<EnterEmailFormProps> = (onSubmit) => {
    const initialValues: Account = {
        email: "",
    };
    const toast = useToast()
    const router = useRouter();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                email: Yup.string().email("Invalid email address").required("Required"),}
            )}
            onSubmit={async (values) => {
                const data = JSON.stringify({
                    email: values.email,
                });
            try {
                const response = await apiInstance({}).post("/users/forgot-password", data)
                if (response.status === 201) {
                    toast({
                        title: 'Email berhasil dikirim',
                        description: 'Silahkan cek email kamu untuk mereset password',
                        status: 'success',
                        duration: 3000,
                        position: 'top',
                    })
                    await router.push("/login")
                }
            } catch (error){
                if (axios.isAxiosError(error)){
                    toast({
                        title: 'Email tidak terdaftar',
                        description: 'Silahkan cek kembali email kamu',
                        status: 'error',
                        duration: 3000,
                        position: 'top',
                    })
                }
            }
            }}
        >
            <VStack>
                <Text fontWeight="semibold" align="center" fontSize="2xl">
                    Lupa Password?
                </Text>
                <Text fontSize={"sm"} color="biru.900">
                    Jangan khawatir, kami akan membantu kamu mereset password.
                </Text>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <FormLabel>Email address</FormLabel>
                <TextInput id="email" name="email" type='email'/>
                <Button
                    mt={4}
                    colorScheme='teal'
                    type='submit'
                    width="24rem"
                    onClick={() => onSubmit}
                >
                    Submit
                </Button>
                <Text fontSize={"xs"} fontWeight={"400"}>
                    ⬅︎ Kembali ke {" "}
                    <Link href="/login">
                        <Text as="span" color="biru.600" fontWeight="bold">
                            login
                        </Text>
                    </Link>
                </Text>
            </VStack>
        </Formik>
    );
};

export default EnterEmailForm;
