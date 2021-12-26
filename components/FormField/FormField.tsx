import React from 'react';
import { FormFieldTemplate } from '../../types/builder.types';
import classes from './form-field.module.scss';

export interface FormFieldProps {
  field: FormFieldTemplate;
}

export const FormField: React.VFC<FormFieldProps> = ({ field }) => {
  switch (field.type) {
    case 'checkbox':
      return <FormInput field={field} />;
    case 'text':
      return <FormInput field={field} />;
    case 'radio':
      return <FormInput field={field} />;

    default:
      return <FormInput field={field} />;
  }
};

interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    FormFieldProps {}

export const FormInput: React.VFC<InputProps> = (props) => {
  return (
    <div>
      <label htmlFor=''>{props.field.title}</label>
      <input type={props.field.type} name={props.title} id={props.id} />
      {props.field.options && (
        <form>
          {props.field.options.map((option, key) => {
            return (
              <div key={key}>
                <label htmlFor='option'>{option}</label>
                <input
                  type='radio'
                  name={props.field.title}
                  id={option + key}
                />
              </div>
            );
          })}
        </form>
      )}
    </div>
  );
};
