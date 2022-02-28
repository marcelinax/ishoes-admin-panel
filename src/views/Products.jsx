import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiInfoCircle } from 'react-icons/bi';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useRefreshShoeProducts } from '@hooks/useRefreshShoeProducts';
import shoeTypes from '@constants/shoeTypes';
import { ProductCard } from '@components/ProductCard';
import { calcProductPrice } from '@utils/calcProductPrice';
import { deleteShoeProduct } from '@state/shoe-products/shoeProductsSlice';
import { deleteShoeProductByIdService } from '@services/deleteShoeProductById.service';
import locales from '@constants/locales';
import { Legend } from '@components/global/Legend';
import { Checkbox } from '@components/Inputs/Checkbox';
import genderTypes from '@constants/genderTypes';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { Search } from '@components/global/Search';
import { Filter } from '@components/Filter/Filter';
import { SelectInput } from '@components/Inputs/SelectInput';
import { FilterItem } from '@components/Filter/FilterItem';
import { Pagination } from '@components/global/Pagination';
import legendTypes from '@constants/legendTypes';
import sortByTypes from '@constants/sortByTypes';

export const Products = () => {

    const [selectedType, setSelectedType] = useState('All');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [sortBy, setSortBy] = useState('all');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [genders, setGenders] = useState([]);
    const [isLegendShown, setIsLegendShown] = useState(false);
    const [isOnSale, setIsOnSale] = useState(null);
    const [isOutOfStock, setIsOutOfStock] = useState(null);
    const shoeProducts = useSelector(state => state.shoeProducts.shoeProducts);
    const brands = useSelector(state => state.brands.brands);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {refresh: refreshShoes} = useRefreshShoeProducts();

    useEffect(() => {
        renderProductCards();
    }, [shoeProducts]);
    
    useEffect(() => {
        refreshShoes({
            query: search,
            type: selectedType,
            brand: selectedBrand,
            genders: [...genders],
            isOnSale,
            isOutOfStock,
            sortBy,
            page
        });
    }, [selectedType, selectedBrand, search, genders, isOnSale, isOutOfStock, sortBy, page]);
    
    const onSelectedTypeChange = (e) => {
        setSelectedType(e.target.value);
    };
    const onSelectedBrandChange = (e) => {
        setSelectedBrand(e.target.value);
    };
    const onSortByChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleSearchInput = (e) => {
        setSearch(e.target.value);
    };

    const renderSelectTypeOptions = () => {
        return shoeTypes.map(type => {return (
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
            return shoeProducts.searchingShoeProducts.map(product => {return (
                <ProductCard id={product._id} key={product._id} calcProductPrice={calcProductPrice(product)} isOnSale={product.isOnSale} legend={setLegendsForShoeProducts(product)} onEditClick={()=>{return onEditClick(product);}} isEmpty={false} onDeleteClick={()=>{onDeleteProductShoeClick(product._id);}} amount={product.amount} brand={product.brand.name} model={product.model} size={product.size} bgImage={product.photos[0]} price={product.price}/>
            );});
        }
    };

    const onDeleteProductShoeClick = async (id) => {
        await deleteShoeProductByIdService(id);
        dispatch(deleteShoeProduct(id));
        toast.success(locales.PRODUCT_HAS_BEEN_DELETED);
    };

    const onEditClick = (shoeProduct) => {
        navigate(`/edit-product/${shoeProduct._id}`);
    };

    const onPageChange = (e, value) => {
        setPage(value);
    };

    const onGenderChange = (gender) => {
        if (!genders.includes(gender)) {
            setGenders([...genders,gender]);
        }
        else {
            genders.splice(genders.indexOf(gender), 1);
            setGenders([...genders]);
        }
    };

    const getLegendsByParam = (param) => {
        return legendTypes.filter(legend => legend.title === param).map((legend, index) => (
            <Legend color={legend.color} content={legend.content} key={index} />
        ));
    };
    const setLegendsForShoeProducts = (shoeProduct) => {
        const legends = [];
        if (shoeProduct.amount === 0) {
            legends.push(legendTypes[0].title);
        }
        if (shoeProduct.amount <= 5) {
            legends.push(legendTypes[3].title);
        }
        if (shoeProduct.isOnSale) {
            legends.push(legendTypes[1].title);
        }
        if (moment().format('DD:MM:YYYY') <= moment(shoeProduct.createdAt).add(7, 'days').format('DD:MM:YYYY')) {
            legends.push(legendTypes[2].title);
        }
        console.log(moment().format('DD:MM:YYYY') <= moment(shoeProduct.createdAt).add(7, 'days').format('DD:MM:YYYY'));
        return legends.map(legend => getLegendsByParam(legend));
    };

    const renderLegendsItems = () => {
        return legendTypes.map(legend => (
            <Legend className='mb-2' color={legend.color} title={legend.title} content={legend.content} key={legend.title}/>
        ));
    };

    const renderGendersCheckboxes = () => {
        return genderTypes.map(gender => {return (
            <Checkbox key={gender} title={gender} onChange={() => onGenderChange(gender)} value={genders.includes(gender)} className='mr-3'/>
        );});
    };

    const renderSortByItems = () => {
        return Object.values(sortByTypes).map(item => (
            <MenuItem key={item} value={item}>{item}</MenuItem>
        ));
    };

    return (
        <DefaultLayout className='mt-20 flex flex-col'>
            <div className='w-full px-4'>
                <Filter>
                    <div className='basis-5/6'>
                        <div className='w-full flex'>
                            <div className='basis-4/5 mb-10 justify-between flex items-center'>
                                <Search id='search' placeholder={locales.SEARCH} value={search} onChange={handleSearchInput} className='basis-1/2 mr-12' />
                                <div className='basis-1/2'>
                                    <SelectInput name='type' value={selectedType} label={locales.TYPE} onChange={onSelectedTypeChange} className='w-1/3 !mr-5'>
                                        {renderSelectTypeOptions()}
                                    </SelectInput>
                                    <SelectInput name='brand' value={selectedBrand} label={locales.BRAND} onChange={onSelectedBrandChange} className='w-1/3'>
                                        <MenuItem key='all' value='All'>{locales.ALL}</MenuItem>
                                        {renderSelectBrandOptions()}
                                    </SelectInput>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex'>
                            <FilterItem title={locales.GENDER} className='mr-10'>
                                {renderGendersCheckboxes()}
                            </FilterItem>
                            <FilterItem title={locales.ON_SALE} className='mr-10'>
                                <Checkbox title={locales.YES} value={isOnSale} onChange={() =>setIsOnSale(true)} className='mr-3'/>
                                <Checkbox title={locales.NO} value={isOnSale === false} onChange={() => setIsOnSale(false)} className='mr-3'/>
                                <Checkbox title='All' value={isOnSale === null} onChange={ () => setIsOnSale(null)}/>
                            </FilterItem>
                            <FilterItem title={locales.OUT_OF_STOCK} >
                                <Checkbox title={locales.YES} value={isOutOfStock === true} onChange={() => setIsOutOfStock(true)} className='mr-3'/>
                                <Checkbox title={locales.NO} value={isOutOfStock === false} onChange={() => setIsOutOfStock(false)} className='mr-3'/>
                                <Checkbox title='All' value={isOutOfStock === null} onChange={() => setIsOutOfStock(null)}/>
                            </FilterItem>
                            <div />
                        </div>
                    </div>
                    <div className='basis-1/6 relative'>
                        <BiInfoCircle className='absolute z-10 cursor-pointer top-0 right-0 fill-gray' size={20} onMouseOver={()=> setIsLegendShown(true)} onMouseLeave={()=> setIsLegendShown(false)}/>
                        <div className={`basis-1/5 transition-all flex flex-col ${isLegendShown ? 'opacity-100' : 'opacity-0'}`}>
                            {renderLegendsItems()}
                        </div>
                    </div>
                </Filter>
            </div>
            <div className='w-full px-4 flex mt-16 justify-end'>
                <SelectInput name='sortBy' label={locales.SORT_BY} value={sortBy} onChange={onSortByChange} className='w-1/12' >
                    {renderSortByItems()}
                </SelectInput>
            </div>
            <div className='w-full mt-4 mb-10'>
                <div className='w-full flex flex-wrap'>
                    <ProductCard isEmpty={true} id='empty-card'/>
                    {renderProductCards()}
                </div>
                <div className='w-full flex justify-center mt-10'>
                    <Pagination count={Math.ceil(shoeProducts.totalItems / 10)} page={page} onChange={onPageChange}/>
                </div>
            </div>
        </DefaultLayout>
       
    );
};
