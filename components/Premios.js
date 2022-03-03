import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import MediaCard from '../components/MediaCard';

import DialogComponent from '../components/DialogComponent';
import DialogWarningComponent from '../components/DialogWarningComponent';

import updateDataFirebase from '../functions/updateDataFirebase';


const tituloNoPuntos = "No puedes canjear el premio";
const descriptionNoPuntos = "No tienes los puntos necesarios para canjear el premio, primero dirígete a canjear tus cupones para reunir puntos";

const tituloNoStock = "No puedes canjear el premio";
const descriptionNoStock = "El premio se ha agotado, prueba a elegir otro premio";


const Premios = ({data, setPuntos, puntos}) => {

    const [titulo, setTitulo] = useState("");
    const [mensaje, setMensaje] = useState("");

    // Para abrir el modal
    const [open, setOpen] = useState(false);

    // Para abrir el modal de Warning
    const [openWarning, setOpenWarning] = useState(false);

    // Guarda el estado del premio
    const [premioUpdate, setPremioUpdate] = useState(null);


    const comprobarCanjePremio = (premio) => {
        console.log(premio);

        const {puntosInt, stockInt} = premio;

        if(stockInt <= 0){
          setTitulo(tituloNoStock);
          setMensaje(descriptionNoStock);
          setOpenWarning(true);
        }
        else if( puntos < puntosInt ){
          setTitulo(tituloNoPuntos);
          setMensaje(descriptionNoPuntos);
          setOpenWarning(true); 
        }

        // Se canjea el premio
        else{
          setOpen(true);
          setPremioUpdate(premio);
        }
    }

    const canjearPremio = (premio) => {
      const {puntosInt, stockInt} = premio;
      updateDataFirebase("premios", premio.id, {"stockInt": stockInt - 1});
      premio.stockInt = premio.stockInt - 1;
      setPuntos(puntos - puntosInt);
      setOpen(false);
    }

    return (
      <>
        <Grid container justifyContent="center">
          {
            data.map((premio, index) => (
              <Box sx={{my: 4, mx: 2, width: "300px", height: "500px"}} key={index}>
                <MediaCard 
                  name = {premio.nombre}
                  image = {premio.image}
                  description = {premio.descripcion}
                  puntos = {premio.puntosInt}
                  stock = {premio.stockInt}
                  onClickButton = {() => comprobarCanjePremio(premio)}
                />

                <DialogComponent 
                  setOpen={setOpen}
                  open={open}
                  title={"¿Estas seguro de cambiar tus puntos por este premio?"}
                  description={"Una vez realizado el canje, se te restará la cantidad de puntos que valen el premio"}
                  handleFunction={() => canjearPremio(premio)}
                />
              </Box>
            ))
          }
        </Grid>
        
        <DialogWarningComponent 
          setOpen={setOpenWarning}
          open={openWarning}
          title={titulo}
          description={mensaje}
        />
      </>
    );
  }

  export default Premios;