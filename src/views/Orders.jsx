import React, { useEffect } from 'react';

import { DefaultLayout } from '../layouts/DefaultLayout';
import { PrimaryButton } from './../components/global/PrimaryButton';
import { Table } from '../components/global/table/Table';
import { TableHeading } from '../components/global/table/TableHeading';
import { TableRow } from '../components/global/table/TableRow';
import { TableRowItem } from '../components/global/table/TableRowItem';
import moment from 'moment';
import { useRefreshOrders } from './../hooks/useRefreshOrders';
import { useSelector } from 'react-redux';

export const Orders = () => {

    const { refresh: refreshOrders } = useRefreshOrders();
    const orders = useSelector(state => {return state.orders.orders;});

    useEffect(() => {
        refreshOrders();
    }, []);
    
    useEffect(() => {
        renderOrders();
    },[orders]);

    const renderOrders = () => {
        if (orders) {
            return orders.map(order => {
                const { _id, products, createdAt, status, email } = order;
                const rowElements = [
                    <TableRow key={`row${_id.substring(3, 6)}`}>
                        <TableRowItem key={`id${_id}`}>{_id}</TableRowItem>
                        <TableRowItem className='text-red-600' key={`income${_id}`}>${products.map(product => {return product.price;}).reduce((acc, cur)=> {return acc + cur;})}</TableRowItem>
                        <TableRowItem key={`createdAt${_id}`}>{moment(createdAt).format('DD-MM-YYYY HH:MM:SS')}</TableRowItem>
                        <TableRowItem key={`status${_id}`}>{status}</TableRowItem>
                        <TableRowItem key={`email${_id}`}>{email}</TableRowItem>
                        <TableRowItem key={`details${_id}`} className='w-1/12'>
                            <PrimaryButton title='Details' className='bg-blue px-5 text-xs' type='button'/>
                        </TableRowItem>
                    </TableRow>
                ];
                return rowElements;
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