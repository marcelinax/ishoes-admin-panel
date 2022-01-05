import { Navbar } from '../components/compositional/Navbar';
import React from 'react';

export const DefaultLayout = ({children, className}) => {
    return (
        <div className='max-w-screen max-h-screen flex pl-[8.333333%]'>
            <Navbar />
            <div className={`container h-full mx-auto ${className}`}>{children}</div>
        </div>
    );
};
