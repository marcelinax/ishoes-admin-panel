import { Sidebar } from '@components/Compositional/Sidebar';
import React from 'react';
import PropTypes from 'prop-types';
export const DefaultLayout = ({children, className}) => {
    return (
        <div className='max-w-screen max-h-screen flex pl-[8.333333%]'>
            <Sidebar />
            <div className={`container h-full mx-auto ${className}`}>{children}</div>
        </div>
    );
};

DefaultLayout.propTypes = {
    className: PropTypes.string
};