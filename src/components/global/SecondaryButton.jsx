import { PropTypes } from 'prop-types';
import React from 'react';

export const SecondaryButton = ({title, type,className, onClick}) => {
    return (
        <button type={type} onClick={onClick} className={`py-3  px-10 font-medium cursor-pointer hover:scale-95 transition-all ${className}`}>{title}</button>
    );
};

SecondaryButton.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string
};