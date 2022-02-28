import locales from '@constants/locales';
import React from 'react';

export const Logo = () => {
    return (
        <div className='w-full flex flex-col items-center'>
            <p className='text-xl text-blue font-semibold'>{locales.ISHOES}</p>
        </div>
    );
};
