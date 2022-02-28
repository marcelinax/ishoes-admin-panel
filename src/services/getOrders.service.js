import { apiClient } from '@api/apiClient';

export const getOrdersService = async (body) => {
    return await apiClient.post('orders/search', body);
};