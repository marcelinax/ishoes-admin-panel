import PropTypes from 'prop-types';
import React from 'react';

export const PrimaryButton = ({title, type, className, onClick}) => {
    return (
        <button onClick={onClick} type={type} className={`py-3 shadow-md text-white px-10 rounded-md font-medium cursor-pointer hover:scale-95 transition-all ${className}`}>{title}</button>
    );
};

PrimaryButton.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string
};