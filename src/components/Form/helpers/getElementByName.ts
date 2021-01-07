import { FormElement } from '../models';

export const getElementByName = (array: FormElement[], elName: string) => {
  return array.find((el) => el.name === elName);
};
