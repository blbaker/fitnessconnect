import { PickerElement, Element } from '../models';
import { find } from 'underscore';
import { isDate, isAfter, isBefore } from 'date-fns';

export const checkValidity = (form: (Element | PickerElement)[], item: Element | PickerElement) => {
  const { value = '', validation: rules } = item;

  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = (typeof value === 'string' ? value.trim() !== '' : !!value) && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.regex) {
    const pattern = rules.regex;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isDateAfter) {
    const field = find(form, field => field.name === item.name);
    const comparingField = find(form, field => field.name === rules.isDateAfter);

    if (isDate(field.value)) {
      const startDate = new Date(field.value);
      const endDate = new Date(comparingField.value);

      isValid = isAfter(startDate, endDate);
    }
  }

  if (rules.isDateBefore) {
    const field = find(form, field => field.name === item.name);
    const comparingField = find(form, field => field.name === rules.isDateBefore);

    if (isDate(field.value)) {
      const startDate = new Date(field.value);
      const endDate = new Date(comparingField.value);

      isValid = isBefore(startDate, endDate);
    }
  }
  
  return isValid;
};