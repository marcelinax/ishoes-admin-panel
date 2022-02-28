import { apiClient } from '@api/apiClient';

export const changeOrderStatusService = async (id, status) => {
    return await apiClient.post(`orders/change-status/${id}`, {status});
};