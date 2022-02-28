import Pagination from '@mui/material/TablePagination';
import React from 'react';
import PropTypes from 'prop-types';

export const TablePagination = ({count, page ,onPageChange, rowsPerPage, onRowsPerPageChange, className, rowsPerPageOptions, labelRowsPerPage }) => {
    return (
        <Pagination
            component="div"
            count={count}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            className={className}
            labelRowsPerPage={labelRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
        />
    );
};

TablePagination.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    className: PropTypes.string,
    labelRowsPerPage: PropTypes.string
};