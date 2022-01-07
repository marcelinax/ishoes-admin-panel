import { LEGENDS, TYPES } from './../Constants';
import React, { useEffect, useState } from 'react';
import { deleteShoeProduct, getShoeProductById, setShoeProduct } from '../store/shoeProductsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { BiInfoCircle } from 'react-icons/bi';
import { Checkbox } from './../components/inputs/Checkbox';
import { DefaultLayout } from './../layouts/DefaultLayout';
import { Filter } from '../components/filter/Filter';
import { FilterItem } from '../components/filter/FilterItem';
import { Legend } from './../components/global/Legend';
import MenuItem from '@mui/material/MenuItem';
import { ProductCard } from './../components/ProductCard';
import { RadioInput } from './../components/inputs/RadioInput';
import { Search } from '../components/global/Search';
import { SelectInput } from './../components/inputs/Select';
import axios from 'axios';
import { config } from './../config/Config';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Products = () => {

    const [selectedType, setSelectedType] = useState('All');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [isLegendShown, setIsLegendShown] = useState(false);
    const shoeProducts = useSelector(state => { return state.shoeProducts.shoeProducts; });
    const brands = useSelector(state => {return state.brands.brands;});
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        renderProductCards();
    },[shoeProducts]);

    const onSelectedTypeChange = (e) => {
        setSelectedType(e.target.value);
    };
    const onSelectedBrandChange = (e) => {
        setSelectedBrand(e.target.value);
    };

    const renderSelectTypeOptions = () => {
        return TYPES.types.map(type => {return (
            <MenuItem key={type} value={type}>{type}</MenuItem>
        );});
    };

    const renderSelectBrandOptions = () => {
        return brands.map(brand => {return (
            <MenuItem key={brand.name} value={brand._id}>{brand.name}</MenuItem>
        );});
    };

    const renderProductCards = () => {
        if (shoeProducts) {
            return shoeProducts.map(product => {return (
                <ProductCard key={product._id} legend={setLegendsForShoeProducts(product)} onEditClick={()=>{return onEditClick(product);}} isEmpty={false} onDeleteClick={()=>{onDeleteProductShoeClick(product._id);}} amount={product.amount} brand={product.brand.name} model={product.model} size={product.size} bgImage={product.photos[0]} price={product.price}/>
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

    const getLegendsByParam = (param) => {
        return LEGENDS.legends.filter(legend => {return legend.title === param;})[0].color;
    };
    const setLegendsForShoeProducts = (shoeProduct) => {
        if (shoeProduct.amount === 0) {
            return getLegendsByParam(LEGENDS.legendsTitles.OUT_OF_STOCK);
        }
        if (shoeProduct.amount <= 5) {
            return getLegendsByParam(LEGENDS.legendsTitles.LAST_PAIRS);
        }
        if (shoeProduct.isOnSale) {
            return getLegendsByParam(LEGENDS.legendsTitles.ON_SALE);
        }
        if (moment().format('DD:MM:YYYY') <= moment(shoeProduct.createdAt).add(7,'days').format('DD:MM:YYYY')) {
        
            return getLegendsByParam(LEGENDS.legendsTitles.NEW);
        }
        
        else return getLegendsByParam(LEGENDS.legendsTitles.IN_STOCK);
    };

    const renderLegendsItems = () => {
        return LEGENDS.legends.map(legend => {return (
            <Legend className='mb-2' color={legend.color} title={legend.title} key={legend.title}/>
        );});
    };

    return (
        <>
            <DefaultLayout className='mt-20 flex flex-col'>
                <div className='w-full px-4'>
                    <Filter>
                        <div className='basis-5/6'>
                            <div className='w-full flex'>
                                <div className='basis-4/5 mb-10 justify-between flex '>
                                    <Search className='basis-1/2 mr-12' />
                                    <div className='basis-1/2'>
                                        <SelectInput name='type' value={selectedType} label="Type" onChange={onSelectedTypeChange} className='w-1/3 mr-5'>
                                            {renderSelectTypeOptions()}
                                        </SelectInput>
                                        <SelectInput name='brand' value={selectedBrand} label="Brand" onChange={onSelectedBrandChange} className='w-1/3'>
                                            {renderSelectBrandOptions()}
                                        </SelectInput>
                                    </div>
                                </div>
                            
                            </div>
                            <div className='w-full flex' >
                                <FilterItem title='Gender' className='mr-10'>
                                    <Checkbox title='Men' className='mr-5'/>
                                    <Checkbox title='Woman' className='mr-5'/>
                                    <Checkbox title='Kids'/>
                                </FilterItem>
                                <FilterItem title='On sale' className='mr-10'>
                                    <RadioInput radioGroupClassName='!flex-row -mt-2' radioClassName='text-blue' formControlLabelClassName='text-gray' />
                                </FilterItem>
                                <FilterItem title='Out of stock'>
                                    <RadioInput radioGroupClassName='!flex-row -mt-2' radioClassName='text-blue' formControlLabelClassName='text-gray'/>
                                </FilterItem>
                                <div />
                            </div>
                        </div>
                        <div className='basis-1/6 relative'>
                            <BiInfoCircle className='absolute z-10 cursor-pointer top-0 right-0 fill-gray' size={20} onMouseOver={()=>{return setIsLegendShown(true);}} onMouseLeave={()=>{return setIsLegendShown(false);}}/>
                            <div className={`basis-1/5 transition-all flex flex-col ${isLegendShown ? 'opacity-100' : 'opacity-0'}`}>
                                {renderLegendsItems()}
                            </div>
                        </div>
                    </Filter>
                </div>
                <div className='w-full mt-10'>
                    <div className='w-full max-h-[80vh] flex flex-wrap overflow-auto'>
                        <ProductCard isEmpty={true}/>
                        {renderProductCards()}
                    </div>
                </div>
            </DefaultLayout>
        </>
       
    );
};
