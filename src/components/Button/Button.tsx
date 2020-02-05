import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

interface MaterialUIButtonProps extends ButtonProps {
  loading?: boolean;
  style?: object;
}

const useStyles = makeStyles({
  buttonContainer: {
    display: 'inline-block',
    alignItems: 'center',
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

export const LoadingButton: React.FC<MaterialUIButtonProps> = ({
  loading,
  style,
  children,
  ...buttonProps
}) => {
  const classes = useStyles({});
  return (
    <div className={classes.buttonContainer}>
      <Button {...buttonProps}>{children}</Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  );
};

export default LoadingButton;
