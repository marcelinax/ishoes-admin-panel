import React, { useEffect, useState } from 'react';
import { deleteShoeProduct, getShoeProductById, setShoeProduct } from '../store/shoeProductsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { DefaultLayout } from './../layouts/DefaultLayout';
import MenuItem from '@mui/material/MenuItem';
import { ProductCard } from './../components/ProductCard';
import { Search } from '../components/global/Search';
import { SelectInput } from './../components/inputs/Select';
import { TYPES } from './../Constants';
import axios from 'axios';
import { config } from './../config/Config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Products = () => {

    const [selectedType, setSelectedType] = useState('All');
    const shoeProducts = useSelector(state => { return state.shoeProducts.shoeProducts; });
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        renderProductCards();
    },[shoeProducts]);

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
                <ProductCard key={product._id} onEditClick={()=>{return onEditClick(product);}} isEmpty={false} onDeleteClick={()=>{onDeleteProductShoeClick(product._id);}} amount={product.amount} brand={product.brand.name} model={product.model} size={product.size} bgImage={product.photos[0]} price={product.price}/>
            );});
        }
    };

    const onDeleteProductShoeClick = async (id) => {
        await axios.delete(config.apiUrl + `shoeProducts/${id}`);
        await dispatch(deleteShoeProduct(id));
        toast.success('Product has been deleted');
    };

    const onEditClick = async (shoeProduct) => {
        navigate(`/edit-product/${shoeProduct._id}`);
    };


    return (
        <>
            <DefaultLayout className='mt-20'>
                <div className='w-full mb-10 justify-center flex'>
                    <Search className='w-1/3 mr-12' />
                    <SelectInput name='type' value={selectedType} label="Type" onChange={onSelectedTypeChange} className='w-2/12'>
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
