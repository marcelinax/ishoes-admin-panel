import { apiClient } from '@api/apiClient';

export const uploadImageService = async (data) => {
    return await apiClient.post('files/upload', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};