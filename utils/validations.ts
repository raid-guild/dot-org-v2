import * as yup from 'yup';

export const hireSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
});

export const joinSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
});
