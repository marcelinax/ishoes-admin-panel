import { ProductCard } from './../components/ProductCard';
import React from 'react';

export const Products = () => {
    return (
        <div className='w-full h-full flex flex-wrap pt-20 '>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
    );
};
