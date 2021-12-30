import { ObjectID } from 'bson';
import { createContext, useCallback, useState } from 'react';
import { FormTemplate, FormFieldTemplate } from '../types/builder.types';
import { moveItem } from '../utils/builder/general.utils';

interface BuilderContextProps {
  form: FormTemplate;
  editTitle: (title: string) => void;
  editId: (id: string) => void;
  addField: () => void;
  editField: (field: FormFieldTemplate) => void;
  deleteField: (id: FormFieldTemplate['id']) => void;
  moveField: (
    field: FormFieldTemplate,
    oldIndex: number,
    force: number
  ) => void;
  focus: FormFieldTemplate | undefined;
  setFocus: (id: any) => void;
}

export const BuilderContext = createContext<BuilderContextProps>({
  form: {
    title: 'Untitled Form',
    id: '',
    fields: [],
  },
  editTitle: () => {},
  editId: () => {},
  addField: () => {},
  editField: () => {},
  deleteField: () => {},
  moveField: () => {},
  focus: undefined,
  setFocus: () => {},
});

export const BuilderContextProvider: React.FC = (props) => {
  const [currentForm, setCurrentForm] = useState<FormTemplate>({
    title: 'Untitled Form',
    id: '',
    fields: [],
  });
  const [focusedField, setFocusedField] = useState<FormFieldTemplate>();

  const addField = () => {
    const id = new ObjectID().toString();
    const newField: FormFieldTemplate = {
      id: id,
      title: 'Untitled Field',
      required: false,
      type: 'text',
    };
    setCurrentForm((c) => {
      return { ...c, fields: [...c.fields, newField] };
    });
    setFocusedField(newField);
  };

  const editField = useCallback(
    (field: FormFieldTemplate) => {
      const fields = currentForm.fields.map((fld) => {
        if (fld.id === field.id) {
          return field;
        } else {
          return fld;
        }
      });
      setCurrentForm((c) => {
        return { ...c, fields: fields };
      });
    },
    [currentForm.fields]
  );

  const deleteField = useCallback(
    (id: FormFieldTemplate['id']) => {
      const fields = currentForm.fields.filter((fld) => fld.id !== id);
      setCurrentForm((c) => {
        return { ...c, fields: fields };
      });
    },
    [currentForm.fields]
  );

  const setFocus = useCallback(
    (id) => {
      const field = currentForm.fields.filter((field) => field.id === id);
      if (field) {
        setFocusedField(field[0]);
      } else {
        setFocusedField(undefined);
      }
    },
    [currentForm.fields]
  );

  const editTitle = useCallback((title: string) => {
    setCurrentForm((c) => {
      return {
        ...c,
        title: title,
      };
    });
  }, []);

  const editId = useCallback((id: string) => {
    setCurrentForm((c) => {
      return {
        ...c,
        id: id,
      };
    });
  }, []);

  const setFields = useCallback((fields: FormFieldTemplate[]) => {
    setCurrentForm((c) => {
      return {
        ...c,
        fields: fields,
      };
    });
  }, []);

  const moveField = useCallback(
    (field: FormFieldTemplate, oldIndex: number, force: number) => {
      console.log('before', currentForm.fields);

      const arr = moveItem(oldIndex, currentForm.fields, field, force);

      if (arr) {
        setFields(arr);
      }
    },
    [currentForm.fields, setFields]
  );

  return (
    <BuilderContext.Provider
      value={{
        form: currentForm,
        editTitle: editTitle,
        editId: editId,
        addField: addField,
        editField: editField,
        deleteField: deleteField,
        moveField: moveField,
        focus: focusedField,
        setFocus: setFocus,
      }}
    >
      {props.children}
    </BuilderContext.Provider>
  );
};
