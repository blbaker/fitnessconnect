import { formElementHelper, formHelper } from '../../components/Form/helpers';
import { FormSchema } from '../../components/Form/models';

export const loginFormSchema: FormSchema = formHelper([
  formElementHelper({
    cols: {
      md: 6,
    },
    name: 'email-address',
    label: 'Email Address',
    inputType: 'input',
    validation: { required: true },
  }),
  formElementHelper({
    cols: {
      md: 6,
    },
    name: 'password',
    label: 'Password',
    inputType: 'input',
    type: 'password',
    validation: { required: true },
  }),
]);
