import { apiClient } from '@api/apiClient';

export const getOrderByIdService = async (params) => {
    return await apiClient.get(`orders/${params}`);
};