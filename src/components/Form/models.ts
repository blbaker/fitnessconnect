import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { GridSize } from '@material-ui/core/Grid';

type FieldName = string;

export interface SelectOption {
  label: string;
  value: string;
}

export interface Validator {
  required?: boolean;
  isEmail?: boolean;
  minLength?: number;
  maxLength?: number;
  isNumeric?: boolean;
  regex?: RegExp;
  isDateAfter?: FieldName;
  isDateBefore?: FieldName;
  function?(value: any): boolean;
  functions?: object;
}

export type OnChangeType = (
  name: any,
) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

interface ValidationMessage {
  [name: string]: string;
}

export type InputType =
  | 'custom'
  | 'input'
  | 'select'
  | 'multiLine'
  | 'timePicker'
  | 'datePicker'
  | 'colorPicker'
  | 'multiSelect';

export interface BaseElement {
  col?: boolean | GridSize;
  cols?: Partial<Record<Breakpoint, boolean | GridSize>>;
  disabled?: boolean;
  fullWidth?: boolean;
  inputType: InputType;
  label: string;
  name: string;
  show?: boolean;
  touched: boolean;
  valid: boolean;
  validation?: Validator;
  validationMessages?: ValidationMessage;
  value: string | string[];
}
export interface ComponentElement extends BaseElement {
  component: any;
}

export interface CheckboxElement extends BaseElement {
  checked?: boolean;
  defaultChecked?: boolean;
  inputProps?: object;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  onChange?: OnChangeType;
}

export interface PickerElement extends BaseElement {
  onChange?: OnChangeType;
}

export type FormElement = BaseElement | ComponentElement | CheckboxElement | PickerElement;

export interface FormSchema {
  elements: FormElement[];
  valid: boolean;
}
