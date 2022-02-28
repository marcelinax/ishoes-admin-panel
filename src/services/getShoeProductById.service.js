import { apiClient } from '@api/apiClient';

export const getShoeProductByIdService = async (id) => {
    return await apiClient.get(`shoeProducts/${id}`);
};