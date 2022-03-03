import React, { useState, useEffect } from 'react';
import { Container, Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import StackRectangularSkeleton from '../components/StackRectangularSkeleton';

import Premios from '../components/Premios';

import readDataFirebase from '../functions/readDataFirebase';


const CanjePremios = () => {

    const [puntos, setPuntos] = useState(500);

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
                                    setPuntos={setPuntos}
                                    puntos={puntos} 
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

