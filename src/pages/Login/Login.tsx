import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router';

import ProfileForm from '../../components/ProfileForm/ProfileForm';
import { useMst } from '../../stores/RootStore';
import { SignUpStatus } from '../../stores';

/* eslint-disable-next-line */
export interface LoginProps {}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export interface FormInputErrors {
  emailAddress?: string;
  password?: string;
}

type QueryStrings = {
  code: string;
};

const useStyles = makeStyles((theme) => ({
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
  const [state, setState] = useState();
  const query = useQuery();
  const { userStore, authStore, navigationStore } = useMst();

  useEffect(() => {
    if (userStore.signUpStatus === SignUpStatus.NEEDS_FITBIT) {
      const loginWithFitbit = async () => {
        const service = query.get('service');
        const code = query.get('code');
        if (!code) {
          const url = await authStore.getAuthorizationUrl('fitbit');
          console.log('url', url);
          window.location.href = url;
        } else if (code && service) {
          authStore.loginWithService(service, code);
        }
      };

      loginWithFitbit();
    } else if (userStore.signUpStatus === SignUpStatus.NEEDS_FIT) {
      const loginWithFit = async () => {
        const code = query.get('code');
        const service = query.get('service');
        if (!code) {
          const url = await authStore.getAuthorizationUrl('fit');
          console.log('url', url);
          window.location.href = url;
        } else if (code && service) {
          authStore.loginWithService(service, code);
        }
      };

      loginWithFit();
    } else if (userStore.signUpStatus === SignUpStatus.COMPLETED) {
      navigationStore.push('/dashboard');
    }
  }, []);

  return (
    <>
      {userStore.signUpStatus === SignUpStatus.NEEDS_PROFILE && (
        <div className={classes.container}>
          <Typography variant="h2">
            What can we call you and where can we contact you if needed?
          </Typography>
          <p>
            We won't give this contact to anyone and will only use it for essential communication.
          </p>
          <ProfileForm />
        </div>
      )}
    </>
  );
});

export default Login;
