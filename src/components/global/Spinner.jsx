import { BiLoader } from 'react-icons/bi';
import React from 'react';
import sizes from '@constants/sizes';

export const Spinner = () => {
    return (
        <BiLoader className='fill-gray spinner' size={sizes.ICON_24}/>
    );
};
