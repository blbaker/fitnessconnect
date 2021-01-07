import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { useState } from 'react';
import { formElementHelper, formHelper } from '../../components/Form/helpers';
import { FormSchema } from '../../components/Form/models';
import { SignUpStatus, UserStore } from '../../stores';

export const completeProfileFormSchema = (userStore: UserStore): FormSchema => {
  const fields = [
    formElementHelper({
      name: 'firstName',
      label: 'First Name',
      inputType: 'input',
      type: 'text',
      validation: { required: true },
      validationMessages: {
        required: 'First Name is required.',
      },
      value: userStore.user_first_name,
    }),
    formElementHelper({
      name: 'emailAddress',
      label: 'Email Address',
      inputType: 'input',
      type: 'email',
      validation: { required: true, isEmail: true },
      validationMessages: {
        required: 'Email Address is required.',
        isEmail: 'Email Address is invalid.',
      },
      value: userStore.user_email,
    }),
  ];

  if (userStore.signUpStatus !== SignUpStatus.COMPLETED) {
    fields.push(
      formElementHelper({
        name: 'acceptTermsAndConditions',
        label: 'I agree to the Terms of Service and Privacy Policy',
        inputType: 'custom',
        type: 'checkbox',
        validation: { required: true },
        validationMessages: {
          required: 'Acceptance is required.',
        },
        component: ((Component) => ({ onChange, ...props }) => {
          const [state, setState] = useState({ checkbox: false });
          const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setState({ ...state, [event.target.name]: event.target.checked });
            onChange(state);
          };
          return (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkbox}
                    onChange={handleChange}
                    name="checkbox"
                    {...props}
                  />
                }
                {...props}
                label={
                  <>
                    I agree to{' '}
                    <a target="_blank" href="/legal">
                      Terms of Service and Privacy Policy
                    </a>
                  </>
                }
              />
            </>
          );
        })(),
      }),
    );
  }

  return formHelper(fields);
};
