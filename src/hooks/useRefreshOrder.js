import { useDispatch } from 'react-redux';
import { getOrderByIdService } from '@services/getOrderById.service';
import { setOrder } from '@state/orders/ordersSlice';

export const useRefreshOrder = () => {
    const dispatch = useDispatch();
    const refresh = async (params) => {
        try {
            const res = await getOrderByIdService(params);
            dispatch(setOrder(res.data));
        } catch (error) {
            console.log(error.response);
        }
    }; 
    return {refresh};
};