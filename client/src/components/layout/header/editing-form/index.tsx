import { FC, useState } from "react";
import { useFormik } from 'formik';

import s from "./style.module.scss";
import { initialValues } from "data/editing-form";
import { validate } from "helpers/forms/edition-form-validate";

import { Modal } from "components/common/modal";

export const EditingForm: FC = () => {

   const [isModal, setIsModal] = useState(false);

   const formik = useFormik({
      initialValues,
      validate,
      onSubmit: values => {
      },
   });

   return (
      <div className={ s.editing }>
         <button onClick={ () => setIsModal(!isModal) } className={ s.editingButton }></button>

         <Modal isModal={ isModal } setIsModal={ setIsModal }>
            <div className={ s.container }>
               <p className={ s.title }>Edit profile</p>
               <form className={ s.editingForm } onSubmit={ formik.handleSubmit }>
                  <label className={ s.inputContainer }>
                     Name
                     <input
                        className={ s.field }
                        type="text"
                        placeholder={ "Name" }
                        name="forename"
                        onChange={ formik.handleChange }
                        value={ formik.values.forename }
                     />

                     { formik.errors.forename ? <div className={ s.error }>{ formik.errors.forename }</div> : null }
                  </label>

                  <label className={ s.inputContainer }>
                     Surname
                     <input
                        className={ s.field }
                        type="text"
                        placeholder={ "Surname" }
                        name="surname"
                        onChange={ formik.handleChange }
                        value={ formik.values.surname }
                     />

                     { formik.errors.surname ? <div className={ s.error }>{ formik.errors.surname }</div> : null }
                  </label>

                  <label className={ s.inputContainer }>
                     Date of birth
                     <input
                        className={ s.field }
                        type="date"
                        name="dateOfBirth"
                        onChange={ formik.handleChange }
                        value={ formik.values.dateOfBirth }
                        min="1960-01-01" max="2015-01-01"
                     />

                     { formik.errors.dateOfBirth ? <div className={ s.error }>{ formik.errors.dateOfBirth }</div> : null }
                  </label>

                  <label className={ s.inputContainer }>
                     City
                     <input
                        className={ s.field }
                        type="text"
                        placeholder={ "London" }
                        name="city"
                        onChange={ formik.handleChange }
                        value={ formik.values.city }
                     />

                     { formik.errors.city ? <div className={ s.error }>{ formik.errors.city }</div> : null }
                  </label>

                  <div className={ `${s.photoContainer} ${formik.values.file ? s._active : ''}` }>
                     <label className={ s.photoLabel }>
                        Photo
                        <input
                           className={ s.photoField }
                           type="file"
                           name="file"
                           onChange={ event => formik.setFieldValue("file", event.target.files?.length ? event.target.files[0] : null) }
                        />
                     </label>

                     { formik.errors.file ? <div>{ formik.errors.file }</div> : null }
                  </div>

                  <button
                     type="submit"
                     disabled={ !formik.dirty ? true : false || !formik.isValid ? true : false }
                     className={ s.submit }
                  >
                     CHANGE
                  </button>
               </form>
            </div>
         </Modal>
      </div>
   );
};
