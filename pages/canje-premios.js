import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import StackRectangularSkeleton from '../components/StackRectangularSkeleton';

import Premios from '../components/Premios';

import readDataFirebase from '../functions/readDataFirebase';

import { FirebaseContext } from '../firebase/';

const CanjePremios = () => {

    const { puntos } = useContext(FirebaseContext);


    //const [puntos, setPuntos] = useState(2500);

    const [data, setData] = useState([]);
    const [ready, setReady] = useState(false);
  
    useEffect(() => {
      const readData = async() => {
        const dataDB = await readDataFirebase("premios");
        setData(dataDB);
        setReady(true);
      }
      readData();
    }, []);

    return (
        <>
            <Container maxWidth="lg">
                {
                    !ready 
                    ? <StackRectangularSkeleton />
                    : <>
                        {
                        data.length > 0 
                        ?   
                            <>
                                <p>Puntos: {puntos}</p>
                                <Premios
                                    data={data}
                                />
                            </>
                            
                        :   <Typography component="h4">
                                Aún no se ha agregado premios
                            </Typography>
                        } 
                        </>   
                }
            </Container>
        </>
    );
}
 
export default CanjePremios;

