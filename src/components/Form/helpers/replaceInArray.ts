import { FormElement } from '../models';

export const replaceInArray = (
  array: FormElement[],
  name: string,
  newValues: any,
): FormElement[] => {
  return array.map((item: FormElement) => {
    if (item.name === name) {
      return {
        ...array.find((item) => item.name === name),
        ...newValues,
      };
    }
    return item;
  });
};
