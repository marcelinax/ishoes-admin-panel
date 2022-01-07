import React from 'react';

export const Filter = ({children}) => {
    return (
        <div className='w-full flex flex-col shadow-3xl rounded-md p-6 relative'>
            {children}
        </div>
    );
};
