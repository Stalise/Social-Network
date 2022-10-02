import { IFormState } from 'components/layout/header/editing-form/types';

interface IEditingFormErrors {
   forename?: string,
   surname?: string,
   dateOfBirth?: string,
   city?: string,
   file?: string,
}

export const validate = (values: IFormState) => {
   const errors: IEditingFormErrors = {};

   if (values.forename.length > 20) {
      errors.forename = 'Максимум 20 символов';
   } else if (!/^[a-zA-Z]+$/.test(values.forename) && values.forename.length) {
      errors.forename = 'Некорректные символы.';
   }

   if (values.surname.length > 20) {
      errors.surname = 'Максимум 20 символов';
   } else if (!/^[a-zA-Z]+$/.test(values.surname) && values.surname.length) {
      errors.surname = 'Некорректные символы.';
   }

   if (values.city.length > 20) {
      errors.city = 'Максимум 20 символов';
   } else if (!/^[a-zA-Z]+$/.test(values.city) && values.city.length) {
      errors.city = 'Некорректные символы.';
   }

   return errors;
};
