import P from '@mui/material/Pagination';
import PropTypes from 'prop-types';
import React from 'react';
import Stack from '@mui/material/Stack';

export const Pagination = ({count, onChange, page}) => {
    return (
        <Stack spacing={2}>
            <P count={count} page={page} onChange={onChange} showFirstButton showLastButton shape='rounded'/>
        </Stack>
    );
};

Pagination.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
};