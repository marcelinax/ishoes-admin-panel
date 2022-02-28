import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getBrandsService } from '@services/getBrands.service';
import { Router } from '@routes/Router';
import { setBrands } from '@state/brands/brandsSlice';

function App() {

    const dispatch = useDispatch();

    const getBrands = async () => {
        try {
            const res = await getBrandsService();
            dispatch(setBrands(res.data));
        } catch (error) {
            console.log(error);
        }
    };
  
    useEffect(() => {
        getBrands();
    }, []);
    
    return (
        <>
            <ToastContainer position='top-center'/>
            <Router/>
        </>
    );
}

export default App;
