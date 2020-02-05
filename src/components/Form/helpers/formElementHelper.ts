export const formElementHelper = ({
  fullWidth = true,
  inputType = '',
  label = '',
  name = '',
  show = true,
  validation = {},
  value = '',
  ...other
}) => {
  return {
    fullWidth,
    inputType,
    label,
    name,
    show,
    touched: false,
    valid: false,
    validation,
    value,
    ...other,
  };
};
