import { BiCheck } from 'react-icons/bi';
import PropTypes from 'prop-types';
import React from 'react';

export const Checkbox = ({title, className}) => {

    return (
        <div className={`flex cursor-pointer items-center ${className}`}>
            <div className='w-4 h-4 border border-zinc-200 rounded-md flex items-center justify-center'>
                <BiCheck className='fill-neutral-green'/>
            </div>
            <p className='text-gray ml-2'>{title}</p>
        </div>
    );
};

Checkbox.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string
};