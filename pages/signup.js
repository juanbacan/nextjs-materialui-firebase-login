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

const Signup = () => {

  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await firebase.registrar(values.name, values.email, values.password);
        Router.push("/");
      } catch (error) {
        console.log(error);
        setError("Ha ocurrido un error, inténtalo más tarde");
      }
    },
  });

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
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
            autoComplete='name'
              margin="normal"
              fullWidth
              id="name"
              name="name"
              label="Nombre Completo"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              autoComplete="email"
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
              autoComplete="current-password"
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
            <TextField
              autoComplete=""
              margin="normal"
              fullWidth
              id="passwordConfirmation"
              name="passwordConfirmation"
              label="Confirmar Contraseña"
              type="password"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
              helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
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
 
export default Signup;
