import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { ChromePicker, ColorResult, Color } from 'react-color';

interface ColorPickerProps {
  onChange: Function;
  styles?: any;
  value?: Color;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ onChange, styles, value, ...other }) => {
  const [show, setShow] = useState(false);
  const [lastValidInput, setLastValidInput] = useState('');

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
      <TextField value={value} onClick={handleClick} onChange={onInputChange} {...other} />
      {show ? (
        <div className={styles.popover}>
          <div className={styles.wrapper} onClick={handleClose} />
          <ChromePicker color={value} disableAlpha onChange={onColorChange} />
        </div>
      ) : null}
    </div>
  );
};
