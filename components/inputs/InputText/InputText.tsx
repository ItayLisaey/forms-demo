import { Field, FormikProps } from 'formik';
import React from 'react';
import { InputProps } from '../../../types/viewer.types';
import classes from './input-text.module.scss';

export const InputText: React.VFC<InputProps> = ({ field, ...props }) => {
  return (
    <div className={classes.container}>
      <label htmlFor={field.title} className={classes.title}>
        {field.title}
      </label>
      <Field type='text' name={field.title} id={field.id} />
    </div>
  );
};
