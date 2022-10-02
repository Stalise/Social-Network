import { FC } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { initialValues } from 'data/auth-form';
import { sagaActionCreator, sagasConstantsUser } from 'data/constants/saga';
import { useAppDispatch } from 'hooks/redux';
import { validationSchema } from 'utils/forms/auth-form-validate';

import { IAuthFormState } from './types';

import s from './style.module.scss';

export const AuthForm: FC = () => {

   const dispatch = useAppDispatch();

   const submitHandler = (values: IAuthFormState) => {
      dispatch(sagaActionCreator<IAuthFormState>(sagasConstantsUser.SAGA_AUTH_USER, values));
   };

   return (
      <Formik
         initialValues={ initialValues }
         validationSchema={ validationSchema }
         onSubmit={ submitHandler }
      >
         { ({ isValid, dirty }) => (
            <Form className={ s.form }>
               <label className={ s.inputContainer }>
                  Username
                  <Field
                     type="text"
                     name="username"
                     placeholder="Your username"
                     className={ s.field }
                  />
                  <ErrorMessage component="p" name="username" className={ s.error } />
               </label>

               <label className={ s.inputContainer }>
                  Password
                  <Field
                     type="password"
                     name="password"
                     placeholder="Your password"
                     className={ s.field }
                  />
                  <ErrorMessage component="p" name="password" className={ s.error } />
               </label>

               <button
                  type="submit"
                  disabled={ !dirty || !isValid }
                  className={ s.submit }
               >
                  AUTHORIZATION
               </button>
            </Form>
         ) }
      </Formik>
   );
};
