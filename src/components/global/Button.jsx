import React from 'react';
import PropTypes from 'prop-types';
import buttonTypes from '@constants/buttonTypes';
export const Button = ({ type, buttonType, children, className, onClick, title, bgColor }) => {

    const getClassName = () => {
        return 'cursor-pointer hover:scale-95 transition-all font-medium';
    };
    const drawIconButton = () => {
        return (
            <button type={type} className={`flex items-center text-sm px-3 text-white shadow-md rounded-md py-1 ${bgColor} ${getClassName()} ${className}`} onClick={onClick}>
                {children}
            </button>
        );
    };

    const drawTextButton = () => {
        return (
            <button onClick={onClick} type={type} className={`shadow-md text-white rounded-md py-3 px-10 ${bgColor} ${getClassName()} ${className}`}>{title}</button>
        );
    };

    const drawFlatButton = () => {
        return (
            <button type={type} onClick={onClick} className={`py-3 px-10 ${getClassName()} ${className}`}>{title}</button>
        );
    };

    const drawButtonByType = () => {
        switch (buttonType) {
        case buttonTypes.TEXT_BUTTON:
            return drawTextButton();
        case buttonTypes.ICON_BUTTON:
            return drawIconButton();
        case buttonTypes.FLAT_BUTTON:
            return drawFlatButton();
        default:
            return drawTextButton();
        }
    };

    return drawButtonByType();
};

Button.propTypes = {
    buttonType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    bgColor: PropTypes.string,
};