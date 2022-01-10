import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Checkbox } from './../components/inputs/Checkbox';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { ORDER_STATUSES } from '../Constants';
import { PrimaryButton } from './../components/global/PrimaryButton';
import { RadioModal } from '../components/global/RadioModal';
import { Table } from '../components/global/table/Table';
import { TableHeading } from '../components/global/table/TableHeading';
import { TableRow } from '../components/global/table/TableRow';
import { TableRowItem } from '../components/global/table/TableRowItem';
import moment from 'moment';
import { setOrder } from '../store/ordersSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useRefreshOrder } from '../hooks/useRefreshOrder';
import { useRefreshOrderStatus } from '../hooks/useRefreshOrderStatus';
import { useRefreshOrders } from './../hooks/useRefreshOrders';

export const Orders = () => {

    const { refresh: refreshOrders } = useRefreshOrders();
    const orders = useSelector(state => { return state.orders.orders; });
    const order = useSelector(state => { return state.orders.order; });
    const navigate = useNavigate();
    const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
    const { refresh: refreshOrderStatus } = useRefreshOrderStatus();
    const { refresh: refreshOrder } = useRefreshOrder();
    const dispatch = useDispatch();
    const [status, setStatus] = useState('');

    useEffect(() => {
        refreshOrders();
    }, []);
    
    useEffect(() => {
        renderOrders();
    }, [orders]);

    useEffect(() => {
        if (order)
            setStatus(order.status);
        refreshOrders();
    }, [order]);
    
    const onSaveClick = () => {
        refreshOrderStatus(order._id, status);
        setShowChangeStatusModal(false);
        toast.success('Order status has been changed');
    };

    const onOpenModalClick = (orderId) => {
        setShowChangeStatusModal(true);
        refreshOrder(orderId);
    };

    const onCloseModalClick = () => {
        setShowChangeStatusModal(false);
        dispatch(setOrder(null));
    };

    const renderOrders = () => {
        if (orders) {
            return orders.map((order,index) => {
                const { _id, products, createdAt, status, email, phone } = order;
                return (
                    <TableRow key={index}>
                        <TableRowItem >{_id}</TableRowItem>
                        <TableRowItem className='text-red-600'>${products.map(product => {return product.price;}).reduce((acc, cur)=> {return acc + cur;})}</TableRowItem>
                        <TableRowItem >{moment(createdAt).format('DD-MM-YYYY HH:MM:SS')}</TableRowItem>
                        <TableRowItem >{status}</TableRowItem>
                        <TableRowItem className='w-1/12'>
                            <PrimaryButton onClick={()=>{return onOpenModalClick(_id);}} title='Change' className='bg-neutral-green !py-2 !px-2 text-xs' type='button'/>
                        </TableRowItem>
                        <TableRowItem >{phone}</TableRowItem>
                        <TableRowItem >{email}</TableRowItem>
                        <TableRowItem className='w-1/12'>
                            <PrimaryButton onClick={()=> {return navigate(`/order-details/${_id}`);}} title='View' className='bg-blue !py-2 !px-5 text-xs' type='button'/>
                        </TableRowItem>
                    </TableRow>
                );
            });
        }
    };

    return (
        <>
            <DefaultLayout className='mt-10'>
                {showChangeStatusModal && <RadioModal onSaveClick={onSaveClick} title='Change Order Status' description='Choose the current status for the order' closeModal={onCloseModalClick}>
                    <Checkbox title='In progress' className='mb-5' iconClassName='fill-blue' value={status.toLowerCase() === ORDER_STATUSES.IN_PROGRESS} onChange={()=> {return setStatus(ORDER_STATUSES.IN_PROGRESS);}}/>
                    <Checkbox title='Shipped' className='mb-5' iconClassName='fill-blue' value={status.toLowerCase() === ORDER_STATUSES.SHIPPED} onChange={()=> {return setStatus(ORDER_STATUSES.SHIPPED);}}/>
                    <Checkbox title='Canceled' iconClassName='fill-blue' value={status.toLowerCase() === ORDER_STATUSES.CANCELED} onChange={()=> {return setStatus(ORDER_STATUSES.CANCELED);}}/>
                </RadioModal>}
                <Table>
                    <tbody>
                        <TableRow className='bg-blue'>
                            <TableHeading title='order id'/>
                            <TableHeading title='income'/>
                            <TableHeading title='date'/>
                            <TableHeading title='status' />
                            <TableHeading title=''/>
                            <TableHeading title='phone'/>
                            <TableHeading title='email'/>
                            <TableHeading title=''/>
                        </TableRow>
                        {renderOrders()}
                        
                    </tbody>
                </Table>
            </DefaultLayout>
        </>
    );
};

// 