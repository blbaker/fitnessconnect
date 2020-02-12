import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { GridSize } from '@material-ui/core/Grid';

export interface Validator {
  required?: boolean;
  isEmail?: boolean;
  minLength?: number;
  maxLength?: number;
  isNumeric?: boolean;
  regex?: RegExp;
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
  value: string;
  valid: boolean;
  touched: boolean;
  col?: boolean | GridSize;
  cols?: Partial<Record<Breakpoint, boolean | GridSize>>;
  fullWidth?: boolean;
}

export interface PickerElement extends Element {
  value: string;
  onChange: OnChangeType;
}

export interface FormSchema {
  valid: boolean;
  elements: (Element | PickerElement)[];
}
