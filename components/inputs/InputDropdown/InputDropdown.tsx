import React from 'react';
import { FormFieldTemplate } from '../../../types/builder.types';
import classes from './input-dropdown.module.scss';

export interface InputDropdownProps {
  field: FormFieldTemplate;
}

export const InputDropdown: React.VFC<InputDropdownProps> = ({ field }) => {
  if (field.options) {
    return (
      <div>
        <label htmlFor=''>{field.title}</label>
        <select name={field.title} id={field.id}>
          {field.options.map((option, key) => {
            return <option key={key}>{option}</option>;
          })}
        </select>
      </div>
    );
  } else {
    return <span>err</span>;
  }
};
