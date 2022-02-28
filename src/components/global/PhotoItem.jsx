import { BiPlus, BiX } from 'react-icons/bi';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@components/global/Spinner';
import { config } from '@config/config';
import { uploadImageService } from '@services/uploadImage.service';

export const PhotoItem = ({ onFileUpload, onFileRemove, value}) => {
    
    const [file, setFile] = useState(null); 
    const [uploadUrl, setUploadUrl] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(file)
            uploadFile();
    }, [file]);

    useEffect(() => {
        setUploadUrl(value);
    }, [value]);

    const addFile = (e) => {
        const files = e.target.files;
        setFile(files[0]);
    };

    const removeFile = () => {
        setFile(null);
        onFileRemove(uploadUrl);
        setUploadUrl(null);
    };

    const uploadFile = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        const res = await uploadImageService(formData);
        const fileUrl = config.apiUrl + res.data.url;
        setUploadUrl(fileUrl);
        onFileUpload(fileUrl);
        setLoading(false);
    };

    return (
        <div className='min-w-[8rem] h-32 rounded-md border-2 flex items-center justify-center border-zinc-200  hover:bg-zinc-200 transition-all mx-2 first:ml-0'>
            
            {loading? (
                <Spinner/>
            ):
                !uploadUrl
                    ?
                    <label htmlFor='file' className='w-full h-full flex items-center justify-center cursor-pointer'>
                        <input id='file' type='file' className='hidden' onChange={addFile} />
                        <BiPlus className='fill-gray' size={24} />
                    </label>
                    :
                    <div className='bg-no-repeat bg-center h-full w-full bg-cover relative group transition-all' style={{ backgroundImage: `url(${uploadUrl})` }}>
                        <div onClick={removeFile} className='hidden group-hover:flex items-center justify-center group-hover:items-center group-hover:justify-center absolute top-0 left-0 group-hover:h-full group-hover:w-full group-hover:bg-zinc-200/30 transition-all group-hover:cursor-pointer'>
                            <BiX size={24} className='fill-white' />
                        </div>
                    </div>
            }
        </div>
   
    );
};
