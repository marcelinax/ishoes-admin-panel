import { Navbar } from '../components/compositional/Navbar';
import React from 'react';

export const DefaultLayout = ({children}) => {
    return (
        <div className='w-screen h-screen flex'>
            <Navbar />
            <div className='container h-full overflow-auto mx-auto'>{children}</div>
        </div>
    );
};
