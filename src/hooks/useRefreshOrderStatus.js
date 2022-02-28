import React from 'react';
import { useDispatch } from 'react-redux';
import { changeOrderStatusService } from '@services/changeOrderStatus.service';
import { changeOrderStatus } from '@state/orders/ordersSlice';

export const useRefreshOrderStatus = () => {
    const dispatch = useDispatch();

    const refresh = async (id, status) => {
        try {
            const res = await changeOrderStatusService(id, status);
            dispatch(changeOrderStatus(res.data));
        } catch (error) {
            console.log(error.response);
        }
    };
    return {refresh};
};
