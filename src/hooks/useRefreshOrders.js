import React from 'react';
import { useDispatch } from 'react-redux';
import { getOrdersService } from '@services/getOrders.service';
import { setOrders } from '@state/orders/ordersSlice';

export const useRefreshOrders = () => {
   
    const dispatch = useDispatch();
    const refresh = async (body) => {
        try {
            const res = await getOrdersService(body);
            dispatch(setOrders(res.data));
        } catch (error) {
            console.log(error.response);
        }
    }; 

    return {refresh};
};
