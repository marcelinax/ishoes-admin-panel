import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PhotoItem } from '@components/global/PhotoItem';
import locales from '@constants/locales';
import { useShoeProductForm } from '@hooks/useShoeProductForm';
import { useNavigate, useParams } from 'react-router-dom';
import { editShoeProductByIdService } from '@services/editShoeProductById.service';
import { getShoeProductByIdService } from '@services/getShoeProductById.service';
import { ShoeProductForm } from '@components/Form/ShoeProductForm';

export const EditShoeProductForm = () => {

    const { formData, setFormData, errors, handleFileUpload, handleFileRemove, renderColorsItems, renderGenderSelectOptions, renderBrandSelectOptions, renderTypeSelectOptions,
        renderSizeSelectOptions, renderMaterialSelectOptions, onSelectChange, onIsOnSaleChange, checkFormValidation, onChange } = useShoeProductForm();
    const navigate = useNavigate();
    const params = useParams();
    const [shoeProduct, setShoeProduct] = useState(null);

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
    const onEditShoeProduct = async () => {
        if (checkFormValidation()) {
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
        <ShoeProductForm formData={formData} setFormData={setFormData} onSubmit={onSubmit} renderPhotosItems={renderPhotosItems}
            errors={errors} renderColorsItems={renderColorsItems} renderGenderSelectOptions={renderGenderSelectOptions} renderBrandSelectOptions={renderBrandSelectOptions}
            renderTypeSelectOptions={renderTypeSelectOptions} renderSizeSelectOptions={renderSizeSelectOptions} renderMaterialSelectOptions={renderMaterialSelectOptions}
            onSelectChange={onSelectChange} onIsOnSaleChange={onIsOnSaleChange} onChange={onChange}/>
    );
};
