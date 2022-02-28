import { BiBold, BiBox, BiDetail, BiHome, BiStore, BiCog } from 'react-icons/bi';
import React from 'react';
import locales from '@constants/locales';
import { Logo } from '@components/global/Logo';
import { SidebarLink } from '@components/global/SidebarLink';
import sizes from '@constants/sizes';
import colors from '@themes/colors';

export const Sidebar = () => {

    const getClassNameForSidebarkLinks = () => {
        return 'group-hover:fill-blue transition-all';
    };

    return (
        <div className='w-1/12 h-screen fixed border-r-2 border-gray border-opacity-10 shadow-xl left-0 top-0'>
            <div className='w-full p-6'>
                <Logo/>
                <div className='w-full flex flex-col mt-20'>
                    <SidebarLink title={locales.HOME} to='/' icon={<BiHome fill={colors.DARK_GRAY} size={sizes.ICON_24} className={getClassNameForSidebarkLinks()}/>}/>
                    <SidebarLink title={locales.SHOP} to='/shop' icon={<BiStore fill={colors.DARK_GRAY} size={sizes.ICON_24} className={getClassNameForSidebarkLinks()}/>}/>
                    <SidebarLink title={locales.PRODUCTS} to='/products' icon={<BiBox fill={colors.DARK_GRAY} size={sizes.ICON_24} className={getClassNameForSidebarkLinks()}/>}/>
                    <SidebarLink title={locales.ORDERS} to='/orders' icon={<BiDetail fill={colors.DARK_GRAY} size={sizes.ICON_24} className={getClassNameForSidebarkLinks()}/>}/>
                    <SidebarLink title={locales.BRANDS} to='/brands' icon={<BiBold fill={colors.DARK_GRAY} size={sizes.ICON_24} className={getClassNameForSidebarkLinks()}/>}/>
                    <SidebarLink title={locales.SETTINGS} to='/settings' icon={<BiCog fill={colors.DARK_GRAY} size={sizes.ICON_24} className={getClassNameForSidebarkLinks()}/>}/>
                </div>
            </div>
           
        </div>
    );
};
