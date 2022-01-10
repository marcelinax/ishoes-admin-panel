import { PropTypes } from 'prop-types';
import React from 'react';

export const TableRowItem = ({children, className}) => {
    return ( 
        <td className={`first:pl-4 last:pr-4 py-4 text-sm font-medium ${className} text-gray`}>
            {children}
        </td>
    );
};

TableRowItem.propTypes = {
    className: PropTypes.string
};
