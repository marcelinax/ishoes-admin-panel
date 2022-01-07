import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';

export const RadioInput = ({radioGroupClassName, formControlLabelClassName, radioClassName, onChange, value, label, showAllOptions = false}) => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend" className='text-gray text-xs font-semibold'>{label && label.toUpperCase()}</FormLabel>
            <RadioGroup
                aria-label={label}
                name="controlled-radio-buttons-group"
                value={Number(value)}
                onChange={onChange}
                className={`${radioGroupClassName}`}
               
            >
                <FormControlLabel value={1} control={<Radio className={radioClassName}/>} label="Yes" className={`${formControlLabelClassName}`}/>
                <FormControlLabel value={0} control={<Radio className={radioClassName} />} label="No" className={`${formControlLabelClassName}`}/>
            </RadioGroup>
        </FormControl>
    );
};
