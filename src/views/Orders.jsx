import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Checkbox } from './../components/inputs/Checkbox';
import { DateInput } from '../components/inputs/DateInput';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Filter } from './../components/filter/Filter';
import MenuItem from '@mui/material/MenuItem';
import { ORDER_STATUSES } from '../Constants';
import { PrimaryButton } from './../components/global/PrimaryButton';
import { RadioModal } from '../components/global/RadioModal';
import { Search } from './../components/global/Search';
import { SelectInput } from './../components/inputs/SelectInput';
import { Table } from '../components/global/table/Table';
import { TableHeading } from '../components/global/table/TableHeading';
import { TablePagination } from './../components/global/table/TablePagination';
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
    const [filterData, setFilterData] = useState({
        orderId: '',
        email: '',
        dateOfOrder: null,
        sendDate: null,
        status: '',
        phone: '',
        page: 0
    });
    
    useEffect(() => {
        renderOrders();
    }, [orders]);


    useEffect(() => {
        if (order) {
            setStatus(order.status);
            rerenderOrders();
        }
    }, [order]);

    

    useEffect(() => {
        rerenderOrders();
    }, [filterData.orderId, filterData.email, filterData.dateOfOrder, filterData.sendDate, filterData.status, filterData.phone, filterData.page]);
    
    const rerenderOrders = () => {
        refreshOrders({
            orderId: filterData.orderId,
            email: filterData.email,
            dateOfOrder: filterData.dateOfOrder,
            sendDate: filterData.sendDate,
            status: filterData.status,
            phone: filterData.phone,
            page: filterData.page
            
        });
    };

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

    const onSearchInputChange = (e) => {
        const { id, value } = e.target;
        setFilterData({
            ...filterData,
            [id]: value
        });
    };

    const renderStatusSelectOptions = () => {
        return Object.values(ORDER_STATUSES).map(status => {return (
            <MenuItem key={status} value={status}>{status}</MenuItem>
        );});
    };


    const renderOrders = () => {
        if (orders) {
            return orders.searchingOrders.map((order,index) => {
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
        <DefaultLayout className='mt-10'>
            {showChangeStatusModal && <RadioModal onSaveClick={onSaveClick} title='Change Order Status' description='Choose the current status for the order' closeModal={onCloseModalClick}>
                <Checkbox title='In progress' className='mb-5' iconClassName='fill-blue' value={status.toLowerCase() === ORDER_STATUSES.IN_PROGRESS} onChange={()=> {return setStatus(ORDER_STATUSES.IN_PROGRESS);}}/>
                <Checkbox title='Shipped' className='mb-5' iconClassName='fill-blue' value={status.toLowerCase() === ORDER_STATUSES.SHIPPED} onChange={()=> {return setStatus(ORDER_STATUSES.SHIPPED);}}/>
                <Checkbox title='Canceled' iconClassName='fill-blue' value={status.toLowerCase() === ORDER_STATUSES.CANCELED} onChange={()=> {return setStatus(ORDER_STATUSES.CANCELED);}}/>
            </RadioModal>}
            <Filter>
                <div className='w-full flex flex-col'>
                    <div className='w-full flex'>
                        <Search id='orderId' placeholder='Search by order ID' value={filterData.orderId} onChange={onSearchInputChange} className='basis-1/3 mr-5' />
                        <Search id='email' placeholder='Search by email' value={filterData.email} onChange={onSearchInputChange} className='basis-1/3 mr-5' />
                        <Search id='phone' placeholder='Search by number phone' value={filterData.phone} onChange={onSearchInputChange} className='basis-1/3 mr-5' />
                    </div>
                    <div className='w-2/3 flex mt-6'>
                        <DateInput value={filterData.dateOfOrder} label="Order date" onChange={(e) => {
                            return setFilterData({
                                ... filterData, dateOfOrder: e
                            });
                        }} className={'!basis-1/3 mr-5'}
                        hasButton={true} onButtonClick={() => {return setFilterData({
                            ...filterData,
                            dateOfOrder: null
                        });}}
                        />
                        <DateInput label="Send date" onChange={(e) => {
                            return setFilterData({
                                ... filterData, sendDate: e
                            });
                        }} value={filterData.sendDate} className={'!basis-1/3 mr-5'}
                        hasButton={true} onButtonClick={() => {return setFilterData({
                            ...filterData,
                            sendDate: null
                        });}}
                        />
                        <SelectInput name='status' value={filterData.status} onChange={(e) => {return setFilterData(
                            {
                                ...filterData,
                                status: e.target.value
                            }
                        );
                        }} label='Status' className='basis-1/3'>
                            <MenuItem key='All' value='all'>all</MenuItem>
                            {renderStatusSelectOptions()}
                        </SelectInput>
                    </div>
                </div>
            </Filter>
            <TablePagination rowsPerPage={8} labelRowsPerPage={false} rowsPerPageOptions={[8]} count={orders.totalItems} page={filterData.page} onPageChange={(e, newPage) => {return setFilterData({
                ...filterData,
                page: newPage
            });}}
            className='mt-10' />
            <Table >
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
    );
};
