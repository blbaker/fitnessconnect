import { checkForErrors } from './checkForErrors';
import { checkValidity } from './checkValidity';

export const addErrorInfoToElements = (elements) =>
  elements.map((item) => ({
    ...item,
    valid: checkValidity(elements, item),
    errors: checkForErrors(elements, item),
  }));

export const formIsValid = (elements) => elements.every((item) => (item.show ? item.valid : true));
