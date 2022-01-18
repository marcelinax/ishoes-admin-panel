import PropTypes from 'prop-types';
import React from 'react';

export const Legend = ({ title, color, className, content }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <div className={`w-6 h-4 ${color} flex items-center justify-center shadow-lg rounded-[4px] mr-2`} >
                {content}
            </div>
            <p className='text-gray font-medium text-xs'>{title}</p>
        </div>
    );
};

Legend.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string.isRequired,
    className: PropTypes.string
};