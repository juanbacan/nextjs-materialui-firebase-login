import React, { useState, useContext } from 'react';
import { Grid, Box } from '@mui/material';
import MediaCard from '../components/MediaCard';

import DialogComponent from '../components/DialogComponent';
import DialogWarningComponent from '../components/DialogWarningComponent';

import updateDataFirebase from '../functions/updateDataFirebase';

import { FirebaseContext } from '../firebase';

const tituloNoPuntos = "No puedes canjear el premio";
const descriptionNoPuntos = "No tienes los puntos necesarios para canjear el premio, primero dirígete a canjear tus cupones para reunir puntos";

const tituloNoStock = "No puedes canjear el premio";
const descriptionNoStock = "El premio se ha agotado, prueba a elegir otro premio";


const Premios = ({data}) => {

    // Variable Global de Puntos
    const { puntos, actualizarPuntos } = useContext(FirebaseContext);
    // ***********************************************************

    const [titulo, setTitulo] = useState("");
    const [mensaje, setMensaje] = useState("");

    // Para abrir el modal
    const [open, setOpen] = useState(false);

    // Para abrir el modal de Warning
    const [openWarning, setOpenWarning] = useState(false);

    // Guarda el estado del premio
    const [premioUpdate, setPremioUpdate] = useState(null);


    const comprobarCanjePremio = (premio) => {

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

    const canjearPremio = () => {
      
      actualizarPuntos(puntos - premioUpdate.puntosInt)
      updateDataFirebase("premios", premioUpdate.id, {"stockInt": premioUpdate.stockInt - 1});

      console.log(data);
      console.log(premioUpdate.id)

      const newStock = premioUpdate.stockInt - 1;

      // Actualiza el número de stock de cada producto
      data.filter((elemento) => {
        if(elemento.id === premioUpdate.id){
          elemento.stockInt = newStock;
        }

        return elemento.id === premioUpdate.id;
      });
      setOpen(false);
    }

    return (
      <>
        <Grid container justifyContent="center">
          {
            data.map((premio, index) => (
              <Box sx={{my: 4, mx: 2, width: "300px"}} key={index}>
                <MediaCard 
                  name = {premio.nombre}
                  image = {premio.image}
                  description = {premio.descripcion}
                  puntos = {premio.puntosInt}
                  stock = {premio.stockInt}
                  onClickButton = {() => comprobarCanjePremio(premio)}
                />
              </Box>
            ))
          }
        </Grid>
        
        <DialogComponent 
          setOpen={setOpen}
          open={open}
          title={"¿Estas seguro de cambiar tus puntos por este premio?"}
          description={"Una vez realizado el canje, se te restará la cantidad de puntos que valen el premio"}
          handleFunction={() => canjearPremio()}
        />
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