import React from 'react';
import axios from 'axios';
import { changeOrderStatus } from '../store/ordersSlice';
import { config } from '../config/Config';
import { useDispatch } from 'react-redux';

export const useRefreshOrderStatus = () => {
    
    const dispatch = useDispatch();

    const refresh = async (params, status) => {
        try {
            await axios.post(config.apiUrl + `orders/change-status/${params}`, {status}).then(res => { return dispatch(changeOrderStatus(res.data)); });
        } catch (error) {
            console.log(error.response);
        }
    };
    return {refresh};
};
