import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';

import { completeProfileFormSchema } from '../../pages/Login/complete-profile-form-schema';
import { useMst } from '../../stores/RootStore';
import { RequestStatus } from '../../libs/helpers';
import Form from '../../components/Form/Form';
import { SignInError, UserProfile } from '../../models';
import { LoadingButton } from '../../components/LoadingButton/LoadingButton';

const useStyles = makeStyles(() => ({}));

/* eslint-disable-next-line */
export interface ProfileFormProps {
  className?: string;
}

export const ProfileForm: React.FC<ProfileFormProps> = observer(({ className }) => {
  const { userStore, authStore, navigationStore } = useMst();
  const [form, setForm] = useState(completeProfileFormSchema(userStore));
  const [loginError, setLoginError] = useState('');

  const { t } = useTranslation();

  const handleSubmit = async (formData: UserProfile) => {
    try {
      userStore.updateUserProfile(formData);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      const message = SignInError[errorObj.error.code];
      setLoginError(message || errorObj.error?.message || errorObj.error);
    }
    authStore.setStatus(RequestStatus.IDLE);
  };

  const handleCompleteProfile = (formState) => {
    setForm(formState);
  };

  const classes = useStyles();
  return (
    <div className={className}>
      {loginError && <Alert severity="error">{loginError}</Alert>}
      <Form onSubmit={handleSubmit} onChange={handleCompleteProfile} schema={form}>
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
    </div>
  );
});

export default ProfileForm;
