import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup
        .string('Ingresa tu email')
        .email('Ingresa un email válido')
        .required('El email es requerido'),
    password: yup
        .string('Ingresa tu contraseña')
        .min(8, 'La contraseña debe tener una longitud de al menos 8 caracteres')
        .required('La contraseña es requerida'),
    passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben ser iguales')
});

export default validationSchema;