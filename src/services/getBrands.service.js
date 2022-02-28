import { apiClient } from '@api/apiClient';

export const getBrandsService = async () => {
    return await apiClient.get('brands/');
};