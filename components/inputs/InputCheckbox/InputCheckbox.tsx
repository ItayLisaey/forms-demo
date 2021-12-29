import React from 'react';
import { FormFieldTemplate } from '../../../types/builder.types';
import classes from './input-checkbox.module.scss';

export interface InputCheckboxProps {
  field: FormFieldTemplate;
}

export const InputCheckbox: React.VFC<InputCheckboxProps> = ({ field }) => {
  if (field.options) {
    return (
      <div>
        <label>{field.title}</label>
        <div>
          {field.options.map((option) => {
            return (
              <>
                <label htmlFor={option}>{option}</label>
                <input type='checkbox' name={option} id={field.id + option} />
              </>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span>err</span>;
  }
};
