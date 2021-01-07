import React, { createElement } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { TimePicker, KeyboardDatePicker, KeyboardDateTimePicker } from '@material-ui/pickers';
import { Input as MaterialUiInput } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { ColorPicker } from './ColorPicker';
import { PickerElement, BaseElement, SelectOption } from '../models';

interface InputProps extends BaseElement {
  variant?: any;
  [name: string]: any;
}

interface ColorPickerProps extends PickerElement {
  onChange: any;
  [name: string]: any;
}

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: 2,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  multiSelect: {
    minWidth: theme.spacing(21),
  },
}));

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
  component = <></>,
  ...extraProps
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  extraProps.error = !valid && !!validation && touched;
  extraProps.style = style;

  const getInput = (inputType: string) => {
    switch (inputType) {
      case 'input':
        return <TextField onChange={onChange} {...extraProps} />;
      case 'select':
        return (
          <TextField select onChange={onChange} {...extraProps}>
            {extraProps.options.map((option: SelectOption) => (
              <MenuItem key={option.value} value={option.value.toLowerCase()}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      case 'multiSelect':
        return (
          <FormControl
            className={classes.multiSelect}
            fullWidth={extraProps.fullWidth}
            required={extraProps.required || false}
          >
            <InputLabel id={extraProps.name}>{extraProps.label}</InputLabel>
            <Select
              multiple
              labelId={extraProps.name}
              {...extraProps}
              onChange={onChange}
              input={<MaterialUiInput id={extraProps.name} />}
              renderValue={(selected: any) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
            >
              {extraProps.options.map((option: SelectOption) => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox color="primary" checked={extraProps.value.indexOf(option.value) > -1} />
                  <ListItemText primary={option.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'checkbox':
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { fullWidth, error, label, labelPlacement, ...checkboxProps } = extraProps;
        return (
          <FormControlLabel
            control={<Checkbox onChange={onChange} {...checkboxProps} />}
            labelPlacement={labelPlacement}
            label={label}
          />
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
        return (
          <KeyboardDatePicker animateYearScrolling={false} onChange={onChange} {...extraProps} />
        );
      case 'dateTimePicker':
        return <KeyboardDateTimePicker onChange={onChange} {...extraProps} />;
      case 'colorPicker':
        return <ColorPicker onChange={onChange} {...extraProps} />;
      case 'custom':
        return createElement(component, { onChange, ...extraProps });
      default:
        return <TextField onChange={onChange} {...extraProps} />;
    }
  };

  return (
    <>
      {show ? getInput(inputType) : null}
      {show && extraProps.error
        ? Object.keys(errors).map((errorKey) => {
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

export default Input;
