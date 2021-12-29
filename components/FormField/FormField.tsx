import React from 'react';
import { FormFieldTemplate } from '../../types/builder.types';
import { InputProps } from '../../types/viewer.types';
import { InputCheckbox } from '../inputs/InputCheckbox';
import { InputDropdown } from '../inputs/InputDropdown';
import { InputRadio } from '../inputs/InputRadio';
import { InputText } from '../inputs/InputText';
import classes from './form-field.module.scss';

export const FormField: React.VFC<InputProps> = (props) => {
  switch (props.field.type) {
    case 'checkbox':
      return <InputCheckbox {...props} />;
    case 'text':
      return <InputText {...props} />;
    case 'radio':
      return <InputRadio {...props} />;
    case 'dropdown':
      return <InputDropdown {...props} />;

    default:
      return <InputText {...props} />;
  }
};
