import { FC } from "react";
import { useFormik } from 'formik';

import s from "./RegForm.module.scss";
import { useAppDispatch } from "hooks/redux";
import { initialValues } from "mock/registerFormMock";
import { validationSchema, transformFile } from "helpers/forms/registerForm";
import { sagasConstants, sagaActionCreator } from "mock/constants/saga";
import { IRegFormState } from "./types";

interface IProps {
   tabStatus: boolean,
}

const RegForm: FC<IProps> = ({ tabStatus }) => {

   const dispatch = useAppDispatch();

   const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values: IRegFormState) => {
         const duplicateObj = { ...values };

         if (typeof (values.file) !== "string") {
            const updatedFile: string = await transformFile(values.file);

            duplicateObj.file = updatedFile;
            dispatch(sagaActionCreator<IRegFormState>(sagasConstants.SAGA_REG_USER, duplicateObj));
         }
      },
   });

   return (
      <form onSubmit={formik.handleSubmit} className={`${s.form} ${tabStatus ? s._active : ''}`}>
         <label className={s.inputContainer}>
            Username
            <input
               className={s.field}
               type="text"
               placeholder="Example: sun144"
               {...formik.getFieldProps('username')}
            />

            {formik.errors.username && formik.touched.username && <div className={s.error}>{formik.errors.username}</div>}
         </label>

         <label className={s.inputContainer}>
            Name
            <input
               className={s.field}
               type="text"
               placeholder="Example: John"
               {...formik.getFieldProps('name')}
            />

            {formik.errors.name && formik.touched.name && <div className={s.error}>{formik.errors.name}</div>}
         </label>

         <label className={s.inputContainer}>
            Surname
            <input
               className={s.field}
               type="text"
               placeholder="Example: Lingard"
               {...formik.getFieldProps('surname')}
            />

            {formik.errors.surname && formik.touched.surname && <div className={s.error}>{formik.errors.surname}</div>}
         </label>

         <label className={s.inputContainer}>
            Date of birth
            <input
               className={s.field}
               type="date"
               min="1960-01-01" max="2015-01-01"
               {...formik.getFieldProps("birth")}
            />

            {formik.errors.birth && formik.touched.birth && <div className={s.error}>{formik.errors.birth}</div>}
         </label>

         <label className={s.inputContainer}>
            City
            <input
               className={s.field}
               type="text"
               placeholder={"London"}
               {...formik.getFieldProps("city")}
            />

            {formik.errors.city && formik.touched.city && <div className={s.error}>{formik.errors.city}</div>}
         </label>

         <div className={`${s.photoContainer} ${formik.values.file ? s._active : ''}`}>
            <label className={s.photoLabel}>
               Photo
               <input
                  className={s.photoField}
                  type="file"
                  name="file"
                  onChange={event => formik.setFieldValue("file", event.target.files?.length ? event.target.files[0] : null)}
               />
            </label>

            {formik.errors.file && formik.touched.file && <div className={s.error}>{formik.errors.file}</div>}
         </div>

         <label className={s.inputContainer}>
            Password
            <input
               className={s.field}
               type="password"
               placeholder="Example: bend12AW"
               {...formik.getFieldProps("password")}
            />

            {formik.errors.password && formik.touched.password && <div className={s.error}>{formik.errors.password}</div>}
         </label>

         <button
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
            className={s.submit}
         >
            REGISTRATION
         </button>
      </form>
   );
};

export default RegForm;