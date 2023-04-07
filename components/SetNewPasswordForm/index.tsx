import {
    VStack,
    Button,
    Text,
    FormLabel,
    useToast
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import {Form, Formik} from "formik";
import {apiInstance} from "@/utils/apiInstance";
import axios from "axios";
import * as Yup from "yup";
import TextInput from "@/components/TextInput";


interface SetNewPasswordFormProps {
    handleNextStep: (step: number) => void;
}
const SetNewPasswordForm: React.FC<SetNewPasswordFormProps> = ({handleNextStep}) => {

    const initialValues = {
            password: "",
            passwordConfirmation: "",
    }
    const toast = useToast()

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                password: Yup.string().required("Required"),
                passwordConfirmation: Yup.string()
                    .oneOf([Yup.ref('password')], 'Passwords must match')
                    .nullable()
                    .required('Required'),
            })}
            onSubmit={async (values) => {
                const data = JSON.stringify({
                    password: values.password,
                    confirmed_password: values.passwordConfirmation,
                });
                try {
                    const response = await apiInstance({}).post("/users/forgot-password", data)
                    if (response.status === 200) {
                        toast({
                            title: 'Password berhasil diubah',
                            description: 'Silahkan login kembali',
                            status: 'success',
                            duration: 3000,
                            position: 'top',
                        })
                        handleNextStep(2)
                    }
                } catch (error){
                    if (axios.isAxiosError(error)){
                        toast({
                            title: 'Password tidak sesuai',
                            description: 'Silahkan cek kembali password kamu',
                            status: 'error',
                            duration: 3000,
                            position: 'top',
                        })
                    }
                }
            }}
        >
            <Form>
                <VStack>
                    <Text fontWeight="semibold" align="center" fontSize="2xl">
                        Setting Password Baru
                    </Text>
                    <Text fontSize={"sm"} color="biru.900">
                        Password baru kamu harus berbeda dengan password kamu sebelumnya.
                    </Text>
                    {/* eslint-disable-next-line react/jsx-no-undef */}

                    <FormLabel>Password</FormLabel>
                    <TextInput id="password" name="password" type='password'/>
                    <FormLabel>Konfirmasi Password</FormLabel>
                    <TextInput id="passwordConfirmation" name="passwordConfirmation" type='password'/>
                    <Button
                        mt={4}
                        colorScheme='teal'
                        type='submit'
                        width="24rem"
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
            </Form>
        </Formik>
    );
};

export default SetNewPasswordForm;
