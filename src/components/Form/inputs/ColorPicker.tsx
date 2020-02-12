import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { ChromePicker, ColorResult, Color } from 'react-color';
import { makeStyles, useTheme } from '@material-ui/core';

interface ColorPickerProps {
  onChange: Function;
  styles?: any;
  value?: Color;
}

const useStyles = makeStyles(() => ({
  popover: {
    position: 'absolute',
    zIndex: 2,
  },
  wrapper: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    right: '0px',
    bottom: '0px',
  },
}));

export const ColorPicker: React.FC<ColorPickerProps> = ({ onChange, styles, value, ...other }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [show, setShow] = useState(false);
  const [lastValidInput, setLastValidInput] = useState(value || '');

  const onColorChange = (color: ColorResult) => {
    setLastValidInput(color.hex);
    onChange({
      target: {
        value: color.hex,
      },
    });
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      onChange({
        target: {
          value: lastValidInput,
        },
      });
    } else {
      setLastValidInput('');
      onChange({
        target: {
          value: '',
        },
      });
    }
  };

  const handleClick = () => setShow(!show);

  const handleClose = () => setShow(false);

  return (
    <div>
      <TextField value={lastValidInput} onClick={handleClick} onChange={onInputChange} {...other} />
      {show ? (
        <div className={classes.popover}>
          <div className={classes.wrapper} onClick={handleClose} />
          <ChromePicker color={lastValidInput} disableAlpha onChange={onColorChange} />
        </div>
      ) : null}
    </div>
  );
};
