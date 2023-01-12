import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nombre es requerido'),
  surname: yup
    .string()
    .required('Apellido es requerido'),
  mail: yup.string().email(`Email incorrecto`).required('Email es requerido'),
  password: yup
    .string()
    .min(6, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
    .required('La contraseña es requerida'),
});
