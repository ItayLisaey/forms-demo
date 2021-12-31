import {
  faCaretDown,
  faCaretUp,
  faCopy,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { BuilderContext } from '../../context/builder.context';
import { FormFieldTemplate, FormTypes } from '../../types/builder.types';
import {
  editItem,
  moveItem,
  optionsCheck,
} from '../../utils/builder/general.utils';
import classes from './edit-field.module.scss';
import { EditFieldActions } from './EditFieldActions';

export interface EditFieldProps {
  field: FormFieldTemplate;
}

export const EditField: React.VFC<EditFieldProps> = ({ field }) => {
  // const [fieldValue, setFieldValues] = useState<Partial<FormFieldTemplate>>({
  //   title: field.title,
  //   required: field.required,
  //   type: field.type,
  // });
  const { editField, duplicateField, deleteField } = useContext(BuilderContext);

  // const handleSave = () => {
  //   editField({
  //     ...field,
  //     ...fieldValue,
  //   });
  //   setFocus(undefined);
  //   console.log(field);
  // };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editField({
      ...field,
      title: e.target.value,
    });
  };

  const handleAddOption = () => {
    editField({
      ...field,
      options: field.options
        ? [...field.options, 'New option']
        : ['New option'],
    });
  };

  const handleEditOption = (
    option: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (field.options) {
      const options = editItem(option, field.options, e.target.value);

      editField({
        ...field,
        options: options,
      });
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    if (optionsCheck(newValue)) {
      editField({
        ...field,
        type: newValue as FormTypes,
      });
    } else if (newValue === 'text') {
      editField({
        ...field,
        type: newValue as FormTypes,
        options: undefined,
      });
    }
  };

  const handleMoveOption = (option: string, force: number) => {
    if (field.options) {
      const index = field.options.findIndex((op) => op === option);
      const newOptions = moveItem(index, field.options, option, force);
      if (newOptions) {
        editField({
          ...field,
          options: newOptions,
        });
      }
    }
  };

  const handleRequiredChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'required') {
      editField({
        ...field,
        required: true,
      });
    } else if (e.target.value === 'not required') {
      editField({
        ...field,
        required: false,
      });
    }
  };

  return (
    <section className={classes.container}>
      <header>
        <input
          type='text'
          value={field.title}
          onChange={(e) => handleTitleChange(e)}
        />
        <select
          name='type'
          value={field.type}
          onChange={(e) => handleTypeChange(e)}
        >
          <option value='dropdown'>dropdown</option>
          <option value='text'>text</option>
          <option value='checkbox'>checkbox</option>
          <option value='radio'>radio</option>
        </select>
      </header>
      <main>
        {field.options &&
          field.options?.map((option, key) => (
            <div className={classes.option} key={key}>
              <div>
                <button onClick={() => handleMoveOption(option, -1)}>
                  <FontAwesomeIcon icon={faCaretUp} />
                </button>
                <button onClick={() => handleMoveOption(option, +1)}>
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </div>
              <input
                placeholder={'option'}
                value={option}
                onChange={(e) => handleEditOption(option, e)}
              />
            </div>
          ))}
      </main>
      {/* <EditFieldActions
        fieldValue={fieldValue}
        setFieldValues={setFieldValues}
      /> */}
      <footer
        className={classNames(classes.footer, {
          [classes.wOptions]: !optionsCheck(field.type),
        })}
      >
        {optionsCheck(field.type) && (
          <button onClick={handleAddOption} className={classes.add}>
            add option
          </button>
        )}
        <div className={classes.actions}>
          <button onClick={() => duplicateField(field)}>
            <FontAwesomeIcon icon={faCopy} />
          </button>
          <button onClick={() => deleteField(field.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <select
            name='required'
            value={field.required ? 'required' : 'not required'}
            onChange={(e) => handleRequiredChange(e)}
          >
            <option value='not required'>not required</option>
            <option value='required'>required</option>
          </select>
        </div>
      </footer>
    </section>
  );
};
