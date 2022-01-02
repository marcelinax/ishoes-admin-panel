import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import Select from '@mui/material/Select';

export const SelectInput = ({value, onChange, label, children, className,id}) => {
    return (
        <FormControl className={`${className}`}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={onChange}
            >
                {children}
            </Select>
        </FormControl>
    );
};

SelectInput.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string
};