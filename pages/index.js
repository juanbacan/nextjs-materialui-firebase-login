import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import readDataFirebase from '../functions/readDataFirebase';
import StackRectangularSkeleton from '../components/StackRectangularSkeleton';
import MediaCard from '../components/MediaCard';

const Home = () => {

  const [data, setData] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const readData = async() => {
      const dataDB = await readDataFirebase("animales");
      setData(dataDB);
      setReady(true);
    }
    readData();
  }, []);
  

  return (
    <Container component="main" maxWidth="lg">
      {
        !ready 
          ? <StackRectangularSkeleton />
          : <>
            {
              data.length > 0 
              ? <Animals
                  data={data}
                />
              : <Typography component="h4">
                  Aún no se ha agregado productos
                </Typography>
            } 
            </>   
      }
    </Container>
  );
};
 
export default Home;

const Animals = ({data}) => {
  return (
    <Grid container justifyContent="center">
      {
        data.map((animal, index) => (
          <Box sx={{my: 4, mx: 2}} key={index}>
            <MediaCard 
              name = {animal.name}
              image = {animal.image}
              description = {animal.description}
            />
          </Box>
        ))
      }
    </Grid>
  );
}
 