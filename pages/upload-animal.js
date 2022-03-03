import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import mime from 'mime-types';

import Button from '@mui/material/Button';
import Container from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Alert from '@mui/material/Alert';

import uploadFileFirebase from '../functions/uploadFileFirebase';

const Input = styled('input')({
    display: 'none',
});

const UploadAnimal = () => {

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const subirArchivo = async (e) => {
        e.preventDefault(); 
        const image = e.target.files[0];
        if (image === null || typeof(image) === "undefined") return;
        
        const nameFile = Date.now();
        const fileExtension = mime.extension(image.type);
        const finalName = `${nameFile}.${fileExtension}`;
        const result = await uploadFileFirebase(finalName, image);
        if (result === null){
            setError(true);
        } else{
            setSuccess(true);
        }
    }
    
    return (
        <Container maxwidth="lg">
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => subirArchivo(e)}/>
                <Button 
                    variant="contained" 
                    component="span" 
                    endIcon={<PhotoCamera />}
                >
                    Upload
                </Button>
            </label>

            {
                error && (<Alert severity="error">¡Ha ocurrido un error al subir el archivo!</Alert>)
            }
            {
                success && (<Alert severity="success">¡Archivo subido con éxito!</Alert>)
            }      
        </Container>
    );
}
 
export default UploadAnimal;