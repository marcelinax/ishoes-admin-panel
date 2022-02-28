import {BiSearch} from 'react-icons/bi';
import PropTypes from 'prop-types';
import React from 'react';
import sizes from '@constants/sizes';

export const Search = ({className, value, onChange, id, placeholder, inputClassName}) => {
    return (
        <div className={`border-2 border-zinc-200 rounded-lg flex justify-between items-center overflow-hidden pr-4 ${className}`}>
            <input id={id} value={value} onChange={onChange} placeholder={placeholder} className={`w-full py-4 px-4 outline-none text-zinc-400 ${inputClassName}`}/>
            <BiSearch className='fill-gray' size={sizes.ICON_20}/>
        </div>
    );
};

Search.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
};