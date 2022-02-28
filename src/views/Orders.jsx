import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useRefreshOrders } from '@hooks/useRefreshOrders';
import { useRefreshOrderStatus } from '@hooks/useRefreshOrderStatus';
import { useRefreshOrder } from '@hooks/useRefreshOrder';
import { setOrder } from '@state/orders/ordersSlice';
import orderStatuses from '@constants/orderStatuses';
import { TableRow } from '@components/global/Table/TableRow';
import { TableRowItem } from '@components/global/Table/TableRowItem';
import { Button } from '@components/global/Button';
import locales from '@constants/locales';
import buttonTypes from '@constants/buttonTypes';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { RadioModal } from '@components/global/RadioModal';
import { Checkbox } from '@components/Inputs/Checkbox';
import { Filter } from '@components/Filter/Filter';
import { Search } from '@components/global/Search';
import { DateInput } from '@components/Inputs/DateInput';
import { SelectInput } from '@components/Inputs/SelectInput';
import { TablePagination } from '@components/global/Table/TablePagination';
import { Table } from '@components/global/Table/Table';
import { TableHeading } from '@components/global/Table/TableHeading';

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
        toast.success(locales.ORDER_STATUS_HAS_BEEN_CHANGED);
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
        return Object.values(orderStatuses).map(status => {return (
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
                        {/* <TableRowItem className='text-red-600'>${products.map(product => {return product.price;}).reduce((acc, cur)=> {return acc + cur;})}</TableRowItem> */}
                        <TableRowItem >{moment(createdAt).format('DD-MM-YYYY HH:MM:SS')}</TableRowItem>
                        <TableRowItem >{status}</TableRowItem>
                        <TableRowItem className='w-1/12'>
                            <Button type='button' buttonType={buttonTypes.TEXT_BUTTON} title={locales.CHANGE} bgColor='bg-neutral-green' className='!py-2 !px-2 text-xs' onClick={() => onOpenModalClick(_id)}/>
                        </TableRowItem>
                        <TableRowItem >{phone}</TableRowItem>
                        <TableRowItem >{email}</TableRowItem>
                        <TableRowItem className='w-1/12'>
                            <Button type='button' buttonType={buttonTypes.TEXT_BUTTON} title={locales.VIEW} bgColor='bg-blue' className='!py-2 !px-5 text-xs' onClick={() => navigate(`/order-details/${_id}`)}/>
                        </TableRowItem>
                    </TableRow>
                );
            });
        }
    };

    return (
        <DefaultLayout className='mt-10'>
            {showChangeStatusModal && <RadioModal onSaveClick={onSaveClick} title={locales.CHANGE_ORDER_STATUS} description={locales.CHOOSE_CURRENT_STATUS_FOR_ORDER} closeModal={onCloseModalClick}>
                <Checkbox title={locales.IN_PROGRESS} className='mb-5' iconClassName='fill-blue' value={status.toLowerCase() === orderStatuses.IN_PROGRESS} onChange={()=> setStatus(orderStatuses.IN_PROGRESS)}/>
                <Checkbox title={locales.SHIPPED} className='mb-5' iconClassName='fill-blue' value={status.toLowerCase() === orderStatuses.SHIPPED} onChange={() => setStatus(orderStatuses.SHIPPED)}/>
                <Checkbox title={locales.CANCELED} iconClassName='fill-blue' value={status.toLowerCase() === orderStatuses.CANCELED} onChange={() => setStatus(orderStatuses.CANCELED)}/>
            </RadioModal>}
            <Filter>
                <div className='w-full flex flex-col'>
                    <div className='w-full flex'>
                        <Search id='orderId' placeholder={locales.SEARCH_BY_ORDER_ID} value={filterData.orderId} onChange={onSearchInputChange} className='basis-1/3 mr-5' />
                        <Search id='email' placeholder={locales.SEARCH_BY_EMAIL} value={filterData.email} onChange={onSearchInputChange} className='basis-1/3 mr-5' />
                        <Search id='phone' placeholder={locales.SEARCH_BY_NUMBER_PHONE} value={filterData.phone} onChange={onSearchInputChange} className='basis-1/3 mr-5' />
                    </div>
                    <div className='w-2/3 flex mt-6'>
                        <DateInput value={filterData.dateOfOrder} label={locales.ORDER_DATE} onChange={(e) => {
                            return setFilterData({
                                ... filterData, dateOfOrder: e
                            });
                        }} className={'!basis-1/3 mr-5'}
                        hasButton={true} onButtonClick={() => setFilterData({
                            ...filterData,
                            dateOfOrder: null
                        })}
                        />
                        <DateInput label={locales.SEND_DATE} onChange={(e) => setFilterData({
                            ... filterData, sendDate: e
                        })
                        } value={filterData.sendDate} className={'!basis-1/3 mr-5'}
                        hasButton={true} onButtonClick={() => setFilterData({
                            ...filterData,
                            sendDate: null
                        })}
                        />
                        <SelectInput name='status' value={filterData.status} onChange={(e) => setFilterData(
                            {
                                ...filterData,
                                status: e.target.value
                            }
                        )
                        } label={locales.STATUS} className='basis-1/3'>
                            <MenuItem key='All' value='all'>{locales.ALL}</MenuItem>
                            {renderStatusSelectOptions()}
                        </SelectInput>
                    </div>
                </div>
            </Filter>
            <TablePagination rowsPerPage={8} labelRowsPerPage={false} rowsPerPageOptions={[8]} count={orders.totalItems} page={filterData.page} onPageChange={(e, newPage) => setFilterData({
                ...filterData,
                page: newPage
            })}
            className='mt-10' />
            <Table>
                <tbody>
                    <TableRow className='bg-blue'>
                        <TableHeading title={locales.ORDER_ID}/>
                        <TableHeading title={locales.INCOME}/>
                        <TableHeading title={locales.DATE}/>
                        <TableHeading title={locales.STATUS} />
                        <TableHeading title=''/>
                        <TableHeading title={locales.PHONE}/>
                        <TableHeading title={locales.EMAIL}/>
                        <TableHeading title=''/>
                    </TableRow>
                    {renderOrders()}
                </tbody>
            </Table>
        </DefaultLayout>
    );
};
