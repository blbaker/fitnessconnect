import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';

import { useMst } from '../../core/stores/RootStore';
import { RequestStatus } from '../../libs/helpers';
import Form from '../../components/Form/Form';
import { loginFormSchema } from './login-form-schema';
import { getElementByName } from '../../components/Form/helpers/getElementByName';
import { SignInError } from '../../models';
import { LoadingButton } from '../../components/LoadingButton/LoadingButton';

/* eslint-disable-next-line */
export interface LoginProps {}

export interface FormInputErrors {
  emailAddress?: string;
  password?: string;
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '50%',
    margin: 'auto',
    '& > *': {
      margin: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(3),
    },
  },
  form: {
    flex: 1,
    marginTop: theme.spacing(2),
  },
}));

export const Login: React.FC<LoginProps> = observer(() => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const { t } = useTranslation();
  const { authStore, navigationStore } = useMst();

  const [form, setForm] = useState(loginFormSchema);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async () => {
    try {
      const emailAddress = getElementByName(form.elements, 'email-address').value;
      const password = getElementByName(form.elements, 'password').value;
      await authStore.loginWithEmail(emailAddress, password);
      navigationStore.push('/classes');
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      const message = SignInError[errorObj.error.code];
      setLoginError(message || errorObj.error?.message || errorObj.error);
    }
    authStore.setStatus(RequestStatus.IDLE);
  };

  const handleFormChange = formState => {
    setForm(formState);
  };

  return (
    <>
      {loginError && <Alert severity="error">{t(loginError)}</Alert>}
      {!authStore.isLoggedIn ? (
        <Paper className={classes.container}>
          <Form onSubmit={handleSubmit} onChange={handleFormChange} schema={form}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={authStore.status === RequestStatus.PENDING}
              disabled={authStore.status === RequestStatus.PENDING || !form.valid}
              color="primary"
            >
              Submit
            </LoadingButton>
          </Form>
        </Paper>
      ) : (
        <div>You're signed in</div>
      )}
    </>
  );
});

export default Login;
