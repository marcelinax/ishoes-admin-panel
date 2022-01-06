import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, {useEffect} from 'react';

import { AddNewProduct } from './views/AddNewProduct';
import { Brands } from './views/Brands';
import { Homepage } from './views/Homepage';
import { Products } from './views/Products';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { config } from './config/Config';
import { setBrands } from './store/brandsSlice';
import { setShoeProducts } from './store/shoeProductsSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function App() {

    const dispatch = useDispatch();

    const getShoeProducts = async () => {
        try {
            await axios.get(config.apiUrl + 'shoeProducts/').then(res => {return dispatch(setShoeProducts(res.data));});
        } catch (error) {
            console.log(error.response);
        }
    };
    const getBrands = async () => {
        try {
            await axios.get(config.apiUrl + 'brands/').then(res => {return dispatch(setBrands(res.data));});
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBrands();
    }, []);

    
    useEffect(() => {
        getShoeProducts();
    }, []);
    
    return (
        <>
            <ToastContainer position='top-center'/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Homepage/>}/>
                    <Route path='/products' element={<Products/>}/>
                    <Route path='/add-new-product' element={<AddNewProduct/>}/>
                    <Route path='/brands' element={<Brands/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
