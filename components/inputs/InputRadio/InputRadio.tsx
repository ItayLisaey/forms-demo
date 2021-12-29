import { Field } from 'formik';
import React from 'react';
import { InputProps } from '../../../types/viewer.types';
import classes from './input-radio.module.scss';

export const InputRadio: React.VFC<InputProps> = ({ field }) => {
  if (field.options) {
    return (
      <div className={classes.container}>
        <label className={classes.title}>{field.title}</label>
        <div className={classes.options}>
          {field.options.map((option, key) => {
            return (
              <label key={key} className={classes.option}>
                <Field type='radio' name={field.title} value={option} />
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
