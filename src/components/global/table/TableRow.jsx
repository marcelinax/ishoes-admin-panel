import React from 'react';

export const TableRow = ({children,className}) => {
    return (
        <tr className={`w-full text-left last:border-none border-b border-b-zinc-200 ${className} `} >
            {children}
        </tr>
    );
};
