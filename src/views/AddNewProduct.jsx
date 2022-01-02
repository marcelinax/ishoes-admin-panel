import React, { useState } from 'react';

import { ColorItem } from '../components/global/ColorItem';
import { DefaultLayout } from './../layouts/DefaultLayout';
import { Input } from './../components/inputs/Input';
import { MenuItem } from '@mui/material';
import { PhotoItem } from './../components/global/PhotoItem';
import { PrimaryButton } from './../components/global/PrimaryButton';
import { RadioInput } from './../components/inputs/RadioInput';
import { SelectInput } from '../components/inputs/Select';
import { constants } from './../Constants';

export const AddNewProduct = () => {

    const [gender, setGender] = useState('');
    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [isOnSale, setIsOnSale] = useState(false);

    const renderColorsItems = () => {
        return constants.colors.map(color => {return (
            <ColorItem key={color.title} color={color.color} title={color.title} className='w-12 h-12'/>
        );});
    };

    const renderGenderSelectOptions = () => {
        return constants.genders.map(gender => {return (
            <MenuItem key={gender} value={gender}>{gender}</MenuItem>
        );});
    };

    const renderTypeSelectOptions = () => {
        return constants.types.map(type => {return (
            <MenuItem key={type} value={type}>{type}</MenuItem>
        );});
    };
    const renderSizeSelectOptions = () => {
        return constants.sizes.map(size => {return (
            <MenuItem key={size} value={size}>{size}</MenuItem>
        );});
    };

    const onGenderSelectChange = (e) => {
        setGender(e.target.value);
    };
    const onTypeSelectChange = (e) => {
        setType(e.target.value);
    };
    const onSizeSelectChange = (e) => {
        setSize(e.target.value);
    };

    const onIsOnSaleChange = (e) => {
        setIsOnSale(e.target.value);
    };

    

    return (
        <div>
            <DefaultLayout className='mt-10'>
                <div className='w-2/3 mx-auto bg-white shadow-3xl'>
                    <form>
                        <div className='w-full p-16'>
                            <h1 className='text-3xl font-semibold mb-12 text-blue'>Add New Product</h1>
                            <div className='w-full flex items-end'>
                                <Input title='Model' className='basis-1/2 mr-3' />
                                <SelectInput label='Brand' className='basis-1/2' />
                            </div>
                            <div className='w-full flex items-end mt-8'>
                                <SelectInput label='Size' value={size} onChange={onSizeSelectChange} className='basis-1/5 !mr-3' >
                                    {renderSizeSelectOptions()}
                                </SelectInput>
                                <SelectInput label='Gender' value={gender} onChange={onGenderSelectChange} className='basis-1/5 !mr-3' >
                                    {renderGenderSelectOptions()}
                                </SelectInput>
                                <SelectInput label='Type' value={type} onChange={onTypeSelectChange} className='basis-2/5 !mr-3'>
                                    {renderTypeSelectOptions()}
                                </SelectInput>
                                <Input title='Amount' className='basis-1/5' />
                            </div>
                            <div className='w-full flex justify-between items-center mt-8'>
                                <Input title='Price' />
                                <div className='flex items-center'>
                                    <RadioInput value={isOnSale} onChange={onIsOnSaleChange} formControlLabelClassName='text-gray font-semibold' radioGroupClassName='!flex-row  mt-3' radioClassName='text-blue' />
                                    <Input title='Discount %' className='ml-4'/>
                                </div>
                            </div>
                            <div className='w-full flex mt-8'>
                                {renderColorsItems()}
                            </div>
                            <div className='w-full flex mt-8 overflow-auto pb-5 scrollbar'>
                                <PhotoItem isEmpty={true}/>
                                <PhotoItem isEmpty={true}/>
                                <PhotoItem isEmpty={true}/>
                                <PhotoItem isEmpty={true}/>
                                <PhotoItem isEmpty={true}/>
                                <PhotoItem isEmpty={true}/>
                                <PhotoItem isEmpty={true}/>
                                <PhotoItem isEmpty={true}/>
                            </div>
                            <div className='w-full flex justify-end mt-10'>
                                <PrimaryButton title='SAVE' type='submit' className='w-1/6 bg-blue'/>
                            </div>
                        </div>
                    </form>
                </div>
            </DefaultLayout>
        </div>
    );
};
