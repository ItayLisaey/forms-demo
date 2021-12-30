import React, { useContext, useState } from 'react';
import { BuilderContext } from '../../context/builder.context';
import { FormFieldTemplate, FormTypes } from '../../types/builder.types';
import { optionsCheck } from '../../utils/builder/general.utils';
import classes from './edit-field.module.scss';
import { EditFieldActions } from './EditFieldActions';

export interface EditFieldProps {
  field: FormFieldTemplate;
}

export const EditField: React.VFC<EditFieldProps> = ({ field }) => {
  const [fieldValue, setFieldValues] = useState<Partial<FormFieldTemplate>>({
    title: field.title,
    required: field.required,
    type: field.type,
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
          <button onClick={() => deleteField(field.id)}>delete</button>
          <button onClick={() => setFocus(undefined)}>close</button>
        </div>
      </header>
      <EditFieldActions
        fieldValue={fieldValue}
        setFieldValues={setFieldValues}
      />
      <footer>
        <button onClick={handleSave}>save</button>
      </footer>
    </section>
  );
};
