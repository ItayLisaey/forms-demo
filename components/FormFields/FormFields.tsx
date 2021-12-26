import React from 'react';
import { FormFieldTemplate } from '../../types/builder.types';
import { FormField } from '../FormField';
import classes from './form-fields.module.scss';

export interface FormFieldsProps {
  fields: FormFieldTemplate[];
}

export const FormFields: React.VFC<FormFieldsProps> = ({ fields }) => {
  if (fields && fields.length > 0) {
    return (
      <main className={classes.container}>
        {fields.map((field, key) => {
          return <FormField field={field} key={key} />;
        })}
      </main>
    );
  } else {
    return <span>error loading fields</span>;
  }
};
