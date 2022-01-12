import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { PrimaryButton } from '../global/PrimaryButton';
import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export const DateInput = ({value,onChange, className, label,dataPickerClassName, hasButton, onButtonClick}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} className={`!flex-row  ${className}`}>
                {/* <MobileDatePicker
                    label="For mobile"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => {return <TextField {...params} />;}}
                /> */}
                <DesktopDatePicker
                    label={label}
                    value={value}
                    minDate={new Date('01 01 2021')}
                    onChange={onChange}
                    renderInput={(params) => {
                        return <TextField {...params} />;
                    }}
                    className={dataPickerClassName}
                />
                {hasButton && <PrimaryButton title='Clear' type='button' onClick={onButtonClick} className='bg-red-600 !px-2 !py-2 text-xs !ml-5 !my-auto '/>}
            </Stack>
        </LocalizationProvider>
    );
};
