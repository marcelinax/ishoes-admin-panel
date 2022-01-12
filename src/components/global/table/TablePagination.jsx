import Pagination from '@mui/material/TablePagination';
import React from 'react';

export const TablePagination = ({count, page,onPageChange, rowsPerPage, onRowsPerPageChange, className, rowsPerPageOptions,labelRowsPerPage}) => {
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
