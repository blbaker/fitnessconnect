import React from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({}));

/* eslint-disable-next-line */
export interface TemplateNameProps {}

export const TemplateName: React.FC<TemplateNameProps> = observer((props) => {
  const classes = useStyles();
  return <></>;
});

export default TemplateName;
