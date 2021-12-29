export interface FormTemplate {
  id: string;
  title: string;
  fields: FormFieldTemplate[];
}

export interface FormFieldTemplate {
  id: string;
  title: string;
  required: boolean;
  type: FormTypes;
  options?: string[];
}

export type FormTypes = 'text' | 'checkbox' | 'radio' | 'dropdown';

export interface ShortTextField extends FormFieldTemplate {}
