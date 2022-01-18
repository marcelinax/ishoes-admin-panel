import PropTypes from 'prop-types';
import React from 'react';

export const ButtonWithIcon = ({children, type, className, onClick}) => {
    return (
        <button type={type} className={`flex items-center text-sm font-medium px-3 text-white shadow-md rounded-md py-1 cursor-pointer hover:scale-90 transition-all ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

ButtonWithIcon.propTypes = {
    children: PropTypes.element.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string
};