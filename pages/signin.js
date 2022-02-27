import React, { useState } from 'react';
import { useFormik } from 'formik';
import Router from 'next/router'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';


import firebase from '../firebase';
import validationSchema from '../utils/validationSchema';


const Signin = () => {

  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await firebase.loginWithEmail(values.email, values.password);
        Router.push("/");
      } catch (error) {
        setError("Usuario no encontrado");
      }
    },
  });

  const loginWithGoogle = async () => {
    try {
      firebase.loginGoogle();
      Router.push("/");
    } catch (error) {
      setError("Error al ingresar con Google, inténtelo más tarde");
    }

  }

  return (
    <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Button
            sx={{ 
              mt: 2, mb: 2, 
              backgroundColor: "#EEE", 
              color: "black",
              '&:hover': {
                backgroundColor: "#d5d5d5"
              } 
            }}
            startIcon={<img src="/logos/google-icon.svg" widht="25" height="25"></img>}
            type="submit"
            fullWidth
            variant="contained"
            onClick={loginWithGoogle}
          >
            Continuar con Google
          </Button>

          <Typography component="h5" variant="h6">O puedes ingresar con:</Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            {(error !== "") &&
              <Alert severity="error">{error}</Alert>
            }

            <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 3, mb: 2 }}>
              Ingresar
            </Button>
          </Box>
      </Box>
    </Container>
  );
};
 
export default Signin;