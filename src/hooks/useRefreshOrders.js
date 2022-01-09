import React from 'react';
import axios from 'axios';
import { config } from './../config/Config';
import { setOrders } from '../store/ordersSlice';
import { useDispatch } from 'react-redux';

export const useRefreshOrders = () => {
   
    const dispatch = useDispatch();

    const refresh = async (body) => {
        try {
            await axios.post(config.apiUrl + 'orders/search', body).then(res => {return dispatch(setOrders(res.data));});
        } catch (error) {
            console.log(error.response);
        }
    }; 

    return {refresh};
};
