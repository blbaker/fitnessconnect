import { FormElement } from '../models';
import { isDate, isAfter, isBefore } from 'date-fns';
import { find } from 'lodash';

export const checkForErrors = (form: FormElement[], item: FormElement) => {
  let hasErrors = {};
  const { value = '', validation: rules, inputType } = item;

  const isValuePresent = (value) => {
    if (inputType === 'multiSelect') {
      return value.length > 0;
    }
    return typeof value === 'string' ? value.trim() !== '' : !!value;
  };

  if (!rules) {
    return false;
  }

  if (rules.required && !isValuePresent(value)) {
    hasErrors = { ...hasErrors, required: true };
  }

  if (rules.minLength && value.length <= rules.minLength) {
    hasErrors = { ...hasErrors, minLength: true };
  }

  if (rules.maxLength && value.length >= rules.maxLength) {
    hasErrors = { ...hasErrors, maxLength: true };
  }

  if (isDate(value)) {
    if (rules.isDateAfter) {
      const field = find(form, (field) => field.name === item.name);
      const comparingField = find(form, (field) => field.name === rules.isDateAfter);

      if (field && isDate(field.value) && comparingField && isDate(comparingField.value)) {
        const startDate = new Date(field.value as string);
        const endDate = new Date(comparingField.value as string);

        if (!isAfter(startDate, endDate)) {
          hasErrors = { ...hasErrors, isDateAfter: true };
        }
      } else {
        console.error(
          `${field?.name} is not a valid date or isn't being compared to a valid date and therefore cannot be validated.`,
        );
      }
    }
    if (rules.isDateBefore) {
      const field = find(form, (field) => field.name === item.name);
      const comparingField = find(form, (field) => field.name === rules.isDateBefore);

      if (field && isDate(field.value) && comparingField && isDate(comparingField.value)) {
        const startDate = new Date(field.value as string);
        const endDate = new Date(comparingField.value as string);

        if (!isBefore(startDate, endDate)) {
          hasErrors = { ...hasErrors, isDateBefore: true };
        }
      } else {
        console.error(
          `${field?.name} is not a valid date or isn't being compared to a valid date and therefore cannot be validated.`,
        );
      }
    }
  }

  if (typeof value === 'string') {
    const EMAIL_VALIDATOR = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (rules.isEmail && !EMAIL_VALIDATOR.test(value.toLocaleLowerCase())) {
      hasErrors = { ...hasErrors, isEmail: true };
    }

    const NUMBER_VALIDATOR = /^\d+$/;
    if (rules.isNumeric && isValuePresent(value) && !NUMBER_VALIDATOR.test(value)) {
      hasErrors = { ...hasErrors, isNumeric: true };
    }

    if (rules.regex) {
      const REGEX_VALIDATOR = rules.regex;
      if (!REGEX_VALIDATOR.test(value)) {
        hasErrors = { ...hasErrors, regex: true };
      }
    }
  }

  if (rules.function && !rules.function(value)) {
    hasErrors = { ...hasErrors, function: true };
  }

  if (rules.functions) {
    return Object.keys(rules.functions).reduce((hasErrors, funcName) => {
      if (rules.functions === undefined) return hasErrors;
      if (rules.functions[funcName](value)) {
        return hasErrors;
      } else {
        return { ...hasErrors, [funcName]: true };
      }
    }, hasErrors);
  }

  return hasErrors;
};
