import { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';

import s from "./style.module.scss";
import { useAppDispatch } from "hooks/redux";
import { initialValues } from "data/auth-form";
import { validationSchema } from "helpers/forms/auth-form-validate";
import { sagasConstantsUser, sagaActionCreator } from "data/constants/saga";
import { IAuthFormState } from "./types";

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
