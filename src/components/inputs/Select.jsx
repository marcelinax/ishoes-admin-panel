import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';
import React from 'react';
import Select from '@mui/material/Select';

export const SelectInput = ({ value, onChange, name,label, children, className,error}) => {
    return (
        <FormControl className={`${className} relative`} >
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                name={name}
                label={label}
                onChange={onChange}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: error && '#dc2626 !important',
                        borderWidth: error && '1px !important'
                    }
                }}
            >
                {children}
            </Select>
            {error && <span className='text-xs mt-1 text-red-600 font-medium absolute -bottom-5 left-0'>{error}</span>}
        </FormControl>
    );
};

SelectInput.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
};