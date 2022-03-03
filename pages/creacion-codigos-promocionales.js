import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Router from 'next/router'

import TextField from '@mui/material/TextField';
import { Container, Grid, Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import addDataFirebase from '../functions/addDataFirebase';


const CreacionCodigosPromocionales = () => {

    // Estado del código promocional: activo o desactivo
    const [codigo, setCodigo] = useState("dsadsa");
    const [puntos, setPuntos] = useState(0);
    const [estado, setEstado] = useState(true);

    
    useEffect(() => {
        console.log("Creando codigo aleatorio");
        setCodigo(uuidv4());
    }, []);
    

    const cambiarCodigo = (e) => {
        //setCodigo(e.target.value);
    }

    const cambiarPuntos = (e) => {
        setPuntos(e.target.value)
    }

    const cambiarEstado = () => {
        setEstado(!estado);
    }

    const crearCodigoPromocional = async () => {
        console.log("Guardando");
        console.log(codigo, puntos, estado);
        const puntosInt = parseInt(puntos); 

        const nuevoCodigo = { codigo, puntosInt, estado };
        const estadoGuardado = await addDataFirebase("codigos-promocionales", nuevoCodigo);
        setCodigo(uuidv4());
        setPuntos("");
        //Router.push("/");
    }

    return (
        <Container maxWidth="sm" sx={{my:7}}>
            <Grid container justify-content="center" direction="column">

                <TextField
                    sx = {{my: 2}}
                    required
                    id="outlined-required"
                    label="Código Promocional"
                    value={codigo}
                    name="codigo"
                    onChange={ cambiarCodigo }
                />

                <TextField
                    sx = {{my: 2}}
                    type="number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    required
                    id="outlined-required"
                    label="Puntos"
                    value={puntos}
                    name="puntos"
                    onChange={ cambiarPuntos }
                />

                <FormControlLabel 
                    checked = { estado }
                    control = {<Switch onChange={ cambiarEstado } name="estado" />} 
                    label = {estado ? "Desactivar Código Promocional" : "Activar Código Promocional"}
                />

                <Button variant="contained" onClick={crearCodigoPromocional} sx={{mt: 5}}>
                    Grabar Código Promocional
                </Button>
            </Grid>
        </Container>
        
    );
}
 
export default CreacionCodigosPromocionales;