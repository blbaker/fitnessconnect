import React, { FormEvent } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Grid, { GridSize } from '@material-ui/core/Grid';

import { replaceInArray, checkValidity, checkForErrors } from './helpers';
import { Input } from './inputs/Input';
import { FormSchema, ColorPickerElement, Element } from './models';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

interface FormProps {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler;
  onChange(form: FormSchema): void;
  schema: FormSchema;
  style?: object;
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export const Form: React.FC<FormProps> = ({ children, onSubmit, onChange, schema, style }) => {
  const classes = useStyles({});

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(event);
  };

  const onFormChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target ? (event.target as any).value : event;

    let updatedElements: (Element | ColorPickerElement)[] = replaceInArray(schema.elements, name, {
      value,
      touched: true,
    });

    updatedElements = updatedElements.map((item: Element | ColorPickerElement) => ({
      ...item,
      valid: checkValidity(item.value, item.validation),
      errors: checkForErrors(item.value, item.validation),
    }));

    let formIsValid = updatedElements.every((item: Element | ColorPickerElement) =>
      item.show ? item.valid : true,
    );

    onChange({
      valid: formIsValid,
      elements: updatedElements,
    });
  };

  const calculateColumns = (
    element: Element | ColorPickerElement,
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
          {schema.elements.map(element => (
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
