import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { TimePicker, DatePicker } from '@material-ui/pickers';

import { ColorPicker } from './ColorPicker';
import { PickerElement, Element } from '../models';

interface InputProps extends Element {
  variant?: any;
  [name: string]: any;
}

interface ColorPickerProps extends PickerElement {
  onChange: any;
  [name: string]: any;
}

export const Input: React.FC<InputProps | ColorPickerProps> = ({
  errors = {},
  inputType,
  onChange = () => {},
  show = true,
  style = {},
  touched = true,
  valid = true,
  validation = {},
  validationMessages = {},
  ...extraProps
}) => {
  extraProps.error = !valid && !!validation && touched;
  extraProps.style = style;

  const getInput = (inputType: string) => {
    switch (inputType) {
      case 'input':
        return <TextField onChange={onChange} {...extraProps} />;
      case 'select':
        return (
          <TextField select onChange={onChange} {...extraProps}>
            {extraProps.options.map((option: string) => (
              <MenuItem key={option.toLowerCase()} value={option.toLowerCase()}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        );
      case 'multiLine':
        return <TextField multiline onChange={onChange} {...extraProps} />;
      case 'timePicker':
        return (
          <div>
            <TimePicker todayLabel="now" onChange={onChange} {...extraProps} />
          </div>
        );
      case 'datePicker':
        return <DatePicker animateYearScrolling={false} onChange={onChange} {...extraProps} />;
      case 'colorPicker':
        return <ColorPicker onChange={onChange} {...extraProps} />;
      default:
        return <TextField onChange={onChange} {...extraProps} />;
    }
  };

  return (
    <>
      {show ? getInput(inputType) : null}
      {show && extraProps.error
        ? Object.keys(errors).map(errorKey => {
            return (
              <FormHelperText key={errorKey} error>
                {validationMessages[errorKey]}
              </FormHelperText>
            );
          })
        : null}
    </>
  );
};
