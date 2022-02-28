import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux';
import { getShoeProductByIdService } from '@services/getShoeProductById.service';
import { editShoeProductByIdService } from '@services/editShoeProductById.service';
import locales from '@constants/locales';
import { filterFormInputsErrors } from '@utils/filterFormInputsErrors';
import { Button } from '@components/global/Button';
import buttonTypes from '@constants/buttonTypes';
import { PhotoItem } from '@components/global/PhotoItem';
import { ColorItem } from '@components/global/ColorItem';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { Input } from '@components/Inputs/Input';
import { SelectInput } from '@components/Inputs/SelectInput';
import { RadioInput } from '@components/Inputs/RadioInput';
import shoeTypes from '@constants/shoeTypes';
import shoeSizes from '@constants/shoeSizes';
import shoeMaterials from '@constants/shoeMaterials';
import shoeColors from '@constants/shoeColors';
import messages from '@constants/messages';
import genderTypes from '@constants/genderTypes';

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
    const params = useParams();

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
        const res = await getShoeProductByIdService(params.id);
        setShoeProduct(res.data);
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
        return genderTypes.map(gender => {
            return (
                <MenuItem key={gender} value={gender}>{gender}</MenuItem>
            );
        });
    };

    const renderTypeSelectOptions = () => {
        return shoeTypes.filter(type => { return type !== 'All'; }).map(type => {
            return (
                <MenuItem key={type} value={type}>{type}</MenuItem>
            );
        });
    };
    const renderSizeSelectOptions = () => {
        return shoeSizes.map(size => {
            return (
                <MenuItem key={size} value={size}>{size}</MenuItem>
            );
        });
    };

    const renderMaterialSelectOptions = () => {
        return shoeMaterials.map(material => {
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
        return shoeColors.map(color => {
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
            errs.push(messages.MODEL_IS_REQUIRED);
            isValid = false;
        }
        if (!formData.amount) {
            errs.push(messages.AMOUNT_IS_REQUIRED);
            isValid = false;
        }
        if (numbersRegex.test(formData.amount) || formData.amount < 0) {
            errs.push(messages.AMOUNT_IS_NOT_A_NUMBER);
            isValid = false;
        }
        if (!formData.price) {
            errs.push(messages.PRICE_IS_REQUIRED);
            isValid = false;
        }
        if (numbersRegex.test(formData.price) || formData.price <= 0) {
            errs.push(messages.PRICE_IS_NOT_A_NUMBER);
            isValid = false;
        }
        if (!formData.brand) {
            errs.push(messages.BRAND_IS_REQUIRED);
            isValid = false;
        }
        if (!formData.gender) {
            errs.push(messages.GENDER_IS_REQUIRED);
            isValid = false;
        }
        if (!formData.material) {
            errs.push(messages.MATERIAL_IS_REQUIRED);
            isValid = false;
        }
        if (!formData.size) {
            errs.push(messages.SIZE_IS_REQUIRED);
            isValid = false;
        }
        if (!formData.type) {
            errs.push(messages.TYPE_IS_REQUIRED);
            isValid = false;
        }
        if (formData.colors.length === 0) {
            errs.push(messages.COLORS_IS_REQUIRED);
            isValid = false;
        }
        if (formData.photos.length === 0) {
            errs.push(messages.PHOTOS_IS_REQUIRED);
            isValid = false;
        }
        if (formData.isOnSale) {
            if (formData.discount < 1 || formData.discount > 100) {
                errs.push(messages.DISCOUNT_IS_NOT_A_NUMBER);
                isValid = false;
            }
            if (!formData.discount) {
                errs.push(messages.DISCOUNT_IS_REQUIRED);
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
                    await editShoeProductByIdService(shoeProduct._id, {
                        ...formData,
                        discount: 0
                    } );
                    toast.success(locales.PRODUCT_HAS_BEEN_EDITED);
                    navigate('/products');
                }
                catch (error) {
                    toast.error(error.response.data.message);
                }
            }
            else {
                try {
                    await editShoeProductByIdService(shoeProduct._id, {
                        ...formData,
                    } );
                    toast.success(locales.PRODUCT_HAS_BEEN_EDITED);
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

    return (
        <DefaultLayout className='mt-10'>
            <div className='w-2/3 mx-auto bg-white shadow-3xl mb-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <div className='w-full p-16'>
                        <h1 className='text-3xl font-semibold mb-12 text-blue'>{locales.EDIT}</h1>
                        <div className='w-full flex items-end'>
                            <Input type='text' title={locales.MODEL} id='model' className='basis-1/2 mr-3' value={formData.model} onChange={onChange} error={filterFormInputsErrors(errors, messages.MODEL_IS_REQUIRED)} />
                            <SelectInput name='brand' label={locales.BRAND} value={formData.brand} onChange={onSelectChange} className='basis-1/2' error={filterFormInputsErrors(errors, messages.BRAND_IS_REQUIRED)}>
                                {renderBrandSelectOptions()}
                            </SelectInput>
                        </div>
                        <div className='w-full flex items-end mt-8'>
                            <SelectInput name='size' label={locales.SIZE} value={formData.size} onChange={onSelectChange} className='basis-1/6 !mr-3' error={filterFormInputsErrors(errors, messages.SIZE_IS_REQUIRED)}>
                                {renderSizeSelectOptions()}
                            </SelectInput>
                            <SelectInput name='gender' label={locales.GENDER} value={formData.gender} onChange={onSelectChange} className='basis-1/6 !mr-3' error={filterFormInputsErrors(errors, messages.GENDER_IS_REQUIRED)}>
                                {renderGenderSelectOptions()}
                            </SelectInput>
                            <SelectInput name='type' label={locales.TYPE} value={formData.type} onChange={onSelectChange} className='basis-1/6 !mr-3' error={filterFormInputsErrors(errors, messages.TYPE_IS_REQUIRED)}>
                                {renderTypeSelectOptions()}
                            </SelectInput>
                            <SelectInput name='material' label={locales.MATERIAL} value={formData.material} onChange={onSelectChange} className='basis-1/6 !mr-3' error={filterFormInputsErrors(errors, messages.MATERIAL_IS_REQUIRED)}>
                                {renderMaterialSelectOptions()}
                            </SelectInput>
                            <Input type='number' title={locales.AMOUNT} id='amount' value={formData.amount} onChange={onChange} className='basis-1/6 !appearance-none' error={filterFormInputsErrors(errors, messages.AMOUNT_IS_NOT_A_NUMBER) || filterFormInputsErrors(errors, messages.AMOUNT_IS_REQUIRED)}/>
                        </div>
                        <div className='w-full flex justify-between items-center mt-8'>
                            <Input type='number' title={locales.PRICE} id='price' value={formData.price} onChange={onChange} error={filterFormInputsErrors(errors, messages.PRICE_IS_NOT_A_NUMBER) || filterFormInputsErrors(errors, messages.PRICE_IS_REQUIRED)}/>
                            <div className='flex items-center'>
                                <RadioInput value={formData.isOnSale} label={locales.ON_SALE} onChange={onIsOnSaleChange} formControlLabelClassName='text-gray font-semibold' radioGroupClassName='!flex-row  mt-3' radioClassName='text-blue' />
                                <Input disabled={!formData.isOnSale } type='number' title={locales.DISCOUNT_IN_PERCENTAGES} id='discount' value={formData.discount} onChange={onChange} className='ml-4' error={filterFormInputsErrors(errors, messages.DISCOUNT_IS_REQUIRED) || errors.includes(errors, messages.DISCOUNT_IS_NOT_A_NUMBER)}/>
                            </div>
                        </div>
                        <div className='w-full flex flex-col mt-8 '>
                            {filterFormInputsErrors(errors, messages.COLORS_IS_REQUIRED) && <span className='text-xs mb-2 text-red-600 font-medium'>{filterFormInputsErrors(errors, messages.COLORS_IS_REQUIRED)}</span>}
                            <div className='w-full flex'>
                                {renderColorsItems()}
                            </div>
                        </div>
                        <div className='w-full flex flex-col mt-8 overflow-auto pb-5 scrollbar'>
                            {filterFormInputsErrors(errors, messages.PHOTOS_IS_REQUIRED) && <span className='text-xs mb-2 text-red-600 font-medium'>{filterFormInputsErrors(errors, messages.PHOTOS_IS_REQUIRED)}</span>}
                            <div className='w-full flex'>
                                {renderPhotosItems()}
                            </div>
                        </div>
                        <div className='w-full flex justify-end mt-10'>
                            <Button title={locales.SAVE} type='submit' buttonType={buttonTypes.TEXT_BUTTON} onClick={onSubmit} bgColor='bg-blue' className='w-1/6' />
                        </div>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
};
