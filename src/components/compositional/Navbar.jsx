import {BiBox} from 'react-icons/bi';
import {BiCart} from 'react-icons/bi';
import {BiCog} from 'react-icons/bi';
import {BiDetail} from 'react-icons/bi';
import {BiHome} from 'react-icons/bi';
import { Logo } from '../global/Logo';
import { NavbarLink } from './../global/NavbarLink';
import React from 'react';

export const Navbar = () => {
    return (
        <div className='w-1/12 h-screen border-r-2 border-gray border-opacity-10 shadow-xl'>
            <div className='w-full p-6'>
                <Logo/>
                <div className='w-full flex flex-col mt-20'>
                    <NavbarLink title='Home' to='/' icon={<BiHome fill='#aaaaaf' size={24} className='group-hover:fill-blue transition-all'/>}/>
                    <NavbarLink title='Shop' to='/shop' icon={<BiCart fill='#aaaaaf' size={24} className='group-hover:fill-blue transition-all'/>}/>
                    <NavbarLink title='Products' to='/products' icon={<BiBox fill='#aaaaaf' size={24} className='group-hover:fill-blue transition-all'/>}/>
                    <NavbarLink title='Orders' to='/orders' icon={<BiDetail fill='#aaaaaf' size={24} className='group-hover:fill-blue transition-all'/>}/>
                    <NavbarLink title='Settings' to='/settings' icon={<BiCog fill='#aaaaaf' size={24} className='group-hover:fill-blue transition-all'/>}/>
                </div>
            </div>
           
        </div>
    );
};
