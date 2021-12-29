import { FormTypes } from '../../types/builder.types';

export const optionsCheck = (type: FormTypes | undefined) => {
  if (type) {
    if (type === 'radio' || type === 'checkbox' || type === 'dropdown') {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
