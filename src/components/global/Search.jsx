import {BiSearch} from 'react-icons/bi';
import PropTypes from 'prop-types';
import React from 'react';

export const Search = ({className}) => {
    return (
        <div className={`border-2 border-zinc-200 rounded-lg flex justify-between items-center overflow-hidden pr-4 ${className}`}>
            <input placeholder='Search...' className='w-full py-2 px-4 outline-none text-zinc-400'/>
            <BiSearch fill='#a1a1aa' size={20}/>
        </div>
    );
};

Search.propTypes = {
    className:PropTypes.string
};