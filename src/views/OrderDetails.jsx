import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import locales from '@constants/locales';
import { useRefreshOrderStatus } from '@hooks/useRefreshOrderStatus';
import { useRefreshOrder } from '@hooks/useRefreshOrder';
import { TableRow } from '@components/global/Table/TableRow';
import { TableRowItem } from '@components/global/Table/TableRowItem';
import { calcProductPrice } from '@utils/calcProductPrice';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { RadioModal } from '@components/global/RadioModal';
import { Checkbox } from '@components/Inputs/Checkbox';
import { OrderDetailsRow } from '@components/Order-details/OrderDetailsRow';
import { TableHeading } from '@components/global/Table/TableHeading';
import { Table } from '@components/global/Table/Table';
import { Button } from '@components/global/Button';
import buttonTypes from '@constants/buttonTypes';
import orderStatuses from '@constants/orderStatuses';

export const OrderDetails = () => {

    const params = useParams();
    const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
    const { refresh: refreshOrderStatus } = useRefreshOrderStatus();
    const { refresh: refreshOrder } = useRefreshOrder();
    const order = useSelector(state => state.orders.order);
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
        toast.success(locales.ORDER_STATUS_HAS_BEEN_CHANGED);
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
                {showChangeStatusModal && <RadioModal onSaveClick={onSaveClick} title={locales.CHANGE_ORDER_STATUS} description={locales.CHOOSE_CURRENT_STATUS_FOR_ORDER} closeModal={onCloseModalClick}>
                    <Checkbox title={locales.IN_PROGRESS} className='mb-5' iconClassName='fill-blue' value={status.toLowerCase() === orderStatuses.IN_PROGRESS} onChange={() =>setStatus(orderStatuses.IN_PROGRESS)}/>
                    <Checkbox title={locales.SHIPPED} className='mb-5' iconClassName='fill-blue' value={status.toLowerCase() === orderStatuses.SHIPPED} onChange={() => setStatus(orderStatuses.SHIPPED)}/>
                    <Checkbox title={locales.CANCELED} iconClassName='fill-blue' value={status.toLowerCase() === orderStatuses.CANCELED} onChange={() => setStatus(orderStatuses.CANCELED)}/>
                </RadioModal>}
                <div className='w-full flex flex-col'>
                    <div className='w-full flex flex-col'>
                        <div className='w-full p-4 bg-blue rounded-md'>
                            <h6 className='font-medium text-white'>{locales.ORDER} {order._id}</h6>
                        </div>
                        <div className='w-full'>
                            <div className='w-full flex flex-col p-6'>
                                <OrderDetailsRow title={locales.DATE} value={moment(order.createdAt).format('DD MMM YYYY HH:MM:SS')}/>
                                <OrderDetailsRow title={locales.STATUS} value={order.status}>
                                    <Button buttonType={buttonTypes.TEXT_BUTTON} title={locales.CHANGE} type='button' bgColor='bg-neutral-green' className='w-fit !px-2 !py-2 text-[11px] ml-10' onClick={() => setShowChangeStatusModal(true)}/>
                                </OrderDetailsRow>
                                <OrderDetailsRow title={locales.SEND_DATE} value={order.sendDate ? order.sendDate : locales.NOT_SHIPPED_YET} />
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col mt-6'>
                        <div className='w-full p-4 bg-blue rounded-md'>
                            <h6 className='font-medium text-white'>{locales.BUYER_INFORMATION}</h6>
                        </div>
                        <div className='w-full'>
                            <div className='w-full flex flex-col p-6'>
                                <OrderDetailsRow title={locales.NAME} value={`${order.name} ${order.surname}`}/>
                                <OrderDetailsRow title={locales.EMAIL} value={order.email}/>
                                <OrderDetailsRow title={locales.PHONE_NUMBER} value={order.phone}/>
                                <OrderDetailsRow title={locales.SHIPPING_ADDRESS} value={`${order.deliveryAddress.address}, ${order.deliveryAddress.zipCode} ${order.deliveryAddress.city}`}/>
                                <OrderDetailsRow title={locales.ADDITIONAL_ADDRESS_INFORMATION} value={order.deliveryAddress.additionalInformation}/>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col mt-6 mb-10'>
                        <div className='w-full p-4 bg-blue rounded-md'>
                            <h6 className='font-medium text-white'>{locales.PRODUCTS}</h6>
                        </div>
                        <div className='w-full mt-6  h-[30vh] overflow-auto scrollbar pb-5'>
                            <div className='w-full pl-3 pr-3 bg-white'>
                                <Table>
                                    <tbody>
                                        <TableRow className='bg-gray '>
                                            <TableHeading title='#' className='text-xs !py-2'/>
                                            <TableHeading title={locales.PRODUCT_NAME} className='text-xs !py-2' />
                                            <TableHeading title={locales.DISCOUNT_IN_PERCENTAGES} className='text-xs !py-2'/>
                                            <TableHeading title={locales.PRICE} className='text-xs !py-2'/>
                                        </TableRow>
                                        {renderOrderProducts()}
                                    </tbody>
                                </Table>
                            </div>
                                
                        </div>
                        <div className='w-full mt-5'>
                            <div className='w-full flex items-center justify-end px-4'>
                                <p className='font-bold text-gray mr-2'>{locales.TOTAL}:</p>
                                <p className='text-gray'>${getTotalSum()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        )
    );
};

