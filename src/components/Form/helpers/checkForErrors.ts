import { Validator } from '../models';

export const checkForErrors = (value: string = '', rules?: Validator) => {
  let hasErrors = {};
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

  return hasErrors;
};
