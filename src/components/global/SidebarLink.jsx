import { Link, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import React from 'react';

export const SidebarLink = ({ title, icon, to }) => {
    
    const location = useLocation();

    return (
        <Link to={to} >
            <div className={`w-full flex flex-col items-center mb-10 cursor-pointer group transition-all ${location.pathname === to && 'sidebar-link--active'}`}>
                {icon}
                <p className='text-gray font-medium text-sm mt-1 group-hover:text-blue transition-all'>{title}</p>
            </div>
        </Link>
    );
};

SidebarLink.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired
};