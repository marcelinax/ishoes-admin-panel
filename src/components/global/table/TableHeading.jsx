import { PropTypes } from 'prop-types';
import React from 'react';

export const TableHeading = ({ title, className }) => {
    return (
        <th className={`first:pl-4 last:pr-4 py-4 text-white ${className}`}>{title.toUpperCase()}</th>
    );
};

TableHeading.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string
};