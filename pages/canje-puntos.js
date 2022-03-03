import React, { useState, useContext, useRef } from 'react';
import { Container, Grid, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import readDocumentFirebase from '../functions/readDocumentFirebase';
import updateDataFirebase from '../functions/updateDataFirebase';
import DialogComponent from '../components/DialogComponent';
import DialogWarningComponent from '../components/DialogWarningComponent';

import { FirebaseContext } from '../firebase/';

const warning1Title = "Código promocional Inválido";
const warning1Description = "El código promocional que ha ingresado no existe";
const warning2Title = "Código promocional ya Canjeado";
const warning2Description = "El código promocional ya ha sido canjeado";

const CanjePuntos = () => {

    // Variable Global de Puntos
    const { puntos, actualizarPuntos } = useContext(FirebaseContext);
    // ***********************************************************

    const [codigo, setCodigo] = useState("");

    // Para los modales
    const [open, setOpen] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);


    const [titleWarning, setTitleWarning] = useState("");
    const [descriptionWarning, setDescriptionWarning] = useState("");

    // *************************************************

    const refDocumento = useRef(null);
    
    const cambiarCodigo = (e) => {
        setCodigo(e.target.value);
    }

    const canjearCodigoPromocional = async () => {

        const documento = await readDocumentFirebase("codigos-promocionales", "codigo", codigo);
        

        if (documento.length <= 0) {
            // No existe el código
            console.log("No existe el código");
            setTitleWarning(warning1Title);
            setDescriptionWarning(warning1Description);
            setOpenWarning(true);

        } else if(documento[0].estado === false){
            // El código ya ha sido canjeado
            console.log("El código ya ha sido canjeado")
            setTitleWarning(warning2Title);
            setDescriptionWarning(warning2Description);
            setOpenWarning(true);

        } else{
            // Se puede canjear el código
            refDocumento.current = documento;
            setOpen(true);
        }
    }

    const confirmarCanjeo = async () => {
        const documento = refDocumento.current[0];
        
        updateDataFirebase("codigos-promocionales", documento.id, {estado: false});

        actualizarPuntos(puntos + documento.puntosInt);

        setCodigo("");
        setOpen(false);
    }

    return (
        <>
            <Container maxWidth="sm" sx={{mt: 5}}>
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

            <DialogWarningComponent 
                setOpen={setOpenWarning}
                open={openWarning}
                title={titleWarning}
                description={descriptionWarning}
            />  
        </>
    );
}
 
export default CanjePuntos;