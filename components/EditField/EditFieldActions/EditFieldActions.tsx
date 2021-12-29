import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { FormFieldTemplate, FormTypes } from '../../../types/builder.types';
import { optionsCheck } from '../../../utils/builder/general.utils';
import classes from './edit-field-actions.module.scss';

export interface EditFieldActionsProps {
  fieldValue: Partial<FormFieldTemplate>;
  setFieldValues: Dispatch<SetStateAction<Partial<FormFieldTemplate>>>;
}

export const EditFieldActions: React.VFC<EditFieldActionsProps> = ({
  fieldValue,
  setFieldValues,
}) => {
  const handleAddOption = () => {
    console.log('hey');

    setFieldValues((vals) => {
      return {
        ...vals,
        options: vals.options
          ? [...vals.options, 'new option']
          : ['new option'],
      };
    });
  };

  const options = useMemo(() => {
    return fieldValue.options ?? [];
  }, [fieldValue]);

  useEffect(() => {
    console.log('field Value', fieldValue);
  }, [fieldValue]);

  return (
    <form>
      <div>
        <label htmlFor='title'>
          Label
          <input
            name='title'
            type='text'
            placeholder='Question Name'
            value={fieldValue.title}
            onChange={(e) =>
              setFieldValues((vals) => {
                return { ...vals, title: e.target.value };
              })
            }
          />
        </label>
        <label htmlFor='required'>
          Required
          <input
            type='checkbox'
            name='required'
            value={fieldValue.required ? 'on' : undefined}
            onChange={(e) =>
              setFieldValues((vals) => {
                return { ...vals, required: e.target.checked };
              })
            }
          />
        </label>
        <label htmlFor=''>
          Field Type
          <select
            name='type'
            value={fieldValue.type}
            onChange={(e) =>
              setFieldValues((vals) => {
                return { ...vals, type: e.target.value as FormTypes };
              })
            }
          >
            <option value='dropdown'>dropdown</option>
            <option value='text'>text</option>
            <option value='checkbox'>checkbox</option>
            <option value='radio'>radio</option>
          </select>
        </label>
      </div>
      {optionsCheck(fieldValue.type) && (
        <div>
          {options.map((option, key) => {
            return <span key={key}>{option}</span>;
          })}
          <button type='button' onClick={handleAddOption}>
            add option
          </button>
        </div>
      )}
    </form>
  );
};
