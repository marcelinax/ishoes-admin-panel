import { BiX } from 'react-icons/bi';
import PropTypes from 'prop-types';
import React from 'react';

export const BrandItem = ({title,onClick}) => {
    return (
        <div className='w-full group hover:bg-zinc-200 rounded-sm cursor-pointer transition-all'>
            <div className='w-full flex justify-between items-center p-1'>
                <p className='text-sm font-medium group-hover:text-white text-gray'>{title}</p>
                <BiX className='group-hover:opacity-100 opacity-0 fill-red-600' onClick={onClick}/>
            </div>
        </div>
    );
};

BrandItem.propTypes = {
    title: PropTypes.string.isRequired
};