import { Element, PickerElement } from '../models';

export const getElementByName = (array: (Element | PickerElement)[], elName: string) => {
  return array.find(el => el.name === elName);
};
