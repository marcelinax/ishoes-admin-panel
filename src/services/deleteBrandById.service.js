import { apiClient } from '@api/apiClient';

export const deleteBrandByIdService = async (id) => {
    return await apiClient.delete(`brands/${id}`);
};