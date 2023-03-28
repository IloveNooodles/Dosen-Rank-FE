import axios from "axios";
import { API_URL, APP_API_KEY } from "./environments";

import { createStandaloneToast } from '@chakra-ui/toast'
import router from "next/router";

const { toast } = createStandaloneToast()

export function apiInstance({baseURL = API_URL, headers = {}, isAuthorized = false}){
    const axiosInstance = axios.create({
        baseURL,
        headers : {
            'x-api-key': APP_API_KEY,
            'Authorization': isAuthorized ? `${localStorage.getItem('token')}` : '',
            ...headers,
        }
    })
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (isAuthorized && error.response.status === 401) {
                localStorage.removeItem('token');
                toast({
                    id: 'unauthorized',
                    title: 'Akun credentials tidak valid',
                    description: 'Silahkan login kembali!',
                    status: 'error',
                    duration: 3000,
                    position: 'top',
                  })
                router.push('/login');
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}