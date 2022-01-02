import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';

export const RadioInput = ({radioGroupClassName, formControlLabelClassName, radioClassName, onChange, value}) => {
    return (
        <FormControl component="fieldset" >
            <FormLabel component="legend" className='text-gray text-xs font-semibold'>ON SALE</FormLabel>
            <RadioGroup
                aria-label="On sale"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={onChange}
                className={`${radioGroupClassName}`}
            >
                <FormControlLabel value="yes" control={<Radio className={radioClassName}/>} label="Yes" className={`${formControlLabelClassName}`}/>
                <FormControlLabel value="no" control={<Radio className={radioClassName} />} label="No" className={`${formControlLabelClassName}`}/>
            </RadioGroup>
        </FormControl>
    );
};
