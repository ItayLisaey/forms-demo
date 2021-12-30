import { FormFieldTemplate, FormTypes } from '../../types/builder.types';

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

export const moveItem = <T>(
  index: number,
  arr: T[],
  element: T,
  force: number
) => {
  const newArr = arr;
  if (index + force > newArr.length - 1) {
    return null;
  } else {
    newArr.splice(index, 1);
    newArr.splice(index + force, 0, element);
    return newArr;
  }
};
