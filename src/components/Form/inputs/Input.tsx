import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { TimePicker, DatePicker } from '@material-ui/pickers';

import { ColorPicker } from './ColorPicker';
import { PickerElement, Element, SelectOption } from '../models';
import { FormControlLabel, Checkbox } from '@material-ui/core';

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
  touched = true,
  valid = true,
  validation = {},
  validationMessages = {},
  ...extraProps
}) => {
  extraProps.error = !valid && !!validation && touched;

  const getInput = (inputType: string) => {
    switch (inputType) {
      case 'input':
        return <TextField onChange={onChange} {...extraProps} />;
      case 'select':
        return (
          <TextField select onChange={onChange} {...extraProps}>
            {extraProps.options.map((option: SelectOption) => (
              <MenuItem key={option.value.toLowerCase()} value={option.value.toLowerCase()}>
                {option.label}
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
      case 'checkbox':
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { fullWidth, error, label, labelPlacement, ...checkboxProps } = extraProps;
        return (
          <FormControlLabel
            control={
              <Checkbox onChange={onChange} {...checkboxProps} />
            }
            labelPlacement={labelPlacement}
            label={label}
          />
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
