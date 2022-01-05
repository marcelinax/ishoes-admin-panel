import PropTypes from 'prop-types';
import React from 'react';

export const Input = ({ title, className, id, value,onChange,error, disabled }) => {
    return (
        <div className={`flex flex-col relative ${className}`}>
            <label className='text-xs font-semibold text-gray mb-2'>{title.toUpperCase()}</label>
            <input disabled={disabled} id={id} value={value} onChange={onChange} className={`${error? 'border-red-600 border': 'border-zinc-200' } border-2 text-gray rounded-md px-2 py-3.5 w-full outline-none`} />
            {error && <span className='text-xs mt-1 text-red-600 font-medium absolute -bottom-5 left-0'>{error}</span>}
        </div>
    );
};

Input.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
};