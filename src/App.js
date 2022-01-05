import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { AddNewProduct } from './views/AddNewProduct';
import { Homepage } from './views/Homepage';
import { Products } from './views/Products';
import { Provider } from 'react-redux';
import React from 'react';
import store from './store/store';

function App() {
    return (
        <Provider store={store}>
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Homepage/>}/>
                    <Route path='/products' element={<Products/>}/>
                    <Route path='/add-new-product' element={<AddNewProduct/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
