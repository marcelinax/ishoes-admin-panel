import { config } from '@config/config';
import axios from 'axios';

export const apiClient = axios.create({
    baseURL: config.apiUrl
});