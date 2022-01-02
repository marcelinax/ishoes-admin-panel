import { Navbar } from '../components/compositional/Navbar';
import React from 'react';

export const DefaultLayout = ({children, className}) => {
    return (
        <div className='max-w-screen h-screen flex'>
            <Navbar />
            <div className={`container max-h-full mx-auto ${className}`}>{children}</div>
        </div>
    );
};
