import React from 'react';
import { FormFieldTemplate } from '../../../types/builder.types';
import classes from './input-text.module.scss';

interface InputTextProps {
  field: FormFieldTemplate;
}

export const InputText: React.VFC<InputTextProps> = ({ field }) => {
  return (
    <div>
      <label htmlFor={field.title}>{field.title}</label>
      <input type='text' name={field.title} id={field.id} />
    </div>
  );
};
