import { FormSchema, BaseElement } from '../models';
import { addErrorInfoToElements, formIsValid } from './formValidity';

export const formHelper = (elements: BaseElement[] = []): FormSchema => {
  let updatedElements = addErrorInfoToElements(elements);
  let isValid = formIsValid(updatedElements);

  return {
    elements,
    valid: isValid,
  };
};
