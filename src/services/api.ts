import axios from 'axios';

import { AppError } from '@utils/AppError';
import { err } from 'react-native-svg';

const api = axios.create({
    baseURL: 'http://192.168.0.2:3333',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.data)  {
        return Promise.reject(new AppError(error.response.data.message));
    }
    return Promise.reject('Error no servidor. Tente novamente mais tarde.');
 });

export { api };