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
}

export type OnChangeType = (
  name: any,
) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

interface ValidationMessage {
  [name: string]: string;
}

export interface Element {
  inputType: 'input' | 'select' | 'multiLine' | 'timePicker' | 'datePicker' | 'colorPicker';
  label: string;
  name: string;
  show?: boolean;
  validation?: Validator;
  validationMessages?: ValidationMessage;
  value: any;
  valid: boolean;
  touched: boolean;
  col?: boolean | GridSize;
  cols?: Partial<Record<Breakpoint, boolean | GridSize>>;
  fullWidth?: boolean;
  disabled?: boolean;
}

export interface CheckboxElement extends Element {
  checked?: boolean;
  defaultChecked?: boolean;
  inputProps?: object;
  onChange: OnChangeType;
  value: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

export interface SelectElement extends Element {
  options: SelectOption[] | string[]
}

export interface PickerElement extends Element {
  value: string;
  onChange: OnChangeType;
}

export interface FormSchema {
  valid: boolean;
  elements: (Element | PickerElement)[];
}
