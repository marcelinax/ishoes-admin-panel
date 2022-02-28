import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
import { PhotoItem } from '@components/global/PhotoItem';
import { ColorItem } from '@components/global/ColorItem';
import shoeTypes from '@constants/shoeTypes';
import shoeSizes from '@constants/shoeSizes';
import shoeMaterials from '@constants/shoeMaterials';
import shoeColors from '@constants/shoeColors';
import messages from '@constants/messages';
import genderTypes from '@constants/genderTypes';
import { useSelector } from 'react-redux';

export const useShoeProductForm = (form = {
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
}) => {
    const brands = useSelector(state => state.brands.brands);
    const [formData, setFormData] = useState(form);
    const [errors, setErrors] = useState([]);

    const handleFileUpload = (fileUrl) => {
        setFormData({ ...formData, photos: [...formData.photos, fileUrl] });
    };
    
    const handleFileRemove = (fileUrl) => {
        setFormData({ ...formData, photos: [...formData.photos.filter(i => i !== fileUrl)] });
    };

    const renderColorsItems = () => {
        return shoeColors.map(color => {
            return (
                <ColorItem key={color.title} isChosen={formData.colors.includes(color.title)} onClick={() => { return onIsColorChosenChange(color.title); }} color={color.color} title={color.title} className='w-12 h-12' />
            );
        });
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
        return brands.map(brand => {
            return (
                <MenuItem key={brand.name} value={brand._id}>{brand.name}</MenuItem>
            );
        });
    };

    const onChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const onSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };


    const onIsOnSaleChange = (e) => {
        setFormData({ ...formData, isOnSale: Boolean(+e.target.value) });
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

    const checkFormValidation = () => {
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
        console.log(errs);
        return isValid;
    };

    return {
        setFormData, formData, errors, handleFileUpload, handleFileRemove, renderColorsItems, renderGenderSelectOptions, renderBrandSelectOptions, renderTypeSelectOptions,
        renderSizeSelectOptions, renderMaterialSelectOptions, onSelectChange, onIsOnSaleChange, checkFormValidation, onChange
    };
};