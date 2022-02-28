import { BiTask } from 'react-icons/bi';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from '@components/global/Button';
import locales from '@constants/locales';
import buttonTypes from '@constants/buttonTypes';

export const RadioModal = ({ children, title, description, closeModal, onSaveClick }) => {
    return (
        <div className='fixed top-0 left-0 h-screen w-screen z-10 bg-neutral-500/80 flex justify-center items-center'>
            <div className='w-1/6 h-[50vh] bg-white shadow-lg rounded-md'>
                <div className='w-full h-full px-6 py-10 flex flex-col justify-between'>
                    <div className='w-full flex flex-col items-center justify-center'>
                        <BiTask size={40} className='fill-blue mb-5'/>
                        <h1 className='mb-2 font-semibold'>{title}</h1>
                        <p className='text-center text-sm'>{description}</p>
                    </div>
                    <div className='w-full flex flex-col'>
                        {children}
                    </div>
                    <div className='w-full flex flex-col '>
                        <Button title={locales.SAVE} type='button' bgColor='bg-blue' buttonType={buttonTypes.TEXT_BUTTON} onClick={onSaveClick} className='w-full'/>
                        <Button title={locales.CANCEL} type='button' bgColor='bg-blue' buttonType={buttonTypes.FLAT_BUTTON} onClick={closeModal} className='w-full hover:font-semibold'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

RadioModal.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string
};