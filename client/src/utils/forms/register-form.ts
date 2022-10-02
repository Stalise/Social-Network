import * as Yup from 'yup';

export const validationSchema = Yup.object({
   username: Yup.string()
      .required('Required field')
      .min(4, 'Minimum 4 characters')
      .max(10, 'Maximum 10 characters')
      .matches(/^[0-9a-z]+$/, 'Invalid characters'),
   name: Yup.string()
      .required('Required field')
      .min(2, 'Minimum 2 characters')
      .max(15, 'Maximum 15 characters')
      .matches(/^[a-zA-Z]+$/, 'Invalid characters'),
   surname: Yup.string()
      .required('Required field')
      .min(2, 'Minimum 2 characters')
      .max(15, 'Maximum 15 characters')
      .matches(/^[a-zA-Z]+$/, 'Invalid characters'),
   birth: Yup.date()
      .required('Required field'),
   city: Yup.string()
      .required('Required field')
      .min(2, 'Minimum 2 characters')
      .max(15, 'Maximum 15 characters')
      .matches(/^[a-zA-Z]+$/, 'Invalid characters'),
   file: Yup.string()
      .required('Required field'),
   password: Yup.string()
      .required('Required field')
      .min(6, 'Minimum 6 characters')
      .max(15, 'Maximum 15 characters')
      .matches(/^[a-zA-Z0-9]+$/, 'Invalid characters'),
});
