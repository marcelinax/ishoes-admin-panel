import { COLORS, ERRORS, GENDERS, MATERIALS, SIZES, TYPES } from './../Constants';
import React, { useEffect, useState } from 'react';

import { ColorItem } from './../components/global/ColorItem';
import { DefaultLayout } from './../layouts/DefaultLayout';
import { Input } from './../components/inputs/Input';
import { MenuItem } from '@mui/material';
import { PhotoItem } from './../components/global/PhotoItem';
import { PrimaryButton } from './../components/global/PrimaryButton';
import { RadioInput } from './../components/inputs/RadioInput';
import { SelectInput } from './../components/inputs/Select';
import axios from 'axios';
import { config } from './../config/Config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';

export const EditShoeProduct = () => {

    const [shoeProduct, setShoeProduct] = useState(null);
    const brands = useSelector(state => { return state.brands.brands; });
    const [formData, setFormData] = useState({
        model: '',
        brand: '',
        material: '',
        size: '',
        gender: '',
        type: '',
        amount: 0,
        price: 0,
        colors: [],
        photos: [],
        isOnSale: false,
        opinions: [],
        discount: 0
    });


    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getShoeProductById();
    }, []);


    useEffect(() => {
        if (shoeProduct) {
            setFormData({
                model: shoeProduct.model,
                brand: shoeProduct.brand._id,
                material: shoeProduct.material,
                size: shoeProduct.size,
                gender: shoeProduct.gender,
                type: shoeProduct.type,
                amount: shoeProduct.amount,
                price: shoeProduct.price,
                colors: [...shoeProduct.colors],
                photos: [...shoeProduct.photos],
                isOnSale: shoeProduct.isOnSale,
                opinions: shoeProduct.opinions,
                discount: shoeProduct.discount
            });
        }
        
    }, [shoeProduct]);

    const getShoeProductById = async () => {
        await axios.get(config.apiUrl + `shoeProducts/${location.pathname.split('/').reverse()[0]}`).then(res => {return setShoeProduct(res.data);});
    };


    const handleFileUpload = (fileUrl) => {
        setFormData({ ...formData, photos: [...formData.photos, fileUrl] });
    };
    
    const handleFileRemove = (fileUrl) => {
        setFormData({ ...formData, photos: [...formData.photos.filter(i => { return i !== fileUrl; })] });
    };

    const renderPhotosItems = () => {
        const photosEl = [];
        formData.photos.forEach((photo,index) => {
            photosEl.push(<PhotoItem key={index} onFileUpload={handleFileUpload} onFileRemove={handleFileRemove} value={photo} />);
        });
        for (let i = photosEl.length; i < 6; i++) {
            photosEl.push(<PhotoItem key={i} onFileUpload={handleFileUpload} onFileRemove={handleFileRemove} value='' />);
        }
        return photosEl;
    };


    const renderGenderSelectOptions = () => {
        return GENDERS.genders.map(gender => {
            return (
                <MenuItem key={gender} value={gender}>{gender}</MenuItem>
            );
        });
    };

    const renderTypeSelectOptions = () => {
        return TYPES.types.filter(type => { return type !== 'All'; }).map(type => {
            return (
                <MenuItem key={type} value={type}>{type}</MenuItem>
            );
        });
    };
    const renderSizeSelectOptions = () => {
        return SIZES.sizes.map(size => {
            return (
                <MenuItem key={size} value={size}>{size}</MenuItem>
            );
        });
    };

    const renderMaterialSelectOptions = () => {
        return MATERIALS.materials.map(material => {
            return (
                <MenuItem key={material} value={material}>{material}</MenuItem>
            );
        });
    };

    const renderBrandSelectOptions = () => {
        if(brands)
            return brands.map(brand => {
                return (
                    <MenuItem key={brand.name} value={brand._id}>{brand.name}</MenuItem>
                );
            });
    };

    const renderColorsItems = () => {
        return COLORS.colors.map(color => {
            return (
                <ColorItem key={color.title} isChosen={formData.colors.includes(color.title)} onClick={() => { return onIsColorChosenChange(color.title); }} color={color.color} title={color.title} className='w-12 h-12' />
            );
        });
    };

    const onIsOnSaleChange = (e) => {
        setFormData({ ...formData, isOnSale: Boolean(+e.target.value) });
    };

    const onSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    const onChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const onIsColorChosenChange = (color) => {
        if (!formData.colors.includes(color)) {
            setFormData({ ...formData, colors: [...formData.colors, color] });
        }
        else {
            formData.colors.splice(formData.colors.indexOf(color), 1);
            setFormData({ ...formData });
        }
    };


    const checkIfFormInputsAreValid = () => {
        let isValid = true;
        let errs = [];
        const numbersRegex = /[^\d]/g;
        if (!formData.model) {
            errs.push(ERRORS.MODEL_IS_REQUIRED);
            isValid = false;
        }
        if (!formData.amount) {
            errs.push(ERRORS.AMOUNT_IS_REQUIRED);
            isValid = false;
        }
        if (numbersRegex.test(formData.amount) || formData.amount < 0) {
            errs.push(ERRORS.AMOUNT_IS_NOT_A_NUMBER);
            isValid = false;
        }
        if (!formData.price) {
            errs.push(ERRORS.PRICE_IS_REQUIRED);
            isValid = false;
        }
        if (numbersRegex.test(formData.price) || formData.price <= 0) {
            errs.push(ERRORS.PRICE_IS_NOT_A_NUMBER);
            isValid = false;
        }
        if (!formData.brand) {
            errs.push(ERRORS.BRAND_IS_REQUIRED);
            isValid = false;
        }
        if (!formData.gender) {
            errs.push(ERRORS.GENDER_IS_REQUIRED);
            isValid = false;
        }
        if (!formData.material) {
            errs.push(ERRORS.MATERIAL_IS_REQUIRED);
            isValid = false;
        }
        if (!formData.size) {
            errs.push(ERRORS.SIZE_IS_REQUIRED);
            isValid = false;
        }
        if (!formData.type) {
            errs.push(ERRORS.TYPE_IS_REQUIRED);
            isValid = false;
        }
        if (formData.colors.length === 0) {
            errs.push(ERRORS.COLORS_IS_REQUIRED);
            isValid = false;
        }
        if (formData.photos.length === 0) {
            errs.push(ERRORS.PHOTOS_IS_REQUIRED);
            isValid = false;
        }
        if (formData.isOnSale) {
            if (formData.discount < 1 || formData.discount > 100) {
                errs.push(ERRORS.DISCOUNT_IS_NOT_A_NUMBER);
                isValid = false;
            }
            if (!formData.discount) {
                errs.push(ERRORS.DISCOUNT_IS_REQUIRED);
                isValid = false;
            }
        }
        setErrors([...errs]);
        return isValid;
    };


    const onEditShoeProduct = async () => {
        if (checkIfFormInputsAreValid()) {
            if (!formData.isOnSale) {
                try {
                    await axios.put(config.apiUrl + `shoeProducts/${shoeProduct._id}`, {
                        ...formData,
                        discount: 0
                    });
                    toast.success('Product has been edited');
                    navigate('/products');
                }
                catch (error) {
                    toast.error(error.response.data.message);
                }
            }
            else {
                try {
                    await axios.put(config.apiUrl + `shoeProducts/${shoeProduct._id}`, {
                        ...formData
                    });
                    toast.success('Product has been edited');
                    navigate('/products');
                }
                catch (error) {
                    toast.error(error.response.data.message);
                }
            }
            
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await onEditShoeProduct();
        
    };

    const filterFormInputsErrors = (error) => {
        return errors.filter(err => {return err === error;})[0];
    };

    return (
        <div>
            <DefaultLayout className='mt-10'>
                <div className='w-2/3 mx-auto bg-white shadow-3xl mb-10 rounded-md'>
                    <form onSubmit={onSubmit}>
                        <div className='w-full p-16'>
                            <h1 className='text-3xl font-semibold mb-12 text-blue'>Edit</h1>
                            <div className='w-full flex items-end'>
                                <Input type='text' title='Model' id='model' className='basis-1/2 mr-3' value={formData.model} onChange={onChange} error={filterFormInputsErrors(ERRORS.MODEL_IS_REQUIRED)} />
                                <SelectInput name='brand' label='Brand' value={formData.brand} onChange={onSelectChange} className='basis-1/2' error={filterFormInputsErrors(ERRORS.BRAND_IS_REQUIRED)}>
                                    {renderBrandSelectOptions()}
                                </SelectInput>
                                {console.log(formData.photos)}
                            </div>
                            <div className='w-full flex items-end mt-8'>
                                <SelectInput name='size' label='Size' value={formData.size} onChange={onSelectChange} className='basis-1/6 !mr-3' error={filterFormInputsErrors(ERRORS.SIZE_IS_REQUIRED)}>
                                    {renderSizeSelectOptions()}
                                </SelectInput>
                                <SelectInput name='gender' label='Gender' value={formData.gender} onChange={onSelectChange} className='basis-1/6 !mr-3' error={filterFormInputsErrors(ERRORS.GENDER_IS_REQUIRED)}>
                                    {renderGenderSelectOptions()}
                                </SelectInput>
                                <SelectInput name='type' label='Type' value={formData.type} onChange={onSelectChange} className='basis-1/6 !mr-3' error={filterFormInputsErrors(ERRORS.TYPE_IS_REQUIRED)}>
                                    {renderTypeSelectOptions()}
                                </SelectInput>
                                <SelectInput name='material' label='Material' value={formData.material} onChange={onSelectChange} className='basis-1/6 !mr-3' error={filterFormInputsErrors(ERRORS.MATERIAL_IS_REQUIRED)}>
                                    {renderMaterialSelectOptions()}
                                </SelectInput>
                                <Input type='number' title='Amount' id='amount' value={formData.amount} onChange={onChange} className='basis-1/6 !appearance-none' error={filterFormInputsErrors(ERRORS.AMOUNT_IS_NOT_A_NUMBER) || filterFormInputsErrors(ERRORS.AMOUNT_IS_REQUIRED)}/>
                            </div>
                            <div className='w-full flex justify-between items-center mt-8'>
                                <Input type='number' title='Price' id='price' value={formData.price} onChange={onChange} error={filterFormInputsErrors(ERRORS.PRICE_IS_NOT_A_NUMBER) || filterFormInputsErrors(ERRORS.PRICE_IS_REQUIRED)}/>
                                <div className='flex items-center'>
                                    <RadioInput value={formData.isOnSale} onChange={onIsOnSaleChange} formControlLabelClassName='text-gray font-semibold' radioGroupClassName='!flex-row  mt-3' radioClassName='text-blue' />
                                    <Input disabled={!formData.isOnSale } type='number' title='Discount %' id='discount' value={formData.discount} onChange={onChange} className='ml-4' error={filterFormInputsErrors(ERRORS.DISCOUNT_IS_REQUIRED) || errors.includes(ERRORS.DISCOUNT_IS_NOT_A_NUMBER)}/>
                                </div>
                            </div>
                            <div className='w-full flex flex-col mt-8 '>
                                {filterFormInputsErrors(ERRORS.COLORS_IS_REQUIRED) && <span className='text-xs mb-2 text-red-600 font-medium'>{filterFormInputsErrors(ERRORS.COLORS_IS_REQUIRED)}</span>}
                                <div className='w-full flex'>
                                    {renderColorsItems()}
                                </div>
                            </div>
                            <div className='w-full flex flex-col mt-8 overflow-auto pb-5 scrollbar'>
                                {filterFormInputsErrors(ERRORS.PHOTOS_IS_REQUIRED) && <span className='text-xs mb-2 text-red-600 font-medium'>{filterFormInputsErrors(ERRORS.PHOTOS_IS_REQUIRED)}</span>}
                                <div className='w-full flex'>
                                    {renderPhotosItems()}
                                </div>
                            </div>
                            <div className='w-full flex justify-end mt-10'>
                                <PrimaryButton title='SAVE' type='submit' onClick={onSubmit} className='w-1/6 bg-blue'/>
                            </div>
                        </div>
                    </form>
                </div>
            </DefaultLayout>
        </div>
    );
};
