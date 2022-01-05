import {BiBold, BiBox, BiDetail, BiHome, BiStore} from 'react-icons/bi';

import {BiCog} from 'react-icons/bi';
import { Logo } from '../global/Logo';
import { NavbarLink } from './../global/NavbarLink';
import React from 'react';

export const Navbar = () => {
    return (
        <div className='w-1/12 h-screen fixed border-r-2 border-gray border-opacity-10 shadow-xl left-0 top-0'>
            <div className='w-full p-6'>
                <Logo/>
                <div className='w-full flex flex-col mt-20'>
                    <NavbarLink title='Home' to='/' icon={<BiHome fill='#aaaaaf' size={24} className='group-hover:fill-blue transition-all'/>}/>
                    <NavbarLink title='Shop' to='/shop' icon={<BiStore fill='#aaaaaf' size={24} className='group-hover:fill-blue transition-all'/>}/>
                    <NavbarLink title='Products' to='/products' icon={<BiBox fill='#aaaaaf' size={24} className='group-hover:fill-blue transition-all'/>}/>
                    <NavbarLink title='Orders' to='/orders' icon={<BiDetail fill='#aaaaaf' size={24} className='group-hover:fill-blue transition-all'/>}/>
                    <NavbarLink title='Brands' to='/brands' icon={<BiBold fill='#aaaaaf' size={24} className='group-hover:fill-blue transition-all'/>}/>
                    <NavbarLink title='Settings' to='/settings' icon={<BiCog fill='#aaaaaf' size={24} className='group-hover:fill-blue transition-all'/>}/>
                </div>
            </div>
           
        </div>
    );
};
