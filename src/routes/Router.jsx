import { AddNewProduct } from '@views/AddNewProduct';
import { Brands } from '@views/Brands';
import { EditShoeProduct } from '@views/EditShoeProduct';
import { Homepage } from '@views/Homepage';
import { OrderDetails } from '@views/OrderDetails';
import { Orders } from '@views/Orders';
import { Products } from '@views/Products';
import { Shop } from '@views/Shop';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Homepage/>}/>
                <Route path='/products' element={<Products/>}/>
                <Route path='/add-new-product' element={<AddNewProduct/>}/>
                <Route path='/brands' element={<Brands/>}/>
                <Route path='/edit-product/:id' element={<EditShoeProduct/>}/>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/order-details/:id' element={<OrderDetails/>}/>
                <Route path='/shop' element={<Shop/>}/>
            </Routes>
        </BrowserRouter>
    );
};
