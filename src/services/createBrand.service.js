import { apiClient } from '@api/apiClient';

export const createBrandService = async (brand) => {
    return await apiClient.post('brands/', {
        name: brand
    });
};