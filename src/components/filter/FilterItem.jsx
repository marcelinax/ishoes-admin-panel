import PropTypes from 'prop-types';
import React from 'react';

export const FilterItem = ({ title, children, className }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <h6 className='text-gray text-sm font-semibold mb-3'>{title.toUpperCase()}</h6>
            <div className='w-full flex items-center'>
                {children}
            </div>
        </div>
    );
};

FilterItem.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string
};