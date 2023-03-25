import axios from "axios";
import { API_URL, APP_API_KEY } from "./environments";

export function apiInstance({baseURL = API_URL, headers = {}}){
    const axiosInstance = axios.create({
        baseURL,
        headers : {
            'x-api-key': APP_API_KEY,
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJET1NFTiBSQU5LIiwic3ViIjoiQXV0aGVudGljYXRpb24iLCJleHAiOjE2Nzk4MzY5MzUsImlhdCI6MTY3OTc1MDUzNSwiZW1haWwiOiJtZ2FyZWJhbGRoaWU4MEBnbWFpbC5jb20iLCJuYW1lIjoiZ2FyZSIsInVuaXZJZCI6MSwiaXNBZG1pbiI6dHJ1ZX0.KSo-1izZ69SUb4A26zLE5nsNEyWvJHkdOU4yo8TcMc4',
            ...headers,
        }
    })

    return axiosInstance;
}