import { FormFieldTemplate, FormTypes } from '../../types/builder.types';

export const optionsCheck = (type: string | undefined) => {
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

export const editItem = <T>(item: T, arr: T[], newValue: T): T[] => {
  const newArr = arr;
  const index = newArr.findIndex((i) => i === item);
  newArr.splice(index, 1, newValue);
  return newArr;
};
