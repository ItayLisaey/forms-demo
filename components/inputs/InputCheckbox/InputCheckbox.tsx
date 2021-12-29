import { Field, useFormikContext } from 'formik';
import React from 'react';
import { InputProps } from '../../../types/viewer.types';
import classes from './input-checkbox.module.scss';

export const InputCheckbox: React.VFC<InputProps> = ({ field }) => {
  // const { values } = useFormikContext();

  if (field.options) {
    return (
      <div className={classes.container}>
        <label className={classes.title}>{field.title}</label>
        <div className={classes.options} id={`checkbox-group`} role='group'>
          {field.options.map((option, key) => {
            return (
              <label key={key} className={classes.option}>
                <Field type='checkbox' name={field.title} value={option} />
                {option}
              </label>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span>err</span>;
  }
};
