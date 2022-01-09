import PropTypes from 'prop-types';
import React from 'react';

export const Table = ({className,children}) => {
    return (
        <table className={`w-full shadow-3xl bg-white rounded-md overflow-hidden ${className}`}>
            {children}
        </table>
    );
};

Table.propTypes = {
    className: PropTypes.string
};