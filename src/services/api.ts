import axios from "axios";

import { AppError } from "@utils/AppError";

const api = axios.create({
    baseURL: 'http://192.168.15.10:3333'
});

api.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(response => response, error => {
    if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message));
    }
    return Promise.reject(error);
});

export { api };