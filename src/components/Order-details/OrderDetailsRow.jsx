import PropTypes from 'prop-types';
import React from 'react';

export const OrderDetailsRow = ({title, value, children}) => {
    return (
        <div className='w-full flex items-center mb-1'>
            <p className='text-gray font-semibold text-sm text-right'>{title}:</p>
            <p className='text-sm text-gray ml-2'>{value}</p>
            {children}
        </div>
    );
};

OrderDetailsRow.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string
};