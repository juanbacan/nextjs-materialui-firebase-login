import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({
  image = "/no-disponible.png",
  name = "No Name",
  description = "No description",
  buttonDisabled = false,
  puntos = 10,
  stock = 0,
  onClickButton = () => {console.log("Canjeando");}
}) {

  const printcg = () => {
    console.log("Hacer cualquier cosa");
  }

  return (
    <Card sx={{ maxWidth: 345 }} elevation={7}>
      <CardActionArea
        onClick={printcg}
      >
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt="green iguana"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{justifyContent: "space-between"}}>
        <p>Puntos: {puntos}</p>
        <p>Stock: {stock}</p>
        {/* <Button size="small">Share</Button> */}
        <Button disabled={buttonDisabled} size="small" onClick={onClickButton}>Canjear</Button>
      </CardActions>
    </Card>
  );
}