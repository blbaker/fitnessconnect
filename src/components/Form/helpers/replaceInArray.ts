import { Element, ColorPickerElement } from '../models';

export const replaceInArray = (
  array: (Element | ColorPickerElement)[],
  name: string,
  newValues: any,
): (Element | ColorPickerElement)[] => {
  return array.map((item: Element | ColorPickerElement) => {
    if (item.name === name) {
      return {
        ...array.find(item => item.name === name),
        ...newValues,
      };
    }
    return item;
  });
};
