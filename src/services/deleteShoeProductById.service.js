import { apiClient } from '@api/apiClient';

export const deleteShoeProductByIdService = async (id) => {
    return await apiClient.delete(`shoeProducts/${id}`);
};