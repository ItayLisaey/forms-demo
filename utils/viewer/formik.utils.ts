import { FormikValues } from 'formik';
import { FormTemplate } from '../../types/builder.types';

export const generateInitialValues = (form: FormTemplate): FormikValues => {
  const fields = form.fields.map((field) => {
    if (field.options) {
      if (field.type === 'radio' || field.type === 'dropdown') {
        return [[field.title], ''];
      } else {
        return [[field.title], []];
      }
    } else {
      return [[field.title], ''];
    }
  });
  return Object.fromEntries(fields);
};
