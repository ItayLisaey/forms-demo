import { FormikProps } from 'formik';
import { InputHTMLAttributes } from 'react';
import { FormFieldTemplate } from './builder.types';

export interface InputProps extends FormikProps<any> {
  field: FormFieldTemplate;
  // value: InputHTMLAttributes<HTMLInputElement>['value'];
  // onChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
}
