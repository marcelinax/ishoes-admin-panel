import { Link, useNavigate } from 'react-router-dom';

import { BiPencil } from 'react-icons/bi';
import { BiPlus } from 'react-icons/bi';
import { BiTrashAlt } from 'react-icons/bi';
import { ButtonWithIcon } from './global/ButtonWithIcon';
import PropTypes from 'prop-types';
import React from 'react';

export const ProductCard = ({ isEmpty = false }) => {

    const navigate = useNavigate();
    

    const renderProductCard = () => {
        if (!isEmpty) {
            return <div className='p-4 basis-1/3 h-80'>
                <div className='w-full h-full p-10 flex shadow-3xl rounded-lg relative'>
                    <div className='w-1 h-full absolute top-0 right-0 bg-blue rounded-lg' />
                    <div className='min-w-[50%] h-full'>
                        <div className='w-full h-full bg-center bg-no-repeat bg-contain rounded-lg' style={{backgroundImage: 'url(data:image/jpeg;base64,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)'}} />
                    </div>
                    <div className='w-1/2 ml-6 py-5 flex flex-col justify-between'>
                        <div>
                            <div className='w-full flex flex-col'>
                                <p className='text-gray font-semibold'>Nike</p>
                                <p className='text-gray font-semibold'>Air Force One - White</p>
                            </div>
                            <div className='w-full flex flex-col justify-between'>
                                <p className='font-semibold'>Size: 38</p>
                                <p className='font-semibold text-blue'>Amount: 50</p>
                                <p className='text-red-600 font-semibold'>$350</p>
                            </div>
                        </div>
                        <div className='w-full flex items-center'>
                            <ButtonWithIcon icon={<BiPencil size={20}/>} className='mr-3'/>
                            <ButtonWithIcon icon={<BiTrashAlt size={20} className='fill-red-600' />} />
                        </div>
                    </div>
                </div>
            </div>;
        }
        else return <div className='p-4 basis-1/3 h-80 group hover:scale-95 transition-all cursor-pointer' onClick={()=> {return navigate('/add-new-product');}}>
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
    isEmpty: PropTypes.bool.isRequired
};