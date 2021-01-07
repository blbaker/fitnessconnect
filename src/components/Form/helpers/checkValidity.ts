import { FormElement } from '../models';
import { find } from 'lodash';
import { isDate, isAfter, isBefore } from 'date-fns';

export const checkValidity = (form: FormElement[], item: FormElement) => {
  const { value = '', validation: rules, inputType } = item;

  const isValuePresent = (value) => {
    if (inputType === 'multiSelect') {
      return value.length > 0;
    }
    return typeof value === 'string' ? value.trim() !== '' : !!value;
  };

  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = isValuePresent(value) && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (typeof value === 'string' && isValuePresent(value)) {
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value.toLocaleLowerCase()) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.regex) {
      const pattern = rules.regex;
      isValid = pattern.test(value) && isValid;
    }
  }

  if (isDate(value)) {
    if (rules.isDateAfter) {
      const field = find(form, (field) => field.name === item.name);
      const comparingField = find(form, (field) => field.name === rules.isDateAfter);

      if (field && comparingField && isDate(field.value)) {
        const startDate = new Date(field.value as string);
        const endDate = new Date(comparingField.value as string);

        isValid = isAfter(startDate, endDate);
      }
    }
    if (rules.isDateBefore) {
      const field = find(form, (field) => field.name === item.name);
      const comparingField = find(form, (field) => field.name === rules.isDateBefore);

      if (field && comparingField && isDate(field.value)) {
        const startDate = new Date(field.value as string);
        const endDate = new Date(comparingField.value as string);

        isValid = isBefore(startDate, endDate);
      }
    }
  }

  if (rules.function) {
    isValid = rules.function(value) && isValid;
  }

  if (rules.functions) {
    isValid =
      isValid &&
      Object.keys(rules.functions).reduce((isValid, funcName) => {
        if (!isValid) return isValid;
        if (rules.functions === undefined) return isValid;
        return isValid && rules.functions[funcName](value);
      }, isValid);
  }

  return isValid;
};
