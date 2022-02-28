import React from 'react';
import { useDispatch } from 'react-redux';
import { searchShoeProductsService } from '@services/searchShoeProducts.service';
import { setShoeProducts } from '@state/shoe-products/shoeProductsSlice';

export const useRefreshShoeProducts = () => {
    const dispatch = useDispatch();
    const refresh = async (body) => {
        try {
            const res = await searchShoeProductsService(body);
            dispatch(setShoeProducts(res.data));
        } catch (error) {
            console.log(error.response);
        }
    };
    return {refresh};
};
