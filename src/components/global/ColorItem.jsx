import PropTypes from 'prop-types';
import React from 'react';

export const ColorItem = ({ color, title, className, isChosen, onClick }) => {
    return (
        <div className='flex flex-col items-center cursor-pointer hover:scale-90 transition-all mx-2 first:ml-0' onClick={onClick}>
            <div className={`rounded-half shadow-lg transition-all ${color} ${isChosen && 'scale-75'} ${className}`} />
            <p className='text-xs font-medium text-gray mt-1'>{title}</p>
        </div>
    );
};

ColorItem.propTypes = {
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    isChosen: PropTypes.bool.isRequired
};
