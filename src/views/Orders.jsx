import React, { useEffect } from 'react';

import { DefaultLayout } from '../layouts/DefaultLayout';
import { PrimaryButton } from './../components/global/PrimaryButton';
import { Table } from '../components/global/table/Table';
import { TableHeading } from '../components/global/table/TableHeading';
import { TableRow } from '../components/global/table/TableRow';
import { TableRowItem } from '../components/global/table/TableRowItem';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useRefreshOrders } from './../hooks/useRefreshOrders';
import { useSelector } from 'react-redux';

export const Orders = () => {

    const { refresh: refreshOrders } = useRefreshOrders();
    const orders = useSelector(state => { return state.orders.orders; });
    const navigate = useNavigate();

    useEffect(() => {
        refreshOrders();
    }, []);
    
    useEffect(() => {
        renderOrders();
    },[orders]);

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
                        <TableRowItem >{phone}</TableRowItem>
                        <TableRowItem >{email}</TableRowItem>
                        <TableRowItem className='w-1/12'>
                            <PrimaryButton onClick={()=> {return navigate(`/order-details/${_id}`);}} title='Details' className='bg-blue px-5 text-xs' type='button'/>
                        </TableRowItem>
                    </TableRow>
                );
            });
        }
    };

    return (
        <>
            <DefaultLayout className='mt-10'>
                <Table>
                    <tbody>
                        <TableRow className='bg-blue'>
                            <TableHeading title='order id'/>
                            <TableHeading title='income'/>
                            <TableHeading title='date'/>
                            <TableHeading title='status'/>
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