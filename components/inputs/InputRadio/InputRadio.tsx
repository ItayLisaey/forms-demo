import React from 'react';
import { FormFieldTemplate } from '../../../types/builder.types';
import classes from './input-radio.module.scss';

export interface InputRadioProps {
  field: FormFieldTemplate;
}

export const InputRadio: React.VFC<InputRadioProps> = ({ field }) => {
  if (field.options) {
    return (
      <div>
        <label>{field.title}</label>
        <div>
          {field.options.map((option) => {
            return (
              <>
                <label htmlFor={option}>{option}</label>
                <input type='radio' name={field.id} id={field.id + option} />
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
