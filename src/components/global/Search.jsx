import {BiSearch} from 'react-icons/bi';
import PropTypes from 'prop-types';
import React from 'react';

export const Search = ({className, value, onChange}) => {
    return (
        <div className={`border-2 border-zinc-200 rounded-lg flex justify-between items-center overflow-hidden pr-4 ${className}`}>
            <input value={value} onChange={onChange} placeholder='Search...' className='w-full py-2 px-4 outline-none text-zinc-400'/>
            <BiSearch className='fill-gray' size={20}/>
        </div>
    );
};

Search.propTypes = {
    className:PropTypes.string
};