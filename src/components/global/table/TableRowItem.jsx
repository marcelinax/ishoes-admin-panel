import { PropTypes } from 'prop-types';
import React from 'react';

export const TableRowItem = ({children, className}) => {
    return (
        <td className={`first:pl-4 last:pr-4 py-4 text-sm font-medium text-gray ${className}`}>
            {children}
        </td>
    );
};

TableRowItem.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string
};
