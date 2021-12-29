import { Field } from 'formik';
import React from 'react';
import { FormFieldTemplate } from '../../../types/builder.types';
import { InputProps } from '../../../types/viewer.types';
import classes from './input-dropdown.module.scss';

export const InputDropdown: React.VFC<InputProps> = ({ field }) => {
  if (field.options) {
    return (
      <div className={classes.container}>
        <label className={classes.title}>{field.title}</label>
        <Field component={'select'} name={field.title}>
          {field.options.map((option, key) => {
            return (
              <option key={key} value={option}>
                {option}
              </option>
            );
          })}
        </Field>
      </div>
    );
  } else {
    return <span>err</span>;
  }
};
