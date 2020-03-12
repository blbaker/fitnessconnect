import { Element, PickerElement } from '../models';
import { isDate, isAfter, isBefore } from 'date-fns';
import { find } from 'underscore';

export const checkForErrors = (form: (Element | PickerElement)[], item: Element | PickerElement) => {
  let hasErrors = {};
  const { value = '', validation: rules } = item;

  if (!rules) {
    return false;
  }

  if (rules.required && (typeof value === 'string' ? value.trim() === '' : !!!value)) {
    hasErrors = { ...hasErrors, required: true };
  }

  if (rules.minLength && value.length <= rules.minLength) {
    hasErrors = { ...hasErrors, minLength: true };
  }

  if (rules.maxLength && value.length >= rules.maxLength) {
    hasErrors = { ...hasErrors, maxLength: true };
  }

  const EMAIL_VALIDATOR = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (rules.isEmail && !EMAIL_VALIDATOR.test(value)) {
    hasErrors = { ...hasErrors, isEmail: true };
  }

  const NUMBER_VALIDATOR = /^\d+$/;
  if (rules.isNumeric && !NUMBER_VALIDATOR.test(value)) {
    hasErrors = { ...hasErrors, isNumeric: true };
  }

  const REGEX_VALIDATOR = rules.regex;
  if (rules.regex && !REGEX_VALIDATOR.test(value)) {
    hasErrors = { ...hasErrors, regex: true };
  }

  if (rules.isDateAfter) {
    const field = find(form, field => field.name === item.name);
    const comparingField = find(form, field => field.name === rules.isDateAfter);

    if (isDate(field.value) && comparingField && isDate(comparingField.value)) {
      const startDate = new Date(field.value);
      const endDate = new Date(comparingField.value);
      
      if (!isAfter(startDate, endDate)) {
        hasErrors = { ...hasErrors, isDateAfter: true };
      }
    } else {
      console.error(`${field.name} is not a valid date or isn't being compared to a valid date and therefore cannot be validated.`);
    }
  }

  if (rules.isDateBefore) {
    const field = find(form, field => field.name === item.name);
    const comparingField = find(form, field => field.name === rules.isDateBefore);
    
    if (isDate(field.value) && comparingField && isDate(comparingField.value)) {
      const startDate = new Date(field.value);
      const endDate = new Date(comparingField.value);
      
      if (!isBefore(startDate, endDate)) {
        hasErrors = { ...hasErrors, isDateBefore: true };
      }
    } else {
      console.error(`${field.name} is not a valid date or isn't being compared to a valid date and therefore cannot be validated.`);
    }
  }

  return hasErrors;
};
