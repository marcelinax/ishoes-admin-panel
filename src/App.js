import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, {useEffect} from 'react';

import { AddNewProduct } from './views/AddNewProduct';
import { Brands } from './views/Brands';
import { EditShoeProduct } from './views/EditShoeProduct';
import { Homepage } from './views/Homepage';
import { Products } from './views/Products';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { config } from './config/Config';
import { setBrands } from './store/brandsSlice';
import { useDispatch } from 'react-redux';
import { useRefreshShoeProducts } from './hooks/useRefreshShoeProducts';

function App() {

    const dispatch = useDispatch();
    const {refresh: refreshShoes} = useRefreshShoeProducts();
    const getBrands = async () => {
        try {
            await axios.get(config.apiUrl + 'brands/').then(res => {return dispatch(setBrands(res.data));});
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        refreshShoes();
    },[]);

    useEffect(() => {
        getBrands();
       
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
                    <Route path='/edit-product/:id' element={<EditShoeProduct/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
