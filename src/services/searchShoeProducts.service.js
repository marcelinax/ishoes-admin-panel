import { apiClient } from '@api/apiClient';

export const searchShoeProductsService = async (body) => {
    return await apiClient.post('shoeProducts/search', body);
};