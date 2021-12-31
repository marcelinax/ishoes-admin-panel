import PropTypes from 'prop-types';
import React from 'react';

export const ButtonWithIcon = ({icon, className}) => {
    return (
        <div className={`cursor-pointer ${className}`}>
            {icon}
        </div>
    );
};

ButtonWithIcon.propTypes = {
    icon: PropTypes.element.isRequired,
    className: PropTypes.string
};