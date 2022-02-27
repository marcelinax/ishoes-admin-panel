import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Checkbox } from './../components/inputs/Checkbox';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { ORDER_STATUSES } from '../Constants';
import { OrderDetailsRow } from '../components/orderDetails/OrderDetailsRow';
import { PrimaryButton } from './../components/global/PrimaryButton';
import { RadioModal } from './../components/global/RadioModal';
import { Table } from '../components/global/table/Table';
import { TableHeading } from '../components/global/table/TableHeading';
import { TableRow } from '../components/global/table/TableRow';
import { TableRowItem } from '../components/global/table/TableRowItem';
import { calcProductPrice } from './../utils/calcProductPrice';
import moment from 'moment';
import { setOrder } from '../store/ordersSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useRefreshOrder } from './../hooks/useRefreshOrder';
import { useRefreshOrderStatus } from '../hooks/useRefreshOrderStatus';

export const OrderDetails = () => {

    const params = useParams();
    const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
    const { refresh: refreshOrderStatus } = useRefreshOrderStatus();
    const { refresh: refreshOrder } = useRefreshOrder();
    const order = useSelector(state => { return state.orders.order; });
    const [status, setStatus] = useState('');

    useEffect(() => {
        getOrder();
    }, []);

    useEffect(() => {
        if(order)
            setStatus(order.status);
    }, [order]);


    const getOrder = async () => {
        await refreshOrder(params.id);
    };

    const onSaveClick = () => {
        refreshOrderStatus(params.id, status);
        setShowChangeStatusModal(false);
        toast.success('Order status has been changed');
    };

    const onCloseModalClick = () => {
        setShowChangeStatusModal(false);
    };

    const renderOrderProducts = () => {
        return order.products.map((product,index) => {
            return (
                <TableRow key={index}>
                    <TableRowItem className='text-xs !py-2'>{index + 1}</TableRowItem>
                    <TableRowItem className='text-xs !py-2'>{product.model}</TableRowItem>
                    <TableRowItem className='text-xs !py-2'>{product.discount}</TableRowItem>
                    <TableRowItem className={`text-xs !py-2 ${product.isOnSale && 'text-red-600'}`}>${calcProductPrice(product)}</TableRowItem>
                </TableRow>
            );
        });
    };

    const getTotalSum = () => {
        let sum = 0;
        order.products.forEach(product => {
            sum += +calcProductPrice(product);
        });
        return sum;
    };
    
    return (
        order && (
            <DefaultLayout className='mt-10'>
                {showChangeStatusModal && <RadioModal onSaveClick={onSaveClick} title='Change Order Status' description='Choose the current status for the order' closeModal={onCloseModalClick}>
                    <Checkbox title='In progress' className='mb-5' iconClassName='fill-blue' value={status.toLowerCase() === ORDER_STATUSES.IN_PROGRESS} onChange={()=> {return setStatus(ORDER_STATUSES.IN_PROGRESS);}}/>
                    <Checkbox title='Shipped' className='mb-5' iconClassName='fill-blue' value={status.toLowerCase() === ORDER_STATUSES.SHIPPED} onChange={()=> {return setStatus(ORDER_STATUSES.SHIPPED);}}/>
                    <Checkbox title='Canceled' iconClassName='fill-blue' value={status.toLowerCase() === ORDER_STATUSES.CANCELED} onChange={()=> {return setStatus(ORDER_STATUSES.CANCELED);}}/>
                </RadioModal>}
                <div className='w-full flex flex-col'>
                    <div className='w-full flex flex-col'>
                        <div className='w-full p-4 bg-blue rounded-md'>
                            <h6 className='font-medium text-white'>Order {order._id}</h6>
                        </div>
                        <div className='w-full'>
                            <div className='w-full flex flex-col p-6'>
                                <OrderDetailsRow title='Date' value={moment(order.createdAt).format('DD MMM YYYY HH:MM:SS')}/>
                                <OrderDetailsRow title='Status' value={order.status}>
                                    <PrimaryButton onClick={()=> {return setShowChangeStatusModal(true);}} title='Change' type='button' className='w-fit !px-2 !py-2 bg-neutral-green text-[11px] ml-10' />
                                </OrderDetailsRow>
                                <OrderDetailsRow title='Send Date' value={order.sendDate ? order.sendDate : 'Not shipped yet'} />
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col mt-6'>
                        <div className='w-full p-4 bg-blue rounded-md'>
                            <h6 className='font-medium text-white'>Buyer Information</h6>
                        </div>
                        <div className='w-full'>
                            <div className='w-full flex flex-col p-6'>
                                <OrderDetailsRow title='Name' value={`${order.name} ${order.surname}`}/>
                                <OrderDetailsRow title='Email' value={order.email}/>
                                <OrderDetailsRow title='Phone Number' value={order.phone}/>
                                <OrderDetailsRow title='Shipping Address' value={`${order.deliveryAddress.address}, ${order.deliveryAddress.zipCode} ${order.deliveryAddress.city}`}/>
                                <OrderDetailsRow title='Additional Address Information' value={order.deliveryAddress.additionalInformation}/>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col mt-6 mb-10'>
                        <div className='w-full p-4 bg-blue rounded-md'>
                            <h6 className='font-medium text-white'>Products</h6>
                        </div>
                        <div className='w-full mt-6  h-[30vh] overflow-auto scrollbar pb-5'>
                            <div className='w-full pl-3 pr-3 bg-white'>
                                <Table>
                                    <tbody>
                                        <TableRow className='bg-gray '>
                                            <TableHeading title='#' className='text-xs !py-2'/>
                                            <TableHeading title='Product Name' className='text-xs !py-2' />
                                            <TableHeading title='Discount %' className='text-xs !py-2'/>
                                            <TableHeading title='Price' className='text-xs !py-2'/>
                                        </TableRow>
                                        {renderOrderProducts()}
                                    </tbody>
                                </Table>
                            </div>
                                
                        </div>
                        <div className='w-full mt-5'>
                            <div className='w-full flex items-center justify-end px-4'>
                                <p className='font-bold text-gray mr-2'>TOTAL:</p>
                                <p className='text-gray'>${getTotalSum()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        )
    );
};

