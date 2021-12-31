import PropTypes from 'prop-types';
import React from 'react';

export const NavbarLink = ({title, icon}) => {
    return (
        <div className='w-full flex flex-col items-center mb-10 cursor-pointer group transition-all'>
            {icon}
            <p className='text-gray font-medium text-sm mt-1 group-hover:text-blue transition-all'>{title}</p>
        </div>
    );
};

NavbarLink.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired
};