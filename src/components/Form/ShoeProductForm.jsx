import { Button } from '@components/global/Button';
import { Input } from '@components/Inputs/Input';
import { RadioInput } from '@components/Inputs/RadioInput';
import { SelectInput } from '@components/Inputs/SelectInput';
import buttonTypes from '@constants/buttonTypes';
import locales from '@constants/locales';
import messages from '@constants/messages';
import { useShoeProductForm } from '@hooks/useShoeProductForm';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { filterFormInputsErrors } from '@utils/filterFormInputsErrors';
import React from 'react';

export const ShoeProductForm = ({ formData, setFormData, onSubmit, renderPhotosItems, errors, renderColorsItems, renderGenderSelectOptions, renderBrandSelectOptions,
    renderTypeSelectOptions, renderSizeSelectOptions, onSelectChange, onIsOnSaleChange, onChange, renderMaterialSelectOptions
}) => {

    return (
        <DefaultLayout className='mt-10'>
            <div className='w-2/3 mx-auto bg-white shadow-3xl mb-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <div className='w-full p-16'>
                        <h1 className='text-3xl font-semibold mb-12 text-blue'>{locales.ADD_NEW_PRODUCT}</h1>
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
                            <Button title={locales.SAVE} type='submit' buttonType={buttonTypes.TEXT_BUTTON} onClick={onSubmit} className='w-1/6 ' bgColor='bg-blue'/>
                        </div>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
};
