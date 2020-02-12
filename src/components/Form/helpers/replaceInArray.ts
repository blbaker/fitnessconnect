import { Element, PickerElement } from '../models';

export const replaceInArray = (
  array: (Element | PickerElement)[],
  name: string,
  newValues: any,
): (Element | PickerElement)[] => {
  return array.map((item: Element | PickerElement) => {
    if (item.name === name) {
      return {
        ...array.find(item => item.name === name),
        ...newValues,
      };
    }
    return item;
  });
};
