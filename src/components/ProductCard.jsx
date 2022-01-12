import { BiPencil } from 'react-icons/bi';
import { BiPlus } from 'react-icons/bi';
import { BiTrashAlt } from 'react-icons/bi';
import { ButtonWithIcon } from './global/ButtonWithIcon';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({ isEmpty, bgImage, size, amount, price, model, brand,isOnSale, onDeleteClick, onEditClick, legend, calcProductPrice }) => {

    const navigate = useNavigate();
    

    const renderProductCard = () => {
        if (!isEmpty) {
            return <div className='p-4 basis-1/2 h-80'>
                <div className='w-full h-full p-10 flex shadow-3xl rounded-lg relative'>
                    <div className={`w-1 h-full absolute top-0 right-0 ${legend} rounded-lg`} />
                    <div className='min-w-[50%] h-full'>
                        <div className='w-full h-full bg-center bg-no-repeat bg-contain rounded-lg' style={{backgroundImage: `url(${bgImage})`}} />
                    </div>
                    <div className='w-1/2 ml-6 py-5 flex flex-col justify-between'>
                        {console.log(isOnSale)}
                        <div>
                            <div className='w-full flex flex-col'>
                                <p className='text-gray font-semibold'>{brand}</p>
                                <p className='text-gray font-semibold'>{model}</p>
                            </div>
                            <div className='w-full flex flex-col justify-between'>
                                <p className='font-semibold'>Size: {size}</p>
                                <p className='font-semibold text-blue'>Amount: {amount}</p>
                                <div className='w-full flex items-center'>
                                    {isOnSale && <p className={` font-semibold ${isOnSale? 'text-sm line-through text-gray mr-2' : 'text-red-600'}`}>${price.toFixed(2)}</p>}
                                    <p className={'text-red-600 font-semibold '}>${calcProductPrice}</p>
                                </div>
                                
                            </div>
                        </div>
                        <div className='w-full flex items-center'>
                            <ButtonWithIcon icon={<BiPencil size={20}/>} className='mr-3' onClick={onEditClick}/>
                            <ButtonWithIcon icon={<BiTrashAlt size={20} className='fill-red-600' />} onClick={onDeleteClick}/>
                        </div>
                    </div>
                </div>
            </div>;
        }
        else return <div className='p-4 basis-1/2 h-80 group hover:scale-95 transition-all cursor-pointer' onClick={()=> {return navigate('/add-new-product');}}>
            <div className='w-full h-full p-10 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-lg relative'>
                <BiPlus size={30} className='fill-zinc-400' />
                <p className='text-blue font-semibold text-sm mt-2'>Add New Product</p>
            </div>
        </div>
        ;
    };

    return renderProductCard();
};

ProductCard.propTypes = {
    isEmpty: PropTypes.bool.isRequired,
    bgImage: PropTypes.string.isRequired,
    isOnSale: PropTypes.bool.isRequired
};