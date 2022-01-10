import axios from 'axios';
import { config } from './../config/Config';
import { setOrder } from '../store/ordersSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export const useRefreshOrder = () => {

   
    const dispatch = useDispatch();
    
    const refresh = async (params) => {
        try {
            await axios.get(config.apiUrl + `orders/${params}`).then(res => { return dispatch(setOrder(res.data)); });
        } catch (error) {
            console.log(error.response);
        }
    }; 

    return {refresh};
};