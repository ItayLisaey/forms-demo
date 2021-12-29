import React, { useContext, useState } from 'react';
import { BuilderContext } from '../../context/builder.context';
import { FormFieldTemplate } from '../../types/builder.types';
import { EditField } from '../EditField';
import classes from './edit-fields.module.scss';

export interface EditFieldsProps {}

export const EditFields: React.VFC<EditFieldsProps> = () => {
  const { form, focus } = useContext(BuilderContext);
  if (form.fields.length > 0) {
    return (
      <section className={classes.container}>
        {form.fields.map((field, key) => {
          if (field.id === focus?.id) {
            return <EditField key={key} field={field} />;
          } else {
            return <Field key={key} {...field} />;
          }
        })}
      </section>
    );
  } else {
    return <></>;
  }
};

export const Field: React.VFC<FormFieldTemplate> = (props) => {
  const { deleteField, setFocus } = useContext(BuilderContext);

  return (
    <div className={classes.field}>
      <h4>{props.title}</h4>
      <div>
        <button onClick={() => setFocus(props.id)}>edit</button>
        <button onClick={() => deleteField(props.id)}>delete</button>
      </div>
    </div>
  );
};
