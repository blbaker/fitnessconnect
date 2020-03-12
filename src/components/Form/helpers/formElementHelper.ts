import { Element, PickerElement } from '../models';

export const formElementHelper = ({
  fullWidth = true,
  inputType,
  label = '',
  name = '',
  show = true,
  validation = {},
  validationMessages = {},
  value = '',
  ...other
}): Element | PickerElement => {
  let cleanValue: any = value;
  if (inputType === 'datePicker' && cleanValue === '') {
    cleanValue = new Date();
  }
  return {
    fullWidth,
    inputType,
    label,
    name,
    show,
    touched: false,
    valid: false,
    validation,
    validationMessages,
    value: cleanValue,
    ...other,
  };
};
