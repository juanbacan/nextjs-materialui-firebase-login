import React, { useState } from 'react';

import mime from 'mime-types';

import { Container, Grid, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import addDataFirebase from '../functions/addDataFirebase';
import uploadFileFirebase from '../functions/uploadFileFirebase';

import SnackBarComponent from '../components/SnackBarComponent';


const Input = styled('input')({
    display: 'none',
});


const CreacionPremios = () => {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [puntos, setPuntos] = useState(0);
    const [stock, setStock] = useState(0);

    const [image, setImage] = useState("/no-disponible.png");

    const cambiarNombre = (e) => {
        setNombre(e.target.value);
    }

    const cambiarDescripcion = (e) => {
        setDescripcion(e.target.value);
    }

    const cambiarPuntos = (e) => {
        setPuntos(e.target.value)
    }

    const cambiarStock = (e) => {
        setStock(e.target.value)
    }

    // ******* Subir Imagen *************************
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [subiendo, setSubiendo] = useState(false);

    const subirArchivo = async (e) => {
        e.preventDefault(); 
        const image = e.target.files[0];
        if (image === null || typeof(image) === "undefined") return;
        
        setSubiendo(true);

        const nameFile = Date.now();
        const fileExtension = mime.extension(image.type);
        const finalName = `${nameFile}.${fileExtension}`;
        const result = await uploadFileFirebase(finalName, image);
        if (result === null){
            setError(true);
        } else{
            setSuccess(true);
            setImage(result);
        }

        setSubiendo(false);
    }
    // **********************************************

    const guardarPremio = async () => {
        console.log(nombre, descripcion, puntos, stock);


        if(nombre === "" || descripcion === "" || puntos === 0 || stock === 0){
            // Abre el SnackBar en la parte inferior de la pantalla
            setMessage("Debe llenar todos los campos del Premio");
            setSeverety("warning");
            setOpen(true);
            setTimeout(function(){
                setOpen(false);
            }, 3000);
            return;
        }

        const puntosInt = parseInt(puntos); 
        const stockInt = parseInt(stock); 

        const nuevoPremio = { nombre, descripcion, puntosInt, stockInt, image };
        const estadoGuardado = await addDataFirebase("premios", nuevoPremio);



        // Abre el SnackBar en la parte inferior de la pantalla
        setMessage("Producto creado con éxito");
        setSeverety("success");
        setOpen(true);

        // Resetea todo al inicio

        setNombre("");
        setDescripcion("");
        setPuntos(0);
        setStock(0);
        setImage("/no-disponible.png");

        setTimeout(function(){
            setOpen(false);
        }, 3000);
    }


    // Para abrir las alertas
    const [message, setMessage] = useState("");
    const [severety, setSeverety] = useState("success");
    const [open, setOpen] = useState(false);
    // *************************************************

    return (
        <Container maxWidth="sm" sx={{my: 5}}>
            <Grid container justify-content="center" direction="column">
                <TextField
                    sx = {{my: 2}}
                    required
                    id="outlined-required"
                    label="Nombre del Premio"
                    value={ nombre }
                    name="nombre"
                    onChange={ cambiarNombre }
                />
                <Grid sx={{my: 2}} container justifyContent="center">
                    {subiendo 
                        ?   <Box sx={{ display: 'flex', mb: 2}}>
                                <CircularProgress />
                            </Box>
                        :   
                            <img src={image} width={300}/>
                    }            
                </Grid>

                <label htmlFor="contained-button-file" style={{margin: "0 auto"}}>
                    <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => subirArchivo(e)}/>
                    <Button 
                        sx={{mb: 4}}
                        variant="contained" 
                        component="span" 
                        endIcon={<PhotoCamera />}
                    >
                        Cargar Imagen del Producto
                    </Button>
                </label>

                {
                    error && (<Alert sx={{mb:2}} severity="error">¡Ha ocurrido un error al subir el archivo!</Alert>)
                }
                {
                    success && (<Alert sx={{mb:2}} severity="success">¡Imagen subida con éxito!</Alert>)
                }

                <TextField
                    label="Descripción del Premio"
                    multiline
                    maxRows={ 4 }
                    value={ descripcion }
                    onChange={ cambiarDescripcion }
                />

                <TextField
                    sx = {{ my: 2 }}
                    type="number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    required
                    id="outlined-required"
                    label="Puntos"
                    value={puntos}
                    name="puntos"
                    onChange={ cambiarPuntos }
                />

                <TextField
                    sx = {{my: 2}}
                    type="number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    required
                    id="outlined-required"
                    label="Stock"
                    value={stock}
                    name="stock"
                    onChange={ cambiarStock }
                />

                <Button variant="contained" onClick={guardarPremio} sx={{mt:5}}>
                    Guardar Nuevo Premio
                </Button>
            </Grid>

            <SnackBarComponent open={open} message={message} severety={severety}/>
                
        </Container>
    );
}
 
export default CreacionPremios;

