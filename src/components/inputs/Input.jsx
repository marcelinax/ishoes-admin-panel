import PropTypes from 'prop-types';
import React from 'react';

export const Input = ({ title, className }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <label className='text-xs font-semibold text-gray mb-2'>{title.toUpperCase()}</label>
            <input className='border-2 border-zinc-200 rounded-md px-2 py-3.5 w-full outline-none'/>
        </div>
    );
};

Input.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string
};