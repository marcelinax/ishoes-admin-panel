import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { PhotoItem } from '@components/global/PhotoItem';
import { addShoeProduct } from '@state/shoe-products/shoeProductsSlice';
import locales from '@constants/locales';
import { createShoeProductService } from '@services/createShoeProduct.service';
import { useShoeProductForm } from '@hooks/useShoeProductForm';
import { useNavigate } from 'react-router-dom';
import { ShoeProductForm } from '@components/Form/ShoeProductForm';

export const CreateShoeProductForm = () => {

    const { formData, errors, handleFileUpload, handleFileRemove, renderColorsItems, renderGenderSelectOptions, renderBrandSelectOptions, renderTypeSelectOptions,
        renderSizeSelectOptions, renderMaterialSelectOptions, onSelectChange, onIsOnSaleChange, checkFormValidation, onChange } = useShoeProductForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addNewProduct = async () => {
        if (checkFormValidation()) {
            if (!formData.isOnSale) {
                try {
                    const res = await createShoeProductService({
                        ...formData,
                        discount: 0
                    });
                    dispatch(addShoeProduct(res.data));
                    toast.success(locales.PRODUCT_HAS_BEEN_ADDED);
                    navigate('/products');
                } catch (error) {
                    toast.error(error.response.data.message);
                }
            }
            else {
                try {
                    const res = await createShoeProductService({
                        ...formData,
                    });
                    dispatch(addNewProduct(res.data));
                    toast.success(locales.PRODUCT_HAS_BEEN_ADDED);
                    navigate('/products');
                } catch (error) {
                    toast.error(error.response.data.message);
                }
            }
        }
    };

    const renderPhotosItems = () => {
        const photosEl = [];
        for (let i = 0; i < 6; i++) {
            photosEl.push(<PhotoItem key={i} onFileUpload={handleFileUpload} onFileRemove={handleFileRemove} />);
        }
        return photosEl;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await addNewProduct();
    };
    
    return (
        <ShoeProductForm formData={formData} onSubmit={onSubmit} renderPhotosItems={renderPhotosItems}
            errors={errors} renderColorsItems={renderColorsItems} renderGenderSelectOptions={renderGenderSelectOptions} renderBrandSelectOptions={renderBrandSelectOptions}
            renderTypeSelectOptions={renderTypeSelectOptions} renderSizeSelectOptions={renderSizeSelectOptions} renderMaterialSelectOptions={renderMaterialSelectOptions}
            onSelectChange={onSelectChange} onIsOnSaleChange={onIsOnSaleChange} onChange={onChange}
        />
    );
};
