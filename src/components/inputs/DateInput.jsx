import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import locales from '@constants/locales';
import { Button } from '@components/global/Button';
import buttonTypes from '@constants/buttonTypes';

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
                {hasButton && <Button title={locales.CLEAR} type='button' onClick={onButtonClick} buttonType={buttonTypes.TEXT_BUTTON} bgColor='bg-red-600' className='!px-2 !py-2 text-xs !ml-5 !my-auto' />}
            </Stack>
        </LocalizationProvider>
    );
};
