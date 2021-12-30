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

// "arrayMove" sauce: https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another?rq=1

export function arrayMove<T>(arr: T[], fromIndex: number, toIndex: number) {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

// "changeIndex" sauce: https://www.akashmittal.com/change-position-of-element-in-array/

export const changeIndex = (
  arrayToUpdate: FormFieldTemplate[],
  elementToReposition: FormFieldTemplate,
  newIndex: number
) => {
  if (newIndex > arrayToUpdate.length - 1) {
    console.log('Array index out of bounds');
    return null;
  } else if (!arrayToUpdate.some((el) => el.id === elementToReposition.id)) {
    console.log('Element not found');
    return null;
  }

  const elementIndex = arrayToUpdate.findIndex(
    (el) => el.id === elementToReposition.id
  );

  arrayToUpdate.splice(elementIndex, 1);
  arrayToUpdate.splice(elementIndex, newIndex);
  return arrayToUpdate;
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
