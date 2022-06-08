import { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';

import s from "./AuthForm.module.scss";
import { useAppDispatch } from "hooks/redux";
import { initialValues } from "mock/authFromMock";
import { validationSchema } from "helpers/forms/authFormValidate";
import { sagasConstants, sagaActionCreator } from "mock/constants/saga";
import { IAuthFormState } from "./types";

interface IProps {
   tabStatus: boolean,
}

const AuthForm: FC<IProps> = ({ tabStatus }) => {

   const dispatch = useAppDispatch();

   const submitHandler = (values: IAuthFormState) => {
      dispatch(sagaActionCreator<IAuthFormState>(sagasConstants.SAGA_AUTH_USER, values));
   };

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={submitHandler}
      >
         {({ isValid, dirty }) => (
            <Form className={`${s.form} ${tabStatus ? s._active : ''}`}>
               <label className={s.inputContainer}>
                  Username
                  <Field
                     type="text"
                     name="username"
                     placeholder="Your username"
                     className={s.field}
                  />
                  <ErrorMessage component="p" name="username" className={s.error} />
               </label>

               <label className={s.inputContainer}>
                  Password
                  <Field
                     type="password"
                     name="password"
                     placeholder="Your password"
                     className={s.field}
                  />
                  <ErrorMessage component="p" name="password" className={s.error} />
               </label>

               <button
                  type="submit"
                  disabled={!dirty || !isValid}
                  className={s.submit}
               >
                  AUTHORIZATION
               </button>
            </Form>
         )}
      </Formik>
   );
};

export default AuthForm;