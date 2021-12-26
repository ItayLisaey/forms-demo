import React, { useContext, useState } from 'react';
import { BuilderContext } from '../../context/builder.context';
import { FormFieldTemplate } from '../../types/builder.types';
import classes from './edit-field.module.scss';

export interface EditFieldProps {
  field: FormFieldTemplate;
}

export const EditField: React.VFC<EditFieldProps> = ({ field }) => {
  const [fieldValue, setFieldValues] = useState({
    title: field.title,
    required: false,
  });
  const { editField, setFocus, deleteField } = useContext(BuilderContext);

  const handleSave = () => {
    editField({
      ...field,
      ...fieldValue,
    });
    setFocus(undefined);
    console.log(field);
  };

  return (
    <section className={classes.container}>
      <header>
        <h3>{`Edit ${field.title}`}</h3>
        <div>
          <button>change field</button>
          <button onClick={() => deleteField(field.id)}>delete</button>
          <button onClick={() => setFocus(undefined)}>close</button>
        </div>
      </header>
      <form action='save'>
        <label htmlFor='title'>Label</label>
        <label htmlFor='required'>Required</label>
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
      </form>
      <footer>
        <button onClick={handleSave}>save</button>
      </footer>
    </section>
  );
};
