import { BiPencil, BiPlus, BiTrashAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/global/Button';
import buttonTypes from '@constants/buttonTypes';
import locales from '@constants/locales';

export const ProductCard = ({id, isEmpty, bgImage, size, amount, price, model, brand ,isOnSale, onDeleteClick, onEditClick, legend, calcProductPrice }) => {
    const navigate = useNavigate();
    
    const renderProductCard = () => {
        if (!isEmpty) {
            return <div className='my-2 px-4 w-full h-48'>
                <div className='w-full h-full p-6 flex shadow-3xl rounded-lg relative'>
                    <div className='basis-1/5 h-full'>
                        <div className='w-full h-full bg-center bg-no-repeat bg-contain rounded-lg' style={{backgroundImage: `url(${bgImage})`}} />
                    </div>
                    <div className='basis-4/5 ml-6 py-5 flex items-center'>
                        <div className='basis-2/4 flex flex-col'>
                            <p className='font-semibold text-sm'>{brand}</p>
                            <p className='text-gray text-sm font-semibold'>{model}</p>
                            <p className='font-semibold text-sm mt-2 text-blue'>{id}</p>
                        </div>
                        <div className='basis-1/4 flex flex-col justify-between'>
                            <p className='font-semibold text-sm text-neutral-green'>{locales.SIZE}: {size}</p>
                            <p className='font-semibold text-blue text-sm'>{locales.AMOUNT}: {amount}</p>
                            <div className='w-full flex items-center'>
                                {isOnSale && <p className={` font-semibold ${isOnSale? 'text-xs line-through text-gray mr-2' : 'text-red-600'}`}>${price.toFixed(2)}</p>}
                                <p className={'text-red-600 text-sm font-semibold '}>${calcProductPrice}</p>
                            </div>
                            <div className='w-full flex mt-2'>{legend}</div>
                        </div>
                        <div className='basis-1/4 flex flex-col items-center'>
                            <Button type='button' buttonType={buttonTypes.ICON_BUTTON} bgColor='bg-blue' className='mb-2' onClick={onEditClick}>
                                <BiPencil/>
                            </Button>
                            <Button type='button' buttonType={buttonTypes.ICON_BUTTON} bgColor='bg-red-600' onClick={onDeleteClick}>
                                <BiTrashAlt/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>;
        }
        else return <div className='my-2 px-4 w-full h-48 group hover:scale-95 transition-all cursor-pointer' onClick={()=> {return navigate('/add-new-product');}}>
            <div className='w-full h-full p-10 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-lg relative'>
                <BiPlus size={30} className='fill-zinc-400' />
                <p className='text-blue font-semibold text-sm mt-2'>{locales.ADD_NEW_PRODUCT}</p>
            </div>
        </div>
        ;
    };
    return renderProductCard();
};

ProductCard.propTypes = {
    isEmpty: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    bgImage: PropTypes.string,
    isOnSale: PropTypes.bool,
    model: PropTypes.string,
    brand: PropTypes.string,
    size: PropTypes.number,
    amount: PropTypes.number,
    price: PropTypes.number
};