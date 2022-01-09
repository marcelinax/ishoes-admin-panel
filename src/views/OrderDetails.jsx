import React, { useEffect, useState } from 'react';

import { DefaultLayout } from '../layouts/DefaultLayout';
import { OrderDetailsRow } from '../components/orderDetails/OrderDetailsRow';
import { PrimaryButton } from './../components/global/PrimaryButton';
import { Table } from '../components/global/table/Table';
import { TableHeading } from '../components/global/table/TableHeading';
import { TableRow } from '../components/global/table/TableRow';
import { TableRowItem } from '../components/global/table/TableRowItem';
import axios from 'axios';
import { config } from './../config/Config';
import moment from 'moment';

export const OrderDetails = () => {

    const [order, setOrder] = useState(null);


    useEffect(() => {
        getOrderById();
    }, []);

    const getOrderById = async () => {
        await axios.get(config.apiUrl + `orders/${location.pathname.split('/').reverse()[0]}`).then(res => {return setOrder(res.data);});
    };

    const renderOrderProducts = () => {
        return order.products.map((product,index) => {
            return (
                <TableRow key={index}>
                    <TableRowItem className='text-xs !py-2'>{index + 1}</TableRowItem>
                    <TableRowItem className='text-xs !py-2'>{product.model}</TableRowItem>
                    <TableRowItem className='text-xs !py-2'>{product.discount}</TableRowItem>
                    <TableRowItem className='text-xs !py-2'>${product.price}</TableRowItem>
                </TableRow>
            );
        });
    };
    
    return (
        order && (
            <>
                <DefaultLayout className='mt-10'>
                    <div className='w-full flex flex-col'>
                        <div className='w-full flex flex-col'>
                            <div className='w-full p-4 bg-blue rounded-md'>
                                <h6 className='font-medium text-white'>Order {order._id}</h6>
                            </div>
                            <div className='w-full'>
                                <div className='w-full flex flex-col p-6'>
                                    <OrderDetailsRow title='Date' value={moment(order.createdAt).format('DD MMM YYYY HH:MM:SS')}/>
                                    <OrderDetailsRow title='Status' value={order.status}/>
                                    <OrderDetailsRow title='Send Date' value={order.sendDate? order.sendDate : 'Not shipped yet'}/>
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
                                    <p className='font-bold text-blue mr-2'>TOTAL:</p>
                                    <p className='text-blue'>${order.products.map(product => {return product.price;}).reduce((acc, cur)=> {return acc + cur;})}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DefaultLayout>
            </>
        )
    );
};

