import React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Grid, { GridSize } from '@material-ui/core/Grid';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import { replaceInArray, checkValidity, checkForErrors } from './helpers';
import { Input } from './inputs/Input';
import { FormSchema, PickerElement, BaseElement, CheckboxElement } from './models';

interface FormProps {
  children: React.ReactNode;
  onSubmit: any;
  onChange(form: FormSchema): void;
  schema: FormSchema;
  style?: object;
  values?: object;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export const Form: React.FC<FormProps> = ({ children, onSubmit, onChange, schema, style }) => {
  const classes = useStyles({});

  const onFormSubmit = (event) => {
    event.preventDefault();
    const formData = JSON.stringify(Object.fromEntries(new FormData(event.target)));
    onSubmit(formData);
  };

  const onFormChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let updatedElements: (BaseElement | PickerElement | CheckboxElement)[];
    if (event.target && event.target.type === 'checkbox') {
      const checked = (event.target as HTMLInputElement).checked;
      updatedElements = replaceInArray(schema.elements, name, {
        checked,
        touched: true,
      });
    } else {
      const value = event.target ? (event.target as any).value : event;
      updatedElements = replaceInArray(schema.elements, name, {
        value,
        touched: true,
      });
    }

    updatedElements = updatedElements.map(
      (item: BaseElement | PickerElement | CheckboxElement) => ({
        ...item,
        valid: checkValidity(updatedElements, item),
        errors: checkForErrors(updatedElements, item),
      }),
    );

    let formIsValid = updatedElements.every((item: BaseElement | PickerElement | CheckboxElement) =>
      item.show ? item.valid : true,
    );

    onChange({
      valid: formIsValid,
      elements: updatedElements,
    });
  };

  const calculateColumns = (
    element: BaseElement | PickerElement | CheckboxElement,
  ): Partial<Record<Breakpoint, boolean | GridSize>> => {
    if (element.cols) {
      return element.cols;
    }

    return { xs: element.col || 12 };
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form className={classes.root} onSubmit={onFormSubmit}>
        <Grid container spacing={3}>
          {schema.elements.map((element) => (
            <Grid item key={element.name} {...calculateColumns(element)}>
              <Input style={style} onChange={onFormChange(element.name)} {...element} />
            </Grid>
          ))}
        </Grid>
        <br />
        {children}
      </form>
    </MuiPickersUtilsProvider>
  );
};

export default Form;
