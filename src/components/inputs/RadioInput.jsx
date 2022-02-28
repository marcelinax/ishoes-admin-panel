import locales from '@constants/locales';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';
import PropTypes from 'prop-types';
export const RadioInput = ({ radioGroupClassName, formControlLabelClassName, radioClassName, onChange, value, label, showAllOptions = false}) => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend" className='!text-gray !text-xs !font-semibold'>{label && label.toUpperCase()}</FormLabel>
            <RadioGroup
                aria-label={label}
                name="controlled-radio-buttons-group"
                value={Number(value)}
                onChange={onChange}
                className={`${radioGroupClassName}`}
            >
                <FormControlLabel value={1} control={<Radio className={radioClassName}/>} label={locales.YES} className={`${formControlLabelClassName}`}/>
                <FormControlLabel value={0} control={<Radio className={radioClassName} />} label={locales.NO} className={`${formControlLabelClassName}`}/>
            </RadioGroup>
        </FormControl>
    );
};

RadioInput.propTypes = {
    radioGroupClassName: PropTypes.string,
    formControlLabelClassName: PropTypes.string,
    radioClassName: PropTypes.string,
    label: PropTypes.string,
    showAllOptions: PropTypes.bool,
};