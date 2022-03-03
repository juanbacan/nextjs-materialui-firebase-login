import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import readDocumentFirebase from '../functions/readDocumentFirebase';
import updateDataFirebase from '../functions/updateDataFirebase';
import DialogComponent from '../components/DialogComponent';



const CanjePuntos = () => {

    const [codigo, setCodigo] = useState("");
    const [puntos, setPuntos] = useState(20);

    const [open, setOpen] = useState(false);

    const refDocumento = useRef(null);

    // useEffect(() => {
    //     const leerPuntosUsuario = async () => {
    //         const puntos = await readDocumentFirebase("puntos", "codigo", codigo);
    //     }
    //     leerPuntosUsuario();
    // }, []);
    
    const cambiarCodigo = (e) => {
        setCodigo(e.target.value);
    }

    const canjearCodigoPromocional = async () => {

        const documento = await readDocumentFirebase("codigos-promocionales", "codigo", codigo);
        refDocumento.current = documento;

        // TODO Comprobar si el codigo es valido o no

        // TODO Comprobar si el codigo esta en estado falso

        setOpen(true);
    }

    const confirmarCanjeo = async () => {
        const documento = refDocumento.current[0];
        
        updateDataFirebase("codigos-promocionales", documento.id, {estado: false});

        setPuntos(puntos + documento.puntosInt);

        setCodigo("");
        setOpen(false);
    }

    return (
        <>
            <Container maxWidth="sm">
                <Grid container justify-content="center" direction="column">
                    <p>Puntos</p>
                    <p>{puntos}</p>

                    <TextField
                        sx = {{my: 2}}
                        required
                        id="outlined-required"
                        label="Código Promocional"
                        value={codigo}
                        name="codigo"
                        onChange={ cambiarCodigo }
                    />

                    <Button variant="contained" onClick={canjearCodigoPromocional} sx={{mt:5}}>
                        Canjear Código Promocional
                    </Button>

                </Grid>
            </Container>

            <DialogComponent
                setOpen={setOpen}
                open={open}
                title="¿Esta seguro de canjear su código promocional?"
                description={"Una vez canjeado el código promocional, no podrá volver a utilizar este código"}
                handleFunction = {confirmarCanjeo}
            />
        </>
    );
}
 
export default CanjePuntos;