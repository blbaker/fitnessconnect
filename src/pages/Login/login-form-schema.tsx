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
    type: 'email',
    validation: { required: true, isEmail: true },
    validationMessages: {
      required: 'Email Address is required.',
      isEmail: 'Email Address is invalid.',
    },
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
    validationMessages: { required: 'Password is required.' },
  }),
  formElementHelper({
    cols: {
      md: 6,
    },
    name: 'startDate',
    label: 'Start Date',
    inputType: 'datePicker',
    validation: { isDateBefore: 'endDate' },
    validationMessages: { required: 'Password is required.', isDateBefore: 'Start Date must be before End Date.' },
  }),
  formElementHelper({
    cols: {
      md: 6,
    },
    name: 'endDate',
    label: 'End Date',
    inputType: 'datePicker',
    validation: { isDateAfter: 'startDate' },
    validationMessages: { required: 'Password is required.', isDateAfter: 'End Date must be after Start Date' },
  }),
  formElementHelper({
    cols: {
      md: 6,
    },
    name: 'isInstructor',
    label: 'Is Instructor',
    inputType: 'checkbox',
    checked: true,
    value: 'is-instructor',
    labelPlacement: 'end'
  }),
]);