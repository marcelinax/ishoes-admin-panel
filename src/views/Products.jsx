import React, { useState } from 'react';

import { DefaultLayout } from './../layouts/DefaultLayout';
import MenuItem from '@mui/material/MenuItem';
import { ProductCard } from './../components/ProductCard';
import { Search } from '../components/global/Search';
import { SelectInput } from './../components/inputs/Select';
import { TYPES } from './../Constants';
import { useSelector } from 'react-redux';

export const Products = () => {

    const [selectedType, setSelectedType] = useState('All');
    const shoeProducts = useSelector(state => {return state.shoeProducts.shoeProducts;});

    const onSelectedTypeChange = (e) => {
        setSelectedType(e.target.value);
    };


    const renderSelectTypeOptions = () => {
        return TYPES.types.map(type => {return (
            <MenuItem key={type} value={type}>{type}</MenuItem>
        );});
    };

    const renderProductCards = () => {
        if (shoeProducts) {
            return shoeProducts.map(product => {return (
                <ProductCard key={product.id} amount={product.amount} brand={product.brand} model={product.model} size={product.size} bgImage={product.photos[0]} price={product.price}/>
            );});
        }
    };

    return (
        <>
            <DefaultLayout className='mt-20'>
                <div className='w-full mb-10 justify-center flex'>
                    <Search className='w-1/3 mr-12' />
                    <SelectInput value={selectedType} label="Type" onChange={onSelectedTypeChange} className='w-2/12'>
                        {renderSelectTypeOptions()}
                    </SelectInput>
                </div>
                <div className='w-full max-h-[80vh] flex flex-wrap overflow-auto'>
                    <ProductCard isEmpty={true}/>
                    {renderProductCards()}
                </div>
            </DefaultLayout>
        </>
       
    );
};
