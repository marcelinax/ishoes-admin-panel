import { BiDollar, BiNoEntry, BiTimer } from 'react-icons/bi';
import React from 'react';
import colors from '@themes/colors';
import locales from '@constants/locales';
import sizes from '@constants/sizes';

const legendTypes = [
    { title: 'Out of stock', color: 'bg-gray', content: <BiNoEntry size={sizes.ICON_12} fill={colors.WHITE}/>},
    {title: 'On sale', color: 'bg-red-600', content: <BiDollar size={sizes.ICON_12} fill={colors.WHITE}/>},
    {title: 'New', color: 'bg-neutral-green', content: <p className='text-[9px] text-center text-white'>{locales.NEW}</p>},
    {title: 'Last pairs', color: 'bg-yellow-400', content: <BiTimer size={sizes.ICON_12} fill={colors.WHITE}/>},
];

export default legendTypes;