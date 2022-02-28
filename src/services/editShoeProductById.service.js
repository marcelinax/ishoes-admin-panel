import { apiClient } from '@api/apiClient';

export const editShoeProductByIdService = async (id, data) => {
    return await apiClient.put(`shoeProducts/${id}`, data);
};