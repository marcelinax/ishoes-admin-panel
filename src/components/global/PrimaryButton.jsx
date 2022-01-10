import PropTypes from 'prop-types';
import React from 'react';

export const PrimaryButton = ({title, type, className, onClick}) => {
    return (
        <button onClick={onClick} type={type} className={`shadow-md text-white rounded-md font-medium cursor-pointer hover:scale-95 transition-all py-3 px-10 ${className}`}>{title}</button>
    );
};

PrimaryButton.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string
};