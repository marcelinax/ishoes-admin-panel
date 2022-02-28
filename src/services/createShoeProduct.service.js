import { apiClient } from '@api/apiClient';

export const createShoeProductService = async (data) => {
    return await apiClient.post('shoeProducts/', data);
};