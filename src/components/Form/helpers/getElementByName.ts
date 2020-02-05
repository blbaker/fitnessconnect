import { Element, ColorPickerElement } from '../models';

export const getElementByName = (array: (Element | ColorPickerElement)[], elName: string) => {
  return array.find(el => el.name === elName);
};
