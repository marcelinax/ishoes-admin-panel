import { BiPlus } from 'react-icons/bi';
import PropTypes from 'prop-types';
import React from 'react';

export const PhotoItem = ({isEmpty = false}) => {
    return (
        <div className='min-w-[8rem] h-32 rounded-md border-2 border-zinc-200  hover:bg-zinc-200 transition-all mx-2 first:ml-0'>
            {isEmpty ? <label htmlFor='file' className='w-full h-full flex items-center justify-center cursor-pointer'>
                <input id='file' type='file' className='hidden'/>
                <BiPlus fill='#aaaaaf' size={24} />
            </label>
                : <div />}
        </div>
    );
};

PhotoItem.propTypes = {
    isEmpty: PropTypes.bool
};