import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createBrandService } from '@services/createBrand.service';
import { deleteBrandByIdService } from '@services/deleteBrandById.service';
import { BrandItem } from '@components/BrandItem';
import locales from '@constants/locales';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { Input } from '@components/Inputs/Input';
export const Brands = () => {

    const [brand, setBrand] = useState('');
    const brands = useSelector(state => { return state.brands.brands; });
    const dispatch = useDispatch();

    useEffect(() => {
        renderBrandsItems();
    }, [brands]);

    const handleBrandInput = (e) => {
        setBrand(e.target.value);
    };
    const addNewBrand = async () => {
        try {
            const res = await createBrandService(brand);
            dispatch(addNewBrand(res.data));
            toast.success(locales.BRAND_HAS_BEEN_ADDED);
            setBrand('');
        } catch (error) {
            toast.error(error.response.data.errors[0].msg);
        }
        
    };

    const removeBrand = async (id) => {
        await deleteBrandByIdService(id);
        dispatch(deleteBrandByIdService(id));
        toast.success(locales.BRAND_HAS_BEEN_DELETED);
    };

    const renderBrandsItems = () => {
        if (brands) {
            return brands.map(brand => {return (
                <BrandItem key={brand._id} title={brand.name} onClick={()=> {return removeBrand(brand._id);}}/>
            );});
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await addNewBrand();
    };

    return (
        <DefaultLayout className='mt-10'>
            <div className='w-2/3 mx-auto h-[40vh] rounded-md bg-white shadow-3xl mb-10'>
                <form onSubmit={onSubmit}>
                    <div className='w-full p-16'>
                        <h1 className='text-3xl font-semibold mb-12 text-blue'>{locales.BRANDS}</h1>
                        <div className='w-full flex justify-between'>
                            <div className='basis-1/2 mr-16'>
                                <Input id='brand' title={locales.BRAND} type='text' value={brand} onChange={handleBrandInput}/>
                            </div>
                            <div className='basis-1/2 h-full rounded-md'>
                                <div className='max-h-[15vh] flex flex-col overflow-auto scrollbar shadow-inner p-4'>
                                    {renderBrandsItems()}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
};
