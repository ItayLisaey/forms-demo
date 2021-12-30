import {
  faFont,
  faSquareCaretDown,
  faSquareCheck,
  faTrash,
  faWrench,
  faCircleDot,
  faSquareCaretUp,
  faCaretUp,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { BuilderContext } from '../../context/builder.context';
import { FormFieldTemplate, FormTypes } from '../../types/builder.types';
import { EditField } from '../EditField';
import classes from './edit-fields.module.scss';

export interface EditFieldsProps {}

export const EditFields: React.VFC<EditFieldsProps> = () => {
  const { form, focus } = useContext(BuilderContext);

  useEffect(() => {
    console.log('form', form);
  }, [form]);

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
  const { deleteField, setFocus, moveField, form } = useContext(BuilderContext);

  const handleMove = (dir: 'up' | 'down') => {
    const oldIndex = form.fields.findIndex((fld) => fld.id === props.id);

    if (dir === 'up') {
      moveField(props, oldIndex, -1);
    } else {
      moveField(props, oldIndex, +1);
    }
  };

  return (
    <div className={classes.field}>
      <div className={classes.info}>
        <div className={classes.move}>
          <button onClick={() => handleMove('up')}>
            <FontAwesomeIcon icon={faCaretUp} />
          </button>
          <button onClick={() => handleMove('down')}>
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
        </div>
        <div className={classes.title}>
          <FontAwesomeIcon icon={fieldTypeIcon(props.type)} />
          <h4>{props.title}</h4>
        </div>
      </div>

      <div className={classes.actions}>
        <button onClick={() => setFocus(props.id)}>
          <FontAwesomeIcon icon={faWrench} />
          <span>Edit</span>
        </button>
        <button onClick={() => deleteField(props.id)}>
          <FontAwesomeIcon icon={faTrash} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

const fieldTypeIcon = (type: FormTypes) => {
  switch (type) {
    case 'checkbox':
      return faSquareCheck;
    case 'dropdown':
      return faSquareCaretDown;
    case 'radio':
      return faCircleDot;

    case 'text':
      return faFont;
    default:
      return faFont;
  }
};
