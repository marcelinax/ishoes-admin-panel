import React from 'react';
import axios from 'axios';
import { config } from '../config/Config';
import { setShoeProducts } from '../store/shoeProductsSlice';
import { useDispatch } from 'react-redux';

export const useRefreshShoeProducts = () => {

    const dispatch = useDispatch();
    
    const refresh = async (body) => {
        try {
            await axios.post(config.apiUrl + 'shoeProducts/search', body).then(res => {return dispatch(setShoeProducts(res.data));});
        } catch (error) {
            console.log(error.response);
        }
    };

    return {refresh};
};
