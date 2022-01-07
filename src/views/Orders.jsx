import { DefaultLayout } from '../layouts/DefaultLayout';
import { PrimaryButton } from './../components/global/PrimaryButton';
import React from 'react';
import { TableHeading } from '../components/table/TableHeading';
import { TableRow } from '../components/table/TableRow';
import { TableRowItem } from '../components/table/TableRowItem';

export const Orders = () => {
    return (
        <>
            <DefaultLayout className='mt-10'>
                <table className='w-full shadow-3xl bg-white rounded-md overflow-hidden'>
                    <TableRow className='bg-blue'>
                        <TableHeading title='index'/>
                        <TableHeading title='order id'/>
                        <TableHeading title='income'/>
                        <TableHeading title='date'/>
                        <TableHeading title='email'/>
                        <TableHeading title='actions'/>
                       
                    </TableRow>
                    <TableRow>
                        <TableRowItem>1</TableRowItem>
                        <TableRowItem>12345ASDFG</TableRowItem>
                        <TableRowItem id='income'>$120</TableRowItem>
                        <TableRowItem>12/12/2021</TableRowItem>
                        <TableRowItem>marcelina@o2.pl</TableRowItem>
                        <TableRowItem>
                            <PrimaryButton title='Details' className='bg-blue px-5 text-xs'/>
                        </TableRowItem>
                    </TableRow>
                    <TableRow>
                        <TableRowItem>2</TableRowItem>
                        <TableRowItem>12345ASDFG</TableRowItem>
                        <TableRowItem>$120</TableRowItem>
                        <TableRowItem>12/12/2021</TableRowItem>
                        <TableRowItem>marcelina@o2.pl</TableRowItem>
                        <TableRowItem>
                            <PrimaryButton title='Details' className='bg-blue px-5 text-xs'/>
                        </TableRowItem>
                    </TableRow>
                </table>
            </DefaultLayout>
        </>
    );
};

// 