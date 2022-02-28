import React from 'react';
import PropTypes from 'prop-types';
export const TableRow = ({ children,className }) => {
    return (
        <tr className={`w-full text-left last:border-none border-b border-b-zinc-200 ${className} `} >
            {children}
        </tr>
    );
};

TableRow.propTypes = {
    className: PropTypes.string
};