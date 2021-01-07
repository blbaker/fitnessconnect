import { BaseElement, PickerElement, CheckboxElement } from '../models';

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
}): BaseElement | PickerElement | CheckboxElement => {
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
    value: cleanValue(value, inputType),
    ...other,
  };
};

const cleanValue = (value: any, inputType: string) => {
  let cleanValue: any = value;
  if (inputType === 'datePicker' && cleanValue === '') {
    cleanValue = new Date();
  }
  return cleanValue;
};
