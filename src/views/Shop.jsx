import React, { useEffect, useState } from 'react';

import { DefaultLayout } from '../layouts/DefaultLayout';
import { Filter } from './../components/filter/Filter';
import { PrimaryButton } from './../components/global/PrimaryButton';
import { Search } from './../components/global/Search';
import { Spinner } from '../components/global/Spinner';
import { Table } from '../components/global/table/Table';
import { TableHeading } from './../components/global/table/TableHeading';
import { TablePagination } from './../components/global/table/TablePagination';
import { TableRow } from './../components/global/table/TableRow';
import { TableRowItem } from '../components/global/table/TableRowItem';
import { useRefreshShoeProducts } from './../hooks/useRefreshShoeProducts';
import { useSelector } from 'react-redux';

export const Shop = () => {

    const shoeProducts = useSelector(state => { return state.shoeProducts.shoeProducts; });
    const { refresh: refreshShoes } = useRefreshShoeProducts();
    const [filterData, setFilterData] = useState({
        query: '',
        page: 0
    });

    useEffect(() => {
        refreshShoes({
            query: filterData.query,
            page: filterData.page
        });
    }, [filterData]);

    
    
    const onSearchInputChange = (e) => {
        setFilterData({
            ...filterData,
            query: e.target.value
        });
    };

    const renderShoeProducts = () => {
        if(shoeProducts)
            return shoeProducts.searchingShoeProducts.map(shoeProduct => {
                const { _id, model, brand, size, colors, gender, price } = shoeProduct;
                return (
                    <TableRow key={_id}>
                        <TableRowItem>{_id}</TableRowItem>
                        <TableRowItem>{model}</TableRowItem>
                        <TableRowItem>{brand.name}</TableRowItem>
                        <TableRowItem>{size}</TableRowItem>
                        <TableRowItem>{colors.map(color => color)}</TableRowItem>
                        <TableRowItem>{gender}</TableRowItem>
                        <TableRowItem>{price}</TableRowItem>
                        <TableRowItem>
                            <PrimaryButton onClick={()=> {}} title='View' className='bg-blue !py-2 !px-5 text-xs' type='button'/>
                        </TableRowItem>
                    </TableRow>
                );
            });
    };
    
    return (
        <DefaultLayout>
            <Filter>
                <div className='w-full flex flex-col'>
                    <Search id='orderId' placeholder='Search...' value={filterData.orderId} onChange={onSearchInputChange} className='basis-1/3 mr-5' />
                </div>
            </Filter>
            <TablePagination rowsPerPage={2} labelRowsPerPage={false} rowsPerPageOptions={[8]} count={shoeProducts.totalItems} page={filterData.page} onPageChange={(e, newPage) => {return setFilterData({
                ...filterData,
                page: newPage 
            });}}
            className='mt-10' />
            <Table>
                <tbody>
                    <TableRow className='bg-blue'>
                        <TableHeading title='id'/>
                        <TableHeading title='model'/>
                        <TableHeading title='brand'/>
                        <TableHeading title='size' />
                        <TableHeading title='colors'/>
                        <TableHeading title='gender'/>
                        <TableHeading title='price'/>
                        <TableHeading title=''/>
                    </TableRow>
                    {renderShoeProducts()}
                </tbody>
            </Table>
        </DefaultLayout>
    ) 
    ;
};
