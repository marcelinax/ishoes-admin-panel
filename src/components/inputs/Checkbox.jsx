import { BiCheck } from 'react-icons/bi';
import PropTypes from 'prop-types';
import React from 'react';

export const Checkbox = ({title, className, value, onChange, iconClassName }) => {
    return (
        <div className={`flex cursor-pointer items-center ${className}`} onClick={onChange}>
            <div className='w-4 h-4 border-2 border-zinc-200 rounded-md flex items-center justify-center'>
                {value && <BiCheck className={`fill-neutral-green ${iconClassName}`} />}
            </div>
            <p className='text-gray ml-2'>{title}</p>
        </div>
    );
};

Checkbox.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    iconClassName: PropTypes.string
};