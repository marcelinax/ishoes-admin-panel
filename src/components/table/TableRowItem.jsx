import { PropTypes } from 'prop-types';
import React from 'react';

export const TableRowItem = ({children, id}) => {
    return (
        <td id={id} className={`first:pl-4 last:pr-4 py-4 text-sm font-medium text-gray ${id === 'income' && 'text-red-600'}`}>
            {children}
        </td>
    );
};

TableRowItem.propTypes = {
    v: PropTypes.string
};
