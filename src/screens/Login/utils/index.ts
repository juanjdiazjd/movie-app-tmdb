import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  mail: yup
    .string()
    .email(`Email incorrecto`)
    .required('Email es requerido'),
  password: yup
    .string()
    .min(6, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
    .required('La contraseña es requerida'),
});

